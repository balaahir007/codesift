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

  const { mode } = useThemeStore();

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
    <>
      {/* Backdrop overlay when maximized */}
      {isMaximized && (
      <div
  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[]  "
  onClick={toggleMaximize}
/>

      )}

      <div
        className={`flex flex-col ${chatBg}   overflow-x-auto rounded-lg transition-all duration-300 
      ${isMaximized
            ? "fixed inset-2 md:-mt-15 sm:inset-8 md:inset-16 z-[999] shadow-2xl border-2"
            : "w-full h-full"
          } ${borderColor}`}
      >

        {/* Header */}
        <div
          className={`flex items-center  justify-between px-3 sm:px-4 py-2 sm:py-3 
      border-b ${borderColor} ${bgCard} 
      overflow-hidden`}
        >
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
                {isConnected ? "Online" : "Offline"}
              </span>
            </div>
          </div>

          <button
            onClick={toggleMaximize}
            className={`${textSecondary} ${hoverBg} p-1.5 sm:p-2 rounded`}
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
        <div
          className={`flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 
      space-y-3 sm:space-y-4 ${bgContent}
      max-h-[calc(100vh-160px)] sm:max-h-none`}
        >
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className={`${textSecondary} text-sm sm:text-base text-center px-4`}>
                No messages yet. Start the conversation!
              </p>
            </div>
          ) : (
            messages.map((chat, idx) => {
              const isOwn = authUser?.id === chat?.author?.userId;

              return (
                <div
                  key={idx}
                  className={`flex gap-2 sm:gap-3 
              ${isOwn ? "flex-row-reverse" : "flex-row"} items-start`}
                >
                  {/* Avatar */}
                  <img
                    src={chat.author?.avatar ||
                      `https://api.dicebear.com/7.x/initials/svg?seed=${chat.author?.username || "User"}`
                    }
                    onError={(e) => {
                      e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${chat.author?.username || "User"}`;
                    }}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                  />

                  {/* Message Content */}
                  <div
                    className={`flex flex-col 
                ${isOwn ? "items-end" : "items-start"} 
                max-w-[80%] sm:max-w-[75%] md:max-w-[65%]`}
                  >
                    <span className={`text-xs font-medium mb-1 ${textSecondary} px-1`}>
                      {chat.author?.username || "Unknown User"}
                    </span>

                    <div
                      className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl 
                  ${isOwn
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
                          hour: "2-digit",
                          minute: "2-digit",
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
              <div
                key={id}
                className={`flex items-center gap-2 ${textSecondary} text-xs sm:text-sm italic`}
              >
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
                  <span
                    className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
                <span>{user.username} is typing...</span>
              </div>
            ))}
          </div>

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-2 sm:p-3 flex items-center gap-2 bg-white/5">
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
            onClick={sendMessage}
            disabled={!isConnected || !inputValue.trim()}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition 
        ${isConnected && inputValue.trim()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            Send
          </button>
        </div>
      </div>
    </>

  );
};

export default StudySpaceChat;