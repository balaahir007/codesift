import React from "react";
import { MdGroups } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

const GroupAddIcon = ({ size = 24, color = "#000" }) => {
  return (
    <div className="relative inline-block">
      <MdGroups size={size} color={color} />
      <FaPlus
        size={size / 2}
        color={color}
        className="absolute bottom-0 right-0 bg-white rounded-full p-[2px]"
      />
    </div>
  );
};


export default GroupAddIcon;
