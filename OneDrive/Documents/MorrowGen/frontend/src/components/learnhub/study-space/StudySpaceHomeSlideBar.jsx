import React, { useState, useEffect } from 'react';
import { MdOutlineSpaceDashboard, MdExplore, MdClose, MdMenu } from 'react-icons/md';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import useThemeStore from '../../../zustand/themeStore';

const StudySpaceHomeSlideBar = ({ setSection, section }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {mode,toggleTheme} = useThemeStore()
 

  // Apply theme to document
  useEffect(() => {
    if (mode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [mode]);

  const closeSidebar = () => setIsOpen(false);

  // Theme colors
  const bgClass = mode ? 'bg-[#0A1215]' : 'bg-white';
  const textClass = mode ? 'text-gray-100' : 'text-gray-800';
  const borderClass = mode ? 'border-[#294B4E]' : 'border-gray-200';
  const hoverBgClass = mode ? 'hover:bg-gradient-to-r hover:from-[#0097B2]/10 hover:to-[#00B2A9]/10' : 'hover:bg-gradient-to-r hover:from-[#0097B2]/10 hover:to-[#00B2A9]/10';
  const shadowClass = mode ? 'shadow-2xl' : 'shadow-lg';
  const dividerClass = mode ? 'border-[#1B2E31]' : 'border-gray-100';

  const activeBgClass = mode 
    ? 'bg-gradient-to-r from-[#0097B2]/20 to-[#00B2A9]/20 text-[#0097B2] border-[#0097B2]/30' 
    : 'bg-gradient-to-r from-[#0097B2]/20 to-[#00B2A9]/20 text-[#0097B2] border-[#0097B2]/30';

  const inactiveBgClass = mode 
    ? 'text-gray-300 border-transparent' 
    : 'text-gray-700 border-transparent';

  const tipBgClass = mode
    ? 'bg-gradient-to-br from-[#00B2A9]/10 to-[#0097B2]/10 border-[#294B4E]'
    : 'bg-gradient-to-br from-[#00B2A9]/10 to-[#0097B2]/10 border-gray-200';

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isOpen ? <MdClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="lg:hidden fixed inset-0 bg-black/40 z-30 transition-all duration-300"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-backGray ${textClass} ${shadowClass} overflow-y-auto transition-all duration-300 z-50 lg:z-auto lg:relative lg:shadow-lg
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className={`p-4 sm:p-6 border-b ${borderClass}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#0097B2] to-[#00B2A9] bg-clip-text text-transparent truncate">
                StudySpace
              </h2>
              <p className={`${mode ? 'text-gray-500' : 'text-gray-500'} text-xs truncate`}>
                Learn Together
              </p>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={closeSidebar}
              className="lg:hidden p-1 hover:bg-gray-200 dark:hover:bg-[#1B2E31] rounded-lg transition-colors"
            >
              <MdClose className="text-xl" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 sm:p-6 space-y-4">
          <nav className="space-y-2">
            {/* My Spaces */}
            <button
              onClick={() => {
                setSection('my-spaces');
                closeSidebar();
              }}
              className={`w-full flex items-center gap-3 px-3 sm:px-4 py-3 rounded-xl border transition-all cursor-pointer text-left
                ${
                  section === 'my-spaces'
                    ? activeBgClass
                    : `${inactiveBgClass} ${hoverBgClass}`
                }`}
            >
              <MdOutlineSpaceDashboard className="text-lg flex-shrink-0" />
              <span className="hidden sm:inline truncate">My Spaces</span>
              <span className="sm:hidden truncate">Spaces</span>
            </button>

            {/* Explore Spaces */}
            <button
              onClick={() => {
                setSection('explore-spaces');
                closeSidebar();
              }}
              className={`w-full flex items-center gap-3 px-3 sm:px-4 py-3 rounded-xl border transition-all cursor-pointer text-left
                ${
                  section === 'explore-spaces'
                    ? activeBgClass
                    : `${inactiveBgClass} ${hoverBgClass}`
                }`}
            >
              <MdExplore className="text-lg text-[#0097B2] flex-shrink-0" />
              <span className="hidden sm:inline truncate">Explore</span>
              <span className="sm:hidden truncate">Explore</span>
            </button>
          </nav>

          {/* Divider */}
          <div className={`h-px bg-gradient-to-r from-transparent via-${mode ? '[#294B4E]' : 'gray-200'} to-transparent`} />

          {/* Pro Tip */}
          <div className={`p-3 sm:p-4 ${tipBgClass} rounded-xl border`}>
            <h3 className="text-[#00B2A9] font-semibold mb-2 text-sm sm:text-base">
              💡 Pro Tip
            </h3>
            <p className={`${mode ? 'text-gray-400' : 'text-gray-600'} text-xs sm:text-sm leading-relaxed`}>
              Join active study sessions to boost your learning!
            </p>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center gap-3 px-3 sm:px-4 py-3 rounded-xl border transition-all cursor-pointer text-left ${mode ? 'bg-[#1B2E31]/50 border-[#294B4E] hover:bg-[#1B2E31]/80' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
          >
            {mode ? (
              <>
                <MdLightMode className="text-lg text-yellow-400 flex-shrink-0" />
                <span className="hidden sm:inline truncate text-sm">Light Mode</span>
                <span className="sm:hidden truncate text-sm">Light</span>
              </>
            ) : (
              <>
                <MdDarkMode className="text-lg text-indigo-600 flex-shrink-0" />
                <span className="hidden sm:inline truncate text-sm">Dark Mode</span>
                <span className="sm:hidden truncate text-sm">Dark</span>
              </>
            )}
          </button>

          {/* User Stats */}
          <div className={`mt-6 pt-4 space-y-2 border-t ${borderClass}`}>
            <div className="flex justify-between items-center px-2 text-xs sm:text-sm">
              <span className={mode ? 'text-gray-400' : 'text-gray-600'}>Active Spaces</span>
              <span className="font-semibold text-[#0097B2]">0</span>
            </div>
            <div className="flex justify-between items-center px-2 text-xs sm:text-sm">
              <span className={mode ? 'text-gray-400' : 'text-gray-600'}>Total Members</span>
              <span className="font-semibold text-[#00B2A9]">0</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudySpaceHomeSlideBar;