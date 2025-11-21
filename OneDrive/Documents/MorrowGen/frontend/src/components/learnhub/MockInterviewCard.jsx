import React from 'react';
import { MdDateRange } from "react-icons/md";
import { IoIosBookmarks } from "react-icons/io";
// import { mockInterviewData } from '../../assets/learnhub/learnhubAssets';
import useThemeStore from '../../zustand/themeStore';

import resumeMock from '../../../public/images/resumeMock.png';
import formMock from '../../../public/images/formMock.png';
const MockInterviewCard = ({ mock = {} }) => {
  const { mode } = useThemeStore()

  const bgPrimary = mode === 'dark' ? 'bg-[#0F1419]' : 'bg-white';
  const bgSecondary = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const bgTertiary = mode === 'dark' ? 'bg-gray-800' : 'bg-gray-50';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const textTertiary = mode === 'dark' ? 'text-gray-500' : 'text-gray-500';
  const borderColor = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]/80' : 'bg-white/80';
  const cardBorder = mode === 'dark' ? 'border-gray-700' : 'border-gray-100';
  const inputBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const inputBorder = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const placeholderColor = mode === 'dark' ? 'placeholder-gray-500' : 'placeholder-gray-400';
  const iconBg = mode === 'dark' ? 'bg-gray-700' : 'bg-gray-100';
  const iconColor = mode === 'dark' ? 'text-gray-500' : 'text-gray-400';
  const emptyIconBg = mode === 'dark' ? 'bg-gray-700' : 'bg-gray-100';





  return (
    <div
      className={`relative border ${cardBorder} rounded-xl ${cardBg} p-5 shadow-[0_2px_6px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-all duration-300`}
    >
      {/* Category Badge */}
      <div className="absolute top-2 right-2 bg-[#00B2A9] text-white text-xs font-semibold px-2 py-1 rounded-bl-lg shadow-sm">
        {mock.type === "form" ? mock.formData?.type || "General" : "Resume"}
      </div>


      {/* Header Section */}
      <div className="flex items-center gap-4 mb-3">
        <img
          src={mock?.type === 'resume' ? resumeMock : formMock}
          alt={mock?.formData?.domain || "Resume"}
          className={`w-14 h-14 rounded-full object-cover border ${borderColor} shadow-sm`}
        />
        <div>
          <h3 className={`text-lg font-semibold ${textPrimary} mt-2`}>
            {mock?.formData?.domain || "Resume"} Mock Interview
          </h3>
          <div className={`flex items-center ${textSecondary} text-sm gap-2 mt-1`}>
            <MdDateRange className="text-base" />
            <span>{mock?.updatedAt}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className={`text-sm ${textSecondary} mb-3 leading-relaxed`}>
        {mock.description || mock.type === "resume"
          ? "This is a resume-based mock interview. Review your skills and prepare accordingly."
          : "This form-based mock interview will test your skills in the selected domain."}
      </p>


      {/* Timer, Level & Questions Section */}
      <div className="flex items-center justify-between mb-3 text-sm font-medium">
        {/* Timer */}
        <div className="flex items-center gap-1">
          <span className={`text-[#00B2A9] font-semibold`}>⏱</span>
          <span className={`${textPrimary}`}>{mock?.formData?.timer || '30 min'}</span>
        </div>

        {/* Level */}
        <div className="flex items-center gap-1">
          <span className={`text-[#00B2A9] font-semibold`}>🎯</span>
          <span className={`${textPrimary}`}>{mock?.formData?.level || 'Beginner'}</span>
        </div>

        {/* Number of Questions */}
        <div className="flex items-center gap-1">
          <span className={`text-[#00B2A9] font-semibold`}>❓</span>
          <span className={`${textPrimary}`}>{mock?.formData?.questionAmount || '10'} Questions</span>
        </div>
      </div>

      {/* Score */}
      {/* <div className={`flex items-center justify-between ${textPrimary} text-sm font-medium mb-3`}>
            <div className="flex items-center gap-1">
              <IoIosBookmarks className={`text-xl text-[#00B2A9]`} />
              {mock.score > 0 ? mock.score : '---'}
              <span className={`ml-1 text-xs ${textTertiary}`}>/100</span>
            </div>
          </div> */}

      {/* Button */}
      <div className="flex justify-end mt-4">
        <button
          className={`px-4 py-1.5 cursor-pointer text-sm font-medium text-[#00B2A9] bg-white border border-[#00B2A9] rounded-md hover:bg-[#00B2A9] hover:text-white transition-all duration-200 shadow-sm ${mode === 'dark' ? 'bg-[#1B2E31] text-[#00B2A9]' : ''}`}
        >
          View Interview
        </button>
      </div>

    </div>
  );
};

export default MockInterviewCard;
