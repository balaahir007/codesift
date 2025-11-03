import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMenuOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../zustand/auth/useAuthStore";
import ProfileDialogBox from "../components/opportuneSpace/jobs/ProfileDialogBox";
import { IoMdClose } from "react-icons/io";
import SearchCard from "../components/opportuneSpace/jobs/SearchCard";
import useMeetStore from "../zustand/studySpaces/useMeetStore";
import { toast } from "react-toastify";
import { FaBriefcase, FaRobot, FaUsers } from "react-icons/fa";

import { FaPlus } from "react-icons/fa";


const Navbar = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const isUserAdmin = authUser?.role === 'admin';

  const [hostModelOpen, setHostModelOpen] = useState(false)

  const homeMenuList = [
    { text: "Jobs", link: "/jobs" },
    // { text: "Companies", link: "/companies" },
    { text: "Hackathons", link: "/hackathons" },
    { text: "Learnhub", link: "/learnhub" },
    { text: "StudySpace", link: "/study-space" },
    ...(isUserAdmin
      ? [{ text: "Admin Panel", link: "/admin-panel" }]
      : [])
  ];



  const mobileMenuList = [
    {
      heading: "Career Opportunities",
      items: [
        { link: "/jobs", text: "Jobs" },
        { link: "/hackathons", text: "Hackathons" },
        // { link: "/companies-list", text: "Companies" },
      ],
    },
    {
      heading: "Learning & Development",
      items: [
        { link: "/learnhub/courses", text: "Courses" },
        { link: "/learnhub/sessions", text: "Sessions" },
        { link: "/learnhub/menterShip", text: "MenterShip" },
        { link: "/learnhub/mock-interview", text: "Mock Interview" },
      ],
    },
    {
      heading: "My Dashboard",
      items: [
        { link: "/dashboard", text: "Dashboard" },
        { link: "/profile", text: "Profile" },
      ],
    },
  ];
  const { meetState } = useMeetStore();

  useEffect(() => {
    if (meetState.isLoading) {
      toast.loading("Creating meet...", { id: "meet-loader" });
    } else {
      toast.dismiss("meet-loader"); // remove loader if finished
    }

    if (meetState.errorMsg) {
      toast.error(meetState.errorMsg);
    }
  }, [meetState.isLoading, meetState.errorMsg]);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current?.contains(e.target) ||
        profileRef.current?.contains(e.target)
      )
        return;

      setMenuOpen(false);
      setProfileOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <nav className="fixed w-full top-0 bg-white darbg-gray-900/95 backdrop-blur-md z-50 border-b border-gray-200 darborder-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3 gap-4 flex-wrap">

        {/* Left - Logo & Mobile Menu (Always Visible) */}
        <div className="flex items-center gap-3 relative" >
          {!searchMenuOpen && (
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
              aria-label="Open menu"
            >
              <IoMenuOutline className="text-2xl text-gray-700" />
            </button>
          )}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
          >
            <img
              src="/logo.png"   // make sure logo.png is inside public/
              alt="MorrowGen Logo"
              className="h-8 w-auto object-contain"
            />

          </Link>


        </div>

        {/* Center Menu (Hidden When Search Active) */}
        {!searchMenuOpen && (
          <div className="hidden md:flex gap-2 md:gap-4 lg:gap-6 flex-1 justify-center">
            {homeMenuList.map((menu, i) => {
              const isActive = location.pathname === menu.link;
              return (
                <Link
                  to={menu.link}
                  key={i}
                  className={`text-[12px] text-nowrap font-medium transition-colors duration-200 hover:text-[#0097B2] darhover:text-[#00B2A9] relative ${isActive ? "text-[#0097B2] dartext-[#00B2A9] font-semibold" : "text-gray-600 dartext-gray-400"
                    }`}
                >
                  {menu.text}
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>
        )}

        {!searchMenuOpen && (
          <div className="flex items-center gap-4 justify-end flex-1">
            {/* <div className="relative hidden sm:block w-56">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-300 darborder-gray-600 bg-gray-50 darbg-gray-800 text-sm text-gray-900 dartext-gray-100 focus:outline-none focus:border-[#0097B2] darfocus:border-[#00B2A9] focus:bg-white darfocus:bg-gray-900 transition-all duration-200 hover:border-[#00B2A9]/50 darhover:border-[#00B2A9]/50"
                onClick={() => setSearchMenuOpen(true)}
              />
              <FiSearch className="absolute right-3 top-2.5 text-gray-600 dartext-gray-400" size={18} />
            </div> */}

            <button
              onClick={() => setHostModelOpen(!hostModelOpen)}
              className=" hidden md:flex items-center gap-2 px-2 lg:px-4 py-2 rounded-full border-2 border-[#0097B2] text-[#0097B2] font-medium 
        hover:border-[#00B2A9] hover:text-[#00B2A9] hover:scale-[1.03] transition-all duration-300 shadow-sm"
            >
              <FaPlus className="text-sm lg:text-md" />
              <p className="hidden lg:flex">Host</p>
            </button>



            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <MdLightMode className="text-2xl text-gray-700" /> : <MdDarkMode className="text-2xl text-gray-700" />}
            </button>

            {authUser ? (
              <button
                onClick={() => setProfileOpen(true)}
                className="flex items-center gap-2 rounded-full px-2 py-1 border border-gray-200 darborder-gray-600 hover:border-[#00B2A9]/50 hover:bg-gray-50 darhover:bg-gray-800 transition-all duration-200 focus:outline-none"
                aria-label="User Profile"
              >
                <HiMiniBars3CenterLeft className="text-xl text-gray-700" />
                <div className="w-8 h-8 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] rounded-full flex items-center justify-center">
                  <CgProfile className="text-2xl text-white" />
                </div>
              </button>
            ) : (
              <div className="flex gap-2 text-sm">
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-1 rounded-md text-[#0097B2] dartext-[#00B2A9] border border-[#0097B2] darborder-[#00B2A9] hover:bg-[#0097B2] darhover:bg-[#00B2A9] hover:text-white transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-1 rounded-md bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white hover:from-[#007A94] hover:to-[#009490] darhover:from-[#00B2A9] darhover:to-[#0097B2] transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {
        hostModelOpen && (
          <div className='fixed inset-0 z-40 '>
              <HostButton setHostModelOpen={setHostModelOpen} hostModelOpen={hostModelOpen} />
          </div>
        )
      }

      {/* Search Card Dropdown
      {searchMenuOpen && location.pathname.includes('') && (
        <div className="absolute top-full left-0 w-full bg-white/95 darbg-gray-900/95 backdrop-blur-md shadow-lg z-40 border-b border-gray-200 darborder-gray-700">
          <SearchCard searchMenuOpen={searchMenuOpen} setSearchMenuOpen={setSearchMenuOpen} />
        </div>
      )} */}

      {/* Profile Dialog */}
      {profileOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
          <ProfileDialogBox
            ref={profileRef}
            isOpen={profileOpen}
            onClose={() => setProfileOpen(false)}
          />
        </>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 top-0 left-0 w-72 h-screen bg-white/95  backdrop-blur-md shadow-xl z-50 p-6 overflow-y-auto  "
        >

          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="text-lg font-bold hover:opacity-80 transition-opacity duration-200"
              onClick={() => setMenuOpen(false)}
            >
              <span className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] bg-clip-text text-transparent">
                LearnVerse
              </span>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 darhover:bg-gray-800 transition-colors duration-200"
              aria-label="Close menu"
            >
              <IoMdClose className="text-2xl text-gray-800 dartext-gray-200" />
            </button>
          </div>

          {mobileMenuList.map((menu, idx) => (
            <div key={idx} className="mb-6">
              <h2 className="text-gray-700 dartext-gray-300 font-semibold mb-3 text-sm uppercase tracking-wide">
                {menu.heading}
              </h2>
              <ul>
                {menu.items.map((item, i) => (
                  <li key={i}>
                    <button
                      onClick={() => {
                        navigate(item.link);
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-gradient-to-r hover:from-[#0097B2]/10 hover:to-[#00B2A9]/10 hover:text-[#0097B2] darhover:text-[#00B2A9] transition-all duration-200 text-gray-700 dartext-gray-300 border border-transparent hover:border-[#00B2A9]/20"
                    >
                      {item.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div
            onClick={() => {
              navigate("/admin-panel");
              setMenuOpen(false);
            }}
            className="mt-6 inline-block w-full text-center px-4 py-2 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white font-semibold rounded-md hover:from-[#007A94] hover:to-[#009490] darhover:from-[#00B2A9] darhover:to-[#0097B2] transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg"
          >
            Admin Page
          </div>
        </div>
      )}
    </nav>
  );
};



export function HostButton({ setHostModelOpen, hostModelOpen }) {
  const hostMenu = [
    {
      label: "Jobs & Internship",
      desc: "Hire the right talent for your company",
      icon: <FaBriefcase className="text-[#0097B2] text-xl" />,
    },
    {
      label: "Hackathons",
      desc: "Host coding challenges & innovation events",
      icon: <FaUsers className="text-[#00B2A9] text-xl" />,
    },
    {
      label: "AI Interview",
      desc: "Add AI interview for your candidates",
      icon: <FaRobot className="text-[#0097B2] text-xl" />,
    },
  ];

  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setHostModelOpen(false);
      }
    };
    if (hostModelOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [hostModelOpen, setHostModelOpen]);

  return (
    <div className="relative ">


      {/* Modal */}
        <div className=" absolute top-14 right-0  flex items-center justify-center z-50 px-4">
          <div
            ref={modalRef}
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-fadeIn"
          >
       

            {/* Menu Items - Row Layout */}
            <div className="flex flex-col gap-3">
              {hostMenu.map(({ label, desc, icon }, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#00B2A9] 
                  hover:shadow-md hover:bg-gradient-to-r hover:from-[#0097B2]/5 hover:to-[#00B2A9]/5
                  transition-all duration-300 cursor-pointer group"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 p-3 rounded-full bg-[#E0F2F5] group-hover:bg-[#00B2A9]/10 transition-colors">
                    {icon}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 mb-1">
                      {label}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}

export default Navbar;
