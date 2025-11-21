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
<<<<<<< HEAD
import { FaPlus } from "react-icons/fa";
import useThemeStore from "../zustand/themeStore";
=======

import { FaPlus } from "react-icons/fa";

>>>>>>> e1bb11e (update some Ui)

const Navbar = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const isUserAdmin = authUser?.role === 'admin';

<<<<<<< HEAD
  const [hostModelOpen, setHostModelOpen] = useState(false);

  const { toggleTheme, mode } = useThemeStore();

  // Theme-based classes
  const navBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const borderColor = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-700';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const hoverBg = mode === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100';
  const buttonBorder = mode === 'dark' ? 'border-gray-600' : 'border-gray-200';
  const inputBg = mode === 'dark' ? 'bg-gray-800' : 'bg-gray-50';
  const inputBorder = mode === 'dark' ? 'border-gray-600' : 'border-gray-300';
  const modalBg = mode === 'dark' ? 'bg-gray-900/95' : 'bg-white/95';

  const homeMenuList = [
    { text: "Jobs", link: "/jobs" },
=======
  const [hostModelOpen, setHostModelOpen] = useState(false)

  const homeMenuList = [
    { text: "Jobs", link: "/jobs" },
    // { text: "Companies", link: "/companies" },
>>>>>>> e1bb11e (update some Ui)
    { text: "Hackathons", link: "/hackathons" },
    { text: "Learnhub", link: "/learnhub" },
    { text: "StudySpace", link: "/study-space" },
    ...(isUserAdmin ? [{ text: "Admin Panel", link: "/admin-panel" }] : [])
  ];

<<<<<<< HEAD
=======


>>>>>>> e1bb11e (update some Ui)
  const mobileMenuList = [
    {
      heading: "Career Opportunities",
      items: [
        { link: "/jobs", text: "Jobs" },
        { link: "/hackathons", text: "Hackathons" },
<<<<<<< HEAD
=======
        // { link: "/companies-list", text: "Companies" },
>>>>>>> e1bb11e (update some Ui)
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
<<<<<<< HEAD

=======
>>>>>>> e1bb11e (update some Ui)
  const { meetState } = useMeetStore();

  useEffect(() => {
    if (meetState.isLoading) {
      toast.loading("Creating meet...", { id: "meet-loader" });
    } else {
      toast.dismiss("meet-loader");
    }

    if (meetState.errorMsg) {
      toast.error(meetState.errorMsg);
    }
  }, [meetState.isLoading, meetState.errorMsg]);


  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;

  //     // Show navbar when at top (within 50px)
  //     if (currentScrollY < 50) {
  //       setIsVisible(true);
  //       setLastScrollY(currentScrollY);
  //       return;
  //     }

  //     if (currentScrollY > lastScrollY) {
  //       setIsVisible(false);
  //     } else {
  //       setIsVisible(true);
  //     }

  //     setLastScrollY(currentScrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [lastScrollY]);

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

  return (
<<<<<<< HEAD
    <nav className={`${isVisible ? 'translate-0' : 'translate-full'} fixed w-full top-0 ${navBg} backdrop-blur-md z-50 border-b ${borderColor} shadow-sm`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 py-4.5 sm:py-3 gap-2 sm:gap-3 md:gap-4">
        {/* Left - Logo & Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3 relative flex-shrink-0">
=======
    <nav className="fixed w-full top-0 bg-white darbg-gray-900/95 backdrop-blur-md z-50 border-b border-gray-200 darborder-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3 gap-4 flex-wrap">

        {/* Left - Logo & Mobile Menu (Always Visible) */}
        <div className="flex items-center gap-3 relative" >
>>>>>>> e1bb11e (update some Ui)
          {!searchMenuOpen && (
            <button
              onClick={() => setMenuOpen(true)}
              className={`md:hidden p-1.5 sm:p-2 rounded-md ${hoverBg} transition-colors duration-200`}
              aria-label="Open menu"
            >
              <IoMenuOutline className={`text-xl sm:text-2xl ${textPrimary}`} />
            </button>
          )}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
          >
            <img
              src="/logo.png"
              alt="MorrowGen Logo"
              className="h-6 sm:h-7 md:h-8 w-auto object-contain"
            />
<<<<<<< HEAD
=======

>>>>>>> e1bb11e (update some Ui)
          </Link>
        </div>

        {/* Center Menu */}
        {!searchMenuOpen && (
<<<<<<< HEAD
          <div className="hidden md:flex gap-2 lg:gap-4 xl:gap-6 flex-1 justify-center overflow-x- scrollbar-hide">
=======
          <div className="hidden md:flex gap-2 md:gap-4 lg:gap-6 flex-1 justify-center">
>>>>>>> e1bb11e (update some Ui)
            {homeMenuList.map((menu, i) => {
              const isActive = location.pathname === menu.link;
              return (
                <Link
                  to={menu.link}
                  key={i}
                  className={`text-xs lg:text-sm text-nowrap font-medium transition-colors duration-200 hover:text-[#0097B2] relative whitespace-nowrap px-1 ${isActive
                      ? "text-[#0097B2] font-semibold"
                      : textSecondary
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
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 justify-end flex-shrink-0">
            <button
              onClick={() => setHostModelOpen(!hostModelOpen)}
              className="hidden sm:flex items-center gap-1 md:gap-2 px-2 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-full border-2 border-[#0097B2] text-[#0097B2] text-xs md:text-sm font-medium hover:border-[#00B2A9] hover:text-[#00B2A9] hover:scale-[1.03] transition-all duration-300 shadow-sm whitespace-nowrap"
            >
              <FaPlus className="text-xs md:text-sm" />
              <p className="hidden lg:flex">Host</p>
            </button>

            <button
<<<<<<< HEAD
=======
              onClick={() => setHostModelOpen(!hostModelOpen)}
              className=" hidden md:flex items-center gap-2 px-2 lg:px-4 py-2 rounded-full border-2 border-[#0097B2] text-[#0097B2] font-medium 
        hover:border-[#00B2A9] hover:text-[#00B2A9] hover:scale-[1.03] transition-all duration-300 shadow-sm"
            >
              <FaPlus className="text-sm lg:text-md" />
              <p className="hidden lg:flex">Host</p>
            </button>



            <button
>>>>>>> e1bb11e (update some Ui)
              onClick={toggleTheme}
              className={`p-1.5 sm:p-2 rounded-md ${hoverBg} transition-colors duration-200 flex-shrink-0`}
              aria-label="Toggle theme"
            >
<<<<<<< HEAD
              {mode === 'dark' ? (
                <MdLightMode className={`text-xl sm:text-2xl ${textPrimary}`} />
              ) : (
                <MdDarkMode className={`text-xl sm:text-2xl ${textPrimary}`} />
              )}
=======
              {isDarkMode ? <MdLightMode className="text-2xl text-gray-700" /> : <MdDarkMode className="text-2xl text-gray-700" />}
>>>>>>> e1bb11e (update some Ui)
            </button>

            {authUser ? (
              <button
                onClick={() => setProfileOpen(true)}
                className={`flex items-center gap-1 sm:gap-2 rounded-full px-1.5 sm:px-2 py-1 border ${buttonBorder} hover:border-[#00B2A9]/50 ${hoverBg} transition-all duration-200 focus:outline-none flex-shrink-0`}
                aria-label="User Profile"
              >
                <HiMiniBars3CenterLeft className={`text-lg sm:text-xl ${textPrimary}`} />
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] rounded-full flex items-center justify-center flex-shrink-0">
                  <CgProfile className="text-lg sm:text-2xl text-white" />
                </div>
              </button>
            ) : (
              <div className="flex gap-1.5 sm:gap-2 text-xs sm:text-sm flex-shrink-0">
                <button
                  onClick={() => navigate("/login")}
                  className="px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-md text-[#0097B2] border border-[#0097B2] hover:bg-[#0097B2] hover:text-white transition-all duration-200 whitespace-nowrap"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-md bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white hover:from-[#007A94] hover:to-[#009490] transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        )}
      </div>

<<<<<<< HEAD
      {/* Mobile Host Button - Only visible on small screens */}
      <div className="hidden  justify-center pb-2 px-3">
        <button
          onClick={() => setHostModelOpen(!hostModelOpen)}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-[#0097B2] text-[#0097B2] text-sm font-medium hover:border-[#00B2A9] hover:text-[#00B2A9] transition-all duration-300 shadow-sm w-full justify-center"
        >
          <FaPlus className="text-sm" />
          <span>Host</span>
        </button>
      </div>

      {hostModelOpen && (
        <div className='fixed inset-0 z-40'>
          <HostButton setHostModelOpen={setHostModelOpen} hostModelOpen={hostModelOpen} mode={mode} />
=======
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
>>>>>>> e1bb11e (update some Ui)
        </div>
      )}

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
<<<<<<< HEAD
          className={`fixed inset-0 top-0 left-0 w-[85vw] sm:w-72 h-screen ${modalBg} backdrop-blur-md shadow-xl z-50 p-4 sm:p-6 overflow-y-auto`}
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
=======
          className="fixed inset-0 top-0 left-0 w-72 h-screen bg-white/95  backdrop-blur-md shadow-xl z-50 p-6 overflow-y-auto  "
        >

          <div className="flex items-center justify-between mb-6">
>>>>>>> e1bb11e (update some Ui)
            <Link
              to="/"
              className="text-base sm:text-lg font-bold hover:opacity-80 transition-opacity duration-200"
              onClick={() => setMenuOpen(false)}
            >
              <span className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] bg-clip-text text-transparent">
                LearnVerse
              </span>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className={`p-1.5 sm:p-2 rounded-md ${hoverBg} transition-colors duration-200`}
              aria-label="Close menu"
            >
              <IoMdClose className={`text-xl sm:text-2xl ${textPrimary}`} />
            </button>
          </div>

          {mobileMenuList.map((menu, idx) => (
            <div key={idx} className="mb-4 sm:mb-6">
              <h2 className={`${textSecondary} font-semibold mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wide`}>
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
                      className={`w-full text-left px-2.5 sm:px-3 py-2 rounded-md hover:bg-gradient-to-r hover:from-[#0097B2]/10 hover:to-[#00B2A9]/10 hover:text-[#0097B2] transition-all duration-200 ${textSecondary} border border-transparent hover:border-[#00B2A9]/20 text-sm sm:text-base`}
                    >
                      {item.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {isUserAdmin && (
            <div
              onClick={() => {
                navigate("/admin-panel");
                setMenuOpen(false);
              }}
              className="mt-4 sm:mt-6 inline-block w-full text-center px-4 py-2 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white font-semibold rounded-md hover:from-[#007A94] hover:to-[#009490] transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              Admin Page
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

<<<<<<< HEAD
export function HostButton({ setHostModelOpen, hostModelOpen, mode }) {
=======


export function HostButton({ setHostModelOpen, hostModelOpen }) {
>>>>>>> e1bb11e (update some Ui)
  const hostMenu = [
    {
      label: "Jobs & Internship",
      desc: "Hire the right talent for your company",
<<<<<<< HEAD
      icon: <FaBriefcase className="text-[#0097B2] text-lg sm:text-xl" />,
=======
      icon: <FaBriefcase className="text-[#0097B2] text-xl" />,
>>>>>>> e1bb11e (update some Ui)
    },
    {
      label: "Hackathons",
      desc: "Host coding challenges & innovation events",
<<<<<<< HEAD
      icon: <FaUsers className="text-[#00B2A9] text-lg sm:text-xl" />,
=======
      icon: <FaUsers className="text-[#00B2A9] text-xl" />,
>>>>>>> e1bb11e (update some Ui)
    },
    {
      label: "AI Interview",
      desc: "Add AI interview for your candidates",
<<<<<<< HEAD
      icon: <FaRobot className="text-[#0097B2] text-lg sm:text-xl" />,
=======
      icon: <FaRobot className="text-[#0097B2] text-xl" />,
>>>>>>> e1bb11e (update some Ui)
    },
  ];

  const modalRef = useRef();

<<<<<<< HEAD
  // Theme-based classes
  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const hoverBg = mode === 'dark' ? 'hover:bg-[#0F1E20]' : 'hover:bg-gradient-to-r hover:from-[#0097B2]/5 hover:to-[#00B2A9]/5';
  const iconBg = mode === 'dark' ? 'bg-[#294B4E]' : 'bg-[#E0F2F5]';

=======
>>>>>>> e1bb11e (update some Ui)
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
<<<<<<< HEAD
    <div className="relative">
      <div className="absolute top-12 sm:top-14 right-2 sm:right-4 md:right-0 flex items-center justify-center z-50 px-2 sm:px-4 w-full max-w-[calc(100vw-16px)] sm:max-w-none">
        <div
          ref={modalRef}
          className={`${cardBg} w-full sm:max-w-md rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 relative animate-fadeIn`}
        >
          {/* Menu Items */}
          <div className="flex flex-col gap-2 sm:gap-3">
            {hostMenu.map(({ label, desc, icon }, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl border ${borderColor} hover:border-[#00B2A9] hover:shadow-md ${hoverBg} transition-all duration-300 cursor-pointer group`}
              >
                {/* Icon */}
                <div className={`flex-shrink-0 p-2 sm:p-3 rounded-full ${iconBg} group-hover:bg-[#00B2A9]/10 transition-colors`}>
                  {icon}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <h3 className={`text-xs sm:text-sm font-semibold ${textPrimary} mb-0.5 sm:mb-1`}>
                    {label}
                  </h3>
                  <p className={`text-[10px] sm:text-xs ${textSecondary} leading-relaxed`}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
=======
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
>>>>>>> e1bb11e (update some Ui)
    </div>
  );
}

<<<<<<< HEAD
export default Navbar;
=======
export default Navbar;
>>>>>>> e1bb11e (update some Ui)
