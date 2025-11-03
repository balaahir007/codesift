import React, { useState } from 'react';
import { Play, Users, Plus, Calendar, Clock, BookOpen, Award, TrendingUp } from 'lucide-react';

const LearningStats = () => {
  const [activeTab, setActiveTab] = useState('courses');

  // Sample data - replace with real data
  const coursesWatched = [
    {
      id: 1,
      title: 'React Fundamentals',
      instructor: 'John Smith',
      duration: '4h 30m',
      progress: 85,
      completedDate: '2025-01-15',
      category: 'Web Development'
    },
    {
      id: 2,
      title: 'JavaScript Advanced Concepts',
      instructor: 'Sarah Johnson',
      duration: '6h 15m',
      progress: 100,
      completedDate: '2025-01-10',
      category: 'Programming'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      instructor: 'Mike Chen',
      duration: '3h 45m',
      progress: 60,
      completedDate: null,
      category: 'Design'
    }
  ];

  const sessionsAttended = [
    {
      id: 1,
      title: 'Career Guidance Workshop',
      mentor: 'Dr. Priya Sharma',
      date: '2025-01-20',
      duration: '2h 00m',
      type: 'Workshop',
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Mock Interview Session',
      mentor: 'Rahul Kumar',
      date: '2025-01-18',
      duration: '1h 30m',
      type: 'One-on-One',
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Tech Industry Insights',
      mentor: 'Aisha Patel',
      date: '2025-01-25',
      duration: '1h 45m',
      type: 'Group Session',
      status: 'Upcoming'
    }
  ];

  const getProgressColor = (progress) => {
    if (progress === 100) return 'text-green-600';
    if (progress >= 70) return 'text-[#00B2A9]';
    if (progress >= 40) return 'text-[#0097B2]';
    return 'text-orange-500';
  };

  const getProgressBg = (progress) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 70) return 'bg-[#00B2A9]';
    if (progress >= 40) return 'bg-[#0097B2]';
    return 'bg-orange-500';
  };

  const totalCoursesCompleted = coursesWatched.filter(course => course.progress === 100).length;
  const totalWatchTime = coursesWatched.reduce((total, course) => {
    const [hours, minutes] = course.duration.split('h ');
    return total + parseInt(hours) + (parseInt(minutes) || 0) / 60;
  }, 0);
  
  const completedSessions = sessionsAttended.filter(session => session.status === 'Completed').length;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Learning Statistics</h1>
          <p className="text-gray-600">Track your learning journey and achievements</p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] rounded-xl p-5 text-white">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6" />
              <span className="text-sm opacity-90">Courses</span>
            </div>
            <div className="text-2xl font-bold">{coursesWatched.length}</div>
            <div className="text-xs opacity-75">{totalCoursesCompleted} completed</div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-[#0097B2]" />
              <span className="text-sm text-gray-600">Watch Time</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{Math.round(totalWatchTime)}h</div>
            <div className="text-xs text-gray-500">Total hours</div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-[#00B2A9]" />
              <span className="text-sm text-gray-600">Sessions</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{sessionsAttended.length}</div>
            <div className="text-xs text-gray-500">{completedSessions} attended</div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <span className="text-sm text-gray-600">Progress</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {Math.round((totalCoursesCompleted / coursesWatched.length) * 100)}%
            </div>
            <div className="text-xs text-gray-500">Completion rate</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'courses'
                ? 'bg-[#0097B2] text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Play className="w-4 h-4" />
            Courses Watched
          </button>
          <button
            onClick={() => setActiveTab('sessions')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'sessions'
                ? 'bg-[#0097B2] text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Users className="w-4 h-4" />
            Sessions Attended
          </button>
        </div>

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-4">
            {coursesWatched.map((course) => (
              <div key={course.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                      <span className="px-2 py-1 bg-[#E0F2F5] text-[#0097B2] text-xs rounded-full font-medium">
                        {course.category}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">by {course.instructor}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                      {course.completedDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Completed: {new Date(course.completedDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className={`text-lg font-bold mb-1 ${getProgressColor(course.progress)}`}>
                      {course.progress}%
                    </div>
                    {course.progress === 100 && (
                      <div className="flex items-center gap-1 text-green-600">
                        <Award className="w-4 h-4" />
                        <span className="text-xs">Completed</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className={`rounded-full h-2 transition-all duration-500 ${getProgressBg(course.progress)}`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sessions Tab */}
        {activeTab === 'sessions' && (
          <div className="space-y-4">
            {sessionsAttended.map((session) => (
              <div key={session.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{session.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        session.type === 'Workshop' ? 'bg-purple-100 text-purple-600' :
                        session.type === 'One-on-One' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {session.type}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">with {session.mentor}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(session.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {session.duration}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      session.status === 'Completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Button */}
        <div className="mt-8 text-center">
          <button className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New {activeTab === 'courses' ? 'Course' : 'Session'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningStats;