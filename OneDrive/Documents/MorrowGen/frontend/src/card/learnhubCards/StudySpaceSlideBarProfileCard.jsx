import React, { useEffect, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import {
  MdOutlineNoteAlt,
  MdFolderCopy,
  MdOutlineCloudUpload,
} from 'react-icons/md';
import StudySpaceUploadPanel from '../../components/learnhub/study-space/StudySpaceUploadPanel';
import useAuthStore from '../../zustand/auth/useAuthStore';

const StudySpaceSlideBarNewItems = ({onCloseMenu }) => {
  const [activeMenu, setActiveMenu] = useState(null)





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
    <div className="bg-white shadow-xl rounded-xl p-4 w-72 border border-gray-100">

      {
        activeMenu && (

          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 study-space-panel">
            <StudySpaceUploadPanel activeMenu={activeMenu} onClose={() => setActiveMenu(false)} />
          </div>
        )
      }


      <ul className="space-y-2">
        {menus.length > 0 && menus.map((menu, index) => (
          <li
            key={index}
            onClick={() => {setActiveMenu(menu.name),onCloseMenu}}
            className="group flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-secondary/10 hover:shadow-md"
          >
            <div className="p-2 bg-secondary/10 rounded-full transition-transform duration-200 group-hover:scale-110 group-hover:bg-secondary/20">
              {React.cloneElement(menu.icon, {
                className: 'text-secondary text-[1.5rem]',
              })}
            </div>
            <div className="flex flex-col">
              <h1 className="font-semibold text-gray-800 group-hover:text-secondary">
                {menu.name}
              </h1>
              <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-150">
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
