import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FiSettings, FiLogOut, FiBell, FiMoreVertical } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiUserPlus } from "react-icons/bi";
import { FiAlertCircle, FiBookOpen } from "react-icons/fi";
import { MdOutlinePayment } from "react-icons/md";
import { FaCertificate } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

export const notifications = [
  {
    id: 1,
    message: "New User Registered",
    description: "John Doe just created an account",
    time: "2 mins ago",
    icon: <BiUserPlus className="text-xl text-primary" />,
    unread: true
  },
  {
    id: 2,
    message: "5 New Course Enrollments",
    description: "React Masterclass is trending",
    time: "10 mins ago",
    icon: <FiBookOpen className="text-xl text-secondary" />,
    unread: true
  },
  {
    id: 3,
    message: "System Maintenance Scheduled",
    description: "Planned downtime at 2:00 AM",
    time: "1 hour ago",
    icon: <FiAlertCircle className="text-xl text-amber-500" />,
    unread: false
  },
  {
    id: 4,
    message: "Payment Received",
    description: "$299 for React Course",
    time: "Today",
    icon: <MdOutlinePayment className="text-xl text-purple-500" />,
    unread: false
  },
  {
    id: 5,
    message: "Certificate Issued",
    description: "Python Course completion",
    time: "Yesterday",
    icon: <FaCertificate className="text-xl text-orange-500" />,
    unread: false
  }
];

export const profileMenuItems = [
  {
    id: 1,
    label: "My Profile",
    icon: <CgProfile className="text-lg text-primary" />,
    onClick: () => console.log("Go to profile"),
    danger: false,
  },
  {
    id: 2,
    label: "Settings",
    icon: <FiSettings className="text-lg text-primary" />,
    onClick: () => console.log("Open settings"),
    danger: false,
  },
  {
    id: 3,
    label: "Logout",
    icon: <FiLogOut className="text-lg text-red-500" />,
    onClick: () => console.log("Logout user"),
    danger: true,
  },
];

const AdminNavbar = ({ onMenuClick }) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className='bg-white border-b border-gray-200 px-4 lg:px-6 py-4'>
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
        
        {/* Left Section - Search */}
        <div className='flex items-center gap-4 flex-1 max-w-2xl'>
          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button 
              onClick={onMenuClick}
              className='p-2 text-gray-600 hover:bg-primary100 rounded-lg transition-colors'
            >
              <HiOutlineMenuAlt3 className='text-xl' />
            </button>
          </div>
          
          {/* Search Bar */}
          <div className={`relative flex-1 max-w-md transition-all duration-300 ${
            searchFocused ? 'transform scale-105' : ''
          }`}>
            <input
              type="text"
              className='w-full pl-11 pr-4 py-2.5 border border-gray-200 outline-none bg-white text-sm rounded-xl focus:border-primary focus:ring-2 focus:ring-primary100 transition-all duration-200'
              placeholder='Search users, courses, reports...'
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <IoSearch className={`absolute top-1/2 left-4 transform -translate-y-1/2 text-lg transition-colors duration-200 ${
              searchFocused ? 'text-primary' : 'text-gray-400'
            }`} />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className='flex items-center gap-3'>
          
          {/* Notifications */}
          <div className='relative'>
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
              }}
              className='relative p-3 text-gray-600 hover:bg-primary100 rounded-xl transition-all duration-200 group'
            >
              <IoMdNotificationsOutline className='text-xl group-hover:text-primary transition-colors' />
              {unreadCount > 0 && (
                <div className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center'>
                  <span className='text-xs text-white font-medium'>{unreadCount}</span>
                </div>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className='absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden'>
                <div className="p-4 border-b border-gray-100 bg-primary100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="max-h-96 overflow-y-auto scrollBarHide">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-start gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 ${
                        item.unread ? 'border-l-primary bg-primary100/20' : 'border-l-transparent'
                      }`}
                    >
                      <div className="flex-shrink-0 mt-1">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm ${item.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                          {item.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                      </div>
                      {item.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="p-3 border-t border-gray-100 bg-gray-50">
                  <button className="w-full text-center text-sm text-primary hover:text-secondary font-medium">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className='relative'>
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationsOpen(false);
              }}
              className='flex items-center gap-3 p-2 text-gray-600 hover:bg-primary100 rounded-xl transition-all duration-200 group'
            >
              <div className="w-8 h-8 bg-primary100 rounded-full flex items-center justify-center">
                <CgProfile className='text-lg text-primary' />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <FiMoreVertical className="text-sm text-gray-400 group-hover:text-primary transition-colors" />
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className='absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden'>
                <div className="p-3 border-b border-gray-100 bg-primary100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary200 rounded-full flex items-center justify-center">
                      <CgProfile className='text-lg text-primary' />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">Admin User</p>
                      <p className="text-xs text-gray-500">admin@example.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  {profileMenuItems.map(item => (
                    <button
                      key={item.id}
                      onClick={item.onClick}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors ${
                        item.danger ? 'hover:bg-red-50' : ''
                      }`}
                    >
                      {item.icon}
                      <span className={`text-sm ${
                        item.danger ? 'text-red-600 font-medium' : 'text-gray-700'
                      }`}>
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click Outside Handler */}
      {(notificationsOpen || profileOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setNotificationsOpen(false);
            setProfileOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminNavbar;