import React, { useRef } from "react";
import { userChatStore } from "../../zustandStateManagement/userChatStore";
import Spinner from "../FarmsnapApp/Spinner";
import { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageInputBox from "./MessageInputBox";
import { useAuthStore } from "../../zustandStateManagement/useAuthstore";
import { assets } from "../../assets/assets";
import sendMessageTimerCalculator from "../../helpers/sendMessageTimerCalculator";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser,subscribeToMessages,unSubscribeFromMessages } =
    userChatStore();
  const { authUser } = useAuthStore();
  useEffect(() => {
    getMessages(selectedUser._id);
    
    subscribeToMessages()
    
    return ()=> unSubscribeFromMessages()
  }, [selectedUser._id, getMessages,subscribeToMessages,unSubscribeFromMessages]);

  const messageEndRef = useRef();
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  if (isMessagesLoading)
    return (
      <div className="flex items-center justify-center text-center mx-auto">
        <Spinner />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length > 0 &&
          messages.map((message) => {
            const isMe = message.senderId === authUser._id;
            return (
              <div
                key={message._id}
                className={`flex items-start gap-2 ${
                  isMe ? "justify-end" : "justify-start"
                }`}
                ref={messageEndRef}
              >
                {" "}
                {!isMe && (
                  <div className="w-10 h-10 rounded-full overflow-auto border">
                    <img
                      src={selectedUser.profilePic || "/avatar.png"}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="max-w-xs">
                  <div className="text-xs text-gray-400 mb-1">
                    {sendMessageTimerCalculator(message.createdAt)}
                  </div>
                  <div
                    className={`p-2 rounded-lg whitespace-pre-line break-words ${
                      isMe
                        ? "bg-green-500 text-white rounded-br-none"
                        : "bg-gray-200 text-black rounded-bl-none"
                    }`}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="max-w-[200px] rounded-md mb-2"
                      />
                    )}
                    {message.text && <p>{message.text}</p>}
                  </div>
                </div>
                {isMe && (
                  <div className="w-10 h-10 rounded-full overflow-hidden border">
                    <img
                      src={authUser.profilePic || "/avatar.png"}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })}
      </div>

      <MessageInputBox />
    </div>
  );
};

export default ChatContainer;
