import React, { useState, useEffect } from 'react';
import { FiClock, FiUsers, FiTrendingUp, FiPlay } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { BookOpen } from 'lucide-react';
import CourseBannerSection from '../../card/learnhubCards/CourseBannerSection'
import axiosInstance from '../../utils/axiosInstance';
import CourseCardSkeleton from '../../card/learnhubCards/CourseCardSkeleton';
import CoursesCard from '../../components/learnhub/CoursesCard';

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);

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
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#0097B2]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-[#00B2A9]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.01)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0097B2]/10 to-[#00B2A9]/10 backdrop-blur-md rounded-full px-4 py-2 mb-4 border border-[#0097B2]/20">
            <HiSparkles className="text-[#00B2A9] text-sm" />
            <span className="text-gray-700 text-sm font-medium">Learn & Grow</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Your
            <span className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] bg-clip-text text-transparent block">
              Learning Path
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master new skills with expert-led courses designed to accelerate your career growth
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: FiUsers, label: "Students", value: "10K+" },
            { icon: FiPlay, label: "Courses", value: "150+" },
            { icon: FiClock, label: "Hours", value: "500+" },
            { icon: FiTrendingUp, label: "Success Rate", value: "95%" }
          ].map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-md rounded-xl p-4 border border-gray-200 hover:border-[#00B2A9]/30 hover:shadow-md transition-all duration-300 text-center">
              <stat.icon className="text-2xl text-[#00B2A9] mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Upcoming Live Courses Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00B2A9] rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Live Courses</h2>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-[#0097B2]/30 to-transparent"></div>
          </div>
          
          <div className="bg-gradient-to-r from-[#0097B2]/5 to-[#00B2A9]/5 backdrop-blur-md rounded-2xl p-1 border border-[#0097B2]/20">
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-6">
              <CourseBannerSection />
            </div>
          </div>
        </div>

        {/* All Courses Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">All Courses</h2>
              <div className="px-3 py-1 bg-[#00B2A9]/10 text-[#00B2A9] text-sm font-medium rounded-full">
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
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-[#0097B2]'
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
              <CourseCardSkeleton />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-red-100">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                  <BookOpen size={32} className="text-red-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Error loading courses
              </h3>
              <p className="text-gray-500 text-sm mb-4">
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
              <CoursesCard courses={courses} />
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && courses.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <BookOpen size={32} className="text-gray-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No courses found
              </h3>
              <p className="text-gray-500 text-sm">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Learning?
          </h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Join thousands of learners who have transformed their careers with our expert-led courses
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] hover:from-[#007A94] hover:to-[#009490] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
              Browse All Courses
            </button>
            <button className="border-2 border-[#00B2A9]/50 hover:border-[#00B2A9] text-[#00B2A9] hover:text-[#007A94] font-semibold py-3 px-6 rounded-lg hover:bg-[#00B2A9]/5 transition-all duration-300">
              Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;