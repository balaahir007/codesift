import React from "react";
import { CgProfile } from "react-icons/cg";
import {
    FaCheckCircle,
    FaCompass,
    FaQuestionCircle,
    FaSignOutAlt,
} from "react-icons/fa";
import useAuthStore from "../../../zustand/auth/useAuthStore";
import { useNavigate } from "react-router-dom";


const ProfileDialogBox = React.forwardRef(({ user = { name: "Balaji", progress: 70 } }, ref) => {
    const { logout,authUser } = useAuthStore()
    const menuItems = [
        { label: "My Profile", icon: <CgProfile className="text-base text-primary" /> },
        { label: "Explore More", icon: <FaCompass className="text-base text-primary" /> },
        { label: "FAQs", icon: <FaQuestionCircle className="text-base text-primary" /> },
        { label: "Logout", icon: <FaSignOutAlt  className="text-base text-primary" /> },
    ];
    const navigate= useNavigate()
    const handleLogout = async ()=>{
        await logout()
        navigate('/login')
    }



    return (
        <div
            ref={ref}
            className="absolute top-14 right-0 w-80 bg-white shadow-2xl rounded-2xl border border-gray-200 z-50 p-4"
        >
            {/* Profile Box */}
            <div className="flex flex-col items-center text-center gap-3 pb-4 border-b">
                <div className="relative w-20 h-20">
                    <div className="w-full h-full rounded-full border-4 border-white shadow-md bg-primary flex items-center justify-center">
                        <img src={authUser?.profilePicture} className="rounded-full"/>
                    </div>
                </div>

                {/* User Info */}
                <div>
                    <h2 className="text-lg font-semibold">{user.name}</h2>
                    <p className="text-primary text-sm cursor-pointer hover:underline">
                        View & Update Profile
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${user.progress}%` }}
                        ></div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{user.progress}% Complete</div>
                </div>
            </div>

            {/* Performance Card */}
            <div className="mt-4 bg-gry-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Profile Performance
                </h3>

                {/* Performance Status List */}
                <ul className="text-sm text-gray-600 space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        Resume Updated
                    </li>
                    <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        Skills Added
                    </li>
                    <li className="flex items-center gap-2">
                        <FaCheckCircle className="text-gray-400" />
                        Profile Summary Missing
                    </li>
                </ul>

                {/* Menu Options */}
       <div className="mt-4 grid grid-cols-2 gap-x-4 -ml-2 gap-y-2">
  {menuItems.map((item, index) => {
    const isLogoutOption = item.label === 'Logout';

    return (
      <div
        key={index}
        onClick={() => {
          if (isLogoutOption) handleLogout();
        }}
        className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-50 cursor-pointer"
      >
        <span className="text-lg text-primary">{item.icon}</span>
        <span className="text-xs font-medium text-gray-700">
          {item.label}
        </span>
      </div>
    );
  })}
</div>
  
            </div>
        </div>
    );
});

export default ProfileDialogBox;
