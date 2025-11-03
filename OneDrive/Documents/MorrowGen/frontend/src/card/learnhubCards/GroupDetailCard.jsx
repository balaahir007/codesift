import React from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const GroupDetailCard = ({ group }) => {
  // const groups = [
  //   { title: "Accounting", members: 5, color: "bg-purple-300" },
  //   { title: "Dev Team", members: 12, color: "bg-green-300" },
  //   { title: "Marketing Staff", members: 8, color: "bg-blue-300" },
  //   { title: "Design Team", members: 17, color: "bg-orange-300" },
  // ];

  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6 p-6 max-w-full cursor-pointer">
      <div
      onClick={()=>navigate(`/study-space/${group.id}`)}
        key={group.id}
        className={`relative group rounded-3xl p-6 ${group.theme} flex flex-col justify-between  h-50 overflow-hidden 
                      shadow-md transition-all duration-300 transform hover:scale-[1.03]  hover:shadow-xl`}
      >
        {/* Snake-like SVG path */}
        <svg
          className="absolute left-0 bottom-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="snakeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 
                Q10,80 20,90 
                Q30,100 40,80 
                Q50,60 60,70 
                Q70,80 80,60 
                Q90,40 100,0"
            stroke="url(#snakeGradient)"
            strokeWidth="4"
            fill="none"
          />
        </svg>

        {/* Hover icon slides in */}
        <div
          className="absolute top-3 right-3 opacity-0 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 
                       transition-all duration-300 z-30"
        >
          <FaArrowUpRightFromSquare className="text-white text-lg" />
        </div>

        {/* Content */}
        <div className="z-10 relative">
          <h2 className="font-bold text-lg text-gray-900 drop-shadow">{group.name}</h2>
          {/* <p className="text-sm text-gray-800 drop-shadow-sm">{group.members} members</p> */}
        </div>
      </div>
    </div>
  );
};

export default GroupDetailCard;
