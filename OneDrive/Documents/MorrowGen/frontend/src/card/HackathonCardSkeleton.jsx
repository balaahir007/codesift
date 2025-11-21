import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Trophy, Clock, ArrowRight, Filter, Search } from "lucide-react";

// Mock theme store for demo


// Skeleton Component
export const HackathonCardSkeleton = ({ mode }) => {
  const bgCard = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const skeletonBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-200';

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 px-4 sm:px-6 lg:px-8 py-8">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className={`${bgCard} flex flex-col md:flex-row rounded-xl p-5 border ${borderColor} animate-pulse`}
        >
          {/* Skeleton Image */}
          <div className={`${skeletonBg} rounded-xl h-28 w-full md:w-28 shrink-0 mb-4 md:mb-0`} />

          {/* Skeleton Content */}
          <div className="flex-1 md:px-5 w-full">
            {/* Title skeleton */}
            <div className={`${skeletonBg} h-6 w-3/4 rounded mb-3`} />
            
            {/* Description skeleton */}
            <div className={`${skeletonBg} h-4 w-full rounded mb-2`} />
            <div className={`${skeletonBg} h-4 w-5/6 rounded mb-4`} />

            {/* Info skeleton */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className={`${skeletonBg} h-4 w-24 rounded`} />
              <div className={`${skeletonBg} h-4 w-28 rounded`} />
              <div className={`${skeletonBg} h-4 w-20 rounded`} />
            </div>

            {/* Tags skeleton */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className={`${skeletonBg} h-6 w-20 rounded`} />
              <div className={`${skeletonBg} h-6 w-24 rounded`} />
              <div className={`${skeletonBg} h-6 w-16 rounded`} />
            </div>

            {/* Footer skeleton */}
            <div className="flex items-center gap-2">
              <div className={`${skeletonBg} h-3 w-32 rounded`} />
              <div className={`${skeletonBg} h-3 w-3 rounded-full`} />
              <div className={`${skeletonBg} h-3 w-28 rounded`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
