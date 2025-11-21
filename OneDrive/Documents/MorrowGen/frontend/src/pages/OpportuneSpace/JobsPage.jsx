import React, { useEffect, useState } from 'react';
import {
  Search,
  MapPin
} from 'lucide-react';
import useThemeStore from '../../zustand/themeStore';
import JobList from '../../components/opportuneSpace/jobs/JobList';
import useJobStore from '../../zustand/recruiter/useJobStore';
import SelectedJob from '../../components/opportuneSpace/jobs/SelectedJob';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../zustand/auth/useAuthStore';

const JobsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get('jobId');
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const [selectedFilters, setSelectedFilters] = useState({
    role: '',
    experience: '',
    salary: '',
    location: '',
    jobType: ''
  });

  const { mode } = useThemeStore();
  const { publicJobs, fetchJobs } = useJobStore();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const bgPrimary = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-white';


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const getAllJobs = async () => {
      await fetchJobs();
    };
    getAllJobs();
  }, []);

  useEffect(() => {
    if (jobId && publicJobs.length > 0) {
      const job = publicJobs.find(j => j.id === jobId);
      if (job) setSelectedJob(job);
    }
  }, [jobId, publicJobs]);


  
  useEffect(() => {
    let filtered = publicJobs || [];
    if (searchQuery) {
      filtered = filtered.filter(
        job =>
          job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.Company?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(job =>
          (job[key] || '').toString().toLowerCase().includes(value.toLowerCase())
        );
      }
    });
    setFilteredJobs(filtered);
  }, [searchQuery, selectedFilters, publicJobs]);

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    if (isMobile) navigate(`/job-listings/${job.id}`);
    else navigate(`/jobs?jobId=${job.id}`, { state: { selectedJob: job } });
  };

  const handleApplyNavigate = (jobId) => {
    if(!authUser){
      navigate(`/login`);
    }else{
      navigate(`/apply/${jobId}`);
    }
  };

  const clearAllFilters = () => {
    setSelectedFilters({ role: '', experience: '', salary: '', location: '', jobType: '' });
    setSearchQuery('');
  };

    const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)
    const { authUser } = useAuthStore()
    useEffect(() => {
        const userId = authUser?.id;
        const hasApplied = selectedJob?.Applications?.some(app => app.userId === userId);
        setIsAlreadyApplied(hasApplied)
    }, [selectedJob, authUser])

  return (
    <div className={`min-h-screen transition-colors duration-300 bg-backGray`}>
      <div className={`relative top-4 z-40 bg-opacity-90 ${borderColor}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
          <div className="flex flex-col md:flex-row gap-2 w-full">
            <div className="relative flex-1">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${textSecondary}`} />
              <input
                type="text"
                placeholder="Job title, company, or keywords..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl ${cardBg} border ${borderColor} ${textPrimary} placeholder-gray-500 focus:ring-2 focus:ring-[#0097B2]/30 focus:border-[#0097B2] transition-all outline-none`}
              />
            </div>

            <div className="relative flex-1">
              <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${textSecondary}`} />
              <input
                type="text"
                placeholder="Location..."
                value={selectedFilters.location}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, location: e.target.value }))}
                className={`w-full pl-12 pr-4 py-3 rounded-xl ${cardBg} border ${borderColor} ${textPrimary} placeholder-gray-400 focus:ring-2 focus:ring-[#0097B2]/20 focus:border-[#0097B2] transition-all outline-none`}
              />
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={fetchJobs}
                className="w-full md:w-auto px-4 py-3 rounded-xl font-semibold text-white bg-[#0097B2] hover:bg-[#007d94] transition-colors"
              >
                Search Jobs
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'} gap-8`}>
          <div className={isMobile ? 'col-span-1' : 'lg:col-span-1'}>
            {filteredJobs.length > 0 ? (
              <div className='flex flex-col space-y-4'>
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
            ) : (
              <div className={`${bgPrimary} rounded-2xl border ${borderColor} shadow-sm p-16 text-center`}>
                <h3 className={`text-2xl font-bold ${textPrimary} mb-2`}>No jobs found</h3>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white rounded-lg hover:shadow-lg hover:shadow-[#0097B2]/30 transition-all font-medium"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {!isMobile && (
            <div className="lg:col-span-2">
              <SelectedJob
                jobId={jobId}
                hasApplied={isAlreadyApplied}
                jobData={selectedJob}
                onApplyClick={() => handleApplyNavigate(jobId)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
