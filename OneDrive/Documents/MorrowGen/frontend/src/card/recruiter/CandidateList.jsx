import React, { useState } from 'react';
import { Mail, Phone, Briefcase, MapPin, Calendar, FileText, ChevronDown, ChevronUp, ExternalLink, Check, X } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';

export default function CandidateList({ jobs = [], mode = 'light' }) {
  const [expandedApplications, setExpandedApplications] = useState({});
  const [loadingAction, setLoadingAction] = useState(null);

  const toggleExpand = (id) => {
    setExpandedApplications(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const statusColors = {
    applied: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    screening: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    interview: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    offer: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };

  const handleApplicationAction = async (applicationId, newStatus) => {
    try {
      setLoadingAction(applicationId);
      const res = await axiosInstance.patch(`/application/${applicationId}`, {
        status: newStatus
      });
      console.log(`Application ${newStatus}:`, res.data);
      // Optionally refresh the list or show a toast notification
      alert(`Application ${newStatus} successfully!`);
    } catch (error) {
      console.error(`Error updating application status:`, error);
      alert('Failed to update application status');
    } finally {
      setLoadingAction(null);
    }
  };

  if (!jobs || jobs.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className={`p-8 text-center ${mode === 'dark' ? 'bg-backGray' : 'bg-backGray'} rounded-2xl border ${mode === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
          <FileText className={`w-12 h-12 mx-auto mb-3 ${mode === 'dark' ? 'text-slate-600' : 'text-gray-300'}`} />
          <p className={mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}>No candidates found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Jobs with Candidates */}
      {jobs.map((job) => (
        <div key={job.id} className="mb-12">
          {/* Job Header */}
          <div className={`mb-6 p-6 rounded-2xl border ${mode === 'dark' ? 'bg-gradient-to-r from-slate-800 to-slate-900 border-slate-700' : 'bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200'}`}>
            <h1 className={`text-3xl font-bold mb-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {job.title}
            </h1>
            <div className={`flex flex-col md:flex-row md:items-center gap-4 text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {job.location}
              </span>
              <span>•</span>
              <span className="capitalize">{job.type}</span>
              <span>•</span>
              <span className={`font-semibold ${mode === 'dark' ? 'text-teal-400' : 'text-teal-600'}`}>{job.salary}</span>
              <span>•</span>
              <span className="font-medium">{job.Applications?.length || 0} Applicants</span>
            </div>
          </div>

          {/* Candidates Grid */}
          {job.Applications && job.Applications.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {job.Applications.map((app) => (
                <div
                  key={app.id}
                  className={`rounded-2xl border shadow-sm hover:shadow-md transition-all overflow-hidden ${mode === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}
                >
                  {/* Card Header - Compact */}
                  <button
                    onClick={() => toggleExpand(app.id)}
                    className={`w-full p-4 flex items-start justify-between gap-3 transition-colors ${mode === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className={`text-base font-bold ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {app.fullName}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${statusColors[app.status]}`}>
                          {app.status}
                        </span>
                      </div>
                      <p className={`text-sm truncate mb-1 ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {app.currentDesignation}
                      </p>
                      <p className={`text-xs ${mode === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        Applied {formatDate(app.appliedAt)}
                      </p>
                    </div>

                    <div className="flex-shrink-0">
                      {expandedApplications[app.id] ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* Quick Info - Always Visible */}
                  <div className={`px-4 py-3 border-t space-y-2 ${mode === 'dark' ? 'border-slate-700 bg-slate-800/50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                      <span className={mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{app.experience} year{app.experience !== '1' ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                      <span className={`capitalize ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{app.availability}</span>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  {expandedApplications[app.id] && (
                    <div className={`border-t p-4 space-y-4 ${mode === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
                      {/* Contact Information */}
                      <div className="space-y-2">
                        <h4 className={`text-xs font-semibold uppercase tracking-wide ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Contact
                        </h4>
                        <a
                          href={`mailto:${app.email}`}
                          className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${mode === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-50 hover:bg-gray-100'}`}
                        >
                          <Mail className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                          <span className={`text-xs truncate ${mode === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                            {app.email}
                          </span>
                        </a>
                        <a
                          href={`tel:${app.phone}`}
                          className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${mode === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-50 hover:bg-gray-100'}`}
                        >
                          <Phone className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                          <span className={`text-xs ${mode === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                            {app.phone}
                          </span>
                        </a>
                      </div>

                      {/* Additional Info */}
                      <div className="space-y-2">
                        <h4 className={`text-xs font-semibold uppercase tracking-wide ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Details
                        </h4>
                        {app.currentCompany && (
                          <div className="text-xs">
                            <p className={mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Current Company</p>
                            <p className={`font-medium ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>{app.currentCompany}</p>
                          </div>
                        )}
                        {app.salaryExpectation && (
                          <div className="text-xs">
                            <p className={mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Salary Expectation</p>
                            <p className={`font-medium ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>₹{app.salaryExpectation}/month</p>
                          </div>
                        )}
                      </div>

                      {/* Documents */}
                      {(app.resume || app.linkedinProfile) && (
                        <div className="space-y-2">
                          <h4 className={`text-xs font-semibold uppercase tracking-wide ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Links
                          </h4>
                          {app.resume && (
                            <a
                              href={app.resume}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${mode === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-50 hover:bg-gray-100'}`}
                            >
                              <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                              <span className={`text-xs hover:underline ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>Resume</span>
                            </a>
                          )}
                          {app.linkedinProfile && (
                            <a
                              href={app.linkedinProfile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${mode === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-50 hover:bg-gray-100'}`}
                            >
                              <ExternalLink className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                              <span className={`text-xs hover:underline ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>LinkedIn</span>
                            </a>
                          )}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => handleApplicationAction(app.id, 'offer')}
                          disabled={loadingAction === app.id}
                          className={`flex-1 px-3 py-2 flex items-center justify-center gap-1 text-white text-xs font-semibold rounded-lg transition-colors ${
                            loadingAction === app.id
                              ? 'bg-teal-400 cursor-not-allowed'
                              : 'bg-teal-600 hover:bg-teal-700'
                          }`}
                        >
                          <Check className="w-3 h-3" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleApplicationAction(app.id, 'rejected')}
                          disabled={loadingAction === app.id}
                          className={`flex-1 px-3 py-2 flex items-center justify-center gap-1 text-xs font-semibold rounded-lg transition-colors ${
                            loadingAction === app.id
                              ? `${mode === 'dark' ? 'bg-red-900/50 cursor-not-allowed' : 'bg-red-200 cursor-not-allowed'}`
                              : `${mode === 'dark' ? 'bg-red-900/30 hover:bg-red-900/50 text-red-400' : 'bg-red-100 hover:bg-red-200 text-red-600'}`
                          }`}
                        >
                          <X className="w-3 h-3" />
                          Reject
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className={`p-8 text-center rounded-2xl border ${mode === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}>
              <FileText className={`w-12 h-12 mx-auto mb-3 ${mode === 'dark' ? 'text-slate-600' : 'text-gray-300'}`} />
              <p className={mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}>No applications yet</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}