import React, { useState } from 'react';
import { Moon, Sun, Trophy, Briefcase } from 'lucide-react';
import useThemeStore from '../../zustand/themeStore';
import { useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';

export default function MyApplicationsPage() {
  const { mode } = useThemeStore();
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewType, setViewType] = useState('jobs'); // 'jobs' or 'hackathons'

  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const sectionBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50';
  const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const bgPrimary = mode === 'dark' ? 'bg-[#0A1415]' : 'bg-gray-50';

  // Mock data - replace with your actual data
  const applications = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'Tech Innovations Inc',
      type: 'job',
      status: 'accepted',
      appliedDate: '2025-01-15',
      location: 'San Francisco, CA',
    },
    {
      id: 2,
      title: 'TechHack 2025',
      company: 'TechHack Team',
      type: 'hackathon',
      status: 'pending',
      appliedDate: '2025-01-20',
      location: 'Virtual',
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'Creative Studios',
      type: 'job',
      status: 'interview',
      appliedDate: '2025-01-10',
      location: 'Remote',
    },
    {
      id: 4,
      title: 'WebDev Challenge',
      company: 'WebDev Team',
      type: 'hackathon',
      status: 'rejected',
      appliedDate: '2025-01-25',
      location: 'San Francisco, CA',
    },
  ];

  // Separate jobs and hackathons
  const jobs = applications.filter(app => app.type === 'job');
  const hackathons = applications.filter(app => app.type === 'hackathon');

  // Get current list based on view type
  const currentList = viewType === 'jobs' ? jobs : hackathons;

  // Filter by status
  const filteredApplications = filterStatus === 'all'
    ? currentList
    : currentList.filter(app => app.status === filterStatus);

  // Calculate status counts for current view
  const statusCounts = {
    all: currentList.length,
    accepted: currentList.filter(a => a.status === 'accepted').length,
    pending: currentList.filter(a => a.status === 'pending').length,
    interview: currentList.filter(a => a.status === 'interview').length,
    rejected: currentList.filter(a => a.status === 'rejected').length,
  };




  const getMyHackathon = async ()=>{
    const res = await axios.get('http://localhost:5000/api/hackathons/my-registrations')
    console.log("Hackathon Data : ",res.data)
  }
  getMyHackathon()

  return (
    <div className={`min-h-screen bg-backGray transition-colors duration-300`}>
      {/* Header */}
      <header className={`${mode === 'dark' ? 'bg-[#0A1415]' : 'bg-white'} border-b ${borderColor}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-teal-500" />
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold ${textPrimary}`}>
                  My Applications
                </h1>
                <p className={`text-xs sm:text-sm ${textSecondary} mt-1`}>
                  Track and manage all your applications in one place
                </p>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Stats Section */}
      {/* {/* <section className={`${sectionBg} border-b ${borderColor}`}> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* View Type Switch */}
          <div className="flex justify-center mb-6">
            <div className={`inline-flex rounded-lg border ${borderColor} ${cardBg} p-1`}>
              <button
                onClick={() => {
                  setViewType('jobs');
                  setFilterStatus('all');
                }}
                className={`px-6 py-2 rounded-md font-semibold text-sm transition-all ${viewType === 'jobs'
                    ? 'bg-teal-500 text-white'
                    : `${textSecondary} hover:bg-opacity-50`
                  }`}
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Jobs ({jobs.length})
                </div>
              </button>
              <button
                onClick={() => {
                  setViewType('hackathons');
                  setFilterStatus('all');
                }}
                className={`px-6 py-2 rounded-md font-semibold text-sm transition-all ${viewType === 'hackathons'
                    ? 'bg-teal-500 text-white'
                    : `${textSecondary} hover:bg-opacity-50`
                  }`}
              >
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Hackathons ({hackathons.length})
                </div>
              </button>
            </div>
          </div>

          {/* Status Filters */}
          {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {[
              { label: 'Total', count: statusCounts.all, key: 'all', color: 'text-teal-500' },
              { label: 'Selected', count: statusCounts.accepted, key: 'accepted', color: 'text-green-500' },
              { label: 'Pending', count: statusCounts.pending, key: 'pending', color: 'text-blue-500' },
              { label: 'Interview', count: statusCounts.interview, key: 'interview', color: 'text-yellow-500' },
              { label: 'Rejected', count: statusCounts.rejected, key: 'rejected', color: 'text-red-500' },
            ].map((stat) => (
              <button
                key={stat.key}
                onClick={() => setFilterStatus(stat.key)}
                className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${filterStatus === stat.key
                    ? `border-current ${cardBg}`
                    : `border-transparent ${sectionBg} hover:border-gray-300`
                  }`}
              >
                <div className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1`}>
                  {stat.count}
                </div>
                <div className={`text-xs sm:text-sm ${textSecondary}`}>{stat.label}</div>
              </button>
            ))}
          </div> */}
        </div>
      {/* // </section> */} 


      {/* Applications List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {filteredApplications.length === 0 ? (
          <div className={`${cardBg} border ${borderColor} rounded-lg p-8 sm:p-12 text-center`}>
            {viewType === 'jobs' ? (
              <Briefcase className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
            ) : (
              <Trophy className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
            )}
            <p className={`${textSecondary} text-sm sm:text-base`}>
              No {viewType} applications with this status yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredApplications.map((app) => (
              <div key={app.id} className={`${cardBg} border ${borderColor} rounded-lg p-6`}>
                <div className="flex items-center gap-3 mb-3">
                  {app.type === 'job' ? (
                    <Briefcase className="w-6 h-6 text-teal-500" />
                  ) : (
                    <Trophy className="w-6 h-6 text-teal-500" />
                  )}
                  <div>
                    <h3 className={`text-lg font-bold ${textPrimary}`}>
                      {app.title}
                    </h3>
                    <p className={`text-sm ${textSecondary}`}>{app.company}</p>
                  </div>
                </div>
                <p className={`text-sm ${textSecondary}`}>{app.location}</p>
                <div className={`mt-3 inline-block px-3 py-1 rounded text-xs font-semibold ${app.status === 'accepted' ? 'bg-green-500 text-white' :
                    app.status === 'pending' ? 'bg-blue-500 text-white' :
                      app.status === 'interview' ? 'bg-yellow-500 text-white' :
                        'bg-red-500 text-white'
                  }`}>
                  {app.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}