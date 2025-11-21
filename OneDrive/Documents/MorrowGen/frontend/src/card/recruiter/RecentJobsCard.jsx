// src/components/recruiter/RecentJobsCard.jsx
import React from "react";

const RecentJobsCard = ({ jobs, mode }) => {
  return (
    <div
      className={`p-4 rounded-2xl shadow-sm mt-4
      ${mode === "dark" ? "text-white" : "text-black"}`}
    >
      <h2 className="font-bold text-xl mb-4">Recent Job Posts</h2>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr
              className={`text-left font-semibold border-b 
              ${mode === "dark" ? "border-gray-700" : "border-gray-300"}`}
            >
              <th className="py-2 pr-4">Job Title</th>
              <th className="py-2 pr-4">Department</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Applications</th>
              <th className="py-2">Date Posted</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, idx) => (
              <tr
                key={idx}
                className={`border-b hover:opacity-80 transition 
                ${mode === "dark" ? "border-gray-700" : "border-gray-200"}`}
              >
                <td className="py-3 pr-4">{job.title}</td>
                <td className="py-3 pr-4 text-primary">{job.department}</td>
                <td
                  className={`py-3 pr-4 font-medium ${
                    job.status === "Active"
                      ? "text-green-600"
                      : job.status === "Closed"
                      ? "text-red-600"
                      : "text-yellow-500"
                  }`}
                >
                  {job.status}
                </td>
                <td className="py-3 pr-4 text-primary ">{job.applications}</td>
                <td className="py-3 text-primary" >{job.datePosted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {jobs.map((job, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border transition hover:opacity-80
            ${mode === "dark" ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50"}`}
          >
            {/* Job Title */}
            <h3 className="font-semibold text-base mb-2">{job.title}</h3>

            {/* Job Details Grid */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className={mode === "dark" ? "text-gray-400" : "text-gray-600"}>
                  Department:
                </span>
                <span className="font-medium">{job.department}</span>
              </div>

              <div className="flex justify-between">
                <span className={mode === "dark" ? "text-gray-400" : "text-gray-600"}>
                  Status:
                </span>
                <span
                  className={`font-medium ${
                    job.status === "Active"
                      ? "text-green-600"
                      : job.status === "Closed"
                      ? "text-red-600"
                      : "text-yellow-500"
                  }`}
                >
                  {job.status}
                </span>
              </div>

              <div className="flex justify-between">
                <span className={mode === "dark" ? "text-gray-400" : "text-gray-600"}>
                  Applications:
                </span>
                <span className="font-medium">{job.applications}</span>
              </div>

              <div className="flex justify-between">
                <span className={mode === "dark" ? "text-gray-400" : "text-gray-600"}>
                  Date Posted:
                </span>
                <span className="font-medium">{job.datePosted}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-8">
          <p className={mode === "dark" ? "text-gray-400" : "text-gray-600"}>
            No recent job posts found.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentJobsCard;