import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaVideo,
  FaUserGraduate,
  FaTachometerAlt,
  FaUser,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaUsers,
  FaMagic,
  FaEllipsisH,
} from "react-icons/fa";
import { MdVoiceChat } from "react-icons/md";
import RefreshModal from "../../card/learnhubCards/RefreshModal";
import { CiSettings } from "react-icons/ci";
import { VscPercentage } from "react-icons/vsc";
import { IoIosHelpCircleOutline } from "react-icons/io";

const SlideMenu = ({ extendMenuOptions, setExtendMenuOptions, isInterviewGoing, isCourseDetailPage, mode = 'dark' }) => {
  const [showModal, setShowModal] = useState(false);
  const [nextLink, setNextLink] = useState("");
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Theme variables
  const navBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const borderColor = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-700';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const hoverBg = mode === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100';
  const buttonBorder = mode === 'dark' ? 'border-gray-600' : 'border-gray-200';
  const inputBg = mode === 'dark' ? 'bg-gray-800' : 'bg-gray-50';
  const inputBorder = mode === 'dark' ? 'border-gray-600' : 'border-gray-300';
  const modalBg = mode === 'dark' ? 'bg-gray-900/95' : 'bg-white/95';
  const overlayBg = mode === 'dark' ? 'bg-black/60' : 'bg-black/40';
  const menuPopupBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const dragHandleBg = mode === 'dark' ? 'bg-gray-600' : 'bg-gray-300';
  const closeButtonBg = mode === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200';
  const cardGradient = mode === 'dark' ? 'from-gray-800 to-gray-700' : 'from-gray-50 to-gray-100';
  const cardHover = mode === 'dark' ? 'hover:from-gray-700 hover:to-gray-600' : 'hover:from-gray-100 hover:to-gray-200';

  // Close more menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showMoreMenu && !e.target.closest('.more-menu-container') && !e.target.closest('.more-button')) {
        setShowMoreMenu(false);
      }
    };

    if (showMoreMenu) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [showMoreMenu]);

  // Handle scroll to show/hide bottom bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down
        setShowBottomBar(false);
        setShowMoreMenu(false);
      } else {
        // Scrolling up
        setShowBottomBar(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const menuItems = [
    { link: "/learnhub/courses", text: "Courses", icon: <FaBookOpen size={20} /> },
    // { link: "/learnhub/course-generation", text: "Builder", icon: <FaMagic size={20} /> },
    { link: "/learnhub/sessions", text: "Sessions", icon: <FaVideo size={20} /> },
    { link: "/learnhub/mentorship", text: "Mentor", icon: <FaUserGraduate size={20} /> },
    { link: "/learnhub/mock-interview", text: "Interview", icon: <MdVoiceChat size={20} /> },
    { link: "/learnhub/dashboard", text: "Dashboard", icon: <FaTachometerAlt size={20} /> },
    { link: "/learnhub/profile", text: "Profile", icon: <FaUser size={20} /> },
  ];

  const bottomMenuItems = [
    { link: "/learnhub/plans", text: "Plans", icon: <VscPercentage size={24} />, bgColor: mode === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50', iconColor: mode === 'dark' ? 'text-purple-400' : 'text-purple-600' },
    { link: "/learnhub/settings", text: "Settings", icon: <CiSettings size={24} />, bgColor: mode === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50', iconColor: mode === 'dark' ? 'text-blue-400' : 'text-blue-600' },
    { link: "/learnhub/help", text: "Help", icon: <IoIosHelpCircleOutline size={24} />, bgColor: mode === 'dark' ? 'bg-green-900/30' : 'bg-green-50', iconColor: mode === 'dark' ? 'text-green-400' : 'text-green-600' },
  ];

  const additionalMenuItems = [
    { link: "/host", text: "Host", icon: <FaUsers size={24} />, bgColor: mode === 'dark' ? 'bg-orange-900/30' : 'bg-orange-50', iconColor: mode === 'dark' ? 'text-orange-400' : 'text-orange-600' },
  ];

  const handleClick = (link) => {
    if (isInterviewGoing) {
      setNextLink(link);
      setShowModal(true);
    } else {
      navigate(link);
    }
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    navigate(nextLink);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex fixed top-0 left-0 pt-18 h-screen z-40 transition-all duration-300
         ${extendMenuOptions ? "w-50" : "w-16"} flex-col justify-between ${navBg} backdrop--md ${textPrimary} ${borderColor} border-r shadow`}
      >
        <div className="flex flex-col flex-1 p-2 space-y-1">
          {menuItems.map(({ link, text, icon }, idx) => {
            const isActive = location.pathname.startsWith(link);
            return (
              <div
                key={idx}
                onClick={() => handleClick(link)}
                className={`flex items-center cursor-pointer rounded-lg px-4 py-2 transition-all duration-200
                   ${isActive
                    ? "bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white font-bold shadow-md"
                    : `${hoverBg} hover:text-[#0097B2] ${textPrimary}`
                  }
                  ${!extendMenuOptions ? "justify-center" : "justify-start space-x-3"}`}
              >
                {icon}
                {extendMenuOptions && <span className="text-[12px]">{text}</span>}
              </div>
            );
          })}
        </div>

        {!isInterviewGoing && !isCourseDetailPage && (
          <div className="p-3 flex justify-center">
            <button
              onClick={() => setExtendMenuOptions(!extendMenuOptions)}
              aria-label={extendMenuOptions ? "Collapse menu" : "Expand menu"}
              className={`p-2 rounded-full ${inputBg} ${textPrimary} hover:bg-gradient-to-r hover:from-[#0097B2] hover:to-[#00B2A9] hover:text-white transition-all duration-200 shadow-sm hover:shadow-md`}
            >
              {extendMenuOptions ? <FaAngleDoubleLeft size={16} /> : <FaAngleDoubleRight size={16} />}
            </button>
          </div>
        )}

        <div className={`flex flex-col p-2 space-y-1 border-t ${borderColor}`}>
          {bottomMenuItems.map(({ link, text, icon }, idx) => {
            const isActive = location.pathname.startsWith(link);
            return (
              <div
                key={idx}
                onClick={() => handleClick(link)}
                className={`flex items-center cursor-pointer rounded-lg px-4 py-2 text-sm transition-all duration-200
                  ${isActive
                    ? `text-[#0097B2] font-semibold bg-[#0097B2]/10 border ${mode === 'dark' ? 'border-[#0097B2]/30' : 'border-[#0097B2]/20'}`
                    : `${textSecondary} hover:text-[#00B2A9] ${mode === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`
                  }
                  ${!extendMenuOptions ? "justify-center" : "justify-start space-x-3"}`}
              >
                {icon}
                {extendMenuOptions && <span className="text-[12px]">{text}</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div 
        className={`block md:hidden fixed bottom-0 left-0 right-0 z-[9999] ${navBg} ${mode === 'dark' ? 'border-t-2 border-gray-700' : 'border-t-2 border-gray-300'} ${mode === 'dark' ? 'shadow-[0_-2px_10px_rgba(0,0,0,0.5)]' : 'shadow-[0_-2px_10px_rgba(0,0,0,0.1)]'} transition-transform duration-300 ${showBottomBar ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex justify-around items-center px-1 py-3 max-w-screen-xl mx-auto">
          {menuItems.slice(0, 5).map(({ link, text, icon }, idx) => {
            const isActive = location.pathname.startsWith(link);
            return (
              <div
                key={idx}
                onClick={() => handleClick(link)}
                className={`flex flex-col items-center justify-center cursor-pointer px-2 py-1 rounded-lg transition-all duration-200 flex-1 max-w-[70px]
                  ${isActive
                    ? "text-[#0097B2] font-bold"
                    : `${textSecondary} active:text-[#00B2A9]`
                  }`}
              >
                <div className={`mb-1 ${isActive ? "scale-110" : ""} transition-transform`}>
                  {icon}
                </div>
                <span className="text-[9px] text-center leading-tight whitespace-nowrap overflow-hidden text-ellipsis w-full">
                  {text}
                </span>
              </div>
            );
          })}
          
          {/* More Button */}
          <div
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`more-button flex flex-col items-center justify-center cursor-pointer px-2 py-1 rounded-lg transition-all duration-200 flex-1 max-w-[70px] ${showMoreMenu ? 'text-[#0097B2] font-bold' : `${textSecondary} active:text-[#00B2A9]`}`}
          >
            <div className="mb-1">
              <FaEllipsisH size={20} />
            </div>
            <span className="text-[9px] text-center leading-tight">More</span>
          </div>
        </div>

        {/* Enhanced More Menu Popup */}
        {showMoreMenu && (
          <>
            {/* Animated Overlay */}
            <div 
              className={`fixed inset-0 ${overlayBg} backdrop-blur-sm z-[9998] animate-fadeIn`}
              onClick={() => setShowMoreMenu(false)}
              style={{
                animation: 'fadeIn 0.2s ease-out'
              }}
            />
            
            {/* Modal Container with Slide Up Animation */}
            <div 
              className={`more-menu-container absolute bottom-full left-0 right-0 ${menuPopupBg} z-[9999] rounded-t-3xl shadow-2xl mb-0 max-h-[75vh] overflow-hidden`}
              style={{
                animation: 'slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {/* Drag Indicator & Header */}
              <div className={`sticky top-0 ${mode === 'dark' ? 'bg-gradient-to-b from-[#1B2E31] to-[#1B2E31]/95' : 'bg-gradient-to-b from-white to-white/95'} backdrop-blur-md z-10 ${mode === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-100'}`}>
                {/* Drag Handle */}
                <div className="flex justify-center pt-3 pb-2">
                  <div className={`w-12 h-1.5 ${dragHandleBg} rounded-full`}></div>
                </div>
                
                {/* Header with Close Button */}
                <div className="flex items-center justify-between px-5 pb-4">
                  <div>
                    <h3 className={`text-lg font-bold ${mode === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>More Options</h3>
                    <p className={`text-xs ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-0.5`}>Explore all features</p>
                  </div>
                  <button
                    onClick={() => setShowMoreMenu(false)}
                    className={`w-9 h-9 flex items-center justify-center rounded-full ${closeButtonBg} active:scale-95 transition-all`}
                    aria-label="Close menu"
                  >
                    <svg className={`w-5 h-5 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto max-h-[calc(75vh-80px)] px-5 pb-6">
                {/* All Menu Items in Single Grid */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {/* Main Menu Items */}
                  {menuItems.slice(5).map(({ link, text, icon }, idx) => {
                    const isActive = location.pathname.startsWith(link);
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          handleClick(link);
                          setShowMoreMenu(false);
                        }}
                        className={`flex flex-col items-center justify-center cursor-pointer rounded-2xl p-4 transition-all duration-200 min-h-[95px] active:scale-95 shadow-sm
                          ${isActive
                            ? "bg-gradient-to-br from-[#0097B2] to-[#00B2A9] text-white shadow-lg shadow-[#0097B2]/30"
                            : `bg-gradient-to-br ${cardGradient} ${mode === 'dark' ? 'text-gray-200' : 'text-gray-700'} ${cardHover}`
                          }`}
                        style={{
                          animation: `fadeInUp 0.3s ease-out ${idx * 0.05}s both`
                        }}
                      >
                        <div className={`mb-2 text-2xl transition-transform ${isActive ? "scale-110" : ""}`}>
                          {icon}
                        </div>
                        <span className={`text-[11px] text-center leading-tight font-medium ${isActive ? "font-semibold" : ""}`}>
                          {text}
                        </span>
                      </div>
                    );
                  })}
                  
                  {/* Bottom Menu Items */}
                  {bottomMenuItems.map(({ link, text, icon, bgColor, iconColor }, idx) => {
                    const isActive = location.pathname.startsWith(link);
                    const animationIdx = menuItems.slice(5).length + idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          handleClick(link);
                          setShowMoreMenu(false);
                        }}
                        className={`flex flex-col items-center justify-center cursor-pointer rounded-2xl p-4 transition-all duration-200 min-h-[95px] active:scale-95 shadow-sm
                          ${isActive
                            ? `${bgColor} border-2 ${iconColor.replace('text-', 'border-')} shadow-md`
                            : `${bgColor} hover:shadow-md`
                          }`}
                        style={{
                          animation: `fadeInUp 0.3s ease-out ${animationIdx * 0.05}s both`
                        }}
                      >
                        <div className={`mb-2 text-2xl ${iconColor} transition-transform ${isActive ? "scale-110" : ""}`}>
                          {icon}
                        </div>
                        <span className={`text-[11px] text-center leading-tight font-medium ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'} ${isActive ? "font-semibold" : ""}`}>
                          {text}
                        </span>
                      </div>
                    );
                  })}

                  {/* Additional Menu Items */}
                  {additionalMenuItems.map(({ link, text, icon, bgColor, iconColor }, idx) => {
                    const isActive = location.pathname.startsWith(link);
                    const animationIdx = menuItems.slice(5).length + bottomMenuItems.length + idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          handleClick(link);
                          setShowMoreMenu(false);
                        }}
                        className={`flex flex-col items-center justify-center cursor-pointer rounded-2xl p-4 transition-all duration-200 min-h-[95px] active:scale-95 shadow-sm
                          ${isActive
                            ? `${bgColor} border-2 ${iconColor.replace('text-', 'border-')} shadow-md`
                            : `${bgColor} hover:shadow-md`
                          }`}
                        style={{
                          animation: `fadeInUp 0.3s ease-out ${animationIdx * 0.05}s both`
                        }}
                      >
                        <div className={`mb-2 text-2xl ${iconColor} transition-transform ${isActive ? "scale-110" : ""}`}>
                          {icon}
                        </div>
                        <span className={`text-[11px] text-center leading-tight font-medium ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'} ${isActive ? "font-semibold" : ""}`}>
                          {text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }

              @keyframes slideUp {
                from {
                  transform: translateY(100%);
                }
                to {
                  transform: translateY(0);
                }
              }

              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
          </>
        )}
      </div>

      {showModal && (
        <RefreshModal
          onClose={() => setShowModal(false)}
          onConfirm={handleModalConfirm}
          message="Are you sure you want to leave this page? Your progress may be lost."
        />
      )}
    </>
  );
};

export default SlideMenu;