import React, { useState } from 'react';
import { Bookmark, Briefcase, Code2, Filter, X } from 'lucide-react';

// Mock Card Components (replace with your actual imports)
const HackathonCard = ({ filteredHackathons, mode, filters }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {filteredHackathons.map((hackathon) => {
      const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
      const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
      const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
      
      return (
        <div key={hackathon.id} className={`${cardBg} ${borderColor} border rounded-lg p-4 hover:shadow-lg transition-shadow`}>
          <h3 className={`${textPrimary} font-semibold text-lg mb-2`}>{hackathon.title}</h3>
          <p className="text-gray-500 text-sm mb-2">{hackathon.date}</p>
          <p className={`${textPrimary} text-sm`}>{hackathon.description}</p>
        </div>
      );
    })}
  </div>
);

const JobList = ({ mode, job, onSelect, selectedJob }) => {
  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  
  return (
    <div 
      onClick={() => onSelect(job)}
      className={`${cardBg} ${borderColor} border rounded-lg p-4 mb-3 cursor-pointer hover:shadow-lg transition-all ${selectedJob?.id === job.id ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className={`${textPrimary} font-semibold text-lg mb-1`}>{job.title}</h3>
          <p className={`${textSecondary} text-sm mb-2`}>{job.company}</p>
          <div className="flex flex-wrap gap-2">
            <span className={`${textSecondary} text-xs px-2 py-1 rounded ${mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-100'}`}>
              {job.location}
            </span>
            <span className={`${textSecondary} text-xs px-2 py-1 rounded ${mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-100'}`}>
              {job.type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SavedPage = () => {
  const [mode, setMode] = useState('dark');
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

  return (
    <div className={`min-h-screen ${bgPrimary} transition-colors duration-300`}>
      {/* Header */}
      <div className={`${bgSecondary} ${borderColor} border-b sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bookmark className={`w-8 h-8 ${textPrimary}`} />
              <h1 className={`text-3xl font-bold ${textPrimary}`}>Saved Items</h1>
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
              className={`px-4 py-2 rounded-lg ${bgPrimary} ${borderColor} border ${textPrimary} ${hoverBg} transition-colors`}
            >
              {mode === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>

          {/* Stats */}
          <div className="mt-6 flex gap-4">
            <div className={`${bgPrimary} ${borderColor} border rounded-lg px-4 py-2`}>
              <span className={`${textSecondary} text-sm`}>Total Saved</span>
              <p className={`${textPrimary} text-2xl font-bold`}>
                {savedHackathons.length + savedJobs.length}
              </p>
            </div>
            <div className={`${bgPrimary} ${borderColor} border rounded-lg px-4 py-2`}>
              <span className={`${textSecondary} text-sm`}>Hackathons</span>
              <p className={`${textPrimary} text-2xl font-bold`}>{savedHackathons.length}</p>
            </div>
            <div className={`${bgPrimary} ${borderColor} border rounded-lg px-4 py-2`}>
              <span className={`${textSecondary} text-sm`}>Jobs</span>
              <p className={`${textPrimary} text-2xl font-bold`}>{savedJobs.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className={`${bgSecondary} ${borderColor} border rounded-lg p-1 inline-flex gap-1 mb-8`}>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-md transition-colors ${
              activeTab === 'all'
                ? mode === 'dark'
                  ? 'bg-[#0F1E20] text-white'
                  : 'bg-white text-gray-900 shadow-sm'
                : textSecondary
            }`}
          >
            All ({savedHackathons.length + savedJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('hackathons')}
            className={`px-6 py-2 rounded-md transition-colors flex items-center gap-2 ${
              activeTab === 'hackathons'
                ? mode === 'dark'
                  ? 'bg-[#0F1E20] text-white'
                  : 'bg-white text-gray-900 shadow-sm'
                : textSecondary
            }`}
          >
            <Code2 className="w-4 h-4" />
            Hackathons ({savedHackathons.length})
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-2 rounded-md transition-colors flex items-center gap-2 ${
              activeTab === 'jobs'
                ? mode === 'dark'
                  ? 'bg-[#0F1E20] text-white'
                  : 'bg-white text-gray-900 shadow-sm'
                : textSecondary
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Jobs ({savedJobs.length})
          </button>
        </div>

        {/* Hackathons Section */}
        {filteredHackathons.length > 0 && (
          <div className="mb-12">
            <h2 className={`text-2xl font-bold ${textPrimary} mb-4 flex items-center gap-2`}>
              <Code2 className="w-6 h-6" />
              Saved Hackathons
            </h2>
            <HackathonCard 
              filteredHackathons={filteredHackathons} 
              mode={mode} 
              filters={expandedFilters} 
            />
          </div>
        )}

        {/* Jobs Section */}
        {filteredJobs.length > 0 && (
          <div>
            <h2 className={`text-2xl font-bold ${textPrimary} mb-4 flex items-center gap-2`}>
              <Briefcase className="w-6 h-6" />
              Saved Jobs
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredJobs.map((job) => (
                <JobList
                  mode={mode}
                  key={job.id}
                  job={job}
                  onSelect={handleJobSelect}
                  selectedJob={selectedJob}
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