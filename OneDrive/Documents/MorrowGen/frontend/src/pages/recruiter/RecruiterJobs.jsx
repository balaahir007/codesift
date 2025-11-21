import React, { useState } from 'react';
import { Briefcase, Search, Filter } from 'lucide-react';
import JobCard from '../../card/recruiter/JobCard'
import useThemeStore from '../../zustand/themeStore';
import { useNavigate, useOutletContext } from 'react-router-dom';
import useJobStore from '../../zustand/recruiter/useJobStore';
import JobDetailsView from '../../card/recruiter/JobDetailsView'

import { useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import CompanyFormModal from '../../card/recruiter/CompanyModal';
import uploadFile from '../../utils/uploadFile';
import { toast } from 'react-toastify';
const RecruiterJobs = () => {
  const { mode } = useThemeStore()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const { fetchRecruiterJobs, jobs } = useJobStore()
  // const jobs = [
  //   {
  //     id: 1,
  //     title: 'Senior Frontend Developer',
  //     company: 'TechCorp Inc.',
  //     location: 'San Francisco, CA',
  //     type: 'Full-time',
  //     salary: '$120k - $160k',
  //     applicants: 45,
  //     posted: '2 days ago',
  //     tags: ['React', 'TypeScript', 'Tailwind'],
  //     status: 'active'
  //   },
  //   {
  //     id: 2,
  //     title: 'UX/UI Designer',
  //     company: 'DesignHub',
  //     location: 'Remote',
  //     type: 'Contract',
  //     salary: '$80k - $110k',
  //     applicants: 32,
  //     posted: '5 days ago',
  //     tags: ['Figma', 'Design Systems', 'Prototyping'],
  //     status: 'active'
  //   },
  //   {
  //     id: 3,
  //     title: 'Backend Engineer',
  //     company: 'DataFlow Systems',
  //     location: 'New York, NY',
  //     type: 'Full-time',
  //     salary: '$130k - $170k',
  //     applicants: 58,
  //     posted: '1 week ago',
  //     tags: ['Node.js', 'MongoDB', 'AWS'],
  //     status: 'active'
  //   },
  //   {
  //     id: 4,
  //     title: 'Product Manager',
  //     company: 'InnovateLabs',
  //     location: 'Austin, TX',
  //     type: 'Full-time',
  //     salary: '$110k - $145k',
  //     applicants: 23,
  //     posted: '3 days ago',
  //     tags: ['Agile', 'Strategy', 'Analytics'],
  //     status: 'active'
  //   },
  //   {
  //     id: 5,
  //     title: 'DevOps Engineer',
  //     company: 'CloudTech Solutions',
  //     location: 'Seattle, WA',
  //     type: 'Part-time',
  //     salary: '$95k - $125k',
  //     applicants: 41,
  //     posted: '4 days ago',
  //     tags: ['Kubernetes', 'Docker', 'CI/CD'],
  //     status: 'active'
  //   },
  //   {
  //     id: 6,
  //     title: 'Data Scientist',
  //     company: 'AI Dynamics',
  //     location: 'Boston, MA',
  //     type: 'Full-time',
  //     salary: '$140k - $180k',
  //     applicants: 67,
  //     posted: '1 day ago',
  //     tags: ['Python', 'Machine Learning', 'TensorFlow'],
  //     status: 'active'
  //   }
  // ];

  useEffect(() => {
    if (Object.keys(jobs).length > 0) return;
    const getAllJobs = async () => {
      await fetchRecruiterJobs()
    }
    getAllJobs()
  }, [])
  console.log("job Data : ", jobs)

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || job.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleJobNavigation, openCompanyModel, setCompanyModel } = useOutletContext();

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleSubmitCompanyInfo = async(data)=>{
    try {
      const {logo} = data;
      const logoUrl = await uploadFile(logo)
      const payload = {
        ...data,
        logo : logoUrl
      }
      await axiosInstance.post('/company',payload)
      
    } catch (error) {
      toast.error(error.message ||'failed to Register a company')
    }
  }
  return (
    <div className={`min-h-screen transition-all duration-300 bg-backGray`}>

      {
        openCompanyModel && (
          <CompanyFormModal isOpen={openCompanyModel} onClose={()=>setCompanyModel((prev)=> !prev)}  onSubmit={handleSubmitCompanyInfo} />
        )
      }
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="mb-6">
            <h1 className={`text-3xl md:text-4xl font-semibold mb-1 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Your Job Posts
            </h1>
            <p className={`text-base md:text-lg ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              View, manage, and track all your active listings in one place.
            </p>
          </div>

          <div>
            <button className='text-white bg-primary p-2 hover:bg-secondary duration-300 rounded-md cursor-pointer '
              onClick={() => handleJobNavigation()}
            >
              Post a Job
            </button>
          </div>
        </div>



        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
              <input
                type="text"
                placeholder="Search jobs by title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl transition-all duration-300 outline-none ${mode === 'dark'
                  ? 'bg-[#1B2E31] border-2 border-[#294B4E] focus:border-[#00B2A9] text-white placeholder-gray-500'
                  : 'bg-white border-2 border-gray-200 focus:border-[#0097B2] text-gray-900 placeholder-gray-400 shadow-sm'
                  }`}
              />
            </div>
            <div className="relative">
              <Filter className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={`pl-12 pr-10 py-3 rounded-xl transition-all duration-300 outline-none appearance-none cursor-pointer ${mode === 'dark'
                  ? 'bg-[#1B2E31] border-2 border-[#294B4E] focus:border-[#00B2A9] text-white'
                  : 'bg-white border-2 border-gray-200 focus:border-[#0097B2] text-gray-900 shadow-sm'
                  }`}
              >
                <option value="all">All Types</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} mode={mode} onView={() => handleViewJob(job)} />
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className={`text-center py-16 rounded-xl ${mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white shadow-sm'
            }`}>
            <Briefcase className={`w-16 h-16 mx-auto mb-4 ${mode === 'dark' ? 'text-gray-600' : 'text-gray-300'
              }`} />
            <h3 className={`text-xl font-semibold mb-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
              No jobs found
            </h3>
            <p className={`${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
      {
        selectedJob && (
          <JobDetailsView
            job={selectedJob}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            mode={mode}
          />
        )
      }
    </div>
  );
};

export default RecruiterJobs;