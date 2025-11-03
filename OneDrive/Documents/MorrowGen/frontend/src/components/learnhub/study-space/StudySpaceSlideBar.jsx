import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FiPlus,
  FiTool,
  FiSettings
} from 'react-icons/fi';
import { RxExit } from 'react-icons/rx';
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdLocalPostOffice,
  MdOutlineNoteAlt,
  MdOutlineCloudUpload,
  MdPeopleOutline,
  MdChatBubbleOutline,
  MdFolderCopy,
  MdAdminPanelSettings
} from 'react-icons/md';
import { PiChalkboardSimpleLight } from 'react-icons/pi';

import useAuthStore from '../../../zustand/auth/useAuthStore';
import useStudySpacesStore from '../../../zustand/studySpaces/useStudySpaceStore';
import StudySpaceSlideBarNewItems from '../../../card/learnhubCards/StudySpaceSlideBarProfileCard';
import Setting from '../../../pages/auth/Setting';

const StudySpaceSlideBar = ({ extendMenu, setExtendMenu, spaceId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [newItemsMenuOpen, setNewItemsMenuOpen] = useState(false);
  const { authUser } = useAuthStore();
  const { exitStudySpace } = useStudySpacesStore();
  const menuRef = useRef(null);

  // Main navigation menu items
  const mainMenuItems = [
    {
      name: 'Posts',
      icon: <MdLocalPostOffice />,
      path: 'posts',
      color: 'blue'
    },
    {
      name: 'Resources',
      icon: <MdFolderCopy />,
      path: 'resource',
      color: 'green'
    },
    {
      name: 'Whiteboard',
      icon: <PiChalkboardSimpleLight />,
      path: 'whiteboard',
      color: 'purple'
    },
    {
      name: 'Create Pool',
      icon: <MdPeopleOutline />,
      path: 'pool',
      color: 'orange',
      adminOnly: true
    },
  ];

  const bottomMenuItems = [

    {
      name: 'Settings',
      icon: <FiSettings />,
      path: 'settings',
      color: 'gray',
      onClick: () => console.log('Settings clicked') // Custom handler
    }
  ];
  const [openSettingModel, setOpenSettingModel] = useState(false)

  const isAdmin = true; // This should come from your auth/role system

  // Handle menu item click
  const handleMenuClick = (itemName) => {
    if (itemName == 'Settings') {
      setOpenSettingModel(true)
    }
  };

  // Handle exit action
  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit this study space?')) {
      exitStudySpace(spaceId);
    }
  };

  // Get color classes for menu items
  const getColorClasses = (color, isActive = false) => {
    const colors = {
      blue: isActive ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100',
      green: isActive ? 'bg-green-500 text-white' : 'bg-green-50 text-green-700 hover:bg-green-100',
      purple: isActive ? 'bg-purple-500 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100',
      orange: isActive ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-700 hover:bg-orange-100',
      indigo: isActive ? 'bg-indigo-500 text-white' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
      gray: isActive ? 'bg-gray-500 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100',
      red: 'bg-red-50 text-red-600 hover:bg-red-100'
    };
    return colors[color] || colors.gray;
  };

  // Handle outside click for new items menu
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setNewItemsMenuOpen(false);
      }
    };

    if (newItemsMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [newItemsMenuOpen]);

  // Auth validation
  if (!authUser || Object.keys(authUser).length === 0) {
    return (
      <div className="w-64 h-full bg-white border-r border-gray-200 flex items-center justify-center">
        <div className="text-center p-4">
          <div className="text-red-500 text-4xl mb-2">⚠️</div>
          <p className="text-gray-600 text-sm">Authentication required</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${extendMenu ? 'w-16' : 'w-64'
        } h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out relative`}
    >
      {/* New Items Menu */}
      {newItemsMenuOpen && (
        <div
          ref={menuRef}
          className={`fixed top-20 ${extendMenu ? 'left-20' : 'left-64'
            } z-50 transition-all duration-300`}
        >
          <StudySpaceSlideBarNewItems
            onCloseMenu={() => setNewItemsMenuOpen(false)}
          />
        </div>
      )}

      {/* Open Settings model */}
      {openSettingModel && (
        <>
        <Setting isOpen={extendMenu} onClose={() => setOpenSettingModel(false)} />
        </>
      
      )}


      {/* Toggle Button */}
      <div className="absolute -right-3 top-4 z-10">
        <button
          onClick={() => setExtendMenu(!extendMenu)}
          className="w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm"
        >
          {extendMenu ? (
            <MdKeyboardDoubleArrowRight className="text-sm" />
          ) : (
            <MdKeyboardDoubleArrowLeft className="text-sm" />
          )}
        </button>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-100">
        <div className={`flex items-center ${extendMenu ? 'justify-center' : 'gap-3'} mb-4`}>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-sm">
              {authUser?.profilePicture ? (
                <img
                  src={authUser.profilePicture}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white text-sm font-semibold">
                  {authUser?.username?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
          </div>

          {!extendMenu && (
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {authUser?.username}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                {authUser?.email?.length > 24
                  ? `${authUser.email.slice(0, 24)}...`
                  : authUser?.email
                }
              </p>
            </div>
          )}
        </div>

        {/* New Button */}
        <button
          onClick={() => setNewItemsMenuOpen(true)}
          className={`flex items-center ${extendMenu
            ? 'justify-center w-10 h-9'
            : 'justify-center gap-2 w-full h-9'
            } bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 rounded-lg text-white font-medium transition-all duration-200 shadow-sm hover:shadow-md text-sm`}
        >
          <FiPlus className="text-sm flex-shrink-0" />
          {!extendMenu && <span>Create New</span>}
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-3 py-4 space-y-2 overflow-y-auto bg-white">
        {mainMenuItems.map((item) => {
          if (item.adminOnly && !isAdmin) return null;

          const isActive = location.pathname.includes(item.path);

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center ${extendMenu ? "justify-center w-11 h-10" : "justify-start gap-3 w-full h-10 px-3"
                } ${isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
                } rounded-lg transition-all duration-200 font-medium text-sm group relative`}
            >
              {/* Icon */}
              <span
                className={`flex-shrink-0 ${isActive ? "text-white" : "text-gray-500 group-hover:text-primary"
                  }`}
              >
                {item.icon}
              </span>

              {/* Label */}
              {!extendMenu && <span className="truncate">{item.name}</span>}

              {/* Tooltip for collapsed menu */}
              {extendMenu && (
                <div className="absolute left-12 bg-gray-800 text-white text-xs rounded-md py-1 px-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-lg">
                  {item.name}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-800"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>


      {/* Bottom Menu Section */}
      <div className="border-t border-gray-200 p-3 space-y-1">
        {/* Section Label */}


        {/* Tools and Settings */}
        {bottomMenuItems.map((item) =>

        (
          <button
            key={item.path}
            onClick={() => handleMenuClick(item.name)}
            className={`flex items-center ${extendMenu
              ? "justify-center w-10 h-9"
              : "justify-start gap-3 w-full h-9 px-3"
              } text-gray-700 hover:bg-gray-100 hover:text-primary rounded-lg transition-all duration-200 font-medium text-sm group relative`}
          >
            {/* Icon */}
            <span className="flex-shrink-0 text-gray-500 group-hover:text-primary">
              {item.icon}
            </span>

            {/* Label */}
            {!extendMenu && <span className="truncate">{item.name}</span>}

            {/* Tooltip for collapsed menu */}
            {extendMenu && (
              <div className="absolute left-12 bg-gray-800 text-white text-xs rounded-md py-1 px-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-lg">
                {item.name}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-800"></div>
              </div>
            )}
          </button>
        ))}

        {/* Exit Button */}
        <button
          onClick={handleExit}
          className={`flex items-center ${extendMenu
            ? "justify-center w-10 h-9"
            : "justify-start gap-3 w-full h-9 px-3"
            } bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 font-medium text-sm group relative mt-2`}
        >
          <RxExit className="flex-shrink-0" />
          {!extendMenu && <span>Exit Space</span>}

          {/* Tooltip for collapsed menu */}
          {extendMenu && (
            <div className="absolute left-12 bg-gray-800 text-white text-xs rounded-md py-1 px-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-lg">
              Exit Space
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-800"></div>
            </div>
          )}
        </button>
      </div>

    </div>
  );
};

export default StudySpaceSlideBar;