import React from 'react';

const JobDetailSkeleton = ({ mode }) => {
  // Theme-based classes
  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const sectionBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50';
  const skeletonBase = mode === 'dark' ? 'bg-[#294B4E]' : 'bg-gray-200';
  const skeletonShimmer = mode === 'dark' ? 'bg-[#3A5F63]' : 'bg-gray-300';

  return (
    <div className={`p-6 rounded-2xl sticky top-16 ${cardBg} border ${borderColor} shadow-sm flex flex-col gap-6 w-full max-h-[calc(100vh-4rem)] overflow-auto`}>
      
      {/* Header: Title + Company + Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex gap-4 flex-1">
          {/* Company Logo Skeleton */}
          <div className={`w-14 h-14 md:w-16 md:h-16 rounded-lg ${skeletonBase} animate-pulse`}></div>
          
          <div className="flex-1 space-y-3">
            {/* Job Title Skeleton */}
            <div className={`h-7 ${skeletonBase} rounded-lg animate-pulse w-3/4`}></div>
            {/* Company Name Skeleton */}
            <div className={`h-5 ${skeletonBase} rounded-lg animate-pulse w-1/2`}></div>
          </div>
        </div>

        {/* Action Icons Skeleton */}
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-lg ${skeletonBase} animate-pulse`}></div>
          <div className={`w-10 h-10 rounded-lg ${skeletonBase} animate-pulse`}></div>
        </div>
      </div>

      {/* Salary + Status Skeleton */}
      <div className="flex items-center justify-between">
        <div className={`h-8 ${skeletonBase} rounded-lg animate-pulse w-32`}></div>
        <div className={`h-6 ${skeletonBase} rounded-full animate-pulse w-20`}></div>
      </div>

      {/* Apply Button Skeleton */}
      <div className={`w-full h-12 rounded-lg ${skeletonBase} animate-pulse`}></div>

      {/* Quick Info Grid Skeleton */}
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-lg ${sectionBg} border ${borderColor}`}>
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="space-y-2">
            <div className={`h-3 ${skeletonBase} rounded animate-pulse w-20`}></div>
            <div className={`h-5 ${skeletonBase} rounded animate-pulse w-24`}></div>
          </div>
        ))}
      </div>

      {/* Posted & Deadline Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className={`h-5 ${skeletonBase} rounded animate-pulse w-40`}></div>
        <div className={`h-5 ${skeletonBase} rounded animate-pulse w-40`}></div>
      </div>

      <hr className={`${borderColor}`} />

      {/* Description Skeleton */}
      <div className="space-y-3">
        <div className={`h-6 ${skeletonBase} rounded-lg animate-pulse w-48`}></div>
        <div className="space-y-2">
          <div className={`h-4 ${skeletonBase} rounded animate-pulse w-full`}></div>
          <div className={`h-4 ${skeletonBase} rounded animate-pulse w-full`}></div>
          <div className={`h-4 ${skeletonBase} rounded animate-pulse w-3/4`}></div>
        </div>
      </div>

      {/* Responsibilities Skeleton */}
      <div className="space-y-3">
        <div className={`h-6 ${skeletonBase} rounded-lg animate-pulse w-40`}></div>
        <div className="space-y-2">
          <div className={`h-4 ${skeletonBase} rounded animate-pulse w-full`}></div>
          <div className={`h-4 ${skeletonBase} rounded animate-pulse w-5/6`}></div>
        </div>
      </div>

      {/* Requirements Skeleton */}
      <div className="space-y-3">
        <div className={`h-6 ${skeletonBase} rounded-lg animate-pulse w-36`}></div>
        <div className="space-y-2">
          <div className={`h-4 ${skeletonBase} rounded animate-pulse w-full`}></div>
          <div className={`h-4 ${skeletonBase} rounded animate-pulse w-full`}></div>
          <div className={`h-4 ${skeletonBase} rounded animate-pulse w-4/5`}></div>
        </div>
      </div>

      {/* Education Level Skeleton */}
      <div className={`p-4 rounded-lg ${sectionBg} border ${borderColor} space-y-2`}>
        <div className={`h-4 ${skeletonBase} rounded animate-pulse w-32`}></div>
        <div className={`h-5 ${skeletonBase} rounded animate-pulse w-40`}></div>
      </div>

      {/* Skills Required Skeleton */}
      <div className="space-y-3">
        <div className={`h-6 ${skeletonBase} rounded-lg animate-pulse w-44`}></div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className={`h-8 ${skeletonBase} rounded-full animate-pulse`} style={{ width: `${60 + Math.random() * 40}px` }}></div>
          ))}
        </div>
      </div>

      {/* Benefits Skeleton */}
      <div className="space-y-3">
        <div className={`h-6 ${skeletonBase} rounded-lg animate-pulse w-32`}></div>
        <div className="space-y-2">
          <div className={`h-4 ${skeletonBase} rounded animate-pulse w-full`}></div>
          <div className={`h-4 ${skeletonBase} rounded animate-pulse w-2/3`}></div>
        </div>
      </div>

      {/* Applications Count Skeleton */}
      <div className={`p-4 rounded-lg ${sectionBg} border ${borderColor}`}>
        <div className={`h-5 ${skeletonBase} rounded animate-pulse w-48`}></div>
      </div>
    </div>
  );
};

export default JobDetailSkeleton;