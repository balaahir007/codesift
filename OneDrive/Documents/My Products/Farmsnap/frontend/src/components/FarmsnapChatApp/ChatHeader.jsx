import React from "react";
import { useAuthStore } from "../../zustandStateManagement/useAuthStore";
import { userChatStore } from "../../zustandStateManagement/userChatStore";
import MessageInputBox from "./MessageInputBox";
import Spinner from "../FarmsnapApp/Spinner";
import { UilUser  } from "@iconscout/react-unicons";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = userChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <Spinner />
        <MessageInputBox />
      </div>
    );

  return (
    <div className="p-4 border-b h-20 w-250 bg-primary text-white flex    items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="size-10 rounded-full relative">
            {selectedUser.profilePic ? (
              <img
                src={selectedUser.profilePic}
                alt={selectedUser.username}
                className="object-cover rounded-full w-full h-full"
              />
            ) : (
              <UilUser className="text-green-200 bg-secondary p-2 size-11 rounded-full" />
            )}
          </div>
        </div>
        <div>
          <h3 className="font-medium">{selectedUser.username}</h3>
          <p className="text-sm text-base-content/70">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button
        onClick={() => setSelectedUser(null)}
        className="text-base-content/70 font-bold text-xl"
        title="Close Chat"
      >
        ×
      </button>
    </div>
  );
};

export default ChatHeader;
