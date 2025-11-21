import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, AlertCircle, CheckCircle, MapPin, Clock, Briefcase, Users, Zap, GraduationCap, ChevronRight, Building2, Calendar } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import useThemeStore from '../../zustand/themeStore';
import useJobStore from '../../zustand/recruiter/useJobStore';
import useAuthStore from '../../zustand/auth/useAuthStore';
import axiosInstance from '../../utils/axiosInstance';
import uploadFile from '../../utils/uploadFile';
import { toast } from 'react-toastify'
const ApplyPage = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { mode } = useThemeStore();
  const { getJobById, publicJobs } = useJobStore();
  const { authUser } = useAuthStore();

  const [job, setJob] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: authUser?.username || '',
    email: authUser?.email || '',
    phone: authUser?.mobileNumber || '8778542177',
    resume: authUser?.resume || null,
    coverLetter: 'None',
        location: '',
    experience: '2',
    currentCompany: 'MorrowGen',
    currentDesignation: 'Software Developer ',
    linkedinProfile: authUser?.linkedinUrl || 'https://www.linkedin.com/in/balaji-m-0071i',
    portfolioUrl: '',
    availability: 'immediate',
    salaryExpectation: '14000'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Auto-skip to step 2 if personal info is already filled
  useEffect(() => {
    if (formData?.fullName && formData?.email && formData?.phone && formData?.location) {
      setCurrentStep(2);
    }
  }, [authUser]);

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      setLoadingJob(true);
      try {
        if (publicJobs && publicJobs.length > 0) {
          const foundJob = publicJobs.find(j => j.id === jobId);
          if (foundJob) {
            setJob(foundJob);
            setLoadingJob(false);
            return;
          }
        }

        const res = await getJobById(jobId);
        console.log("res from AppplyPage : ",res.data)
        if (res?.data) {
          setJob(res.data);
        } else if (res) {
          setJob(res);
        } else {
          setJob(null);
        }
      } catch (err) {
        console.error('Error fetching job:', err);
        setJob(null);
      } finally {
        setLoadingJob(false);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId, getJobById, publicJobs]);


  console.log("application : ",job)

      const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)
      useEffect(() => {
          const userId = authUser?.id;
          const hasApplied = job?.Applications?.some(app => app.userId === userId);
          setIsAlreadyApplied(hasApplied)
      }, [job, authUser])
  // Theme colors
  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const sectionBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50';
  const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const inputBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50';
  const bgPrimary = mode === 'dark' ? 'bg-[#0A1415]' : 'bg-gray-50';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, resume: 'Only PDF and Word documents are allowed' }));
        return;
      }
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, resume: 'File size must be less than 5MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, resume: file }));
      setErrors(prev => ({ ...prev, resume: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.location.trim()) newErrors.location = 'Location number is required';
      else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone must be 10 digits';
    }

    if (step === 2) {
      if (!formData.experience.trim()) newErrors.experience = 'Years of experience is required';
      if (!formData.currentDesignation.trim()) newErrors.currentDesignation = 'Current designation is required';
    }

    if (step === 3) {
      if (!formData.resume) newErrors.resume = 'Resume is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(3)) return;

    setIsSubmitting(true);

    const { resume } = formData;
    if (!resume) return;

    // Upload resume first
    const resume_url = await uploadFile(resume);
    if (!resume_url) {
      setErrors({ resume: "Resume is required" });
      return;
    }

    try {
      // ✅ Send JSON instead of FormData
      const submitData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        resume: resume_url,
        coverLetter: formData.coverLetter,
        experience: formData.experience,
        location: formData.location,
        currentCompany: formData.currentCompany,
        currentDesignation: formData.currentDesignation,
        linkedinProfile: formData.linkedinProfile,
        portfolioUrl: formData.portfolioUrl,
        availability: formData.availability,
        salaryExpectation: formData.salaryExpectation,
        jobId: job.id,
      };

      const res = await axiosInstance.post("/application/apply", submitData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data) {
        toast.success("Application Submitted");
        setSubmitSuccess(true);
        navigate("/jobs")
      }
    } catch (error) {
      console.error("Error submitting application:", error);
     const errorMessage =
    error.response?.data?.message || // if backend sent a message
    error.response?.data ||          // fallback to raw backend data
    error.message ||                 // generic Axios/network error
    "Failed to submit application";

      setErrors({
        submit:errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const formatDeadline = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const steps = [
    { number: 1, label: 'Personal' },
    { number: 2, label: 'Professional' },
    { number: 3, label: 'Documents' }
  ];

  // Loading state
  if (loadingJob) {
    return (
      <div className={`min-h-screen ${bgPrimary} flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0097B2]/30 border-t-[#0097B2] rounded-full animate-spin mx-auto mb-4"></div>
          <p className={`text-lg ${textSecondary}`}>Loading job details...</p>
        </div>
      </div>
    );
  }

  // Job not found state
  if (!job) {
    return (
      <div className={`min-h-screen ${bgPrimary} flex items-center justify-center px-4`}>
        <div className="text-center">
          <AlertCircle className={`w-16 h-16 ${textSecondary} mx-auto mb-4 opacity-50`} />
          <p className={`text-lg font-semibold ${textPrimary} mb-2`}>Job not found</p>
          <p className={`${textSecondary} mb-6 max-w-md`}>The job listing you're looking for doesn't exist or has been removed.</p>
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
      {/* Header - Mobile Optimized */}
      <div className={`sticky top-0 z-40 border-b ${borderColor} ${mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className={`p-2 rounded-lg transition-colors ${mode === 'dark' ? 'hover:bg-[#1B2E31]' : 'hover:bg-gray-100'}`}
          >
            <ArrowLeft className={`w-5 h-5 sm:w-6 sm:h-6 ${textPrimary}`} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className={`text-base sm:text-xl lg:text-2xl font-bold ${textPrimary} truncate`}>
              Apply for {job?.title}
            </h1>
            <p className={`text-xs sm:text-sm ${textSecondary} truncate lg:hidden`}>
              {job?.Company?.name}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">

          {/* Form Section */}
          <div className="lg:col-span-2">
            {/* Step Indicator - Mobile Optimized */}
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <div className="flex justify-between items-center">
                {steps.map((step, idx) => (
                  <React.Fragment key={step.number}>
                    <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${currentStep >= step.number
                          ? 'bg-[#0097B2] text-white shadow-lg shadow-[#0097B2]/30'
                          : `${sectionBg} ${textSecondary}`
                          }`}
                      >
                        {currentStep > step.number ? '✓' : step.number}
                      </div>
                      <p className={`text-[10px] sm:text-xs lg:text-sm font-medium ${currentStep >= step.number ? 'text-[#0097B2]' : textSecondary
                        }`}>
                        {step.label}
                      </p>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 sm:h-1 mx-1 sm:mx-2 rounded ${currentStep > step.number ? 'bg-[#0097B2]' : borderColor
                        }`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Form Card */}
            <form onSubmit={handleSubmit} className={`${cardBg} rounded-xl sm:rounded-2xl border ${borderColor} shadow-lg p-4 sm:p-6 lg:p-8`}>

              {/* Success Message */}
              {submitSuccess && (
                <div className="flex items-start sm:items-center gap-3 p-3 sm:p-4 bg-green-500/20 border border-green-500/30 rounded-lg mb-4 sm:mb-6">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <div>
                    <p className="text-sm font-medium text-green-500">Application submitted successfully!</p>
                    <p className={`text-xs ${textSecondary} mt-1`}>Redirecting you back to jobs...</p>
                  </div>
                </div>
              )}

              {/* Error Message */}

              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4 sm:space-y-5">
                  <h2 className={`text-xl sm:text-2xl font-bold ${textPrimary} mb-4 sm:mb-6`}>
                    Personal Information
                  </h2>

                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#0097B2] focus:border-transparent transition-all outline-none text-sm sm:text-base`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="text-red-500 text-xs sm:text-sm mt-1.5">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#0097B2] focus:border-transparent transition-all outline-none text-sm sm:text-base`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1.5">{errors.email}</p>}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#0097B2] focus:border-transparent transition-all outline-none text-sm sm:text-base`}
                      placeholder="9876543210"
                    />
                    {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1.5">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#0097B2] focus:border-transparent transition-all outline-none text-sm sm:text-base`}
                      placeholder="Chennai,India"
                    />
                    {errors.location && <p className="text-red-500 text-xs sm:text-sm mt-1.5">{errors.location}</p>}
                  </div>
                </div>
              )}

              {/* Step 2: Professional Information */}
              {currentStep === 2 && (
                <div className="space-y-4 sm:space-y-5">
                  <h2 className={`text-xl sm:text-2xl font-bold ${textPrimary} mb-4 sm:mb-6`}>
                    Professional Information
                  </h2>

                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      Years of Experience <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#0097B2] focus:border-transparent transition-all outline-none text-sm sm:text-base`}
                    >
                      <option value="">Select experience</option>
                      <option value="0">Fresher</option>
                      <option value="1">1 Year</option>
                      <option value="2">2 Years</option>
                      <option value="3">3 Years</option>
                      <option value="5">5+ Years</option>
                    </select>
                    {errors.experience && <p className="text-red-500 text-xs sm:text-sm mt-1.5">{errors.experience}</p>}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      Current Designation <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="currentDesignation"
                      value={formData.currentDesignation}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#0097B2] focus:border-transparent transition-all outline-none text-sm sm:text-base`}
                      placeholder="e.g., Software Developer"
                    />
                    {errors.currentDesignation && <p className="text-red-500 text-xs sm:text-sm mt-1.5">{errors.currentDesignation}</p>}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      Current Company
                    </label>
                    <input
                      type="text"
                      name="currentCompany"
                      value={formData.currentCompany}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#0097B2] focus:border-transparent transition-all outline-none text-sm sm:text-base`}
                      placeholder="Company name"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        name="linkedinProfile"
                        value={formData.linkedinProfile}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#0097B2] focus:border-transparent transition-all outline-none text-sm sm:text-base`}
                        placeholder="linkedin.com/in/you"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                        Portfolio URL
                      </label>
                      <input
                        type="url"
                        name="portfolioUrl"
                        value={formData.portfolioUrl}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#0097B2] focus:border-transparent transition-all outline-none text-sm sm:text-base`}
                        placeholder="yourportfolio.com"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Documents */}
              {currentStep === 3 && (
                <div className="space-y-4 sm:space-y-5">
                  <h2 className={`text-xl sm:text-2xl font-bold ${textPrimary} mb-4 sm:mb-6`}>
                    Documents & Details
                  </h2>

                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      Resume/CV <span className="text-red-500">*</span>
                    </label>
                    <div className={`border-2 border-dashed ${borderColor} rounded-lg p-4 sm:p-6 text-center cursor-pointer hover:border-[#0097B2] transition-all ${inputBg}`}>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        id="resume-upload"
                      />
                      <label htmlFor="resume-upload" className="cursor-pointer block">
                        <Upload className={`w-8 h-8 sm:w-10 sm:h-10 ${textSecondary} mx-auto mb-2`} />
                        <p className={`text-sm font-medium ${textPrimary}`}>
                          {formData.resume ? (typeof formData.resume === 'string' ? 'Resume uploaded' : formData.resume.name) : 'Click to upload your resume'}
                        </p>
                        <p className={`text-xs ${textSecondary} mt-1`}>PDF, DOC, DOCX (Max 5MB)</p>
                      </label>
                    </div>
                    {errors.resume && <p className="text-red-500 text-xs sm:text-sm mt-1.5">{errors.resume}</p>}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                      Cover Letter (Optional)
                    </label>
                    <textarea
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      rows="4"
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#0097B2] focus:border-transparent transition-all outline-none resize-none text-sm sm:text-base`}
                      placeholder="Tell us why you're a great fit for this role..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                        Availability
                      </label>
                      <select
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#0097B2] focus:border-transparent transition-all outline-none text-sm`}
                      >
                        <option value="immediate">Immediate</option>
                        <option value="1week">1 Week</option>
                        <option value="2weeks">2 Weeks</option>
                        <option value="1month">1 Month</option>
                        <option value="3months">3 Months</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                        Salary Expected
                      </label>
                      <input
                        type="text"
                        name="salaryExpectation"
                        value={formData.salaryExpectation}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border ${borderColor} ${inputBg} ${textPrimary} focus:ring-2 focus:ring-[#0097B2] focus:border-transparent transition-all outline-none text-sm sm:text-base`}
                        placeholder="₹ LPA"
                        />
                    </div>
                  </div>
                </div>
              )}

              {errors.submit && (
                <div className="flex items-start sm:items-center gap-3 p-3 mt-2 md:mt-4 sm:p-4 bg-red-500/20 border border-red-500/30 rounded-lg mb-4 sm:mb-6">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <p className="text-sm font-medium text-red-500">{errors.submit}</p>
                </div>
              )}
              {/* Navigation Buttons */}
           <div className="flex flex-col sm:flex-row gap-3 pt-6 sm:pt-6 border-t border-gray-50 border-opacity-20 mt-6 sm:mt-8">
  {/* Show only "Already Applied" if user has applied */}
  {isAlreadyApplied ? (
    <button
      type="button"
      disabled
      className="w-full px-4 py-3 rounded-lg font-semibold text-gray-200 bg-gray-400 cursor-not-allowed shadow-lg shadow-gray-400/30"
    >
      Already Applied
    </button>
  ) : (
    <>
      {/* Previous Button */}
      <button
        type="button"
        onClick={handlePrevStep}
        disabled={currentStep === 1}
        className={`w-full sm:flex-1 px-4 py-3 rounded-lg font-semibold transition-all border ${borderColor} ${textPrimary} hover:bg-opacity-80 disabled:opacity-40 disabled:cursor-not-allowed order-2 sm:order-1 ${
          mode === "dark" ? "hover:bg-[#1B2E31]" : "hover:bg-gray-100"
        }`}
      >
        Previous
      </button>

      {/* Next or Submit Button */}
      {currentStep < 3 ? (
        <button
          type="button"
          onClick={handleNextStep}
          className="w-full sm:flex-1 px-4 py-3 rounded-lg font-semibold text-white bg-[#0097B2] hover:bg-[#007d94] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#0097B2]/30 order-1 sm:order-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:flex-1 px-4 py-3 rounded-lg font-semibold text-white bg-[#0097B2] hover:bg-[#007d94] transition-all shadow-lg shadow-[#0097B2]/30 order-1 sm:order-2"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      )}
    </>
  )}
</div>

            </form>

            {/* Mobile Job Summary Card - Shows only on mobile/tablet */}
            <div className={`${cardBg} rounded-xl border ${borderColor} shadow-lg p-4 mt-4 lg:hidden`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border ${borderColor} bg-white`}>
                  {job.Company?.logo ? (
                    <img src={job.Company.logo} alt={job.Company.name} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <Briefcase className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-base font-bold ${textPrimary} truncate`}>{job.title}</h3>
                  <p className={`text-sm ${textSecondary} truncate`}>{job.Company?.name}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ${job.status === 'open' ? 'bg-green-500/20 text-green-600' : 'bg-red-500/20 text-red-600'
                  }`}>
                  {job.status === 'open' ? 'Open' : 'Closed'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className={`w-4 h-4 ${textSecondary} flex-shrink-0`} />
                  <span className={`${textPrimary} truncate`}>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className={`w-4 h-4 ${textSecondary} flex-shrink-0`} />
                  <span className={`${textPrimary} truncate capitalize`}>{job.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className={`w-4 h-4 ${textSecondary} flex-shrink-0`} />
                  <span className={`${textPrimary} truncate`}>{job.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className={`w-4 h-4 ${textSecondary} flex-shrink-0`} />
                  <span className={`${textPrimary} truncate`}>{formatDeadline(job.deadline)}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-opacity-20">
                <p className={`text-lg font-bold ${textPrimary}`}>₹{job.salary}</p>
              </div>
            </div>
          </div>

          {/* Desktop Job Details Sidebar */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className={`${cardBg} rounded-2xl border ${borderColor} shadow-lg p-6 sticky top-24 space-y-5 max-h-[calc(100vh-150px)] overflow-y-auto`}>

              {/* Job Header */}
              <div>
                <div className={`w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 ${borderColor} bg-white mb-4 shadow-sm`}>
                  {job.Company?.logo ? (
                    <img src={job.Company.logo} alt={job.Company.name} className="w-full h-full object-contain p-1" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      <Briefcase className="w-7 h-7 text-gray-400" />
                    </div>
                  )}
                </div>
                <h3 className={`text-lg font-bold ${textPrimary} leading-tight mb-1`}>{job.title}</h3>
                <p className={`text-sm ${textSecondary}`}>{job.Company?.name}</p>
              </div>

              {/* Salary & Status */}
              <div className={`flex items-center justify-between p-3 rounded-lg ${sectionBg}`}>
                <p className={`text-2xl font-bold ${textPrimary}`}>₹{job.salary}</p>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${job.status === 'open' ? 'bg-green-500/20 text-green-600' : 'bg-red-500/20 text-red-600'
                  }`}>
                  {job.status === 'open' ? 'Hiring' : 'Closed'}
                </span>
              </div>

              <hr className={`${borderColor}`} />

              {/* Job Details Grid */}
              <div className="space-y-4 text-sm">
                <div>
                  <p className={`text-xs uppercase font-semibold ${textSecondary} mb-1.5 flex items-center gap-1.5`}>
                    <MapPin className="w-3.5 h-3.5" />
                    Location
                  </p>
                  <p className={`font-medium ${textPrimary}`}>{job.location}</p>
                </div>

                <div>
                  <p className={`text-xs uppercase font-semibold ${textSecondary} mb-1.5 flex items-center gap-1.5`}>
                    <Briefcase className="w-3.5 h-3.5" />
                    Job Type
                  </p>
                  <p className={`font-medium ${textPrimary} capitalize`}>{job.type}</p>
                </div>

                <div>
                  <p className={`text-xs uppercase font-semibold ${textSecondary} mb-1.5 flex items-center gap-1.5`}>
                    <Clock className="w-3.5 h-3.5" />
                    Experience
                  </p>
                  <p className={`font-medium ${textPrimary}`}>{job.experience}</p>
                </div>

                <div>
                  <p className={`text-xs uppercase font-semibold ${textSecondary} mb-1.5 flex items-center gap-1.5`}>
                    <Users className="w-3.5 h-3.5" />
                    Positions
                  </p>
                  <p className={`font-medium ${textPrimary}`}>{job.positions} openings</p>
                </div>

                <div>
                  <p className={`text-xs uppercase font-semibold ${textSecondary} mb-1.5 flex items-center gap-1.5`}>
                    <Calendar className="w-3.5 h-3.5" />
                    Deadline
                  </p>
                  <p className={`font-medium ${textPrimary}`}>{formatDeadline(job.deadline)}</p>
                </div>
              </div>

              <hr className={`${borderColor}`} />

              {/* Skills */}
              {(job.tags?.length > 0 || job.skillsRequired?.length > 0) && (
                <div>
                  <p className={`text-xs uppercase font-semibold ${textSecondary} mb-2.5 flex items-center gap-1.5`}>
                    <Zap className="w-3.5 h-3.5" />
                    Required Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[...(job.tags || []), ...(job.skillsRequired || [])].map((skill, idx) => (
                      <span key={idx} className={`px-2.5 py-1 rounded-md text-xs font-medium ${sectionBg} ${textPrimary} border ${borderColor} hover:border-[#0097B2] transition-colors`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Level */}
              {job.educationLevel && (
                <>
                  <hr className={`${borderColor}`} />
                  <div>
                    <p className={`text-xs uppercase font-semibold ${textSecondary} mb-1.5 flex items-center gap-1.5`}>
                      <GraduationCap className="w-3.5 h-3.5" />
                      Education
                    </p>
                    <p className={`text-sm font-medium ${textPrimary}`}>{job.educationLevel}</p>
                  </div>
                </>
              )}

              {/* Remote Info */}
              {job.remote && (
                <div className={`p-3 rounded-lg bg-blue-500/10 border border-blue-500/30`}>
                  <p className="text-xs font-medium text-blue-600">✓ Remote work available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;