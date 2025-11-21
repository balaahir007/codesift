import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useThemeStore from "../../zustand/themeStore";
import axiosInstance from "../../utils/axiosInstance";
import uploadFile from "../../utils/uploadFile.js";
import { MdOutlineCloudUpload } from "react-icons/md";

const CreateHackathonPage = () => {
  const navigate = useNavigate();
  const { mode } = useThemeStore();

  // THEME CLASSES
  const bgPrimary = mode === 'dark' ? 'bg-[#0A1215]' : 'bg-gray-50';
  const bgCard = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const inputBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-white';
  const focusRing = mode === 'dark' ? 'focus:ring-blue-500/20' : 'focus:ring-blue-500/30';

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Required fields
    title: "InnovateX Hackathon 2025",
    description: "A global hackathon for developers, designers, and innovators to build impactful tech solutions.",
    type: "virtual",
    location: "Online",
    logo: '',
    bannerImage: '',
    startDate: "2025-12-01",
    endDate: "2025-12-05",
    registrationStartDate: "2025-11-15",
    registrationDeadline: "2025-11-30",
    maxRegistration: "500",

    // Optional fields
    longDescription: "Join the InnovateX Hackathon 2025 — a 5-day virtual event bringing together the brightest minds in technology. Compete in exciting challenges, network with mentors, and win prizes worth over $10,000!",
    venue: "Zoom / Discord Channels",
    minTeamSize: "1",
    maxTeamSize: "4",
    prizePool: "$10,000",
    tags: "AI, Web3, Sustainability, FinTech",
    difficulty: "intermediate",
    themes: "Sustainability, Education, Healthcare, FinTech",
    eligibility: "Open to all students and professionals worldwide",
    rules: "Teams must submit projects before the deadline. All code must be original. Plagiarism leads to disqualification.",
    contactEmail: "support@innovatex.com",
    websiteUrl: "https://www.innovatexhackathon.com",
    discordUrl: "https://discord.gg/innovatex",
    slackUrl: "https://innovatex.slack.com"
  });


  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = "Title is required";
      if (!formData.bannerImage) newErrors.bannerImage = "bannerImage is required";
      if (!formData.logo) newErrors.logo = "Logo is required";
      if (!formData.description.trim()) newErrors.description = "Description is required";
      if (!formData.type) newErrors.type = "Type is required";
      if (!formData.location.trim()) newErrors.location = "Location is required";
    }

    if (step === 2) {
      if (!formData.startDate) newErrors.startDate = "Start date is required";
      if (!formData.endDate) newErrors.endDate = "End date is required";
      if (!formData.registrationStartDate) newErrors.registrationStartDate = "Registration start date is required";
      if (!formData.registrationDeadline) newErrors.registrationDeadline = "Registration deadline is required";
      if (!formData.maxRegistration || formData.maxRegistration < 1) {
        newErrors.maxRegistration = "Max Registeration must be at least 1";
      }

      // Date validations
      if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
        newErrors.endDate = "End date must be after start date";
      }
      if (formData.registrationStartDate && formData.registrationDeadline &&
        formData.registrationStartDate > formData.registrationDeadline) {
        newErrors.registrationDeadline = "Deadline must be after registration start";
      }
      if (formData.registrationDeadline && formData.startDate &&
        formData.registrationDeadline > formData.startDate) {
        newErrors.registrationDeadline = "Registration must close before hackathon starts";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      return;
    }

    const logo_url = await uploadFile(formData.logo)
    if (!logo_url) {
      setErrors((prev) => ({
        ...prev,
        logo: logo_url
      }))
      return;
    }

    try {
      const payload = {
        ...formData,
        logo: logo_url,
        tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
        themes: formData.themes ? formData.themes.split(",").map((t) => t.trim()) : [],
        maxRegistration: parseInt(formData.maxRegistration),
        minTeamSize: parseInt(formData.minTeamSize),
        maxTeamSize: parseInt(formData.maxTeamSize),
      };

      const res = await axiosInstance.post("/hackathons", payload);
      alert("Hackathon created successfully!");
      navigate(`/teacher/hackathon`);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error creating hackathon!");
    }
  };

  const steps = [
    { number: 1, title: "Basic Info" },
    { number: 2, title: "Dates & Capacity" },
    { number: 3, title: "Additional Details" },
  ];

  return (
    <div className={`min-h-screen ${bgPrimary} py-4 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className={`text-2xl sm:text-3xl font-bold ${textPrimary} mb-2`}>
            Create New Hackathon
          </h1>
          <p className={`${textSecondary} text-sm sm:text-base`}>
            Fill in the details to create your hackathon event
          </p>
        </div>

        {/* Progress Steps */}
        <div className={`${bgCard} rounded-xl shadow-sm p-4 sm:p-6 mb-6 border ${borderColor}`}>
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex items-center flex-1">
                  <div className="flex flex-col items-center sm:flex-row sm:items-center flex-1">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${currentStep >= step.number
                        ? "bg-blue-600 text-white"
                        : `${borderColor} border-2 ${textSecondary}`
                        }`}
                    >
                      {currentStep > step.number ? "✓" : step.number}
                    </div>
                    <span
                      className={`mt-2 sm:mt-0 sm:ml-3 text-xs sm:text-sm font-medium ${currentStep >= step.number ? textPrimary : textSecondary
                        }`}
                    >
                      {step.title}
                    </span>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 w-8 sm:w-16 lg:w-24 mx-2 ${currentStep > step.number ? "bg-blue-600" : `${borderColor} bg-current`
                      }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className={`${bgCard} rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 border ${borderColor}`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4 sm:space-y-5">
                {/* bannerImage Image */}
                <div className="mt-4 rounded-lg p-4">
                  <label
                    className={`block font-medium mb-2 flex items-center gap-2 ${textPrimary} text-sm sm:text-base`}
                  >
                    Banner Image <span className="text-gray-400"></span>
                  </label>

                  {/* Styled upload box */}
                  <div
                    onClick={() => document.getElementById("bannerUpload").click()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${inputBg} ${borderColor} hover:border-blue-500 transition-all`}
                  >
                    <p className={`text-sm sm:text-base ${textPrimary}`}>
                      Click to upload or drag & drop a bannerImage image
                    </p>
                    <MdOutlineCloudUpload size={20} />
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG up to 10MB (Recommended: 1200x400)</p>
                  </div>

                  {/* Hidden input field */}
                  <input
                    id="bannerUpload"
                    type="file"
                    accept="image/*"
                    name="bannerImage"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFormData({ ...formData, bannerImage: file });
                      }
                    }}
                    className="hidden"
                  />

                  {/* Preview section */}
                  {formData.bannerImage && (
                    <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
                      <img
                        src={URL.createObjectURL(formData.bannerImage)}
                        alt="bannerImage Preview"
                        className="w-full sm:w-64 h-32 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, bannerImage: "" })}
                        className="text-red-500 text-sm font-medium hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <h2 className={`text-lg sm:text-xl font-semibold ${textPrimary} mb-4 sm:mb-6`}>
                  Basic Information
                </h2>
                {/* Hackathon Title */}

                {/* Organizer Logo */}
                <div className="mt-4  rounded-lg p-4">
                  <label
                    className={`block font-medium mb-2 flex items-center gap-2 ${textPrimary} text-sm sm:text-base`}
                  >
                    Hackathon Logo <span className="text-gray-400">(optional)</span>
                  </label>

                  {/* Styled upload box */}
                  <div
                    onClick={() => document.getElementById("logoUpload").click()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${inputBg} ${borderColor} hover:border-blue-500 transition-all`}
                  >
                    <p className={`text-sm sm:text-base ${textPrimary}`}>
                      Click to upload or drag & drop an image
                    </p>
                    <MdOutlineCloudUpload size={20} />

                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG up to 5MB</p>
                  </div>

                  {/* Hidden input field */}
                  <input
                    id="logoUpload"
                    type="file"
                    accept="image/*"
                    name="logo"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFormData({ ...formData, logo: file });
                      }
                    }}
                    className="hidden"
                  />

                  {/* Preview section */}
                  {formData.logo && (
                    <div className="mt-4 flex items-center gap-3">
                      <img
                        src={URL.createObjectURL(formData.logo)}
                        alt="Hackathon Logo Preview"
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, logo: "" })}
                        className="text-red-500 text-sm font-medium hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                                      {errors.bannerImage && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.bannerImage}</p>}

                </div>
                <div>
                  <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all text-sm sm:text-base`}
                    placeholder="Enter hackathon title"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.title}</p>
                  )}
                </div>




                {/* Description */}
                <div>
                  <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                    Short Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all resize-none text-sm sm:text-base`}
                    placeholder="Brief description of the hackathon"
                  ></textarea>
                  {errors.description && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.description}</p>}
                </div>

                {/* Long Description */}
                <div>
                  <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                    Detailed Description <span className={textSecondary}>(Optional)</span>
                  </label>
                  <textarea
                    name="longDescription"
                    rows={5}
                    value={formData.longDescription}
                    onChange={handleChange}
                    className={`w-full  rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all resize-none text-sm sm:text-base`}
                    placeholder="Detailed information about the hackathon"
                  ></textarea>
                </div>

                {/* Type and Difficulty */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                      Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all text-sm sm:text-base`}
                    >
                      <option value="virtual">Virtual</option>
                      <option value="in-person">In-Person</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                    {errors.type && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.type}</p>}
                  </div>

                  <div>
                    <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                      Difficulty
                    </label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleChange}
                      className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all text-sm sm:text-base`}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                {/* Location and Venue */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all text-sm sm:text-base`}
                      placeholder="City, Country"
                    />
                    {errors.location && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.location}</p>}
                  </div>

                  <div>
                    <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                      Venue <span className={textSecondary}>(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleChange}
                      className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all text-sm sm:text-base`}
                      placeholder="Specific venue name"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Dates & Capacity */}
            {currentStep === 2 && (
              <div className="space-y-4 sm:space-y-5">
                <h2 className={`text-lg sm:text-xl font-semibold ${textPrimary} mb-4 sm:mb-6`}>
                  Dates & Capacity
                </h2>

                {/* Hackathon Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all text-sm sm:text-base`}
                    />
                    {errors.startDate && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.startDate}</p>}
                  </div>

                  <div>
                    <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all text-sm sm:text-base`}
                    />
                    {errors.endDate && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.endDate}</p>}
                  </div>
                </div>

                {/* Registration Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                      Registration Start <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="registrationStartDate"
                      value={formData.registrationStartDate}
                      onChange={handleChange}
                      className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all text-sm sm:text-base`}
                    />
                    {errors.registrationStartDate && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.registrationStartDate}</p>}
                  </div>

                  <div>
                    <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                      Registration Deadline <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="registrationDeadline"
                      value={formData.registrationDeadline}
                      onChange={handleChange}
                      className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all text-sm sm:text-base`}
                    />
                    {errors.registrationDeadline && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.registrationDeadline}</p>}
                  </div>
                </div>

                {/* Capacity & Team Size */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                      Max Participants <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="maxRegistration"
                      min="1"
                      value={formData.maxRegistration}
                      onChange={handleChange}
                      className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all text-sm sm:text-base`}
                      placeholder="100"
                    />
                    {errors.maxRegistration && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.maxRegistration}</p>}
                  </div>

                  <div>
                    <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                      Min Team Size
                    </label>
                    <input
                      type="number"
                      name="minTeamSize"
                      min="1"
                      value={formData.minTeamSize}
                      onChange={handleChange}
                      className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all text-sm sm:text-base`}
                    />
                  </div>

                  <div>
                    <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                      Max Team Size
                    </label>
                    <input
                      type="number"
                      name="maxTeamSize"
                      min="1"
                      value={formData.maxTeamSize}
                      onChange={handleChange}
                      className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all text-sm sm:text-base`}
                    />
                  </div>
                </div>

                {/* Prize Pool */}
                <div>
                  <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                    Prize Pool <span className={textSecondary}>(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="prizePool"
                    value={formData.prizePool}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all text-sm sm:text-base`}
                    placeholder="e.g., $10,000"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Additional Details */}
            {currentStep === 3 && (
              <div className="space-y-4 sm:space-y-5">
                <h2 className={`text-lg sm:text-xl font-semibold ${textPrimary} mb-4 sm:mb-6`}>
                  Additional Details
                </h2>

                {/* Tags and Themes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                      Tags <span className={textSecondary}>(comma separated)</span>
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all text-sm sm:text-base`}
                      placeholder="AI, Web3, Mobile"
                    />
                  </div>

                  <div>
                    <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                      Themes <span className={textSecondary}>(comma separated)</span>
                    </label>
                    <input
                      type="text"
                      name="themes"
                      value={formData.themes}
                      onChange={handleChange}
                      className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all text-sm sm:text-base`}
                      placeholder="Healthcare, Education"
                    />
                  </div>
                </div>

                {/* Eligibility */}
                <div>
                  <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                    Eligibility <span className={textSecondary}>(Optional)</span>
                  </label>
                  <textarea
                    name="eligibility"
                    rows={3}
                    value={formData.eligibility}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all resize-none text-sm sm:text-base`}
                    placeholder="Who can participate in this hackathon?"
                  ></textarea>
                </div>

                {/* Rules */}
                <div>
                  <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                    Rules <span className={textSecondary}>(Optional)</span>
                  </label>
                  <textarea
                    name="rules"
                    rows={4}
                    value={formData.rules}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all resize-none text-sm sm:text-base`}
                    placeholder="Competition rules and guidelines"
                  ></textarea>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                      Contact Email <span className={textSecondary}>(Optional)</span>
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all text-sm sm:text-base`}
                      placeholder="contact@hackathon.com"
                    />
                  </div>

                  <div>
                    <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                      Website URL <span className={textSecondary}>(Optional)</span>
                    </label>
                    <input
                      type="url"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all text-sm sm:text-base`}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                      Discord URL <span className={textSecondary}>(Optional)</span>
                    </label>
                    <input
                      type="url"
                      name="discordUrl"
                      value={formData.discordUrl}
                      onChange={handleChange}
                      className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all text-sm sm:text-base`}
                      placeholder="https://discord.gg/..."
                    />
                  </div>

                  <div>
                    <label className={`block font-medium mb-2 ${textPrimary} text-sm sm:text-base`}>
                      Slack URL <span className={textSecondary}>(Optional)</span>
                    </label>
                    <input
                      type="url"
                      name="slackUrl"
                      value={formData.slackUrl}
                      onChange={handleChange}
                      className={`w-full border rounded-lg p-2.5 sm:p-3 ${inputBg} ${textPrimary} ${borderColor} focus:outline-none focus:ring-2 ${focusRing} focus:border-blue-500 transition-all text-sm sm:text-base`}
                      placeholder="https://slack.com/..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 border-t border-current">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className={`w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all ${borderColor} border-2 ${textPrimary} hover:bg-opacity-10 hover:bg-gray-500 text-sm sm:text-base`}
                >
                  Previous
                </button>
              )}

              <div className="flex-1"></div>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full sm:w-auto px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  Create Hackathon
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className={`mt-6 p-4 rounded-lg ${bgCard} border ${borderColor}`}>
          <p className={`${textSecondary} text-xs sm:text-sm`}>
            <span className="text-red-500">*</span> Required fields must be filled to proceed
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateHackathonPage;