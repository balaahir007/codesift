import React, { useState, useEffect } from 'react';
import { MapPin, DollarSign, Briefcase, Calendar, Users, ArrowLeft, Building2, Clock, Award, CheckCircle2, Share2, Flag, ChevronRight, TrendingUp, Heart, ExternalLink, Bookmark } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import useJobStore from '../../../zustand/recruiter/useJobStore';
import useThemeStore from '../../../zustand/themeStore';
import useAuthStore from '../../../zustand/auth/useAuthStore';

const JobDetails = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const { mode } = useThemeStore();
    const { getJobById } = useJobStore();
    const { authUser } = useAuthStore()

const handleApplyJob = () => {
    if (!authUser) {
        navigate(`/login`);
    } else {
        navigate(`/apply/${jobId}`);
    }
};


    const [jobData, setJobData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            setLoading(true);
            try {
                const newJob = await getJobById(jobId);
                setJobData(newJob);
            } catch (error) {
                console.error('Error fetching job:', error);
            } finally {
                setLoading(false);
            }
        };
        if (jobId) {
            fetchJob();
        }
    }, [jobId, getJobById]);
    const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)
    useEffect(() => {
        const userId = authUser?.id;
        const hasApplied = jobData?.Applications?.some(app => app.userId === userId);
        setIsAlreadyApplied(hasApplied)
    }, [jobData, authUser])

    // Sample recommended jobs
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

    // Theme colors
    const bgPrimary = mode === 'dark' ? 'bg-[#0A1415]' : 'bg-gray-50';
    const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
    const sectionBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-100';
    const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
    const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
    const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
    const hoverBg = mode === 'dark' ? 'hover:bg-[#0F1E20]' : 'hover:bg-gray-50';

    if (loading) {
        return (
            <div className={`min-h-screen ${bgPrimary} flex items-center justify-center`}>
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#0097B2]/30 border-t-[#0097B2] rounded-full animate-spin mx-auto mb-4"></div>
                    <p className={`text-lg ${textSecondary}`}>Loading job details...</p>
                </div>
            </div>
        );
    }

    if (!jobData) {
        return (
            <div className={`min-h-screen ${bgPrimary} flex items-center justify-center px-4`}>
                <div className="text-center">
                    <Briefcase className={`w-16 h-16 ${textSecondary} mx-auto mb-4 opacity-50`} />
                    <p className={`text-lg font-semibold ${textPrimary} mb-2`}>Job not found</p>
                    <button
                        onClick={() => navigate('/jobs')}
                        className="px-6 py-2.5 bg-[#0097B2] hover:bg-[#007d94] text-white rounded-lg font-medium transition-colors shadow-lg shadow-[#0097B2]/30"
                    >
                        Back to Jobs
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${bgPrimary}`}>
            {/* Top Navigation Bar - Mobile Optimized */}
            <div className={`sticky top-0 z-40 border-b ${borderColor} ${cardBg} shadow-sm`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                    <div className="flex items-center justify-between gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all ${textPrimary} ${hoverBg}`}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="hidden sm:inline">Back</span>
                        </button>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsSaved(!isSaved)}
                                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all border ${isSaved
                                        ? 'bg-[#0097B2]/20 border-[#0097B2] text-[#0097B2]'
                                        : `${borderColor} ${textPrimary} ${hoverBg}`
                                    }`}
                            >
                                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                                <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
                            </button>

                            <button className={`p-2 rounded-lg border transition-all ${borderColor} ${textPrimary} ${hoverBg}`}>
                                <Share2 className="w-4 h-4" />
                            </button>

                            <button className={`p-2 rounded-lg border transition-all ${borderColor} ${textPrimary} ${hoverBg} hidden sm:block`}>
                                <Flag className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                    {/* Main Content */}
                    <div className="flex-1 lg:max-w-3xl">
                        {/* Job Header Card - Mobile Optimized */}
                        <div className={`rounded-xl shadow-lg border ${cardBg} ${borderColor} p-4 sm:p-6 mb-4 sm:mb-6`}>
                            <div className="flex items-start gap-3 sm:gap-4 mb-4">
                                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center flex-shrink-0 ${sectionBg}`}>
                                    {jobData.Company?.logo ? (
                                        <img src={jobData.Company.logo} alt={jobData.Company?.name} className="w-full h-full object-contain p-1" />
                                    ) : (
                                        <Building2 className={`w-6 h-6 sm:w-8 sm:h-8 text-[#0097B2]`} />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-2 ${textPrimary}`}>
                                        {jobData.title}
                                    </h1>
                                    <p className={`text-base sm:text-lg font-medium mb-3 ${textSecondary}`}>
                                        {jobData.Company?.name || "Company Name"}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                                        <span className={`flex items-center gap-1.5 ${textSecondary}`}>
                                            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                                            <span className="truncate">{jobData.location}</span>
                                        </span>
                                        <span className={`flex items-center gap-1.5 ${textSecondary}`}>
                                            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                                            {daysAgo(jobData.createdAt)}
                                        </span>
                                        <span className={`flex items-center gap-1.5 ${textSecondary}`}>
                                            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                                            {jobData.positions} openings
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Apply Section - Mobile Optimized */}
                            <div className={`flex flex-col sm:flex-row gap-3 pt-4 border-t ${borderColor}`}>
                                <button
                                    onClick={() => !isAlreadyApplied && handleApplyJob()}
                                    disabled={isAlreadyApplied}
                                    className={`flex-1 font-semibold py-3 px-4 sm:px-6 rounded-lg transition-all shadow-lg text-sm sm:text-base 
    ${isAlreadyApplied
                                            ? "bg-gray-300 text-gray-700 cursor-not-allowed shadow-none border border-gray-400"
                                            : "bg-[#0097B2] hover:bg-[#007d94] text-white shadow-[#0097B2]/30 hover:shadow-xl"
                                        }`}
                                >
                                    {isAlreadyApplied ? " Already Applied" : "Apply Now"}
                                </button>

                                {/* <button className={`px-4 sm:px-6 py-3 rounded-lg font-semibold border transition-all ${borderColor} ${textPrimary} ${hoverBg} text-sm sm:text-base`}>
                  <span className="hidden sm:inline">Send to mobile</span>
                  <span className="sm:hidden">Share</span>
                </button> */}
                            </div>
                        </div>

                        {/* Job Details - Mobile Optimized */}
                        <div className={`rounded-xl shadow-lg border ${cardBg} ${borderColor}`}>
                            {/* Job Overview */}
                            <div className={`p-4 sm:p-6 border-b ${borderColor}`}>
                                <h2 className={`text-lg sm:text-xl font-bold mb-4 ${textPrimary}`}>
                                    Job overview
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    {[
                                        { icon: DollarSign, label: "Salary", value: `₹${jobData.salary}` },
                                        { icon: Briefcase, label: "Job Type", value: jobData.type?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) },
                                        { icon: Award, label: "Experience", value: jobData.experience },
                                        { icon: Users, label: "Education", value: jobData.educationLevel },
                                    ].map(({ icon: Icon, label, value }, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className={`p-2 rounded-lg mt-0.5 ${sectionBg}`}>
                                                <Icon className="w-4 h-4 text-[#0097B2]" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-xs sm:text-sm font-medium mb-0.5 ${textSecondary}`}>
                                                    {label}
                                                </p>
                                                <p className={`font-semibold text-sm sm:text-base ${textPrimary} truncate`}>
                                                    {value}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Job Description - Mobile Optimized */}
                            <div className={`p-4 sm:p-6 border-b ${borderColor}`}>
                                <h2 className={`text-lg sm:text-xl font-bold mb-4 ${textPrimary}`}>
                                    Full job description
                                </h2>

                                <div className={`space-y-3 ${textSecondary} leading-relaxed text-sm sm:text-base`}>
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
                                            className="text-[#0097B2] hover:text-[#007d94] font-semibold text-sm flex items-center gap-1"
                                        >
                                            {showFullDescription ? 'Show less' : 'Show full description'}
                                            <ChevronRight className={`w-4 h-4 transition-transform ${showFullDescription ? 'rotate-90' : ''}`} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Skills - Mobile Optimized */}
                            {jobData.tags && jobData.tags.length > 0 && (
                                <div className={`p-4 sm:p-6 border-b ${borderColor}`}>
                                    <h2 className={`text-lg sm:text-xl font-bold mb-4 ${textPrimary}`}>
                                        Skills & qualifications
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {jobData.tags.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border ${sectionBg} ${borderColor} ${textPrimary}`}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Benefits - Mobile Optimized */}
                            {jobData.benefits && (
                                <div className="p-4 sm:p-6">
                                    <h2 className={`text-lg sm:text-xl font-bold mb-4 ${textPrimary}`}>
                                        Benefits
                                    </h2>
                                    <div className="space-y-2">
                                        {jobData.benefits.split(',').map((benefit, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span className={`${textSecondary} text-sm sm:text-base`}>
                                                    {benefit.trim()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Report Job - Mobile Optimized */}
                        <div className="mt-4 sm:mt-6 text-center">
                            <button className={`text-xs sm:text-sm ${textSecondary} hover:text-red-500 transition-colors`}>
                                Report job
                            </button>
                        </div>
                    </div>

                    {/* Sidebar - Mobile Optimized */}
                    <div className="lg:w-80">
                        <div className="lg:sticky lg:top-24 space-y-4 sm:space-y-6">
                            {/* Company Info - Mobile Optimized */}
                            <div className={`rounded-xl shadow-lg border ${cardBg} ${borderColor} p-4 sm:p-6`}>
                                <h3 className={`text-base sm:text-lg font-bold mb-4 ${textPrimary}`}>
                                    About the company
                                </h3>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3">
                                        <Building2 className={`w-4 h-4 mt-0.5 ${textSecondary} flex-shrink-0`} />
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-medium ${textPrimary} truncate`}>
                                                {jobData.Company?.name || "Company Name"}
                                            </p>
                                            <p className={`${textSecondary} text-xs sm:text-sm`}>
                                                {jobData.Company?.companySize || "50-200 employees"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <TrendingUp className={`w-4 h-4 mt-0.5 ${textSecondary} flex-shrink-0`} />
                                        <div className="flex-1 min-w-0">
                                            <p className={`${textSecondary} text-xs sm:text-sm truncate`}>
                                                Industry: {jobData.Company?.industry || "Technology"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button className={`w-full mt-4 py-2 px-4 rounded-lg font-medium transition-all border text-sm sm:text-base ${borderColor} ${textPrimary} ${hoverBg}`}>
                                    View company profile
                                </button>
                            </div>

                            {/* Similar Jobs - Mobile Optimized */}
                            <div className={`rounded-xl shadow-lg border ${cardBg} ${borderColor} p-4 sm:p-6`}>
                                <h3 className={`text-base sm:text-lg font-bold mb-4 ${textPrimary}`}>
                                    Similar jobs
                                </h3>

                                <div className="space-y-3">
                                    {recommendedJobs.map((recJob) => (
                                        <div
                                            key={recJob.id}
                                            className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${sectionBg} ${borderColor} hover:border-[#0097B2]`}
                                        >
                                            <h4 className={`font-semibold text-sm mb-1 ${textPrimary} truncate`}>
                                                {recJob.title}
                                            </h4>
                                            <p className={`text-xs mb-2 ${textSecondary} truncate`}>
                                                {recJob.company}
                                            </p>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className={`flex items-center gap-1 ${textSecondary} truncate flex-1 mr-2`}>
                                                    <MapPin className="w-3 h-3 flex-shrink-0" />
                                                    <span className="truncate">{recJob.location}</span>
                                                </span>
                                                <span className="font-semibold text-[#0097B2] flex-shrink-0">
                                                    {recJob.salary}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full mt-4 py-2 px-4 rounded-lg font-medium text-[#0097B2] hover:bg-[#0097B2]/10 transition-all text-sm sm:text-base">
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

export default JobDetails;