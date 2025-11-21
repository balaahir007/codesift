import React, { useState, useEffect } from 'react';
import { FiClock, FiUsers, FiTrendingUp, FiPlay } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { BookOpen } from 'lucide-react';
import CourseBannerSection from '../../card/learnhubCards/CourseBannerSection'
import axiosInstance from '../../utils/axiosInstance';
import CourseCardSkeleton from '../../card/learnhubCards/CourseCardSkeleton';
import CoursesCard from '../../components/learnhub/CoursesCard';
import useThemeStore from '../../zustand/themeStore';

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const {mode} = useThemeStore()
  // Theme variables
  const bgPrimary = mode === 'dark' ? 'bg-[#0F1419]' : 'bg-backGray';
  const bgSecondary = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const bgTertiary = mode === 'dark' ? 'bg-gray-800' : 'bg-gray-50';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const textTertiary = mode === 'dark' ? 'text-gray-500' : 'text-gray-500';
  const borderColor = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const borderColorHover = mode === 'dark' ? 'hover:border-[#00B2A9]/50' : 'hover:border-[#00B2A9]/30';
  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]/80' : 'bg-white/80';
  const cardBorder = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const hoverBg = mode === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200';
  const badgeBg = mode === 'dark' ? 'bg-[#0097B2]/20' : 'bg-gradient-to-r from-[#0097B2]/10 to-[#00B2A9]/10';
  const badgeBorder = mode === 'dark' ? 'border-[#0097B2]/30' : 'border-[#0097B2]/20';
  const statsCardBg = mode === 'dark' ? 'bg-[#1B2E31]/90' : 'bg-white/80';
  const dividerBg = mode === 'dark' ? 'from-[#0097B2]/50 to-transparent' : 'from-[#0097B2]/30 to-transparent';
  const sectionBg = mode === 'dark' ? 'bg-gradient-to-r from-[#0097B2]/10 to-[#00B2A9]/10' : 'bg-gradient-to-r from-[#0097B2]/5 to-[#00B2A9]/5';
  const sectionBorder = mode === 'dark' ? 'border-[#0097B2]/30' : 'border-[#0097B2]/20';
  const innerCardBg = mode === 'dark' ? 'bg-[#1B2E31]/90' : 'bg-white/80';
  const filterBtnInactive = mode === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200';
  const errorBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const errorBorder = mode === 'dark' ? 'border-red-900/30' : 'border-red-100';
  const errorIconBg = mode === 'dark' ? 'bg-red-900/20' : 'bg-red-50';
  const errorIconColor = mode === 'dark' ? 'text-red-400' : 'text-red-400';
  const emptyIconBg = mode === 'dark' ? 'bg-gray-700' : 'bg-gray-100';
  const emptyIconColor = mode === 'dark' ? 'text-gray-500' : 'text-gray-400';
  const ctaBg = mode === 'dark' ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-gray-50 to-gray-100';
  const ctaBorder = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/course/published');
      setCourses(response.data.data || []);
      setFilteredCourses(response.data.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load courses');
      setCourses([]);
      setFilteredCourses([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-backGray px-1 relative overflow-hidden`}>
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-20 right-20 w-64 h-64 ${mode === 'dark' ? 'bg-[#0097B2]/10' : 'bg-[#0097B2]/5'} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-40 left-20 w-80 h-80 ${mode === 'dark' ? 'bg-[#00B2A9]/10' : 'bg-[#00B2A9]/5'} rounded-full blur-3xl animate-pulse delay-1000`}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className={`absolute inset-0 ${mode === 'dark' ? 'bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)]' : 'bg-[linear-gradient(rgba(0,0,0,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.01)_1px,transparent_1px)]'} bg-[size:50px_50px] pointer-events-none`}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-2 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 ${badgeBg} backdrop-blur-md rounded-full px-4 py-2 mb-4 border ${badgeBorder}`}>
            <HiSparkles className="text-[#00B2A9] text-sm" />
            <span className={`${textSecondary} text-sm font-medium`}>Learn & Grow</span>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold ${textPrimary} mb-4`}>
            Discover Your
            <span className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] bg-clip-text text-transparent block">
              Learning Path
            </span>
          </h1>
          
          <p className={`text-lg ${textSecondary} max-w-2xl mx-auto`}>
            Master new skills with expert-led courses designed to accelerate your career growth
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-2 mb-12">
          {[
            { icon: FiUsers, label: "Students", value: "10K+" },
            { icon: FiPlay, label: "Courses", value: "150+" },
            { icon: FiClock, label: "Hours", value: "500+" },
            { icon: FiTrendingUp, label: "Success Rate", value: "95%" }
          ].map((stat, index) => (
            <div key={index} className={`${statsCardBg} backdrop-blur-md rounded-xl p-4 border ${cardBorder} ${borderColorHover} hover:shadow-md transition-all duration-300 text-center`}>
              <stat.icon className="text-2xl text-[#00B2A9] mx-auto mb-2" />
              <div className={`text-2xl font-bold ${textPrimary}`}>{stat.value}</div>
              <div className={`text-sm ${textSecondary}`}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Upcoming Live Courses Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00B2A9] rounded-full animate-pulse"></div>
              <h2 className={`text-2xl font-bold ${textPrimary}`}>Upcoming Live Courses</h2>
            </div>
            <div className={`flex-1 h-px bg-gradient-to-r ${dividerBg}`}></div>
          </div>
          
          <div className={`${sectionBg} backdrop-blur-md rounded-2xl p-1 border ${sectionBorder}`}>
            <div className={`${innerCardBg} backdrop-blur-md rounded-xl p-6`}>
              <CourseBannerSection mode={mode} />
            </div>
          </div>
        </div>

        {/* All Courses Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className={`text-2xl font-bold ${textPrimary}`}>All Courses</h2>
              <div className={`px-3 py-1 ${mode === 'dark' ? 'bg-[#00B2A9]/20' : 'bg-[#00B2A9]/10'} text-[#00B2A9] text-sm font-medium rounded-full`}>
                150+ Courses
              </div>
            </div>
            
            {/* Filter Buttons */}
            <div className="hidden md:flex gap-2">
              {['All', 'Popular', 'New', 'Free'].map((filter) => (
                <button
                  key={filter}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === 'All' 
                      ? 'bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white shadow-md' 
                      : `${filterBtnInactive} hover:text-[#0097B2]`
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          {/* Loading State */}
          {loading && (
            <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <CourseCardSkeleton mode={mode} />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className={`text-center py-16 ${errorBg} rounded-xl shadow-sm border ${errorBorder}`}>
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 ${errorIconBg} rounded-full flex items-center justify-center`}>
                  <BookOpen size={32} className={errorIconColor} />
                </div>
              </div>
              <h3 className={`text-xl font-semibold ${textPrimary} mb-2`}>
                Error loading courses
              </h3>
              <p className={`${textSecondary} text-sm mb-4`}>
                {error}
              </p>
              <button
                onClick={getAllCourses}
                className="bg-[#0097B2] hover:bg-[#007A94] text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Courses Grid */}
          {!loading && !error && courses.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <CoursesCard courses={courses} mode={mode} />
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && courses.length === 0 && (
            <div className={`text-center py-16 ${errorBg} rounded-xl shadow-sm border ${cardBorder}`}>
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 ${emptyIconBg} rounded-full flex items-center justify-center`}>
                  <BookOpen size={32} className={emptyIconColor} />
                </div>
              </div>
              <h3 className={`text-xl font-semibold ${textPrimary} mb-2`}>
                No courses found
              </h3>
              <p className={`${textSecondary} text-sm`}>
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className={`text-center  rounded-3xl p-8 `}>
          <h3 className={`text-2xl font-bold ${textPrimary} mb-4`}>
            Ready to Start Learning?
          </h3>
          <p className={`${textSecondary} mb-6 max-w-xl mx-auto`}>
            Join thousands of learners who have transformed their careers with our expert-led courses
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] hover:from-[#007A94] hover:to-[#009490] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
              Browse All Courses
            </button>
            <button className={`border-2 ${mode === 'dark' ? 'border-[#00B2A9]/70 hover:border-[#00B2A9]' : 'border-[#00B2A9]/50 hover:border-[#00B2A9]'} text-[#00B2A9] hover:text-[#007A94] font-semibold py-3 px-6 rounded-lg ${mode === 'dark' ? 'hover:bg-[#00B2A9]/10' : 'hover:bg-[#00B2A9]/5'} transition-all duration-300`}>
              Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;