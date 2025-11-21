import React, { useState } from "react";
import { MapPin, Clock, Briefcase, Heart, Building2, Tags, FileText, Share2 } from "lucide-react";
import axiosInstance from "../../../utils/axiosInstance";
import { showSuccess, showError } from '../../../utils/toast.js'
import { useNavigate } from "react-router-dom";
// Job List Card Component
const JobList = ({ job, selectedJob,isSavedPage = false, onSelect, mode }) => {
  const isSelected = selectedJob?.id === job?.id;


  const navigate = useNavigate()
  const handleClick = () => {
    if(isSavedPage) {

      navigate(`/job-listings/${job.id}?${job.title.replace(/\s+/g, '-').toLowerCase()}`);
      return;
    }
    onSelect(job);
  };

  const [isSaved, setIsSaved] = useState(job?.SavedItems?.length > 0);
  const savedItem = async (itemType, itemId) => {
    try {
      const payload = { itemType, itemId }
      const res = await axiosInstance.post('/saved-items/save', payload)
      if (res.data && !isSaved) {
        showSuccess("Saved Successfully")
        setIsSaved(true)
      } else {
        setIsSaved(false)

      }
    } catch (error) {
      const msg = extractErrorMessage(error)
      showError(msg)
    }
  }

  // Theme classes
  const cardBg = mode === "dark" ? "bg-[#1B2E31]" : "bg-white";
  const textPrimary = mode === "dark" ? "text-white" : "text-gray-900";
  const textSecondary = mode === "dark" ? "text-gray-400" : "text-gray-600";
  const borderColor = mode === "dark" ? "border-[#294B4E]" : "border-gray-200";
  const hoverBg = mode === "dark" ? "hover:bg-[#0F1E20]" : "hover:bg-gray-50";
  const tagBg = mode === "dark" ? "bg-[#0F1E20]" : "bg-gray-100";
  const tagText = mode === "dark" ? "text-gray-300" : "text-gray-700";

  return (
    <div
      onClick={handleClick}
      className={`${cardBg} border-2 rounded-xl md:rounded-2xl p-4 md:p-6 cursor-pointer transition-all duration-300 ${isSelected
        ? mode === 'dark'
          ? "border-[#00B2A9] shadow-lg"
          : "border-[#0097B2] shadow-lg"
        : `${borderColor} border ${hoverBg} shadow-sm`
        }`}
    >
      {/* Company Logo + Title + Save & Share */}
      <div className="flex gap-3 md:gap-4 mb-3 md:mb-4">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 ${borderColor} bg-white`}>
          {job.Company?.logo ? (
            <img src={job.Company.logo} alt={job.Company.name} className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <Building2 className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className={`text-base md:text-lg font-semibold ${textPrimary} mb-0.5 line-clamp-1`}>
            {job.title}
          </h3>
          <p className={`text-xs md:text-sm ${textSecondary} line-clamp-1`}>
            {job.Company?.name || "Company Name"}
          </p>
        </div>

        {/* Save & Share Icons */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => savedItem('job', job.id)}
            className={`h-9 w-9 flex items-center justify-center rounded-lg ${hoverBg} ${textSecondary} transition-all`}
            title="Save job"
          >
            <Heart
              className={`w-4 h-4 md:w-5 md:h-5 
            ${isSaved ? "fill-[var(--primary)] text-[var(--primary)]" : ""}
        `}
            />
          </button>

          <button
            onClick={(e) => e.stopPropagation()}
            className={`h-9 w-9 flex items-center justify-center rounded-lg ${hoverBg} ${textSecondary} hover:text-[#0097B2] transition-colors`}
            title="Share job"
          >
            <Share2 className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>

      {/* Location, Type, Posted */}
      <div className="flex flex-wrap gap-2 md:gap-4 mb-3 md:mb-4 text-xs md:text-sm">
        <span className={`flex items-center gap-1 ${textSecondary}`}>
          <MapPin className="w-3.5 h-3.5" />
          {job.location}
        </span>
        <span className={`flex items-center gap-1 ${textSecondary}`}>
          <Briefcase className="w-3.5 h-3.5" />
          {job.jobType}
        </span>
        <span className={`flex items-center gap-1 ${textSecondary}`}>
          <Clock className="w-3.5 h-3.5" />
          {job.postedAt}
        </span>
      </div>

      {/* Description */}
      {job.description && (
        <div className={`mb-3 md:mb-4 flex items-start gap-2 text-xs md:text-sm ${textSecondary} line-clamp-3`}>
          <FileText className={`w-4 h-4 mt-1 ${textSecondary} flex-shrink-0`} />
          <p>{job.description}</p>
        </div>
      )}

      {/* Skills */}
      {job.skills && job.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
          {job.skills.slice(0, 4).map((skill, index) => (
            <span key={index} className={`${tagBg} ${tagText} px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1`}>
              <Tags className="w-3 h-3" />
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className={`${tagBg} ${tagText} px-2 py-1 rounded-md text-xs font-medium`}>
              +{job.skills.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Bottom: Salary + Experience */}
      <div className={`flex items-center justify-between gap-2 pt-3 md:pt-4 border-t ${borderColor}`}>
        <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
          {job.salary && (
            <span className={`text-xs md:text-sm font-semibold ${textPrimary} whitespace-nowrap`}>
              ₹{job.salary}
            </span>
          )}
          {job.experience && (
            <span className={`text-xs ${tagBg} ${tagText} px-2 py-1 rounded whitespace-nowrap`}>
              {job.experience}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobList;