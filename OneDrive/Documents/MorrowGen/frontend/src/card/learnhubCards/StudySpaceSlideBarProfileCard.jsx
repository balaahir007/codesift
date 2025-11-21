
import React, { useEffect, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import {
  MdOutlineNoteAlt,
  MdFolderCopy,
  MdOutlineCloudUpload,
} from 'react-icons/md';
import StudySpaceUploadPanel from '../../components/learnhub/study-space/StudySpaceUploadPanel';
import useAuthStore from '../../zustand/auth/useAuthStore';
import useThemeStore from '../../zustand/themeStore';

const StudySpaceSlideBarNewItems = ({ onCloseMenu }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const { mode } = useThemeStore(); // Get theme mode

  // Theme classes
  const bgCard = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const bgCardHover = mode === 'dark' ? 'hover:bg-[#0097B2]/10' : 'hover:bg-[#0097B2]/10';
  const bgIconBg = mode === 'dark' ? 'bg-[#0097B2]/20' : 'bg-[#0097B2]/10';
  const bgIconHover = mode === 'dark' ? 'group-hover:bg-[#0097B2]/30' : 'group-hover:bg-[#0097B2]/20';
  const iconColor = 'text-[#0097B2]';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-800';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const textHover = mode === 'dark' ? 'group-hover:text-[#0097B2]' : 'group-hover:text-[#0097B2]';
  const borderCard = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-100';
  const shadowClass = 'shadow-xl';

  const menus = [
    {
      name: 'Post',
      icon: <IoCloudUploadOutline className="text-2xl" />,
      description: 'Post updates or announcements.',
    },
    {
      name: 'Note',
      icon: <MdOutlineNoteAlt className="text-2xl" />,
      description: 'Write study notes or ideas.',
    },
    {
      name: 'Resource',
      icon: <MdFolderCopy className="text-2xl" />,
      description: 'Upload files or links.',
    },
    {
      name: 'Project',
      icon: <MdOutlineCloudUpload className="text-2xl" />,
      description: 'Start a new project task.',
    },
  ];

  return (
    <div className={`${bgCard} ${shadowClass} rounded-xl p-3 sm:p-4 w-full sm:w-80 border ${borderCard}`}>
      {activeMenu && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 p-4 study-space-panel">
          <StudySpaceUploadPanel activeMenu={activeMenu} onClose={() => setActiveMenu(null)} />
        </div>
      )}

      <ul className="space-y-2">
        {menus.length > 0 &&
          menus.map((menu, index) => (
            <li
              key={index}
              onClick={() => { setActiveMenu(menu.name), onCloseMenu }}

              className={`group flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${bgCardHover} hover:shadow-md`}
            >
              <div className={`p-2 ${bgIconBg} ${bgIconHover} rounded-full transition-transform duration-200 group-hover:scale-110 flex-shrink-0`}>
                {React.cloneElement(menu.icon, {
                  className: `${iconColor} text-[1.5rem]`,
                })}
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <h1 className={`font-semibold ${textPrimary} ${textHover} transition-colors duration-150 truncate`}>
                  {menu.name}
                </h1>
                <p className={`text-xs sm:text-sm ${textSecondary} group-hover:text-[#0097B2] transition-colors duration-150 line-clamp-2`}>
                  {menu.description}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default StudySpaceSlideBarNewItems;
