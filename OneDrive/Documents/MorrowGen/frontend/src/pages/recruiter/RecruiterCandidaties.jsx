import React, { useEffect, useState } from 'react';
import useThemeStore from '../../zustand/themeStore';
import CandidateFilterBar from '../../card/recruiter/CandidateFilterBar'
import CandidateListSkeleton from '../../card/recruiter/CandidateListSkeleton';
import CandidateList from '../../card/recruiter/CandidateList';
import axiosInstance from '../../utils/axiosInstance';
const RecruiterCandidates = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const { mode } = useThemeStore();

  const [allJobs, setAllJobs] = useState([]); // Store original jobs data
  const [filterCandidates, setFilterCandidates] = useState([]);
  const[loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true)
      try {
        const res = await axiosInstance.get('/application');
        console.log("Application Data:", res.data);

        if (res?.data?.length) {
          // Store all jobs with their applications
          setAllJobs(res.data);
          setFilterCandidates(res.data);
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }finally{
        setLoading(false)
      }
    };
    fetchCandidates();
  }, []);

  const onFilter = (filteredData) => {
    const { stage, location, experience, search } = filteredData;

    // Filter jobs and their applications
    let filtered = allJobs.map(job => ({
      ...job,
      Applications: job.Applications.filter(candidate => {
        // Search filter
        if (search) {
          const searchLower = search.toLowerCase();
          const matchesSearch =
            candidate.fullName?.toLowerCase().includes(searchLower) ||
            candidate.email?.toLowerCase().includes(searchLower) ||
            candidate.currentCompany?.toLowerCase().includes(searchLower);
          if (!matchesSearch) return false;
        }

        // Stage filter
        if (stage) {
          if (candidate.status?.toLowerCase() !== stage.toLowerCase()) {
            return false;
          }
        }

        // Location filter
        if (location) {
          if (!candidate.location?.toLowerCase().includes(location.toLowerCase())) {
            return false;
          }
        }

        // Experience filter
        if (experience) {
          if (!candidate.experience?.toString().includes(experience)) {
            return false;
          }
        }

        return true;
      })
    })).filter(job => job.Applications.length > 0); // Only show jobs with matching applications

    setFilterCandidates(filtered);
  };

  const bgClass = mode === 'dark' ? "bg-backGray" : "bg-backGray";

  return (
    <div className={`min-h-screen ${bgClass} transition-all duration-300`}>
      <div className="mb-6">
        <h1
          className={`text-2xl sm:text-3xl font-bold ${mode === "dark" ? "text-white" : "text-gray-800"
            }`}
        >
          Candidate Directory
        </h1>
        <p
          className={`text-sm sm:text-base mt-1 ${mode === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
        >
          Search and filter candidates by skills, experience, and more.
        </p>
      </div>
      <CandidateFilterBar onFilter={onFilter} />
      {
        loading ? (
          <CandidateListSkeleton mode={mode} />
        ) : (

          <CandidateList jobs={filterCandidates} selectedCandidate={selectedCandidate} setSelectedCandidate={setSelectedCandidate} mode={mode} />
        )
      }
    </div>
  );
};

export default RecruiterCandidates;