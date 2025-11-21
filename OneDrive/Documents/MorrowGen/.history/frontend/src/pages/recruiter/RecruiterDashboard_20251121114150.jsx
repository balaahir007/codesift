<<<<<<< HEAD
import React from 'react'
import RecruiterStatsCardGrid from '../../card/recruiter/RecruiterStatsCardGrid'
import useThemeStore from '../../zustand/themeStore'
import RecentJobsCard from '../../card/recruiter/RecentJobsCard'
import QuickDashboardAction from '../../card/recruiter/QuickDashboardAction'
import { useNavigate, useOutletContext } from 'react-router-dom';

const RecruiterDashboard = () => {
const stats = [
    {
      title: 'Total Jobs',
      count: 25,
      positive: true,
      percentage: '25'
    },
    {
      title: 'Application',
      count: 155,
      positive: false,
      percentage: '15'
    },
    {
      title: 'Interviews',
      count: 50,
      positive: true,
      percentage: '20'
    },
    {
      title: 'Hires',
      count: 10,
      positive: true,
      percentage: '10'
    },
  ]

  const recentJobs = [
  {
    title: "Frontend Developer",
    department: "Engineering",
    status: "Active",
    applications: 42,
    datePosted: "Nov 1, 2025",
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    status: "Active",
    applications: 25,
    datePosted: "Oct 29, 2025",
  },
  {
    title: "Backend Engineer",
    department: "Engineering",
    status: "Closed",
    applications: 68,
    datePosted: "Oct 20, 2025",
  },
  {
    title: "HR Recruiter",
    department: "Human Resources",
    status: "On Hold",
    applications: 15,
    datePosted: "Oct 15, 2025",
  },
  {
    title: "Marketing Intern",
    department: "Marketing",
    status: "Active",
    applications: 31,
    datePosted: "Oct 10, 2025",
  },
];
  const { handleJobNavigation, openCompanyModel, setCompanyModel } = useOutletContext();

  const {mode} = useThemeStore()
  return (
    <div className='p-2'>
      <div>
        <h1 className={` font-bold text-xl ${mode === 'dark' ? 'text-white' : 'text-black'}`}>DashBoard</h1>
        <RecruiterStatsCardGrid mode={mode} stats={stats} />
        <RecentJobsCard mode={mode} jobs={recentJobs} />
        <QuickDashboardAction mode={mode} handleJobNavigation={handleJobNavigation} />
      </div>
    </div>
  )
}

export default RecruiterDashboard
=======
// src/pages/RecruiterDashboard.jsx
import React from "react";

const RecruiterDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recruiter Dashboard</h1>
      <p className="text-gray-600 mb-4">
        Manage your recruiter activities — post opportunities, review applicants, and more.
      </p>

      <div className="space-y-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Add New Opportunity
        </button>

        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="font-semibold text-lg">Example Opportunity</h2>
          <p className="text-gray-500 text-sm">Posted 2 days ago</p>
          <div className="mt-3 flex gap-2">
            <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Edit</button>
            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
>>>>>>> e1bb11e (update some Ui)
