
import React, { useEffect, useState } from 'react';
import { Bookmark, Briefcase, Code2, Filter, X } from 'lucide-react';
import HackathonCard from '../../card/teacher/HackathonCard';
import JobList from '../../components/opportuneSpace/jobs/JobList';
import useThemeStore from '../../zustand/themeStore';
import axiosInstance from '../../utils/axiosInstance';
import JobCard from '../../card/recruiter/JobCard';

const SavedPage = () => {
  const { mode } = useThemeStore()
  const [activeTab, setActiveTab] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);
  const [expandedFilters, setExpandedFilters] = useState({});

  // Mock data
  const savedHackathons = [
    { id: 1, title: 'AI Innovation Challenge', date: 'Dec 15-17, 2024', description: 'Build innovative AI solutions' },
    { id: 2, title: 'Web3 Hackathon', date: 'Jan 20-22, 2025', description: 'Decentralized app development' },
    { id: 3, title: 'HealthTech Sprint', date: 'Feb 5-7, 2025', description: 'Healthcare technology solutions' }
  ];

  const savedJobs = [
    { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp', location: 'Remote', type: 'Full-time' },
    { id: 2, title: 'Backend Engineer', company: 'StartupXYZ', location: 'San Francisco', type: 'Full-time' },
    { id: 3, title: 'Full Stack Developer', company: 'InnovateLab', location: 'New York', type: 'Contract' },
    { id: 4, title: 'UI/UX Designer', company: 'DesignHub', location: 'Remote', type: 'Part-time' }
  ];

  // Theme colors
  const bgPrimary = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-white';
  const bgSecondary = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-gray-50';
  const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const hoverBg = mode === 'dark' ? 'hover:bg-[#294B4E]' : 'hover:bg-gray-100';

  const filteredHackathons = activeTab === 'all' || activeTab === 'hackathons' ? savedHackathons : [];
  const filteredJobs = activeTab === 'all' || activeTab === 'jobs' ? savedJobs : [];

  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  const [savedItems, setSavedItems] = useState([])
  useEffect(() => {
    const fetchSavedItems = async () => {
      try {
        const res = await axiosInstance.get('/saved-items/save');
        console.log("Saved Items : ", res.data?.data)
        setSavedItems(res.data?.data || [])
      } catch (error) {

      }
    }
    fetchSavedItems()
  }, [])

  const [jobItem, setJobItem] = useState([])
  const [hackItem, setHackItem] = useState([])

  useEffect(() => {
    const jobs = []
    const hacks = []

    savedItems.forEach((item) => {
      if (item.itemType === 'job') jobs.push(item?.jobDetails || [])
      else if (item.itemType === 'hackathon') hacks.push(item?.hackathonDetails || [])
    })
    setJobItem(jobs)
    setHackItem(hacks)
  }, [savedItems])

  return (
    <div className={`min-h-screen bg-backGray transition-colors duration-300`}>
      {/* Header */}
      <div className={`${bgSecondary} ${borderColor} border-b sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bookmark className={`w-8 h-8 ${textPrimary}`} />
              <h1 className={`text-3xl font-bold ${textPrimary}`}>Saved Items</h1>
            </div>


          </div>

          {/* Stats */}
          <div className="mt-6 flex gap-4 items-center">
            <div className={`${bgPrimary} ${borderColor} border rounded-lg px-4 py-2`}>
              <span className={`${textSecondary} text-sm`}>Saved</span>
              <p className={`${textPrimary} text-2xl font-bold`}>
                {hackItem.length + jobItem.length}              </p>
            </div>
            <div className={`${bgPrimary} ${borderColor} border rounded-lg px-4 py-2`}>
              <span className={`${textSecondary} text-sm`}>Hackathons</span>
              <p className={`${textPrimary} text-2xl font-bold`}>{hackItem.length}</p>
            </div>
            <div className={`${bgPrimary} ${borderColor} border rounded-lg px-4 py-2`}>
              <span className={`${textSecondary} text-sm`}>Jobs</span>
              <p className={`${textPrimary} text-2xl font-bold`}>{jobItem.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="md:max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div
          className={`${bgSecondary} ${borderColor} w-full border rounded-lg p-1 mb-8 
    inline-flex gap-1 
    flex-wrap 
    sm:flex-nowrap`}
        >
          {/* All */}
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 px-4 py-2 rounded-md transition-colors text-sm sm:text-base
      ${activeTab === "all"
                ? mode === "dark"
                  ? "bg-[#0F1E20] text-white"
                  : "bg-white text-gray-900 shadow-sm"
                : textSecondary
              }
    `}
          >
            All 
          </button>

          {/* Hackathons */}
          <button
            onClick={() => setActiveTab("hackathons")}
            className={`flex-1 px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2 text-sm sm:text-base
      ${activeTab === "hackathons"
                ? mode === "dark"
                  ? "bg-[#0F1E20] text-white"
                  : "bg-white text-gray-900 shadow-sm"
                : textSecondary
              }
    `}
          >
            Hackathons
          </button>

          {/* Jobs */}
          <button
            onClick={() => setActiveTab("jobs")}
            className={`flex-1 px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2 text-sm sm:text-base
      ${activeTab === "jobs"
                ? mode === "dark"
                  ? "bg-[#0F1E20] text-white"
                  : "bg-white text-gray-900 shadow-sm"
                : textSecondary
              }
    `}
          >
            Jobs
          </button>
        </div>


        {/* Hackathons Section */}
        {(activeTab === 'all' || activeTab === 'hackathons')  && hackItem.length > 0 && (
          <div className="mb-12">
            <h2 className={`text-2xl font-bold ${textPrimary} mb-4 flex items-center gap-2`}>
              <Code2 className="w-6 h-6" />
              Saved Hackathons
            </h2>
            <HackathonCard
              filteredHackathons={hackItem}
              mode={mode}
              filters={expandedFilters}
            />
          </div>
        )}

        {/* Jobs Section */}
        {(activeTab === 'all' || activeTab === 'jobs') && jobItem.length > 0 && (
          <div>
            <h2 className={`text-2xl font-bold ${textPrimary} mb-4 flex items-center gap-2`}>
              <Briefcase className="w-6 h-6" />
              Saved Jobs
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {jobItem.map((job) => (
                <JobList
                  mode={mode}
                  key={job.id}
                  job={job}
                  isSavedPage={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredHackathons.length === 0 && filteredJobs.length === 0 && (
          <div className={`text-center py-16 ${bgSecondary} rounded-lg ${borderColor} border`}>
            <Bookmark className={`w-16 h-16 ${textSecondary} mx-auto mb-4`} />
            <h3 className={`text-xl font-semibold ${textPrimary} mb-2`}>
              No saved items yet
            </h3>
            <p className={`${textSecondary}`}>
              Start saving hackathons and jobs to see them here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPage;
