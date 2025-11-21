import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInterviewStore from '../../zustand/mockInterviewStore/useFormInterviewStore';
import { newMockInterviewFormValidation } from '../../utils/validation/InterviewFormValidations';
import useThemeStore from '../../zustand/themeStore';

const NewInterviewForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    domain: '',
    type: 'HR',
    experience: '',
    timer: '10',
    questionAmount: '10',
    level: 'easy',
  });

  const navigate = useNavigate()
  const [errors, setErrors] = useState({});

  const { isLoading, formGenerateQuestions } = useInterviewStore()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        timer: parseInt(formData.timer, 10),
        questionAmount: parseInt(formData.questionAmount, 10),
        type : 'form'
      };
      const validationErrors = newMockInterviewFormValidation(formattedData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      setErrors({});
      const sessionId = await formGenerateQuestions(formattedData);
      console.log("Session ID:", sessionId);
      const domainName = formData.domain.replace(/\s+/g, '-').toLowerCase();
      const type = 'form';
      navigate(`/learnhub/mock-interview/${type}/${domainName}/${sessionId}/start`);

    } catch (error) {

      const formError = error.message || 'An error occurred while creating the interview.';
      setErrors(() => ({
        ...errors,
        formError
      }));
      console.log(errors);

    }
  };

  const { mode } = useThemeStore()

  const bgPrimary = mode === "dark" ? "bg-[#0F1419]" : "bg-white";
  const textPrimary = mode === "dark" ? "text-gray-100" : "text-gray-800";
  const textSecondary = mode === "dark" ? "text-gray-300" : "text-gray-700";
  const borderColor = mode === "dark" ? "border-gray-700" : "border-gray-300";
  const inputBg = mode === "dark" ? "bg-[#1B2E31]" : "bg-white";
  const placeholderColor =
    mode === "dark" ? "placeholder-gray-500" : "placeholder-gray-400";

  return (
    <div
      className={`p-6 rounded-xl max-w-md mx-auto  transition-colors duration-300 ${mode==='dark' ? "bg-backGray text-white" : "bg-white text-gray-800"
        }`}
    >
      <h2 className={`text-2xl font-bold text-center mb-6 ${mode==='dark' ? "text-white" : "text-gray-800"}`}>
        Create New Mock Interview
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Domain Name */}
        <div>
          <label
            className={`block text-sm font-medium mb-1 ${textSecondary}`}
          >            Domain Name
          </label>
          <input
            type="text"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            placeholder="e.g., Frontend, Backend"
            className={`w-full border ${borderColor} ${inputBg} ${textPrimary} rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00B2A9] outline-none ${errors.domain
              ? "border-red-500 focus:ring-red-500"
              : ""
              }`}
          />
          {errors.domain && <p className="text-red-500 text-sm mt-1">{errors.domain}</p>}
        </div>

        {/* Interview Type */}
        <div>
          <label
            className={`block text-sm font-medium mb-1 ${textSecondary}`}
          >            Interview Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={`w-full border ${borderColor} ${inputBg} ${textPrimary} rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00B2A9] outline-none ${errors.type
              ? "border-red-500 focus:ring-red-500"
              :""
              }`}
          >
            <option value="HR">HR</option>
            <option value="Technical">Technical</option>
            <option value="Mixed">Mixed</option>
            <option value="Behavioural">Behavioural</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
        </div>

        {/* Experience */}
        <div>
          <label
            className={`block text-sm font-medium mb-1 ${textSecondary}`}
          >            Experience
          </label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="e.g., Fresher, 1 year"
            className={`w-full border ${borderColor} ${inputBg} ${textPrimary} rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00B2A9] outline-none ${errors.experience
              ? "border-red-500 focus:ring-red-500"
              : ""
              }`}
          />
          {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
        </div>

        {/* Timer & Questions */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label
              className={`block text-sm font-medium mb-1 ${textSecondary}`}
            >Timer</label>
            <select
              name="timer"
              value={formData.timer}
              onChange={handleChange}
              className={`w-full border ${borderColor} ${inputBg} ${textPrimary} rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00B2A9] outline-none ${errors.questionAmount
                ? "border-red-500 focus:ring-red-500"
                : ""
                }`}
            >
              {[5, 10, 20, 30].map((min) => (
                <option key={min} value={min}   >
                  {min} Minutes
                </option>
              ))}
            </select>
            {errors.timer && <p className="text-red-500 text-sm mt-1">{errors.timer}</p>}
          </div>

          <div className="w-1/2">
            <label
              className={`block text-sm font-medium mb-1 ${textSecondary}`}
            >              No. of Questions
            </label>
            <select
              name="questionAmount"
              value={formData.questionAmount}
              onChange={handleChange}
              className={`w-full border ${borderColor} ${inputBg} ${textPrimary} rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00B2A9] outline-none ${errors.questionAmount
                ? "border-red-500 focus:ring-red-500"
                : ""
                }`}
            >
              {[10, 20, 30, 40].map((amt) => (
                <option key={amt} value={amt}>
                  {amt} Questions
                </option>
              ))}
            </select>
            {errors.questionAmount && <p className="text-red-500 text-sm mt-1">{errors.questionAmount}</p>}
          </div>
        </div>

        {/* Level */}
        <div>
          <label
            className={`block text-sm font-medium mb-1 ${textSecondary}`}
          >Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className={`w-full border ${borderColor} ${inputBg} ${textPrimary} rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00B2A9] outline-none`}

          >
            {["easy", "medium", "hard"].map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-white transition ${isLoading
              ? "bg-[#66C5D5] cursor-not-allowed"
              : "bg-[#0097B2] hover:bg-[#007A8F]"
              }`}
          >
            {isLoading && (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5"></span>
            )}
            <span>{isLoading ? "Creating..." : "Create Interview"}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`px-5 py-2 rounded-lg transition ${mode
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewInterviewForm;
