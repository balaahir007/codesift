 import React from 'react';

export default function CourseCardSkeleton({ count = 6, mode = 'light' }) {
  // Theme variables
  const bgSecondary = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const skeletonBase = mode === 'dark' ? 'bg-gray-700' : 'bg-gray-300';
  const skeletonLight = mode === 'dark' ? 'bg-gray-600' : 'bg-gray-200';
  const skeletonDark = mode === 'dark' ? 'bg-gray-600' : 'bg-gray-400';
  const borderColor = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';

  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className={`${bgSecondary} rounded-xl shadow-md overflow-hidden animate-pulse border ${borderColor}`}
        >
          {/* Image Skeleton */}
          <div className="relative">
            <div className={`w-full h-48 ${skeletonBase}`} />
            
            {/* Top badges skeleton */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
              <div className={`${skeletonDark} h-6 w-16 rounded-full`} />
              <div className={`${skeletonDark} h-6 w-20 rounded-full`} />
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Author info skeleton */}
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 rounded-full ${skeletonBase}`} />
              <div className={`h-4 w-24 ${skeletonBase} rounded`} />
            </div>

            {/* Title skeleton */}
            <div className="space-y-2 mb-2">
              <div className={`h-4 ${skeletonBase} rounded w-full`} />
              <div className={`h-4 ${skeletonBase} rounded w-3/4`} />
            </div>

            {/* Description skeleton */}
            <div className="space-y-2 mb-4 mt-3">
              <div className={`h-3 ${skeletonLight} rounded w-full`} />
              <div className={`h-3 ${skeletonLight} rounded w-5/6`} />
            </div>

            {/* Metadata skeleton */}
            <div className="flex items-center gap-4 mb-4">
              <div className={`h-3 w-16 ${skeletonBase} rounded`} />
              <div className={`h-3 w-12 ${skeletonBase} rounded`} />
              <div className={`h-3 w-20 ${skeletonBase} rounded`} />
            </div>

            {/* Button skeleton */}
            <div className={`w-full h-10 ${mode === 'dark' ? 'bg-gradient-to-r from-gray-700 to-gray-600' : 'bg-gradient-to-r from-gray-300 to-gray-400'} rounded-lg`} />
          </div>
        </div>
      ))}
    </>
  );
}