import React from 'react'
import TeacherStatsCardGrid from '../../card/teacher/TeacherStatsCardGrid'
import useThemeStore from '../../zustand/themeStore'
import RecentStudySpacesCard from '../../card/teacher/RecentStudySpacesCard'
import QuickDashboardAction from '../../card/teacher/QuickDashboardAction'
import { useNavigate, useOutletContext } from 'react-router-dom'
import CompanyFormModal from '../../card/recruiter/CompanyModal'
import CollegeFormModal from '../../card/teacher/CollegeFormModal'
import axiosInstance from '../../utils/axiosInstance';
import { useState } from 'react'
import StudySpaceCards from '../../components/admin/StudySpaceCards'

const TeacherDashboard = () => {
  const stats = [
    {
      title: 'Study Spaces',
      count: 12,
      positive: true,
      percentage: '15'
    },
    {
      title: 'Total Students',
      count: 245,
      positive: true,
      percentage: '20'
    },
    {
      title: 'Active Hackathons',
      count: 8,
      positive: true,
      percentage: '30'
    },
    {
      title: 'Submissions',
      count: 156,
      positive: false,
      percentage: '5'
    },
  ]

  const recentStudySpaces = [
    {
      title: "Web Development Bootcamp",
      category: "Programming",
      status: "Active",
      students: 45,
      dateCreated: "Nov 1, 2025",
    },
    {
      title: "Data Science Fundamentals",
      category: "Data Science",
      status: "Active",
      students: 38,
      dateCreated: "Oct 28, 2025",
    },
    {
      title: "Mobile App Development",
      category: "Programming",
      status: "Closed",
      students: 52,
      dateCreated: "Oct 15, 2025",
    },
    {
      title: "UI/UX Design Workshop",
      category: "Design",
      status: "On Hold",
      students: 30,
      dateCreated: "Oct 10, 2025",
    },
    {
      title: "Machine Learning Basics",
      category: "AI/ML",
      status: "Active",
      students: 41,
      dateCreated: "Oct 5, 2025",
    },
  ]

  const recentHackathons = [
    {
      title: "Winter Code Challenge 2025",
      type: "Team",
      status: "Ongoing",
      participants: 28,
      deadline: "Nov 20, 2025",
    },
    {
      title: "AI Innovation Hackathon",
      type: "Individual",
      status: "Upcoming",
      participants: 15,
      deadline: "Dec 5, 2025",
    },
    {
      title: "Web3 Builders Contest",
      type: "Team",
      status: "Completed",
      participants: 42,
      deadline: "Oct 30, 2025",
    },
  ]


  const { mode } = useThemeStore()

  // Theme variables
  const bgPrimary = mode === 'dark' ? 'bg-[#0A1415]' : 'bg-gray-50';
  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const sectionBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50';
  const hoverBg = mode === 'dark' ? 'hover:bg-[#0F1E20]' : 'hover:bg-gray-50';

  const getHackathonStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'ongoing':
        return mode === 'dark'
          ? 'bg-green-900 text-green-200'
          : 'bg-green-100 text-green-800';
      case 'upcoming':
        return mode === 'dark'
          ? 'bg-blue-900 text-blue-200'
          : 'bg-blue-100 text-blue-800';
      case 'completed':
        return mode === 'dark'
          ? 'bg-gray-700 text-gray-300'
          : 'bg-gray-100 text-gray-800';
      default:
        return mode === 'dark'
          ? 'bg-gray-700 text-gray-300'
          : 'bg-gray-100 text-gray-800';
    }
  };
  const navigate = useNavigate()
  const { handleNavigation, openCollegeModel, setOpenCollegeModel, setActionType,handleSubmitCollegeInfo } = useOutletContext()


  return (
    <div className={`min-h-screen p-6 `}>

      {
        openCollegeModel && (
          <CollegeFormModal isOpen={openCollegeModel} onClose={()=>setOpenCollegeModel(false)} onSubmit={handleSubmitCollegeInfo} />
        )
      }
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${textPrimary}`}>
            Dashboard
          </h1>
          <p className={`mt-2 ${textSecondary}`}>
            Manage your study spaces and hackathons
          </p>
        </div>

        <TeacherStatsCardGrid stats={stats} mode={mode} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <RecentStudySpacesCard
              studySpaces={recentStudySpaces}
              mode={mode}
              onViewAll={() => handleNavigation && handleNavigation()}
            />

            <div className={`mt-6 p-6 rounded-2xl shadow-sm ${cardBg}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-semibold ${textPrimary}`}>
                  Recent Hackathons
                </h2>
                <button
                  // onClick={() => handleHackathonNavigation && handleHackathonNavigation()}
                  className="text-primary hover:text-secondary text-sm font-medium duration-300"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {recentHackathons.map((hackathon, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${borderColor} ${hoverBg}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className={`font-medium ${textPrimary}`}>
                          {hackathon.title}
                        </h3>
                        <div className={`flex gap-4 mt-2 text-sm ${textSecondary}`}>
                          <span>
                            Type: {hackathon.type}
                          </span>
                          <span>
                            Participants: {hackathon.participants}
                          </span>
                        </div>
                        <span className={`text-xs ${textSecondary}`}>
                          Deadline: {hackathon.deadline}
                        </span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getHackathonStatusColor(hackathon.status)}`}
                      >
                        {hackathon.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <QuickDashboardAction
              mode={mode}
              setActionType={setActionType}
              handleNavigation={handleNavigation}
            />
          </div>
        </div>

      
      </div>
    </div>
  )
}

export default TeacherDashboard