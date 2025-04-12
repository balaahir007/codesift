import React from "react";
import { assets } from "../../assets/assets";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useAuthStore } from "../../zustandStateManagement/useAuthStore";

const ChatAppNavbar = () => {
  const navigate = useNavigate();
  const {logout} = useAuthStore()
  return (
    <div className="fixed top-0 z-40 w-full bg-white backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <img
          src={assets.logoIcon}
          alt="Logo"
          className="w-20 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="flex items-center gap-6 text-gray-700">
          <div className="flex items-center gap-2 hover:text-primary cursor-pointer transition">
            <IoSettingsOutline className="text-xl" />
            <span className="hidden sm:inline text-sm">Settings</span>
          </div>
          <div className="flex items-center gap-2 hover:text-primary cursor-pointer transition">
            <CgProfile className="text-xl" />
            <span className="hidden sm:inline text-sm">Profile</span>
          </div>

          <div className="flex itFems-center gap-2 hover:text-primary cursor-pointer transition" onClick={()=>logout()}>
            <IoIosLogOut className="text-xl" />
            <span className="hidden sm:inline text-sm">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAppNavbar;

{
  /* <div className="shadow-xs w-full z-50 lg:px-20 mx-4 lg:pt-1 flex sticky lg:top-0 bg-white  items-center justify-between  mb-6 p-2 py-3 transition-shadow ">



</div> */
}
