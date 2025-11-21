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
import useThemeStore from "../zustand/themeStore";

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
    { text: "Hackathons", link: "/hackathons" },
    { text: "Learnhub", link: "/learnhub" },
    { text: "StudySpace", link: "/study-space" },
    ...(isUserAdmin ? [{ text: "Admin Panel", link: "/admin-panel" }] : [])
  ];

  const mobileMenuList = [
    {
      heading: "Career Opportunities",
      items: [
        { link: "/jobs", text: "Jobs" },
        { link: "/hackathons", text: "Hackathons" },
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

  const handleHostNavigation = () => {
    if (!authUser?.id) {
      navigate('/login')
    }
  }

  return (
    <nav className={`${isVisible ? 'translate-0' : 'translate-full'} fixed w-full top-0 ${navBg} backdrop-blur-md z-50 border-b ${borderColor} shadow-sm`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 py-4.5 sm:py-3 gap-2 sm:gap-3 md:gap-4">
        {/* Left - Logo & Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3 relative flex-shrink-0">
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
          </Link>
        </div>

        {/* Center Menu */}
        {!searchMenuOpen && (
          <div className="hidden md:flex gap-2 lg:gap-4 xl:gap-6 flex-1 justify-center overflow-x- scrollbar-hide">
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

            <HostButton mode={mode} />

            <button
              onClick={toggleTheme}
              className={`p-1.5 sm:p-2 rounded-md ${hoverBg} transition-colors duration-200 flex-shrink-0`}
              aria-label="Toggle theme"
            >
              {mode === 'dark' ? (
                <MdLightMode className={`text-xl sm:text-2xl ${textPrimary}`} />
              ) : (
                <MdDarkMode className={`text-xl sm:text-2xl ${textPrimary}`} />
              )}
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



      {/* Profile Dialog */}
      {profileOpen && (
        <>
          <div className="fixed  inset-0 z-40"  />
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
          className={`fixed inset-0 top-0 left-0 w-[85vw] sm:w-72 h-screen ${modalBg} backdrop-blur-md shadow-xl z-50 p-4 sm:p-6 overflow-y-auto`}
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
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

export function HostButton({ mode }) {
  const hostMenu = [
    {
      label: "Jobs & Internship",
      desc: "Hire the right talent for your company",
      icon: <FaBriefcase className="text-[#0097B2] text-lg sm:text-xl" />,
    },
    {
      label: "Hackathons",
      desc: "Host coding challenges & innovation events",
      icon: <FaUsers className="text-[#00B2A9] text-lg sm:text-xl" />,
    },
    {
      label: "AI Interview",
      desc: "Add AI interview for your candidates",
      icon: <FaRobot className="text-[#0097B2] text-lg sm:text-xl" />,
    },
  ];

  const [hostModelOpen, setHostModelOpen] = useState(false);


  const modalRef = useRef();

  // Theme-based classes
  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const hoverBg = mode === 'dark' ? 'hover:bg-[#0F1E20]' : 'hover:bg-gradient-to-r hover:from-[#0097B2]/5 hover:to-[#00B2A9]/5';
  const iconBg = mode === 'dark' ? 'bg-[#294B4E]' : 'bg-[#E0F2F5]';

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
  <div className="relative">
  {/* Host Button */}
  <button
    onClick={() => setHostModelOpen(!hostModelOpen)}
    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#0097B2] text-[#0097B2] text-sm font-medium hover:border-[#00B2A9] hover:text-[#00B2A9] hover:scale-[1.03] transition-all duration-300 shadow-sm"
  >
    <FaPlus className="text-sm" />
    <span>Host</span>
  </button>

  {/* Dropdown Modal */}
  {hostModelOpen && (
    <div className="absolute right-0 mt-3 w-72 sm:w-80 md:w-96 z-50">
      <div
        ref={modalRef}
        className={`${cardBg} border ${borderColor} rounded-2xl shadow-2xl p-5 animate-fadeIn`}
      >
        {/* Menu Items */}
        <div className="flex flex-col gap-3">
          {hostMenu.map(({ label, desc, icon }, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-4 p-3 rounded-xl border ${borderColor} 
              hover:border-[#00B2A9] hover:shadow-md ${hoverBg} 
              transition-all duration-300 cursor-pointer group`}
            >
              {/* Icon */}
              <div
                className={`flex-shrink-0 p-3 rounded-full ${iconBg} group-hover:bg-[#00B2A9]/10 flex items-center justify-center`}
              >
                {icon}
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <h3 className={`text-sm font-semibold ${textPrimary} mb-1`}>
                  {label}
                </h3>
                <p className={`text-xs ${textSecondary} leading-relaxed`}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}
</div>

  );
}

export default Navbar;