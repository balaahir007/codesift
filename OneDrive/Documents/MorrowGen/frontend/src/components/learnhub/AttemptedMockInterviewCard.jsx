import React from 'react';
import { MdDateRange } from "react-icons/md";
import { IoIosBookmarks } from "react-icons/io";
import { mockInterviewData } from '../../assets/learnhub/learnhubAssets';
import useThemeStore from '../../zustand/themeStore';

const AttemptedMockInterviewCard = () => {
    const {mode} = useThemeStore()

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
    <div className={`mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-3 max-w-6xl `}>
      {mockInterviewData?.length > 0 && mockInterviewData.map((interview, index) => (
        <div
          key={index}
          className={`relative border ${cardBorder} rounded-xl ${cardBg} p-5 shadow-[0_2px_6px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-all duration-300`}
        >
          {/* Category Badge */}
          <div className="absolute top-2 right-2 bg-[#00B2A9] text-white text-xs font-semibold px-2 py-1 rounded-bl-lg shadow-sm">
            {interview.category}
          </div>

          {/* Header Section */}
          <div className="flex items-center gap-4 mb-3">
            <img
              src={interview.mainImage}
              alt={interview.title}
              className={`w-14 h-14 rounded-full object-cover border ${borderColor} shadow-sm`}
            />
            <div>
              <h3 className={`text-lg font-semibold ${textPrimary} mt-2`}>
                {interview.title}
              </h3>
              <div className={`flex items-center ${textSecondary} text-sm gap-1 mt-1`}>
                <MdDateRange className="text-base" />
                <span>{interview.attemptedDate}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className={`text-sm ${textSecondary} mb-3 leading-relaxed`}>
            {interview.description}
          </p>

          {/* Score */}
          <div className={`flex items-center justify-between ${textPrimary} text-sm font-medium mb-3`}>
            <div className="flex items-center gap-1">
              <IoIosBookmarks className={`text-xl text-[#00B2A9]`} />
              {interview.score > 0 ? interview.score : '---'}
              <span className={`ml-1 text-xs ${textTertiary}`}>/100</span>
            </div>
          </div>

          {/* Thumbnail & Button */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              {interview.thumbnailImages?.map((thumbnail, index) => (
                <img
                  key={index}
                  src={thumbnail}
                  alt={`thumb-${index}`}
                  className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0 object-cover shadow-sm"
                />
              ))}
            </div>
            <button
              className={`px-4 py-1.5 cursor-pointer text-sm font-medium text-[#00B2A9] bg-white border border-[#00B2A9] rounded-md hover:bg-[#00B2A9] hover:text-white transition-all duration-200 shadow-sm ${mode === 'dark' ? 'bg-[#1B2E31] text-[#00B2A9]' : ''}`}
            >
              View Interview
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttemptedMockInterviewCard;
