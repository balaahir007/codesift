import React from "react";
import { MdDashboard, MdMenuBook, MdSchool, MdSettings, MdHelpOutline } from "react-icons/md";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaUsers } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import useThemeStore from "../../zustand/themeStore";
import { useLocation, useNavigate } from "react-router-dom";
import { GiRocket } from "react-icons/gi"; // rocket icon (for hackathon theme)

const TeacherSlideBar = ({ extendMenu, setExtendMenu }) => {
  const { mode } = useThemeStore();
  const location = useLocation();
  const navigate = useNavigate();

  const menus = [
  { label: "dashboard", icon: <MdDashboard className="text-xl" />, title: "Dashboard", path: "dashboard" },
  { label: "study-space", icon: <MdMenuBook className="text-xl" />, title: "StudySpace", path: "study-space" },
{ label: "hackathon", icon: <GiRocket className="text-xl " />, title: "Hackathon", path: "hackathon" },
  { label: "students", icon: <FaUsers className="text-xl" />, title: "Students", path: "students" },
  { label: "settings", icon: <MdSettings className="text-xl" />, title: "Settings", path: "settings" },
  { label: "help", icon: <MdHelpOutline className="text-xl" />, title: "Help", path: "help" },
];

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked");
  };

  const handleMenuClick = (path) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      setExtendMenu(false);
    }
  };

  return (
    <>
      {extendMenu && (
        <div
          className="fixed inset-0 bg-black/80 bg-opacity-50 z-40 md:hidden"
          onClick={() => setExtendMenu(false)}
        />
      )}

        <aside
        className={`transition-all duration-300 shadow-lg border-r flex flex-col justify-between
        fixed md:relative inset-y-0 left-0 z-50
        ${extendMenu ? "translate-x-0" : "-translate-x-full md:translate-x-0"} 
        ${extendMenu ? "w-60" : "md:w-20 w-60"} 
        ${mode === "dark" ? "bg-backGray border-secondary" : "bg-backGray border-[var(--elementBg-light)]"}`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end p-3 md:hidden">
          <button
            onClick={() => setExtendMenu(false)}
            className={`p-2 rounded-md ${mode === "dark"
                ? "text-gray-300 hover:bg-[var(--elementBg-hover-dark)]"
                : "text-gray-700 hover:bg-[var(--elementBg-hover-light)]"
              }`}
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Menu Items */}
        <div className={`flex flex-col gap-2 p-3 ${extendMenu ? '' : 'items-center '}flex-1 overflow-y-auto`}>
          {menus.map((menu, index) => {
            const activeMenu = location.pathname.includes(menu.label);
            const postPage = location.pathname.includes('post')
            return (
              <button
                key={index}
                onClick={() => handleMenuClick(menu.path)}
                className={`flex items-center gap-3 rounded-md p-2 transition-colors duration-200
                ${mode === "dark"
                    ? `text-gray-300 hover:bg-[var(--elementBg-hover-dark)] ${!postPage && activeMenu ? 'bg-[var(--elementBg-dark)]' : ''}`
                    : `text-gray-700 hover:bg-[var(--elementBg-hover-light)] ${!postPage && activeMenu ? 'bg-[var(--elementBg-light)]' : ''}`}
                `}
              >
                <span className="flex-shrink-0">{menu.icon}</span>
                <span className={`text-sm font-medium whitespace-nowrap ${extendMenu ? 'block' : 'md:hidden block'}`}>
                  {menu.title}
                </span>
              </button>
            );
          })}
        </div>
        <div className="p-3 flex justify-center">
          <button
            onClick={() => setExtendMenu(!extendMenu)}
            aria-label={extendMenu ? "Collapse menu" : "Expand menu"}
            className={`p-2 rounded-full   ${mode === "dark"
                ? "text-white bg-[var(--elementBg-hover-dark)]"
                : "text-black bg-[var(--elementBg-hover-light)]"
              } transition-all duration-200 shadow-sm hover:shadow-md`}
          >
            {extendMenu ? <FaAngleDoubleLeft size={16} /> : <FaAngleDoubleRight size={16} />}
          </button>
        </div>
        <div className={`p-3 ${extendMenu ? '' : 'mx-auto'} `}>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 rounded-md p-2 transition-colors duration-200 w-full
              ${mode === "dark"
                ? "text-gray-300 hover:bg-[var(--elementBg-hover-dark)]"
                : "text-gray-700 hover:bg-[var(--elementBg-hover-light)]"}
            `}
          >
            <CiLogout className="text-xl flex-shrink-0" />
            <span className={`text-sm font-medium whitespace-nowrap ${extendMenu ? 'block' : 'md:hidden block'}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default TeacherSlideBar;