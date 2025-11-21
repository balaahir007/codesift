import React from 'react';
import { Calendar, Target, TrendingUp, Award } from 'lucide-react';
import useThemeStore from '../../zustand/themeStore';

const StudentDashboard = () => {
  const { mode } = useThemeStore();

  const bgPrimary = mode === 'dark' ? 'bg-[#0F1419]' : 'bg-white';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]/80' : 'bg-white';
  const cardBorder = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';

  // Example course progress data
  const courses = [
    { name: 'Java DSA', progress: 75 },
    { name: 'React Fundamentals', progress: 88 },
    { name: 'Python for Data Science', progress: 60 },
    { name: 'Node.js Backend', progress: 45 },
    { name: 'HTML & CSS Mastery', progress: 95 },
  ];

  const getProgressColor = (value) => {
    if (value >= 90) return 'bg-green-500';
    if (value >= 75) return 'bg-[#00B2A9]';
    if (value >= 60) return 'bg-[#0097B2]';
    return 'bg-orange-500';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300  ${textPrimary}`}>
      <div className="max-w-8xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${textPrimary}`}>Dashboard</h1>
          <p className={`${textSecondary}`}>View your enrolled courses and progress</p>
        </div>

        {/* Course Progress Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-[#0097B2] rounded-full"></div>
            <h3 className={`text-xl font-semibold ${textPrimary}`}>Course Progress</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course, index) => (
              <div
                key={index}
                className={`rounded-xl p-5 border ${cardBg} ${cardBorder} transition-shadow hover:shadow-md`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`font-medium ${textPrimary}`}>{course.name}</h4>
                  <span className={`text-sm font-medium ${textSecondary}`}>
                    {course.progress}%
                  </span>
                </div>

                <div className="mb-3">
                  <div
                    className={`${
                      mode ? 'bg-gray-700' : 'bg-gray-200'
                    } rounded-full h-2`}
                  >
                    <div
                      className={`${getProgressColor(course.progress)} rounded-full h-2 transition-all duration-500`}
                      style={{ width: `${Math.min(course.progress, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className={`text-xs ${textSecondary}`}>
                  {course.progress === 100 ? (
                    <span className="text-green-500 font-medium">✓ Completed</span>
                  ) : (
                    <span>{100 - course.progress}% remaining</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {[
            { icon: TrendingUp, color: '#0097B2', label: 'Courses Enrolled', value: courses.length },
            { icon: Award, color: '#00B2A9', label: 'Courses Completed', value: courses.filter(c => c.progress >= 100).length },
            { icon: Calendar, color: '#0097B2', label: 'Active Days', value: '24' },
          ].map((stat, i) => (
            <div
              key={i}
              className={`text-center rounded-xl p-5 border ${cardBg} ${cardBorder}`}
            >
              <div className="flex items-center justify-center mb-3">
                <div
                  className="p-3 rounded-full"
                  style={{ backgroundColor: mode === 'dark'? '#16383A' : 'bg-white' }}
                >
                  <stat.icon className={`w-6 h-6 ${mode == 'dark' ? 'text-backGray' : 'text-white'}`} />
                </div>
              </div>
              <div className={`text-2xl font-bold mb-1 ${textPrimary}`}>{stat.value}</div>
              <div className={`${textSecondary} text-sm`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
