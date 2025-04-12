import React, { useEffect, useState } from "react";
import { userChatStore } from "../../zustandStateManagement/userChatStore";
import SideBarSkeleton from "./skeletons/SideBarSkeleton";
import { Users } from "lucide-react";
import { assets } from "../../assets/assets";
import { CiSearch } from "react-icons/ci";
import { useAuthStore } from "../../zustandStateManagement/useAuthstore";

const Sidebar = () => {
  const { setSelectedUser, selectedUser, getUsers, users, isUserLoading } =
    userChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const onlineUser = onlineUsers || [];

  const sortedUsers = [...(users || [])].sort((a, b) => {
    const aOnline = onlineUser.includes(a._id);
    const bOnline = onlineUser.includes(b._id);
    return bOnline - aOnline;
  });

  const [searchContacts, setSearchContacts] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);

  useEffect(() => {
    const filtered = users?.filter((item) =>
      item.username.toLowerCase().includes(searchContacts.toLowerCase())
    );
    setSearchedUsers(filtered || []);
  }, [searchContacts, users]);

  if (isUserLoading) return <SideBarSkeleton />;

  return (
    <aside className="h-full relative w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-white shadow-md">
      <div className="border-b border-green-500 p-4 w-20 lg:w-72">
        <div className="flex items-center gap-2 text-green-700 relative">
          <input
            type="text"
            className="border border-green-500 text-[12px] px-2 pl-6 py-2 text-primary outline-none w-full rounded"
            placeholder="Search your's Farmers"
            onChange={(e) => setSearchContacts(e.target.value)}
          />
          <CiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-scroll bottom-0 h-auto absolute top-17 w-full py-3 lg:w-71">
        {searchedUsers.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No users found</p>
        ) : (
          searchedUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-20 lg:w-63 p-2 flex items-center h-auto gap-3 transition-colors duration-150 rounded-lg mx-2 my-1 
                ${
                  selectedUser?._id === user._id
                    ? "bg-green-100 ring-2 ring-green-500"
                    : "hover:bg-green-50"
                }`}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || assets.myProfileIcon}
                  alt={user.username}
                  className="size-12 object-cover rounded-full"
                />
                {onlineUser.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white"></span>
                )}
              </div>
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.username}</div>
                <div className="text-xs text-gray-500">
                  {onlineUser.includes(user._id) ? (
                    <span className="text-green-600">Online</span>
                  ) : (
                    "Offline"
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
