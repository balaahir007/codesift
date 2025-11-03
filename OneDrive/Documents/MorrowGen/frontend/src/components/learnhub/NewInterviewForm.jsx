import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInterviewStore from '../../zustand/mockInterviewStore/useFormInterviewStore';
import { newMockInterviewFormValidation } from '../../utils/validation/InterviewFormValidations';

const NewInterviewForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    domain: '',
    type: 'HR',
    experience: '',
    timer: '10',
    questionAmount: '1',
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
      };
      const validationErrors = newMockInterviewFormValidation(formattedData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      setErrors({});
      await formGenerateQuestions(formattedData);
      const domainName = formData.domain;
      console.log('hi');

      navigate(`/learnhub/mock-interview/${domainName}/start`)

    } catch (error) {

      const formError = error.message || 'An error occurred while creating the interview.';
      setErrors(() => ({
        ...errors,
        formError
      }));
      console.log(errors);

    }
  };

  return (
    <div className="p-4 bg-white rounded-xl max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Create New Mock Interview
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Domain Name</label>
          <input
            type="text"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            placeholder="e.g., Frontend, Backend"
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.domain ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-400'
              }`}
          />
          {errors.domain && <p className="text-red-600 text-sm mt-1">{errors.domain}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Interview Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.type ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-400'
              }`}
          >
            <option value="HR">HR</option>
            <option value="Technical">Technical</option>
            <option value="Mixed">Mixed</option>
            <option value="Behavioural">Behavioural</option>
          </select>
          {errors.type && <p className="text-red-600 text-sm mt-1">{errors.type}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Experience</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="e.g., Fresher, 1 year"
            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.experience ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-400'
              }`}
          />
          {errors.experience && <p className="text-red-600 text-sm mt-1">{errors.experience}</p>}
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1 text-gray-700">Timer</label>
            <select
              name="timer"
              value={formData.timer}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${errors.timer ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-400'
                }`}
            >
              {[5, 10, 20, 30].map(min => (
                <option key={min} value={min}>{min} Minutes</option>
              ))}
            </select>
            {errors.timer && <p className="text-red-600 text-sm mt-1">{errors.timer}</p>}
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1 text-gray-700">No. of Questions</label>
            <select
              name="questionAmount"
              value={formData.questionAmount}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${errors.questionAmount ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-400'
                }`}
            >
              {[1, 20, 30, 40].map(amt => (
                <option key={amt} value={amt}>{amt} Questions</option>
              ))}
            </select>
            {errors.questionAmount && <p className="text-red-600 text-sm mt-1">{errors.questionAmount}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {['easy', 'medium', 'hard'].map(lvl => (
              <option key={lvl} value={lvl}>
                {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="submit"
            className={`gap-2 items-center flex text-white px-5 py-2 rounded-lg transition ${isLoading ? 'bg-[#66C5D5] cursor-not-allowed' : 'bg-[#0097B2] hover:bg-[#007A8F]'
              }`}
            disabled={isLoading}
          >
            {isLoading && (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5"></span>
            )}
            <span>{isLoading ? 'Creating...' : 'Create Interview'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[var(--color-skeleton)] text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewInterviewForm;
