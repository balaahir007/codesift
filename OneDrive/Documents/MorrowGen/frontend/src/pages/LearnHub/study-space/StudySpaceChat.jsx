 import React, { useEffect, useRef, useState, useCallback } from 'react';
import { LuMinimize } from "react-icons/lu";
import { CgMaximizeAlt } from "react-icons/cg";
import { useParams } from 'react-router-dom';
import MentionInput from './MentionInput';
import socketService from '../../../services/socketService';
import useAuthStore from '../../../zustand/auth/useAuthStore';
import useChatStore from '../../../zustand/studySpaces/useChatStore';

const StudySpaceChat = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const { spaceId } = useParams();
  const { authUser } = useAuthStore();
  const { username } = authUser
  const [typingUsers, setTypingUsers] = useState(new Map());

  const { getMessages, getConnectionStatus, addMessage } = useChatStore()
  const messages = getMessages(spaceId);
  const connectionStatus = getConnectionStatus(spaceId);
  const { isConnected, error: connectionError } = connectionStatus;
  
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (!authUser || !spaceId) {
      console.error("❌ Missing authUser or spaceId");
      return;
    }


    socketService.typingStatus(spaceId, authUser?.id, setTypingUsers)

    return () => {
      console.log(`🔄 Component unmounting for space ${spaceId}, but keeping connection`);
    };
  }, [spaceId, authUser]);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const sendMessage = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed || !isConnected) {
      if (!isConnected) {
        console.warn("⚠️ Cannot send message: not connected to server");
      }
      return;
    }

    const messagePayload = {
      message: trimmed,
      spaceId,
    };

    addMessage(spaceId, messagePayload);

    const sent = socketService.sendMessage(spaceId, authUser?.id, messagePayload);

    if (sent) {
      setInputValue('');
    } else {
      console.error("Failed to send message, removing from store");
    }
  }, [inputValue, spaceId, isConnected]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (inputValue.trim() !== "") {
        socketService.emitTyping(spaceId, authUser?.id);
        console.log(typingUsers);
      } else {
        socketService.emitStopTyping(spaceId, authUser?.id);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [inputValue]);

  return (
    <div
      className={`bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col transition-all duration-300 ease-out ${
        isMaximized
          ? 'fixed top-4 left-2 right-4 bottom-4 z-50 w-auto p-6'
          : 'w-80 h-96 p-4'
      }`}
    >

      {/* Header */}
      <header className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-3 mb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span>Study Space Chat</span>
          <div className="flex items-center gap-1.5">
            {isConnected ? (
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.076 13.308-5.076 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            )}
            <span className={`text-xs ${isConnected ? 'text-green-600' : 'text-red-500'}`}>
              {isConnected ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        <button
          onClick={toggleMaximize}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
        >
          {isMaximized ? (
            <LuMinimize className="w-4 h-4" />
          ) : (
            <CgMaximizeAlt className="w-4 h-4" />
          )}
        </button>
      </header>

      {/* Connection Error */}
      {connectionError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg mb-3 text-sm">
          Connection Error: {connectionError}
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 text-sm mt-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((chat, idx) => {
            const isOwnMessage = authUser?.id === chat?.author?.userId;
            return (
              <div
                key={`${chat.id || chat.author?.userId}-${idx}-${chat.timestamp || Date.now()}`}
                className={`flex items-start gap-2 w-full ${
                  isOwnMessage ? 'justify-end flex-row-reverse' : ''
                }`}
              >
                <img
                  src={
                    chat?.author?.profilePicture ||
                    `https://api.dicebear.com/7.x/initials/svg?seed=${chat.author?.username || 'User'}`
                  }
                  alt="profile"
                  className="h-8 w-8 rounded-full flex-shrink-0"
                  onError={(e) => {
                    e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${chat.author?.username || 'User'}`;
                  }}
                />
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    isOwnMessage
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <span
                    className={`block text-xs font-medium mb-1 ${
                      isOwnMessage
                        ? 'text-right text-blue-100'
                        : 'text-left text-gray-500'
                    }`}
                  >
                    {chat.author?.username || 'Unknown User'}
                  </span>
                  <span className="text-sm break-words whitespace-pre-wrap">
                    {chat.message}
                  </span>
                  {chat.timestamp && (
                    <span
                      className={`block text-xs mt-1 ${
                        isOwnMessage
                          ? 'text-blue-200 text-right'
                          : 'text-gray-400 text-left'
                      }`}
                    >
                      {new Date(chat.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* Typing Indicators */}
        <div className="mt-2 flex flex-col gap-2 w-fit">
          {[...typingUsers.entries()].map(([id, user]) => (
            <div key={id} className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
              <img
                src={user.profilePicture}
                alt=""
                className="w-5 h-5 rounded-full"
              />
              <span className="text-sm text-gray-600">{user.username} is typing...</span>
            </div>
          ))}
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="mt-3 flex items-center gap-2">
        <div className="flex-1">
          <MentionInput
            setTypingUsers={setTypingUsers}
            inputValue={inputValue}
            setInputValue={setInputValue}
            onKeyPress={handleKeyPress}
            disabled={!isConnected}
            placeholder={isConnected ? "Type a message..." : "Connecting..."}
          />
        </div>
        <button
          type="button"
          onClick={sendMessage}
          disabled={!isConnected || !inputValue.trim()}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isConnected && inputValue.trim()
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default StudySpaceChat;