import React from "react";

const PostCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 w-full mx-auto overflow-hidden">
      {/* Header */}
      <div className="p-3 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2 flex-1">
            {/* Avatar skeleton */}
            <div className="relative w-10 h-10 rounded-full bg-blue-100 overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-blue-200 to-transparent will-change-transform"></div>
            </div>

            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="relative h-3 bg-blue-100 rounded w-28 overflow-hidden">
                <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-blue-200 to-transparent will-change-transform"></div>
              </div>
              <div className="relative h-2.5 bg-gray-100 rounded w-20 overflow-hidden">
                <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-200 to-transparent will-change-transform"></div>
              </div>
              <div className="relative h-2.5 bg-gray-100 rounded w-16 overflow-hidden">
                <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-200 to-transparent will-change-transform"></div>
              </div>
            </div>
          </div>
          <div className="relative w-4 h-4 bg-gray-100 rounded overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-200 to-transparent will-change-transform"></div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="px-3 pb-2 space-y-1.5">
        <div className="relative h-3 bg-gray-100 rounded w-full overflow-hidden">
          <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-200 to-transparent will-change-transform"></div>
        </div>
        <div className="relative h-3 bg-gray-100 rounded w-4/5 overflow-hidden">
          <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-200 to-transparent will-change-transform"></div>
        </div>
      </div>

      {/* Image skeleton */}
      <div className="px-3 pb-2">
        <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 h-48">
          <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent will-change-transform"></div>
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="px-3 py-1.5 border-b border-gray-100 flex justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative w-14 h-3 bg-gray-100 rounded overflow-hidden">
            <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-200 to-transparent will-change-transform"></div>
          </div>
        </div>
        <div className="flex space-x-3">
          <div className="relative w-16 h-3 bg-gray-100 rounded overflow-hidden">
            <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-200 to-transparent will-change-transform"></div>
          </div>
        </div>
      </div>

      {/* Action buttons skeleton */}
      <div className="px-3 py-2">
        <div className="flex items-center justify-around gap-1">
          <div className="relative flex items-center space-x-1 px-3 py-1.5 bg-blue-50 rounded-md overflow-hidden">
            <div className="w-12 h-5"></div>
            <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-blue-100 to-transparent will-change-transform"></div>
          </div>
          <div className="relative flex items-center space-x-1 px-3 py-1.5 bg-gray-50 rounded-md overflow-hidden">
            <div className="w-16 h-5"></div>
            <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-100 to-transparent will-change-transform"></div>
          </div>
          <div className="relative flex items-center space-x-1 px-3 py-1.5 bg-gray-50 rounded-md overflow-hidden">
            <div className="w-12 h-5"></div>
            <div className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-100 to-transparent will-change-transform"></div>
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

// Demo without left scrollbar
const SkeletonDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-8 overflow-x-hidden">
      <div className="max-w-2xl mx-auto space-y-4 px-4 overflow-x-hidden">
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
      </div>
    </div>
  );
};

export default SkeletonDemo;
