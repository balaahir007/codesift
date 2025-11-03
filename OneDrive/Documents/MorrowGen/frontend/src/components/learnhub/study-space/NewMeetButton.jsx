import React from 'react';
import { FaDesktop } from 'react-icons/fa'; // screen share icon

const NewMeetButton = ({shareScreen}) => {
  return (
    <div onClick={shareScreen} className="flex items-center gap-1 bg-backGray h-7 px-2 rounded-md text-xs text-gray-700 cursor-pointer hover:bg-gray-200 transition">
      <FaDesktop className="text-sm" />
      <span className="font-semibold">New Meet</span>
    </div>
  );
};

export default NewMeetButton;
