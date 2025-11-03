import React from "react";

const SessionCardSkeleton = () => {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-40 bg-gray-200" />

      <div className="p-4">
        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />

        {/* Description lines */}
        <div className="space-y-1">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>

        {/* Date and Time */}
        <div className="mt-4 space-y-2">
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-1/3" />
        </div>

        {/* Links */}
        <div className="mt-4 flex gap-2">
          <div className="h-6 w-20 bg-gray-200 rounded-full" />
          <div className="h-6 w-20 bg-gray-200 rounded-full" />
        </div>

        {/* Groups */}
        <div className="mt-4 flex flex-wrap gap-2">
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default SessionCardSkeleton;
