import React from 'react';
import { BookOpen, Users, Video } from 'lucide-react';

const StudySpaceLoadingSpinner = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br bg-backGray">
      <div className="text-center">
        {/* Main Spinner Container */}
        <div className="relative mb-8">
          {/* Outer Ring */}
          <div className="w-20 h-20 border-4 border-gray-200 rounded-full animate-spin">
            <div className="w-full h-full border-4 border-transparent border-t-[#0097B2] border-r-[#00B2A9] rounded-full animate-spin"></div>
          </div>
          
          {/* Inner Pulsing Circle */}
          <div className="absolute inset-3 w-14 h-14 bg-gradient-to-br from-[#0097B2] to-[#00B2A9] rounded-full flex items-center justify-center animate-pulse">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          
          {/* Floating Icons */}
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-[#0097B2] rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0s' }}>
            <Users className="w-3 h-3 text-white" />
          </div>
          
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#00B2A9] rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.2s' }}>
            <Video className="w-3 h-3 text-white" />
          </div>
          
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}>
            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-2"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">
            Loading Study Space
          </h3>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-[#0097B2] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-[#00B2A9] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-[#0097B2] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            Preparing your learning environment...
          </p>
        </div>

        {/* Progress Bar Animation */}
        <div className="mt-8 w-64 mx-auto">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="h-1.5 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default StudySpaceLoadingSpinner
