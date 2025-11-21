import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import useThemeStore from "../../../zustand/themeStore";

const PostCardSkeleton = ({ mode }) => {
  // Using your exact CSS variables
  const bgCard = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-[#FFFFFF]'; // tertiary : backGray
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-[#CCCCCC]'; // skeleton : skeleton-border
  const borderLight = mode === 'dark' ? 'border-[#102226]' : 'border-[#F2F2F2]'; // backGray : tertiary
  const inputBg = mode === 'dark' ? 'bg-[#102226]' : 'bg-[#F2F2F2]'; // backGray : tertiary
  const buttonBg = mode === 'dark' ? 'bg-[#00B2A9]' : 'bg-[#0097B2]'; // primary : primary
  const likedBg = mode === 'dark' ? 'bg-[#2D4F50]' : 'bg-[#E0F2F5]'; // primary100 : primary100
  const skeletonBg = mode === 'dark' ? 'bg-[#294B4E]' : 'bg-[#D9D9D9]'; // skeleton : skeleton
  
  const shimmerColor = mode === 'dark' ? 'via-[#3A6467]/50' : 'via-[#CCCCCC]/50'; // primary200 : skeleton-border
  const shimmerColorBlue = mode === 'dark' ? 'via-[#00B2A9]/50' : 'via-[#B3E0E9]/50'; // primary : primary200
  const shimmerColorLight = mode === 'dark' ? 'via-white/10' : 'via-white/60';
  const shimmerColorButton = mode === 'dark' ? 'via-[#00B2A9]/70' : 'via-[#0097B2]/70'; // primary : primary

  return (
    <div className={`${bgCard} rounded-lg shadow-sm border ${borderColor} mb-4 w-full mx-auto overflow-hidden transition-colors duration-300`}>
      {/* Header */}
      <div className="p-3 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2 flex-1">
            {/* Avatar skeleton */}
            <div className={`relative w-10 h-10 rounded-full ${likedBg} overflow-hidden flex-shrink-0`}>
              <div className={`absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent ${shimmerColorBlue} to-transparent will-change-transform`}></div>
            </div>

            <div className="flex-1 min-w-0 space-y-1.5">
              <div className={`relative h-3 ${likedBg} rounded w-28 overflow-hidden`}>
                <div className={`absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent ${shimmerColorBlue} to-transparent will-change-transform`}></div>
              </div>
              <div className={`relative h-2.5 ${inputBg} rounded w-20 overflow-hidden`}>
                <div className={`absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent ${shimmerColor} to-transparent will-change-transform`}></div>
              </div>
              <div className={`relative h-2.5 ${inputBg} rounded w-16 overflow-hidden`}>
                <div className={`absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent ${shimmerColor} to-transparent will-change-transform`}></div>
              </div>
            </div>
          </div>
          <div className={`relative w-4 h-4 ${inputBg} rounded overflow-hidden flex-shrink-0`}>
            <div className={`absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent ${shimmerColor} to-transparent will-change-transform`}></div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="px-3 pb-2 space-y-1.5">
        <div className={`relative h-3 ${inputBg} rounded w-full overflow-hidden`}>
          <div className={`absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent ${shimmerColor} to-transparent will-change-transform`}></div>
        </div>
        <div className={`relative h-3 ${inputBg} rounded w-4/5 overflow-hidden`}>
          <div className={`absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent ${shimmerColor} to-transparent will-change-transform`}></div>
        </div>
      </div>

      {/* Image skeleton */}
      <div className="px-3 pb-2">
        <div className={`relative rounded-lg overflow-hidden h-48 sm:h-56 md:h-64 ${
          mode === 'dark' 
            ? 'bg-gradient-to-br from-[#2D4F50] via-[#3A6467] to-[#2D4F50]' 
            : 'bg-gradient-to-br from-[#E0F2F5] via-[#B3E0E9] to-[#E0F2F5]'
        }`}>
          <div className={`absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent ${shimmerColorLight} to-transparent will-change-transform`}></div>
        </div>
      </div>

      {/* Stats skeleton */}
      <div className={`px-3 py-1.5 border-b ${borderLight} flex justify-between`}>
        <div className="flex items-center space-x-2">
          <div className={`relative w-14 h-3 ${skeletonBg} rounded overflow-hidden`}>
            <div className={`absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent ${shimmerColor} to-transparent will-change-transform`}></div>
          </div>
        </div>
        <div className="flex space-x-3">
          <div className={`relative w-16 h-3 ${skeletonBg} rounded overflow-hidden`}>
            <div className={`absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent ${shimmerColor} to-transparent will-change-transform`}></div>
          </div>
        </div>
      </div>

      {/* Action buttons skeleton */}
      <div className="px-3 py-2">
        <div className="flex items-center justify-around gap-1">
          <div className={`relative flex items-center space-x-1 px-3 py-1.5 ${likedBg} rounded-md overflow-hidden`}>
            <div className="w-12 h-5"></div>
            <div className={`absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent ${shimmerColorBlue} to-transparent will-change-transform`}></div>
          </div>
          <div className={`relative flex items-center space-x-1 px-3 py-1.5 ${likedBg} rounded-md overflow-hidden`}>
            <div className="w-16 h-5"></div>
            <div className={`absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent ${shimmerColorBlue} to-transparent will-change-transform`}></div>
          </div>
          <div className={`relative flex items-center space-x-1 px-3 py-1.5 ${likedBg} rounded-md overflow-hidden`}>
            <div className="w-12 h-5"></div>
            <div className={`absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent ${shimmerColorBlue} to-transparent will-change-transform`}></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

const SkeletonDemo = () => {
  const {mode} = useThemeStore()

  const bgPage = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gradient-to-br from-gray-50 to-blue-50/30';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';

  return (
    <div className={`min-h-screen  py-8 overflow-x-hidden transition-colors duration-300`}>


      <div className="max-w-2xl mx-auto space-y-4 px-4 overflow-x-hidden">
        <PostCardSkeleton mode={mode} />
        <PostCardSkeleton mode={mode} />
        <PostCardSkeleton mode={mode} />
      </div>
    </div>
  );
};

export default SkeletonDemo;