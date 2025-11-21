import React from "react";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaStar,
  FaBuilding,
} from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job, selectedJob, setSelectedJob }) => {
  const isSelected = selectedJob?.id === job.id;
  const navigate = useNavigate();

  const {
    positionName,
    company,
    location,
    salary,
    postedAt,
    externalApplyLink,
    description,
    rating = 0,
    reviewsCount = 0,
    companyInfo = {},
    jobType = [],
  } = job;

  const jobLabel = postedAt || "Recently Posted";
  const displaySalary = salary && salary !== "None" ? salary : "Not Disclosed";
  const jobTypeDisplay = jobType.length > 0 ? jobType[0] : "Full-time";

  const handleCardClick = () => {
    navigate(`/job-listings/${job.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`relative bg-white rounded-lg border border-gray-200 p-4 mb-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 ${
        isSelected ? "ring-2 ring-blue-500 shadow-lg" : "shadow-sm"
      }`}
    >
      <div className="flex gap-4">
        {/* Company Logo/Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
            {companyInfo.companyLogo ? (
              <img
                src={companyInfo.companyLogo}
                alt={`${company} logo`}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaBuilding className="text-gray-400 text-xl" />
            )}
          </div>
        </div>

        {/* Job Content */}
        <div className="flex-1 min-w-0">
          {/* Job Title and Company */}
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 line-clamp-2">
              {positionName}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{company}</p>
          </div>

          {/* Job Details */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-gray-400 text-xs" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaBriefcase className="text-gray-400 text-xs" />
              <span>{jobTypeDisplay}</span>
            </div>
            {displaySalary !== "Not Disclosed" && (
              <div className="flex items-center gap-1">
                <FaMoneyBillWave className="text-gray-400 text-xs" />
                <span>{displaySalary}</span>
              </div>
            )}
          </div>

          {/* Job Description */}
          <div className="text-sm text-gray-700 mb-3">
            <p className="line-clamp-3">
              {description?.slice(0, 200)}
              {description?.length > 200 && "..."}
            </p>
          </div>

          {/* Company Rating */}
          {rating > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
              <FaStar className="text-yellow-500" />
              <span>{rating}</span>
              {reviewsCount > 0 && (
                <span className="text-gray-500">({reviewsCount} reviews)</span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-500">{jobLabel}</span>
            <div className="flex gap-2">
              <button 
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 hover:border-gray-300 transition-all duration-200"
              >
                <CiBookmark className="text-sm" />
                Save
              </button>
              <a
                href={externalApplyLink || job.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Apply
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
