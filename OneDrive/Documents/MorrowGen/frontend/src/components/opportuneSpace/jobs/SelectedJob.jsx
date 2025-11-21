import React, { useEffect, useRef, useState } from "react";
import { MapPin, Clock, Briefcase, FileText, Tags, Users, Zap, GraduationCap, AlertCircle, CheckCircle, Heart, Share2, Copy } from "lucide-react";
import useThemeStore from "../../../zustand/themeStore";
import useJobStore from "../../../zustand/recruiter/useJobStore";
import { toast } from "react-toastify";
import JobDetailSkeleton from "../../../card/recruiter/JobDetailSkeleton";
import EmptyJobState from "../../../card/EmptyJobState";
import useAuthStore from "../../../zustand/auth/useAuthStore";
import { extractErrorMessage } from "../../../utils/errorHandler";
import { showError, showSuccess } from "../../../utils/toast";
import axiosInstance from "../../../utils/axiosInstance";

const SelectedJob = ({ jobId, jobData = {}, onApplyClick, hasApplied }) => {
    const { mode } = useThemeStore();
    const [jobInfo, setJobInfo] = useState(jobData || {})
    const containerRef = useRef(null);
    const [copyFeedback, setCopyFeedback] = useState(false);

    console.log("job Id : ", jobId)
    const cardBg = mode === "dark" ? "bg-[#1B2E31]" : "bg-white";
    const sectionBg = mode === "dark" ? "bg-[#0F1E20]" : "bg-gray-50";
    const textPrimary = mode === "dark" ? "text-white" : "text-gray-900";
    const textSecondary = mode === "dark" ? "text-gray-400" : "text-gray-600";
    const borderColor = mode === "dark" ? "border-[#294B4E]" : "border-gray-200";
    const tagBg = mode === "dark" ? "bg-[#0F1E20]" : "bg-gray-100";
    const tagText = mode === "dark" ? "text-gray-300" : "text-gray-700";
    const hoverBg = mode === "dark" ? "hover:bg-[#0F1E20]" : "hover:bg-gray-100";

    const formatDeadline = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const [jobLoading, setJobLoading] = useState(false)

    const { getJobById } = useJobStore()

    useEffect(() => {
        const getJob = async () => {
            if (!jobId) return;
            setJobLoading(true)
            try {
                const res = await getJobById(jobId);
                if (res?.data) setJobInfo(res.data);
            } catch (error) {
                console.error("Failed to fetch job:", error);
            } finally {
                setJobLoading(false)
            }
        };
        getJob();
    }, [jobId]);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (jobInfo?.SavedItems) {
            setIsSaved(jobInfo.SavedItems.length > 0);
        }
    }, [jobInfo]);



    const handleSaveJob = () => {
        setIsSaved(!isSaved);
        // Add API call here to save job
    };
    useEffect(() => {
        if (jobData && Object.keys(jobData).length > 0) {
            setJobInfo(jobData);
        }
    }, [jobData]);

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


    const handleShareLink = () => {
        const jobUrl = `${window.location.origin}/jobs/${jobInfo.id}`;
        navigator.clipboard.writeText(jobUrl);
        setCopyFeedback(true);
        setTimeout(() => setCopyFeedback(false), 2000);
    };

    return (
        <>
            {
                jobLoading && (
                    <JobDetailSkeleton mode={mode} />
                )
            }
            {
                !jobData && !jobLoading ? (
                    <EmptyJobState mode={mode} />
                ) : (

                    <div ref={containerRef} className={`p-6 rounded-2xl sticky top-16 ${cardBg} border ${borderColor} shadow-sm flex flex-col gap-6 w-full max-h-[calc(100vh-4rem)] overflow-auto`}>

                        {/* Header: Title + Company + Action Buttons */}
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex gap-4 flex-1">
                                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 ${borderColor} bg-white`}>
                                    {jobInfo?.Company?.logo ? (
                                        <img src={jobInfo?.Company?.logo} alt={jobInfo?.Company?.name} className="w-full h-full object-contain" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                            <Briefcase className="w-6 h-6 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h2 className={`text-xl md:text-2xl font-bold ${textPrimary}`}>{jobInfo?.title}</h2>
                                    <p className={`text-sm md:text-base ${textSecondary}`}>{jobInfo?.Company?.name || "Company Name"}</p>
                                </div>
                            </div>

                            {/* Action Icons */}
                            <div className="flex items-center gap-2">
                                {/* Save Button */}
                                <button
                                    onClick={() => savedItem('job', jobInfo?.id)}
                                    className={`h-9 w-9 flex items-center justify-center rounded-lg ${hoverBg} ${textSecondary} transition-all`}
                                    title="Save job"
                                >
                                    <Heart
                                        className={`w-4 h-4 md:w-5 md:h-5 
        ${isSaved ? "fill-[var(--primary)] text-[var(--primary)]" : ""}
    `}
                                    />
                                </button>


                                {/* Share Link Button */}
                                <button
                                    onClick={handleShareLink}
                                    className={`p-2.5 rounded-lg transition-all duration-200 ${hoverBg} ${textSecondary} hover:text-[#0097B2]`}
                                    title="Copy link"
                                >
                                    {copyFeedback ? <Copy className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Salary + Status */}
                        <div className="flex items-center justify-between">
                            <div>
                                {jobInfo?.salary && (
                                    <span className={`text-lg md:text-2xl font-bold ${textPrimary}`}>₹{jobInfo?.salary || '0'}</span>
                                )}
                            </div>
                            <span className={`text-xs font-semibold uppercase tracking-wide flex items-center gap-1 ${jobInfo?.status === 'open' ? 'text-green-500' : 'text-red-500'}`}>
                                <CheckCircle className="w-3 h-3" />
                                {jobInfo?.status === 'open' ? 'Hiring' : 'Closed'}
                            </span>
                        </div>

                        {/* Apply Button - Now at Top */}
                        <button
                            onClick={() => !hasApplied && onApplyClick(jobData?.id)}
                            disabled={hasApplied}
                            className={`px-6 py-2 rounded-xl font-semibold transition-all 
    ${hasApplied
                                    ? "bg-gray-300 text-gray-700 cursor-not-allowed border border-gray-400"
                                    : "bg-[#0097B2] text-white hover:bg-[#007d94] shadow-md hover:shadow-lg"
                                }`}
                        >
                            {hasApplied ? "Already Applied" : "Apply Now"}
                        </button>



                        {/* Quick Info: Location, Type, Experience, Positions */}
                        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-lg ${sectionBg} border ${borderColor}`}>
                            <div>
                                <p className={`text-xs uppercase font-semibold ${textSecondary}`}>Location</p>
                                <p className={`text-sm font-medium ${textPrimary} flex items-center gap-1 mt-1`}>
                                    <MapPin className="w-4 h-4" />
                                    {jobInfo?.location || 'Location'}
                                </p>
                            </div>
                            <div>
                                <p className={`text-xs uppercase font-semibold ${textSecondary}`}>Job Type</p>
                                <p className={`text-sm font-medium ${textPrimary} flex items-center gap-1 mt-1`}>
                                    <Briefcase className="w-4 h-4" />
                                    {jobInfo?.type?.charAt(0).toUpperCase() + jobInfo?.type?.slice(1)}
                                </p>
                            </div>
                            <div>
                                <p className={`text-xs uppercase font-semibold ${textSecondary}`}>Experience</p>
                                <p className={`text-sm font-medium ${textPrimary}`}>{jobInfo?.experience || 0}</p>
                            </div>
                            <div>
                                <p className={`text-xs uppercase font-semibold ${textSecondary}`}>Positions</p>
                                <p className={`text-sm font-medium ${textPrimary} flex items-center gap-1`}>
                                    <Users className="w-4 h-4" />
                                    {jobInfo?.positions || 0}
                                </p>
                            </div>
                        </div>

                        {/* Posted & Deadline */}
                        <div className="flex flex-col sm:flex-row gap-4 text-sm">
                            <span className={`flex items-center gap-2 ${textSecondary}`}>
                                <Clock className="w-4 h-4" />
                                Posted: {new Date(jobInfo?.createdAt).toLocaleDateString('en-IN')}
                            </span>
                            <span className={`flex items-center gap-2 ${textSecondary}`}>
                                <AlertCircle className="w-4 h-4" />
                                Deadline: {formatDeadline(jobInfo?.deadline)}
                            </span>
                        </div>

                        <hr className={`${borderColor}`} />

                        {/* Description */}
                        {jobInfo?.description && (
                            <div>
                                <h3 className={`text-lg font-bold ${textPrimary} mb-3 flex items-center gap-2`}>
                                    <FileText className="w-5 h-5" />
                                    About the Role
                                </h3>
                                <p className={`${textSecondary} text-sm leading-relaxed`}>{jobInfo.description || "None"}</p>
                            </div>
                        )}

                        {/* Responsibilities */}
                        {jobInfo?.responsibilities && (
                            <div>
                                <h3 className={`text-lg font-bold ${textPrimary} mb-3`}>Responsibilities</h3>
                                <p className={`${textSecondary} text-sm leading-relaxed`}>{jobInfo?.responsibilities}</p>
                            </div>
                        )}

                        {/* Requirements */}
                        {jobInfo?.requirements && (
                            <div>
                                <h3 className={`text-lg font-bold ${textPrimary} mb-3`}>Requirements</h3>
                                <p className={`${textSecondary} text-sm leading-relaxed`}>{jobInfo?.requirements}</p>
                            </div>
                        )}

                        {/* Education Level */}
                        {jobInfo?.educationLevel && (
                            <div className={`p-4 rounded-lg ${sectionBg} border ${borderColor}`}>
                                <p className={`text-xs uppercase font-semibold ${textSecondary} mb-2 flex items-center gap-2`}>
                                    <GraduationCap className="w-4 h-4" />
                                    Education Required
                                </p>
                                <p className={`text-sm font-medium ${textPrimary}`}>{jobInfo?.educationLevel}</p>
                            </div>
                        )}

                        {/* Skills Required */}
                        {(jobInfo?.tags?.length > 0 || jobInfo?.skillsRequired?.length > 0) && (
                            <div>
                                <h3 className={`text-lg font-bold ${textPrimary} mb-3 flex items-center gap-2`}>
                                    <Zap className="w-5 h-5" />
                                    Skills Required
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {[...(jobInfo?.tags || []), ...(jobInfo?.skillsRequired || [])].map((skill, idx) => (
                                        <span key={idx} className={`px-3 py-1 rounded-full text-sm font-medium ${tagBg} ${tagText} border ${borderColor}`}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Benefits */}
                        {jobInfo?.benefits && (
                            <div>
                                <h3 className={`text-lg font-bold ${textPrimary} mb-3`}>Benefits</h3>
                                <p className={`${textSecondary} text-sm leading-relaxed`}>{jobInfo?.benefits}</p>
                            </div>
                        )}

                        {/* Remote Work Info */}
                        {jobInfo?.remote && (
                            <div className={`p-4 rounded-lg bg-blue-500/10 border border-blue-500/30`}>
                                <p className="text-sm font-medium text-blue-500">✓ Remote work available</p>
                            </div>
                        )}

                        {/* Applications Count */}
                        <div className={`p-4 rounded-lg ${sectionBg} border ${borderColor}`}>
                            <p className={`text-sm ${textSecondary}`}>
                                <span className="font-semibold text-[#0097B2]">{jobInfo?.applicationsCount}</span> applications received
                            </p>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default SelectedJob;