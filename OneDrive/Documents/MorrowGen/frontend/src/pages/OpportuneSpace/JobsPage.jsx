import React, { useEffect, useState } from 'react';
import SearchCard from '../../components/opportuneSpace/jobs/SearchCard';
import JobCard from '../../components/opportuneSpace/jobs/JobCard';
import axios from 'axios';
import jobs from '../../assets/opportuneSpace/dataset_indeed-scraper-task-software-developer_2025-06-16_09-11-53-174.json';
import PreferrenceOption from '../../components/opportuneSpace/jobs/PreferrenceOption';
import JobUploadForm from '../../components/opportuneSpace/jobs/JobUploadForm';
import JobDetails from '../../components/opportuneSpace/jobs/JobDetails';

const JobsPage = () => {
  const [jobData, setJobData] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    role: '',
    experience: '',
    salary: ''
  });

  const preferencesOption = [
    { 
      id: 1, 
      label: 'Preferred job role',
      key: 'role',
      icon: '💼'
    },
    { 
      id: 2, 
      label: 'Preferred work experience',
      key: 'experience', 
      icon: '📊'
    },
    { 
      id: 3, 
      label: 'Preferred job salary',
      key: 'salary',
      icon: '💰'
    },
  ];

  const [openPreferrenceOption, setOpenPreferrenceOption] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  // Filter jobs based on search and preferences
  useEffect(() => {
    let filtered = jobs;

    if (searchQuery) {
      filtered = filtered.filter(job => 
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Add more filtering logic based on selectedFilters if needed
    setFilteredJobs(filtered);
  }, [searchQuery, selectedFilters]);

  const handlePreferenceUpdate = (filterKey, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
  };

  const clearPreference = (filterKey) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterKey]: ''
    }));
  };

  console.log("selectedJob", selectedJob);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2F2F2' }}>
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Find Your Dream Job
              </h1>
              <p className="text-gray-600 mt-1">
                Discover {filteredJobs.length} opportunities waiting for you
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search jobs, companies, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200"
                style={{ 
                  focusRingColor: '#0097B2',
                  '--tw-ring-color': '#0097B2'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row justify-start items-start gap-6 px-4 md:px-6 py-6">
        {/* Jobs List */}
        <div className="flex flex-col gap-4 w-full xl:flex-1 xl:max-w-4xl">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                selectedJob={selectedJob}
                setSelectedJob={setSelectedJob}
              />
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No jobs found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or preferences to find more opportunities.
              </p>
            </div>
          )}
        </div>

        {/* Preferences Sidebar */}
        <div className="w-full xl:w-80 xl:sticky xl:top-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#E0F2F5' }}>
                <svg className="w-5 h-5" style={{ color: '#0097B2' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="font-semibold text-lg text-gray-900">
                Job Preferences
              </h2>
            </div>
            
            <p className="text-sm text-gray-600 mb-6">
              Set your preferences to get personalized job recommendations
            </p>

            <div className="space-y-4">
              {preferencesOption.map((option) => (
                <div key={option.id} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{option.icon}</span>
                      <span className="text-sm font-medium text-gray-700">
                        {option.label}
                      </span>
                    </div>
                  </div>
                  
                  {selectedFilters[option.key] ? (
                    <div className="flex items-center justify-between p-3 rounded-lg border-2 transition-colors duration-200" 
                         style={{ 
                           borderColor: '#0097B2',
                           backgroundColor: '#E0F2F5'
                         }}>
                      <span className="text-sm font-medium" style={{ color: '#0097B2' }}>
                        {selectedFilters[option.key]}
                      </span>
                      <button
                        onClick={() => clearPreference(option.key)}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setOpenPreferrenceOption(option.id)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 text-gray-600 font-medium hover:border-gray-400 hover:text-gray-700 transition-colors duration-200 text-sm group-hover:border-gray-400"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Preference
                      </span>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F2F2F2' }}>
                  <div className="text-xl font-bold" style={{ color: '#0097B2' }}>
                    {filteredJobs.length}
                  </div>
                  <div className="text-xs text-gray-600">Jobs Found</div>
                </div>
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F2F2F2' }}>
                  <div className="text-xl font-bold" style={{ color: '#00B2A9' }}>
                    {Object.values(selectedFilters).filter(Boolean).length}
                  </div>
                  <div className="text-xs text-gray-600">Active Filters</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preference Modal */}
      {openPreferrenceOption && (
        <PreferrenceOption
          id={openPreferrenceOption}
          isOpen={openPreferrenceOption !== null}
          onClose={() => setOpenPreferrenceOption(null)}
          onUpdate={handlePreferenceUpdate}
          currentValue={selectedFilters[preferencesOption.find(p => p.id === openPreferrenceOption)?.key || '']}
        />
      )}
    </div>
  );
};

export default JobsPage;