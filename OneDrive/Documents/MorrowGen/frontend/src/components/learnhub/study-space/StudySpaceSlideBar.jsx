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
import useThemeStore from '../../../zustand/themeStore';

const StudySpaceSlideBar = ({ extendMenu, setExtendMenu, spaceId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [newItemsMenuOpen, setNewItemsMenuOpen] = useState(false);
  const { authUser } = useAuthStore();
  const { exitStudySpace } = useStudySpacesStore();
  const { mode } = useThemeStore(); // Get theme mode
  const menuRef = useRef(null);

  // Theme classes
  const bgSidebar = mode === 'dark' ? 'bg-[#0A1215]' : 'bg-white';
  const borderSidebar = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const hoverBg = mode === 'dark' ? 'hover:bg-[#1B2E31]' : 'hover:bg-gray-100';
  const hoverText = mode === 'dark' ? 'hover:text-[#0097B2]' : 'hover:text-primary';
  const bgHover = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50';
  const toggleBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const toggleBorder = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const toggleHover = mode === 'dark' ? 'hover:bg-[#0F1E20]' : 'hover:bg-gray-50';
  const scrollBg = mode === 'dark' ? 'bg-[#0A1215]' : 'bg-white';
  const tooltipBg = mode === 'dark' ? 'bg-gray-900' : 'bg-gray-800';
  const tooltipBorder = mode === 'dark' ? 'border-gray-900' : 'border-gray-800';
  const authErrorBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const authErrorText = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const accentBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-100';

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
      blue: isActive
        ? 'bg-blue-500 text-white'
        : mode === 'dark'
          ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
          : 'bg-blue-50 text-blue-700 hover:bg-blue-100',
      green: isActive
        ? 'bg-green-500 text-white'
        : mode === 'dark'
          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
          : 'bg-green-50 text-green-700 hover:bg-green-100',
      purple: isActive
        ? 'bg-purple-500 text-white'
        : mode === 'dark'
          ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
          : 'bg-purple-50 text-purple-700 hover:bg-purple-100',
      orange: isActive
        ? 'bg-orange-500 text-white'
        : mode === 'dark'
          ? 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30'
          : 'bg-orange-50 text-orange-700 hover:bg-orange-100',
      indigo: isActive
        ? 'bg-indigo-500 text-white'
        : mode === 'dark'
          ? 'bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30'
          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
      gray: isActive
        ? 'bg-gray-500 text-white'
        : mode === 'dark'
          ? 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
          : 'bg-gray-50 text-gray-700 hover:bg-gray-100',
      red: mode === 'dark' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-red-50 text-red-600 hover:bg-red-100'
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
      <div className={`w-64 h-full bg-backGray  border-r ${borderSidebar} flex items-center justify-center`}>
        <div className="text-center p-4">
          <div className={`text-red-500 text-4xl mb-2 ${authErrorBg}`}>⚠️</div>
          <p className={`${authErrorText} text-sm`}>Authentication required</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${extendMenu ? 'w-16' : 'w-64'
        } h-full   flex flex-col transition-all duration-300 ease-in-out relative bg-backGray`}
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
          className={`w-6 h-6 ${toggleBg} border ${toggleBorder} rounded-full flex items-center justify-center ${textSecondary} hover:${textPrimary} ${toggleHover} transition-all duration-200 shadow-sm`}
        >
          {extendMenu ? (
            <MdKeyboardDoubleArrowRight className="text-sm" />
          ) : (
            <MdKeyboardDoubleArrowLeft className="text-sm" />
          )}
        </button>
      </div>

      {/* User Profile Section */}
      <div className={`p-4 border-b-1  ${borderSidebar}`}>
        <div className={`flex items-center ${extendMenu ? 'justify-center' : 'gap-3'} mb-4`}>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0097B2] to-[#00B2A9] flex items-center justify-center flex-shrink-0 shadow-sm">
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
              <h3 className={`text-sm font-semibold ${textPrimary} truncate`}>
                {authUser?.username}
              </h3>
              <p className={`text-xs ${textSecondary} truncate`}>
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
            } bg-gradient-to-r from-[#0097B2] to-[#00B2A9] hover:from-[#0097B2]/90 hover:to-[#00B2A9]/90 rounded-lg text-white font-medium transition-all duration-200 shadow-sm hover:shadow-md text-sm`}
        >
          <FiPlus className="text-sm flex-shrink-0" />
          {!extendMenu && <span>Create New</span>}
        </button>
      </div>

      {/* Main Navigation */}
      <div className={`flex-1 px-3 py-4 space-y-2 overflow-y-auto ${mode === "dark"
        ? "bg-backGray border-secondary"
        : "bg-backGray border-[var(--elementBg-light)]"}`}>
        {mainMenuItems.map((item) => {
          if (item.adminOnly && !isAdmin) return null;

          const isActive = location.pathname.includes(item.path);

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center   ${extendMenu ? "justify-center w-11 h-10" : "justify-start gap-3 w-full h-10 px-3"
                } ${isActive
                  ? ` text-white shadow-sm bg-primary`
                  : `${textSecondary} ${hoverBg}`
                } rounded-lg transition-all duration-200 font-medium text-sm group relative`}
            >
              {/* Icon */}
              <span
                className={`flex-shrink-0 ${isActive ? "text-white" : `${textSecondary} ${hoverText}`
                  }`}
              >
                {item.icon}
              </span>

              {/* Label */}
              {!extendMenu && <span className="truncate">{item.name}</span>}

              {/* Tooltip for collapsed menu */}
              {extendMenu && (
                <div className={`absolute left-12 ${tooltipBg} text-white text-xs rounded-md py-1 px-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-lg`}>
                  {item.name}
                  <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0  ${tooltipBorder} `}></div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Menu Section */}
      <div className={`border-t ${borderSidebar} p-3 space-y-1`}>
        {/* Tools and Settings */}
        {bottomMenuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleMenuClick(item.name)}
            className={`flex items-center ${extendMenu
              ? "justify-center w-10 h-9"
              : "justify-start gap-3 w-full h-9 px-3"
              } ${textSecondary} ${hoverBg} ${hoverText} rounded-lg transition-all duration-200 font-medium text-sm group relative`}
          >
            {/* Icon */}
            <span className={`flex-shrink-0 ${textSecondary} ${hoverText}`}>
              {item.icon}
            </span>

            {/* Label */}
            {!extendMenu && <span className="truncate">{item.name}</span>}

            {/* Tooltip for collapsed menu */}
            {extendMenu && (
              <div className={`absolute left-12 ${tooltipBg} text-white text-xs rounded-md py-1 px-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-lg`}>
                {item.name}
                <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent ${tooltipBorder} border-r-gray-800`}></div>
              </div>
            )}
          </button>
        ))}

        {/* Exit Button */}
        <button
          onClick={handleExit}
          className={`flex items-center ${textSecondary}  ${hoverBg} ${extendMenu
            ? "justify-center w-10 h-9"
            : "justify-start gap-3   w-full h-9 px-3"
            } ${mode === "dark"
              ? " "
              : "bg-[#E5FAFB] hover:bg-[#D1F4F5] text-[#007B83]"
            } rounded-lg transition-all duration-200 font-medium text-sm group relative mt-2`}
        >
          <RxExit className="flex-shrink-0" />
          {!extendMenu && <span>Exit Space</span>}

          {extendMenu && (
            <div
              className={`absolute left-12  text-white text-xs rounded-md py-1 px-2  transition-all duration-200 whitespace-nowrap shadow-lg`}
            >
              Exit Space
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-[#0097B2]" />
            </div>
          )}
        </button>

      </div>
    </div>
  );
};

export default StudySpaceSlideBar;