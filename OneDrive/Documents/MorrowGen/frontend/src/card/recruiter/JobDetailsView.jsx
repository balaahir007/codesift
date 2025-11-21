import React from 'react';
import { Briefcase, MapPin, Clock, DollarSign, Users, GraduationCap, Calendar, Wifi, Tag, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobDetailsView = ({ job, isOpen, onClose, mode = 'light' }) => {
  if (!isOpen) return null;

  const InfoItem = ({ icon: Icon, label, value }) => {
    if (!value) return null;
    
    return (
      <div className={`flex items-start gap-3 p-3 rounded-lg ${
        mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-gray-50'
      }`}>
        <Icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium mb-1 ${
            mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{label}</p>
          <p className={mode === 'dark' ? 'text-white' : 'text-gray-900'}>{value}</p>
        </div>
      </div>
    );
  };

  const Section = ({ title, content }) => {
    if (!content) return null;
    
    return (
      <div className="mb-6">
        <h3 className={`text-lg font-semibold mb-3 ${
          mode === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>{title}</h3>
        <div className={`whitespace-pre-line p-4 rounded-lg ${
          mode === 'dark' ? 'bg-[#1B2E31] text-gray-300' : 'bg-gray-50 text-gray-700'
        }`}>
          {content}
        </div>
      </div>
    );
  };

  const navigate = useNavigate()

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className={`relative w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden ${
          mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-white'
        }`}>
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-lg transition-colors z-10 ${
              mode === 'dark' 
                ? 'hover:bg-[#1B2E31] text-gray-400 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[90vh] p-6 md:p-8">
            {/* Header */}
            <div className={`mb-8 pb-6 border-b ${
              mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200'
            }`}>
              <h1 className={`text-3xl font-bold mb-2 ${
                mode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{job.title}</h1>
              <p className={`text-xl ${
                mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>{job.company}</p>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <InfoItem icon={MapPin} label="Location" value={job.location} />
              <InfoItem icon={Briefcase} label="Job Type" value={job.type} />
              <InfoItem icon={DollarSign} label="Salary" value={job.salary} />
              <InfoItem icon={Clock} label="Experience Required" value={job.experience} />
              <InfoItem icon={Users} label="Open Positions" value={job.positions} />
              <InfoItem icon={GraduationCap} label="Education Level" value={job.educationLevel} />
              <InfoItem 
                icon={Wifi} 
                label="Remote Work" 
                value={job.remote ? 'Yes' : 'No'} 
              />
              <InfoItem 
                icon={Calendar} 
                label="Application Deadline" 
                value={job.deadline ? new Date(job.deadline).toLocaleDateString() : null} 
              />
            </div>

            {/* Tags */}
            {job.tags && job.tags.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className={`w-5 h-5 ${
                    mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`} />
                  <h3 className={`text-lg font-semibold ${
                    mode === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        mode === 'dark'
                          ? 'bg-[#1B2E31] text-[#00B2A9]'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Sections */}
            <Section title="Job Description" content={job.description} />
            <Section title="Requirements" content={job.requirements} />
            <Section title="Responsibilities" content={job.responsibilities} />
            <Section title="Benefits" content={job.benefits} />

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                  mode === 'dark'
                    ? 'bg-[#1B2E31] text-white hover:bg-[#294B4E]'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Close
              </button>
              <button
              onClick={()=>navigate(`/recruiter/jobs/edit/${job.id}`)}
                className="flex-1 py-3 px-6 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition-colors"
              >
                Edit Job
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailsView;