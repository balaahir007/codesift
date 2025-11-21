import React, { useRef, useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Users, FileText, Tag, X, ArrowLeft, Award, Calendar } from 'lucide-react';
import useThemeStore from '../../zustand/themeStore';
import { FaPlus } from "react-icons/fa6";
import useJobStore from '../../zustand/recruiter/useJobStore';
import { validateJobForm } from '../../utils/validation/validateJobForm';
import { useNavigate } from 'react-router-dom'
const JobPostForm = ({ job = {}, isEditing = false }) => {
  const navigate = useNavigate()
  const onBack = () => {
    navigate(-1)
  }
  const { mode } = useThemeStore()
  console.log("job Dataaa : ", job)
  const [formData, setFormData] = useState({
    title: job.title || 'Senior Software Developer',
    location: job.location || 'Chennai, India',
    type: job.type || 'full-time', // matches backend enum
    salary: job.salary || '6 LPA',
    description: job.description || 'We are looking for a passionate software developer to join our team.',
    requirements: job.requirements || 'Proficiency in JavaScript, React, and Node.js',
    responsibilities: job.responsibilities || 'Develop, test, and deploy scalable web applications.',
    benefits: job.benefits || 'Health insurance, Work from home flexibility',
    tags: job.tags || ['Node.js', 'React'],
    experience: job.experience || 'Entry Level',
    positions: job.positions || 4,
    remote: job.remote || false,
    educationLevel: job.educationLevel || "Bachelor's Degree",
    deadline: job.deadline || '2025-12-31'
  });
  const refs = {
    title: useRef(null),
    location: useRef(null),
    type: useRef(null),
    salary: useRef(null),
    description: useRef(null),
    requirements: useRef(null),
    responsibilities: useRef(null),
    benefits: useRef(null),
    experience: useRef(null),
    positions: useRef(null),
    educationLevel: useRef(null),
    deadline: useRef(null),
  };




  const [errors, setErrors] = useState({})
  const [currentTag, setCurrentTag] = useState('');

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Lead', 'Executive'];
  const educationLevels = ['High School', 'Associate Degree', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Any'];
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const { createJob, updateJobById } = useJobStore()
  const handleSubmit = async () => {
    const validationErrors = validateJobForm(formData);
    console.log(validationErrors)
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = Object.keys(validationErrors)[0];
      const fieldRef = refs[firstErrorField]

      if (fieldRef && fieldRef.current) {
        fieldRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        fieldRef.current.focus();
      }
      return;
    }
    try {
      if (isEditing) {
        updateJobById(job.id, formData)
      } else {
        await createJob(formData);

      }
      navigate('/recruiter/jobs')
    } catch (err) {
      console.error('Failed to post job:', err);
      setErrors((prev) => ({
        ...prev,
        submitionError: err.message
      }))
    }
  };


  return (
    <div className={`min-h-screen transition-all duration-300 ${mode === 'dark' ? 'bg-backGray' : 'bg-gray-50'}`}>
      <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 mb-3 sm:mb-4 transition-colors text-sm sm:text-base ${mode === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Back to Jobs</span>
            <span className="sm:hidden">Back</span>
          </button>
          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-semibold mb-1 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {isEditing ? 'Edit a Job' : 'Post a New Job'}

          </h1>
          <p className={`text-sm sm:text-base lg:text-lg ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Fill in the details to create your job listing
          </p>
        </div>

        {/* Form */}
        <div className={`rounded-xl p-4 sm:p-6 lg:p-8 ${mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white shadow-lg'
          }`}>

          {/* Basic Information */}
          <div className="mb-6 sm:mb-8">
            <h2 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
              <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
              Basic Information
            </h2>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className={`block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  Job Title *
                </label>
                <input
                  ref={refs.title}
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Senior Frontend Developer"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg transition-all duration-300 outline-none ${mode === 'dark'
                    ? 'bg-[#0F1E20] border-2 border-[#294B4E] focus:border-[#00B2A9] text-white placeholder-gray-500'
                    : 'bg-gray-50 border-2 border-gray-200 focus:border-[#0097B2] text-gray-900 placeholder-gray-400'
                    }`}
                />
                {
                  errors.title && <span className='text-red-500 text-sm' >{errors.title}</span>
                }
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className={`block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    Location *
                  </label>
                  <input
                    ref={refs.location}
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., San Francisco, CA"
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg transition-all duration-300 outline-none ${mode === 'dark'
                      ? 'bg-[#0F1E20] border-2 border-[#294B4E] focus:border-[#00B2A9] text-white placeholder-gray-500'
                      : 'bg-gray-50 border-2 border-gray-200 focus:border-[#0097B2] text-gray-900 placeholder-gray-400'
                      }`}
                  />
                  {errors.location && <span className='text-red-500 text-sm' >{errors.location}</span>}

                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className={`block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    Job Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg transition-all duration-300 outline-none cursor-pointer ${mode === 'dark'
                      ? 'bg-[#0F1E20] border-2 border-[#294B4E] focus:border-[#00B2A9] text-white'
                      : 'bg-gray-50 border-2 border-gray-200 focus:border-[#0097B2] text-gray-900'
                      }`}
                  >
                    {jobTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                    Salary Range
                  </label>
                  <input
                    ref={refs.salary}
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="$120k - $160k"
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg transition-all duration-300 outline-none ${mode === 'dark'
                      ? 'bg-[#0F1E20] border-2 border-[#294B4E] focus:border-[#00B2A9] text-white placeholder-gray-500'
                      : 'bg-gray-50 border-2 border-gray-200 focus:border-[#0097B2] text-gray-900 placeholder-gray-400'
                      }`}
                  />
                  {errors.salary && <span className='text-red-500 text-sm' >{errors.salary}</span>}

                </div>

                <div className="sm:col-span-2 lg:col-span-1">
                  <label className={`block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                    Positions
                  </label>
                  <input
                    ref={refs.positions}
                    type="number"
                    name="positions"
                    value={formData.positions}
                    onChange={handleChange}
                    min="1"
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg transition-all duration-300 outline-none ${mode === 'dark'
                      ? 'bg-[#0F1E20] border-2 border-[#294B4E] focus:border-[#00B2A9] text-white'
                      : 'bg-gray-50 border-2 border-gray-200 focus:border-[#0097B2] text-gray-900'
                      }`}
                  />
                  {errors.positions && <span className='text-red-500 text-sm' >{errors.positions}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {/* Deadline */}
                <div>
                  <label
                    className={`block mb-1 sm:mb-1.5 text-xs sm:text-sm font-medium flex items-center gap-1.5 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                  >
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" /> Deadline
                  </label>
                  <input
                    ref={refs.deadline}
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className={`w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base rounded-md sm:rounded-lg transition-all duration-300 outline-none ${mode === 'dark'
                      ? 'bg-gray-700 border-2 border-gray-600 focus:border-blue-500 text-white'
                      : 'bg-gray-50 border-2 border-gray-200 focus:border-blue-500 text-gray-900'
                      }`}
                  />
                  {errors.deadline && <span className='text-red-500 text-sm' >{errors.deadline}</span>}
                </div>

                {/* Experience Level */}
                <div>
                  <label
                    className={`block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                  >
                    Experience Level *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg transition-all duration-300 outline-none cursor-pointer ${mode === 'dark'
                      ? 'bg-[#0F1E20] border-2 border-[#294B4E] focus:border-[#00B2A9] text-white'
                      : 'bg-gray-50 border-2 border-gray-200 focus:border-[#0097B2] text-gray-900'
                      }`}
                  >
                    <option value="">Select experience level</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  {errors.experience && <span className='text-red-500 text-sm' >{errors.experience}</span>}

                </div>

                {/* Education Level */}
                <div>
                  <label
                    className={`block mb-1 sm:mb-1.5 text-xs sm:text-sm font-medium flex items-center gap-1.5 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                  >
                    <Award className="w-3 h-3 sm:w-4 sm:h-4" /> Education Level
                  </label>
                  <select
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    className={`w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base rounded-md sm:rounded-lg transition-all duration-300 outline-none cursor-pointer ${mode === 'dark'
                      ? 'bg-gray-700 border-2 border-gray-600 focus:border-blue-500 text-white'
                      : 'bg-gray-50 border-2 border-gray-200 focus:border-blue-500 text-gray-900'
                      }`}
                  >
                    <option value="">Select education level</option>
                    {educationLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  {errors.educationLevel && <span className='text-red-500 text-sm' >{errors.educationLevel}</span>}

                </div>
              </div>

            </div>
            <div className="flex items-center gap-2 pt-2"> <input type="checkbox" name="remote" id="remote" checked={formData.remote} onChange={handleChange} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />

              <label htmlFor="remote" className={`text-xs sm:text-sm font-medium cursor-pointer select-none ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}> This is a remote position </label>
            </div>
          </div>

          {/* Job Details */}
          <div className="mb-6 sm:mb-8">
            <h2 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              Job Details
            </h2>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className={`block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  Job Description *
                </label>
                <textarea
                  name="description"
                  ref={refs.description}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the role, team, and what makes this opportunity unique..."
                  rows="4"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg transition-all duration-300 outline-none resize-none ${mode === 'dark'
                    ? 'bg-[#0F1E20] border-2 border-[#294B4E] focus:border-[#00B2A9] text-white placeholder-gray-500'
                    : 'bg-gray-50 border-2 border-gray-200 focus:border-[#0097B2] text-gray-900 placeholder-gray-400'
                    }`}
                />
                {errors.description && <span className='text-red-500 text-sm' >{errors.description}</span>}
              </div>

              <div>
                <label className={`block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  Requirements *
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  ref={refs.requirements}
                  onChange={handleChange}
                  placeholder="List the required skills, qualifications, and experience..."
                  rows="3"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg transition-all duration-300 outline-none resize-none ${mode === 'dark'
                    ? 'bg-[#0F1E20] border-2 border-[#294B4E] focus:border-[#00B2A9] text-white placeholder-gray-500'
                    : 'bg-gray-50 border-2 border-gray-200 focus:border-[#0097B2] text-gray-900 placeholder-gray-400'
                    }`}
                />
                {errors.requirements && <span className='text-red-500 text-sm' >{errors.requirements}</span>}
              </div>

              <div>
                <label className={`block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  Responsibilities *
                </label>
                <textarea
                  ref={refs.responsibilities}
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  placeholder="Outline the key responsibilities and day-to-day tasks..."
                  rows="3"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg transition-all duration-300 outline-none resize-none ${mode === 'dark'
                    ? 'bg-[#0F1E20] border-2 border-[#294B4E] focus:border-[#00B2A9] text-white placeholder-gray-500'
                    : 'bg-gray-50 border-2 border-gray-200 focus:border-[#0097B2] text-gray-900 placeholder-gray-400'
                    }`}
                />
                {errors.responsibilities && <span className='text-red-500 text-sm' >{errors.responsibilities}</span>}
              </div>

              <div>
                <label className={`block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  Benefits
                </label>
                <textarea
                  name="benefits"
                  ref={refs.benefits}
                  value={formData.benefits}

                  onChange={handleChange}
                  placeholder="What benefits and perks do you offer?"
                  rows="3"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg transition-all duration-300 outline-none resize-none ${mode === 'dark'
                    ? 'bg-[#0F1E20] border-2 border-[#294B4E] focus:border-[#00B2A9] text-white placeholder-gray-500'
                    : 'bg-gray-50 border-2 border-gray-200 focus:border-[#0097B2] text-gray-900 placeholder-gray-400'
                    }`}
                />
                {errors.benefits && <span className='text-red-500 text-sm' >{errors.benefits}</span>}
              </div>
            </div>
          </div>

          {/* Skills Tags */}
          <div className="mb-6 sm:mb-8">
            <h2 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
              <Tag className="w-4 h-4 sm:w-5 sm:h-5" />
              Skills & Tags
            </h2>

            <div>
              <label className={`block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Add relevant skills and technologies
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="e.g., React, Node.js, Python"
                  className={`flex-1 px-3 items-center sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg transition-all duration-300 outline-none ${mode === 'dark'
                    ? 'bg-[#0F1E20] border-2 border-[#294B4E] focus:border-[#00B2A9] text-white placeholder-gray-500'
                    : 'bg-gray-50 border-2 border-gray-200 focus:border-[#0097B2] text-gray-900 placeholder-gray-400'
                    }`}
                />
                {errors.tags && <span className='text-red-500 text-sm' >{errors.tags}</span>}
                <button
                  type="button"
                  onClick={addTag}
                  className="flex justify-center items-center gap-2 px-6 py-2 sm:py-3 text-sm sm:text-base bg-primary hover:bg-secondary text-white rounded-lg transition-colors duration-300 font-medium"
                >
                  <FaPlus className="text-sm" />
                  <span>Add</span>
                </button>


              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium ${mode === 'dark'
                        ? 'bg-[#00B2A9]/20 text-[#00B2A9]'
                        : 'bg-[#0097B2]/10 text-[#0097B2]'
                        }`}
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:opacity-70 transition-opacity"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          {errors.submitionError && <span className='text-red-500 text-sm' >{errors.submitionError}</span>}
          {/* Action Buttons */}
          <div className={`flex flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t ${mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200'
            }`}>
            <button
              type="button"
              onClick={onBack}
              className={`w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-medium transition-colors duration-300 ${mode === 'dark'
                ? 'bg-[#0F1E20] text-gray-300 hover:bg-[#1a2d30] border-2 border-[#294B4E]'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200'
                }`}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-primary hover:bg-secondary text-white rounded-lg font-medium transition-colors duration-300"
            >
              Post Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostForm;