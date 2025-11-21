import React, { useState } from 'react';
import { MapPin, DollarSign, Briefcase, Calendar, Users, Star, ArrowLeft, Building2, Clock, Award, CheckCircle2, BookmarkPlus, Share2, Flag, ChevronRight, TrendingUp, Heart } from 'lucide-react';

const JobDetailsLayout = ({ job, mode = 'light' }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Sample job data for demonstration
  const sampleJob = {
    id: "0a1e3b7a-8c44-4377-a5a3-688cb4f1bc02",
    title: "Senior Software Developer",
    location: "Chennai, India",
    type: "full-time",
    salary: "6 LPA",
    description: "We are looking for a passionate software developer to join our team. You will be responsible for developing, testing, and deploying scalable web applications.\n\nKey Responsibilities:\n• Design and develop high-quality software solutions\n• Collaborate with cross-functional teams\n• Write clean, maintainable code\n• Participate in code reviews\n• Stay updated with latest technologies\n\nWhat We Offer:\n• Competitive salary and benefits\n• Flexible work environment\n• Career growth opportunities\n• Modern tech stack\n• Collaborative team culture",
    requirements: "Proficiency in JavaScript, React, and Node.js. Strong problem-solving skills and ability to work in a team environment.",
    responsibilities: "Develop, test, and deploy scalable web applications. Participate in code reviews and mentor junior developers.",
    benefits: "Health insurance, Work from home flexibility, Annual bonus, Professional development budget",
    tags: ["Node.js", "React", "JavaScript", "MongoDB", "AWS"],
    experience: "Entry Level",
    positions: 4,
    status: "open",
    deadline: "2025-12-31T00:00:00.000Z",
    educationLevel: "Bachelor's Degree",
    createdAt: "2025-11-07T14:01:36.511Z",
    companyName: "TechCorp Solutions",
    companySize: "50-200 employees",
    industry: "Technology",
    employmentType: "Full-time",
  };

  const jobData = job && Object.keys(job).length > 0 ? job : sampleJob;

  const recommendedJobs = [
    { id: 1, title: "Frontend Developer", company: "Tech Corp", location: "Bangalore", salary: "5-7 LPA", type: "Full-time" },
    { id: 2, title: "Full Stack Engineer", company: "StartupXYZ", location: "Mumbai", salary: "7-9 LPA", type: "Full-time" },
    { id: 3, title: "React Developer", company: "Digital Solutions", location: "Hyderabad", salary: "6-8 LPA", type: "Remote" },
    { id: 4, title: "Backend Developer", company: "CloudTech", location: "Chennai", salary: "6-8 LPA", type: "Full-time" },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const daysAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return `${diff} days ago`;
    if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
    return `${Math.floor(diff / 30)} months ago`;
  };

  return (
    <div className={`min-h-screen ${mode === 'dark' ? 'bg-[#0F1419]' : 'bg-gray-50'}`}>
      {/* Top Navigation Bar */}
      <div className={`border-b ${mode === 'dark' ? 'bg-[#1B2332] border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 
                ${mode === "dark"
                  ? "text-gray-300 hover:bg-[#252F45]"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to search
            </button>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 border
                  ${isSaved
                    ? mode === "dark"
                      ? "bg-indigo-500/20 border-indigo-500 text-indigo-300"
                      : "bg-indigo-50 border-indigo-500 text-indigo-700"
                    : mode === "dark"
                      ? "border-gray-700 text-gray-300 hover:bg-[#252F45]"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
              </button>
              
              <button
                className={`p-2 rounded-lg border transition-all duration-200
                  ${mode === "dark"
                    ? "border-gray-700 text-gray-300 hover:bg-[#252F45]"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <Share2 className="w-4 h-4" />
              </button>
              
              <button
                className={`p-2 rounded-lg border transition-all duration-200
                  ${mode === "dark"
                    ? "border-gray-700 text-gray-300 hover:bg-[#252F45]"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <Flag className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 lg:max-w-3xl">
            {/* Job Header Card */}
            <div className={`rounded-xl shadow-sm border p-6 mb-6 ${mode === "dark" ? "bg-[#1B2332] border-gray-800" : "bg-white border-gray-200"}`}>
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0
                  ${mode === "dark" ? "bg-[#252F45]" : "bg-gray-100"}`}>
                  <Building2 className={`w-8 h-8 ${mode === "dark" ? "text-indigo-400" : "text-indigo-600"}`} />
                </div>
                
                <div className="flex-1">
                  <h1 className={`text-2xl sm:text-3xl font-bold mb-2 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                    {jobData.title}
                  </h1>
                  <p className={`text-lg font-medium mb-3 ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    {jobData.companyName || "TechCorp Solutions"}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className={`flex items-center gap-1.5 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      <MapPin className="w-4 h-4" />
                      {jobData.location}
                    </span>
                    <span className={`flex items-center gap-1.5 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      <Clock className="w-4 h-4" />
                      {daysAgo(jobData.createdAt)}
                    </span>
                    <span className={`flex items-center gap-1.5 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      <Users className="w-4 h-4" />
                      {jobData.positions} openings
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Apply Section */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t ${mode === 'dark' ? 'border-gray-800' : 'border-gray-200'}">
                <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                  Apply now
                </button>
                <button className={`px-6 py-3 rounded-lg font-semibold border transition-all duration-200
                  ${mode === "dark"
                    ? "border-gray-700 text-gray-300 hover:bg-[#252F45]"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}>
                  Send to mobile
                </button>
              </div>
            </div>

            {/* Job Details Tabs */}
            <div className={`rounded-xl shadow-sm border ${mode === "dark" ? "bg-[#1B2332] border-gray-800" : "bg-white border-gray-200"}`}>
              {/* Job Overview */}
              <div className="p-6 border-b ${mode === 'dark' ? 'border-gray-800' : 'border-gray-200'}">
                <h2 className={`text-xl font-bold mb-4 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                  Job overview
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: DollarSign, label: "Salary", value: jobData.salary },
                    { icon: Briefcase, label: "Job Type", value: jobData.type?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) },
                    { icon: Award, label: "Experience", value: jobData.experience },
                    { icon: Users, label: "Education", value: jobData.educationLevel },
                  ].map(({ icon: Icon, label, value }, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg mt-0.5 ${mode === "dark" ? "bg-[#252F45]" : "bg-gray-100"}`}>
                        <Icon className={`w-4 h-4 ${mode === "dark" ? "text-indigo-400" : "text-indigo-600"}`} />
                      </div>
                      <div>
                        <p className={`text-sm font-medium mb-0.5 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                          {label}
                        </p>
                        <p className={`font-semibold ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Job Description */}
              <div className="p-6 border-b ${mode === 'dark' ? 'border-gray-800' : 'border-gray-200'}">
                <h2 className={`text-xl font-bold mb-4 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                  Full job description
                </h2>
                
                <div className={`space-y-3 ${mode === "dark" ? "text-gray-300" : "text-gray-700"} leading-relaxed`}>
                  {(showFullDescription ? jobData.description : jobData.description?.slice(0, 400))
                    ?.split('\n')
                    .map((line, index) => (
                      <p key={index}>
                        {line}
                      </p>
                    ))}
                  {jobData.description?.length > 400 && (
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm flex items-center gap-1"
                    >
                      {showFullDescription ? 'Show less' : 'Show full description'}
                      <ChevronRight className={`w-4 h-4 transition-transform ${showFullDescription ? 'rotate-90' : ''}`} />
                    </button>
                  )}
                </div>
              </div>

              {/* Skills */}
              {jobData.tags && jobData.tags.length > 0 && (
                <div className="p-6 border-b ${mode === 'dark' ? 'border-gray-800' : 'border-gray-200'}">
                  <h2 className={`text-xl font-bold mb-4 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                    Skills & qualifications
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {jobData.tags.map((skill, idx) => (
                      <span
                        key={idx}
                        className={`px-4 py-2 rounded-full text-sm font-medium border
                          ${mode === "dark"
                            ? "bg-[#252F45] border-gray-700 text-gray-300"
                            : "bg-gray-100 border-gray-200 text-gray-800"
                          }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {jobData.benefits && (
                <div className="p-6">
                  <h2 className={`text-xl font-bold mb-4 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                    Benefits
                  </h2>
                  <div className="space-y-2">
                    {jobData.benefits.split(',').map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className={mode === "dark" ? "text-gray-300" : "text-gray-700"}>
                          {benefit.trim()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Report Job */}
            <div className="mt-6 text-center">
              <button className={`text-sm ${mode === "dark" ? "text-gray-500 hover:text-gray-400" : "text-gray-500 hover:text-gray-700"} transition-colors`}>
                Report job
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="sticky top-6 space-y-6">
              {/* Company Info */}
              <div className={`rounded-xl shadow-sm border p-6 ${mode === "dark" ? "bg-[#1B2332] border-gray-800" : "bg-white border-gray-200"}`}>
                <h3 className={`text-lg font-bold mb-4 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                  About the company
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Building2 className={`w-4 h-4 mt-0.5 ${mode === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                    <div>
                      <p className={`font-medium ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                        {jobData.companyName || "TechCorp Solutions"}
                      </p>
                      <p className={mode === "dark" ? "text-gray-400" : "text-gray-600"}>
                        {jobData.companySize || "50-200 employees"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <TrendingUp className={`w-4 h-4 mt-0.5 ${mode === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                    <div>
                      <p className={mode === "dark" ? "text-gray-400" : "text-gray-600"}>
                        Industry: {jobData.industry || "Technology"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <button className={`w-full mt-4 py-2 px-4 rounded-lg font-medium transition-all duration-200 border
                  ${mode === "dark"
                    ? "border-gray-700 text-gray-300 hover:bg-[#252F45]"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}>
                  View company profile
                </button>
              </div>

              {/* Similar Jobs */}
              <div className={`rounded-xl shadow-sm border p-6 ${mode === "dark" ? "bg-[#1B2332] border-gray-800" : "bg-white border-gray-200"}`}>
                <h3 className={`text-lg font-bold mb-4 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                  Similar jobs
                </h3>
                
                <div className="space-y-3">
                  {recommendedJobs.map((recJob) => (
                    <div
                      key={recJob.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md
                        ${mode === "dark"
                          ? "bg-[#252F45] border-gray-800 hover:border-gray-700"
                          : "bg-gray-50 border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <h4 className={`font-semibold text-sm mb-1 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                        {recJob.title}
                      </h4>
                      <p className={`text-xs mb-2 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        {recJob.company}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`flex items-center gap-1 ${mode === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                          <MapPin className="w-3 h-3" />
                          {recJob.location}
                        </span>
                        <span className={`font-semibold ${mode === "dark" ? "text-indigo-400" : "text-indigo-600"}`}>
                          {recJob.salary}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-4 py-2 px-4 rounded-lg font-medium text-indigo-600 hover:bg-indigo-50 transition-all duration-200">
                  View all similar jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo Component with Mode Toggle

// Demo Component with Mode Toggle
export default JobDetailsLayout