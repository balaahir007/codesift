import React from 'react';
import { MdOutlineSpaceDashboard, MdExplore } from 'react-icons/md';

const StudySpaceHomeSlideBar = ({ setSection, section }) => {
  return (
    <div className="h-full w-64 fixed top-0 left-0 bg-white text-gray-800 shadow-lg overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#0097B2] to-[#00B2A9] bg-clip-text text-transparent">
              StudySpace
            </h2>
            <p className="text-gray-500 text-xs">Learn Together</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6">
        <nav className="space-y-2">
          {/* My Spaces */}
          <div
            onClick={() => setSection('my-spaces')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all cursor-pointer 
              ${
                section === 'my-spaces'
                  ? 'bg-gradient-to-r from-[#0097B2]/20 to-[#00B2A9]/20 text-[#0097B2] border-[#0097B2]/30'
                  : 'hover:bg-gradient-to-r hover:from-[#0097B2]/10 hover:to-[#00B2A9]/10 text-gray-700 border-transparent hover:border-[#0097B2]/30'
              }`}
          >
            <MdOutlineSpaceDashboard className="text-lg" />
            My Spaces
          </div>

          {/* Explore Spaces */}
          <div
            onClick={() => setSection('explore-spaces')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all cursor-pointer 
              ${
                section === 'explore-spaces'
                  ? 'bg-gradient-to-r from-[#0097B2]/20 to-[#00B2A9]/20 text-[#0097B2] border-[#0097B2]/30'
                  : 'hover:bg-gradient-to-r hover:from-[#0097B2]/10 hover:to-[#00B2A9]/10 text-gray-700 border-transparent hover:border-[#0097B2]/30'
              }`}
          >
            <MdExplore className="text-lg text-[#0097B2]" />
            Explore Spaces
          </div>
        </nav>

        {/* Pro Tip */}
        <div className="mt-8 p-4 bg-gradient-to-br from-[#00B2A9]/10 to-[#0097B2]/10 rounded-xl border border-gray-200">
          <h3 className="text-[#00B2A9] font-semibold mb-2">Pro Tip</h3>
          <p className="text-gray-500 text-sm">
            Join active study sessions to boost your learning!
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudySpaceHomeSlideBar;
