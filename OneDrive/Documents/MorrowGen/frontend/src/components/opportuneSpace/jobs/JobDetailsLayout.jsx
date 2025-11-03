import React from "react";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaStar,
} from "react-icons/fa";

const JobDetailsLayout = ({
  job,
  showFullDescription,
  onToggleDescription,
}) => {
  if (!job) return null;

  const {
    positionName,
    company,
    location,
    salary,
    postedAt,
    description,
    rating = 0,
    reviewsCount = 0,
    externalApplyLink,
    companyInfo = {},
  } = job;

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full px-4 md:px-12 lg:px-20 py-8">
      
      {/* Job Details Card */}
      <div className="bg-white w-full lg:w-2/3 rounded-xl shadow-xl p-6">
        {/* Header */}
        <div className="flex items-start gap-4 border-b pb-4 mb-4">
          {companyInfo.companyLogo && (
            <img
              src={companyInfo.companyLogo}
              alt="Company Logo"
              className="w-16 h-16 object-contain rounded border"
            />
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{positionName}</h2>
            <p className="text-blue-600 text-sm">{company}</p>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
              <FaMapMarkerAlt className="text-gray-500" />
              {location}
            </div>
          </div>
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
          <div className="flex items-center gap-2">
            <FaBriefcase className="text-blue-500" />
            <span>2–4 years experience</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-green-500" />
            <span>{salary || "Not Disclosed"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            <span>
              {rating} ({reviewsCount} reviews)
            </span>
          </div>
          <div className="text-gray-500">
            <strong>Posted on:</strong> {postedAt}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-gray-800">Job Description</h3>
          {(showFullDescription ? description : description?.slice(0, 500))
            ?.split("\n")
            .map((line, index) => (
              <p key={index} className="mb-2 text-sm text-gray-700">
                {line}
              </p>
            ))}
          {description?.length > 500 && (
            <button
              onClick={onToggleDescription}
              className="text-blue-600 text-sm mt-2 hover:underline"
            >
              {showFullDescription ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        {/* Apply Button */}
        <div className="flex justify-end">
          <a
            href={externalApplyLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Apply Now
          </a>
        </div>
      </div>

      {/* Recommended Jobs Section */}
      <div className="bg-white w-full lg:w-1/3 rounded-xl shadow-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Jobs</h3>
        {/* Add recommended job cards here */}
        <p className="text-sm text-gray-500">No recommended jobs available.</p>
      </div>
    </div>
  );
};

export default JobDetailsLayout;
