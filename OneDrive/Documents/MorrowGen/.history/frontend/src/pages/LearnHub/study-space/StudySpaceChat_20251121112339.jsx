import React, { useEffect, useRef, useState, useCallback } from 'react';
import { LuMinimize } from "react-icons/lu";
import { CgMaximizeAlt } from "react-icons/cg";
import { useParams } from 'react-router-dom';
import MentionInput from './MentionInput';
import socketService from '../../../services/socketService';
import useAuthStore from '../../../zustand/auth/useAuthStore';
import useChatStore from '../../../zustand/studySpaces/useChatStore';
import useThemeStore from '../../../zustand/themeStore';

const StudySpaceChat = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const { spaceId } = useParams();
  const { authUser } = useAuthStore();
  const { username } = authUser;
  const { mode } = useThemeStore();
  const [typingUsers, setTypingUsers] = useState(new Map());

  const { getMessages, getConnectionStatus, addMessage } = useChatStore();
  const messages = getMessages(spaceId);
  const connectionStatus = getConnectionStatus(spaceId);
  const { isConnected, error: connectionError } = connectionStatus;

  // Theme classes
  const bgPrimary = mode === 'dark' ? 'bg-[#0A1215]' : 'bg-white';
  const bgContent = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-100';
  const bgCard = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const hoverBg = mode === 'dark' ? 'hover:bg-[#1B2E31]' : 'hover:bg-gray-50';
  const chatBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const buttonBg = mode === 'dark' ? 'bg-[#0097B2]' : 'bg-blue-600';
  const buttonHover = mode === 'dark' ? 'hover:bg-[#00B2A9]' : 'hover:bg-blue-700';
  const messageBgOwn = mode === 'dark' ? 'bg-[#0097B2]' : 'bg-blue-600';
  const messageBgOther = mode === 'dark' ? 'bg-[#294B4E]' : 'bg-gray-200';
  const messageTextOwn = 'text-white';
  const messageTextOther = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const inputBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50';
  const inputBorder = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-300';
  const inputFocus = mode === 'dark' ? 'focus:border-[#0097B2]' : 'focus:border-blue-500';

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
    socketService.typingStatus(spaceId, authUser?.id, setTypingUsers);
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
  }, [inputValue, spaceId, isConnected, addMessage, authUser]);

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
      } else {
        socketService.emitStopTyping(spaceId, authUser?.id);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [inputValue, spaceId, authUser]);

  return (
    <div 
      className={`flex flex-col ${chatBg} rounded-lg shadow-xl border ${borderColor} transition-all duration-300 ${
        isMaximized 
          ? 'fixed inset-4 sm:inset-8 md:inset-16 z-50 h-[calc(100vh-2rem)] sm:h-[calc(100vh-4rem)] md:h-[calc(100vh-8rem)]' 
          : 'w-full sm:w-96 h-[400px] sm:h-[500px]'
      }`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border-b ${borderColor} ${bgCard}`}>
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <h3 className={`font-semibold ${textPrimary} text-sm sm:text-base truncate`}>
            Study Space Chat
          </h3>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {isConnected ? (
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            ) : (
              <div className="w-2 h-2 bg-red-500 rounded-full" />
            )}
            <span className={`text-xs ${textSecondary} hidden sm:inline`}>
              {isConnected ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        <button
          onClick={toggleMaximize}
          className={`${textSecondary} ${hoverBg} p-1.5 sm:p-2 rounded transition-colors flex-shrink-0`}
          aria-label={isMaximized ? 'Minimize chat' : 'Maximize chat'}
        >
          {isMaximized ? (
            <LuMinimize className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <CgMaximizeAlt className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      </div>

      {/* Connection Error */}
      {connectionError && (
        <div className="px-3 sm:px-4 py-2 bg-red-500/10 border-b border-red-500/20">
          <p className="text-red-500 text-xs sm:text-sm">
            Connection Error: {connectionError}
          </p>
        </div>
      )}

      {/* Messages Container */}
      <div className={`flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4 ${bgContent}`}>
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className={`${textSecondary} text-sm sm:text-base text-center px-4`}>
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          messages.map((chat, idx) => {
            const isOwnMessage = authUser?.id === chat?.author?.userId;
            return (
              <div
                key={idx}
                className={`flex gap-2 sm:gap-3 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} items-start`}
              >
                {/* Avatar */}
                <img
                  src={chat.author?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${chat.author?.username || 'User'}`}
                  alt={chat.author?.username}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 object-cover"
                  onError={(e) => {
                    e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${chat.author?.username || 'User'}`;
                  }}
                />
                
                {/* Message Content */}
                <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} max-w-[70%] sm:max-w-[75%]`}>
                  <span className={`text-xs font-medium mb-1 ${textSecondary} px-1`}>
                    {chat.author?.username || 'Unknown User'}
                  </span>
                  <div
                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl ${
                      isOwnMessage 
                        ? `${messageBgOwn} ${messageTextOwn} rounded-tr-sm` 
                        : `${messageBgOther} ${messageTextOther} rounded-tl-sm`
                    } break-words`}
                  >
                    <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                      {chat.message}
                    </p>
                  </div>
                  {chat.timestamp && (
                    <span className={`text-[10px] sm:text-xs ${textSecondary} mt-1 px-1`}>
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
        <div className="space-y-2">
          {[...typingUsers.entries()].map(([id, user]) => (
            <div key={id} className={`flex items-center gap-2 ${textSecondary} text-xs sm:text-sm italic`}>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span>{user.username} is typing...</span>
            </div>
          ))}
        </div>
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className={`px-3 sm:px-4 py-3 sm:py-4 border-t ${borderColor} ${bgCard}`}>
        <div className="flex gap-2 sm:gap-3 items-end">
          <MentionInput
            value={inputValue}
            onChange={setInputValue}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className={`flex-1 ${inputBg} ${textPrimary} border ${inputBorder} ${inputFocus} rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
              mode === 'dark' ? 'focus:ring-[#0097B2]' : 'focus:ring-blue-500'
            }`}
            disabled={!isConnected}
            rows={1}
          />
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim() || !isConnected}
            className={`${buttonBg} ${buttonHover} text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 hover:shadow-lg`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudySpaceChat;