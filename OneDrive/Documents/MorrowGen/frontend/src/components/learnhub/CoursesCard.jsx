import React from "react";
import { FaPlayCircle, FaClock, FaSignal, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CoursesCard = ({ courses = [] }) => {
  const navigate = useNavigate();
  
  const getLevelColor = (level) => {
    const colors = {
      Beginner: "bg-green-100 text-green-700",
      Intermediate: "bg-yellow-100 text-yellow-700",
      Advanced: "bg-red-100 text-red-700",
    };
    return colors[level] || "bg-gray-100 text-gray-700";
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };
  return (
    <>
      {courses.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
          onClick={() => {
            const url = `/learnhub/courses/${createSlug(item.title)}=${item.id}`;
            window.open(url, '_blank', 'noopener,noreferrer');
          }}
        >
          {/* Image Container */}
          <div className="relative overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Top badges */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
              {item.price === 0 && (
                <span className="bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  FREE
                </span>
              )}
              <span className={`ml-auto ${getLevelColor(item.level)} px-3 py-1 rounded-full text-xs font-semibold shadow-md`}>
                {item.level}
              </span>
            </div>

            {/* Play overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FaPlayCircle className="text-white text-6xl drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Author info */}
            <div className="flex items-center gap-2 mb-3">
              <img
                src={item.user.profilePicture}
                alt={item.user.username}
                className="w-8 h-8 rounded-full border-2 border-gray-200"
              />
              <span className="text-sm text-gray-600 font-medium hover:text-blue-600 transition-colors">
                {item.user.username}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-gray-900 font-bold text-base mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
              {item.description?.split('\n')[0]}
            </p>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <FaClock className="text-gray-400" />
                <span>{formatDuration(item.duration)}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span>{item.rating > 0 ? item.rating.toFixed(1) : 'New'}</span>
              </div>
              {item.enrollCount > 0 && (
                <div className="flex items-center gap-1">
                  <FaSignal className="text-blue-400" />
                  <span>{item.enrollCount} enrolled</span>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const url = `/learnhub/courses/${createSlug(item.title)}=${item.id}`;
                window.open(url, '_blank', 'noopener,noreferrer');
                navigate(url);
              }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              <FaPlayCircle className="text-base" />
              <span>Start Learning</span>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CoursesCard;