
import React from 'react';

const MockInterviewCardSkeleton = ({ mode = 'light' }) => {
  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]/80' : 'bg-white/80';
  const cardBorder = mode === 'dark' ? 'border-gray-700' : 'border-gray-100';
  const shimmerBg = mode === 'dark' ? 'bg-gray-700' : 'bg-gray-200';
  const shimmerHighlight = mode === 'dark' 
    ? 'via-gray-600' 
    : 'via-gray-100';

  return (
    <div
      className={`relative border ${cardBorder} rounded-xl ${cardBg} p-5 shadow-[0_2px_6px_rgba(0,0,0,0.05)] transition-all duration-300`}
    >
      {/* Category Badge Skeleton */}
      <div className={`absolute top-2 right-2 h-6 w-20 ${shimmerBg} mb-4 rounded-bl-lg animate-pulse`}></div>

      {/* Header Section */}
      <div className="flex items-center gap-4 mb-3">
        {/* Avatar Skeleton */}
        <div className={`w-14 h-14 rounded-full ${shimmerBg} animate-pulse`}></div>
        
        <div className="flex-1">
          {/* Title Skeleton */}
          <div className={`h-5 w-48 ${shimmerBg} rounded animate-pulse mt-2 mb-2`}></div>
          
          {/* Date Skeleton */}
          <div className={`h-4 w-32 ${shimmerBg} rounded animate-pulse`}></div>
        </div>
      </div>

      {/* Description Skeleton */}
      <div className="space-y-2 mb-3">
        <div className={`h-3 w-full ${shimmerBg} rounded animate-pulse`}></div>
        <div className={`h-3 w-4/5 ${shimmerBg} rounded animate-pulse`}></div>
      </div>

      {/* Timer, Level & Questions Section */}
      <div className="flex items-center justify-between mb-3">
        <div className={`h-4 w-16 ${shimmerBg} rounded animate-pulse`}></div>
        <div className={`h-4 w-20 ${shimmerBg} rounded animate-pulse`}></div>
        <div className={`h-4 w-24 ${shimmerBg} rounded animate-pulse`}></div>
      </div>

      {/* Button Skeleton */}
      <div className="flex justify-end mt-4">
        <div className={`h-8 w-28 ${shimmerBg} rounded-md animate-pulse`}></div>
      </div>
    </div>
  );
};

export default MockInterviewCardSkeleton
