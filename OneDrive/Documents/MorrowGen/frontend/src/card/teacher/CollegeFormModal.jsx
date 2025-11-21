import React, { useState, useRef } from 'react';
import { Building2, MapPin, Calendar, FileText, X } from 'lucide-react';
import useThemeStore from '../../zustand/themeStore';

const CollegeFormModal = ({ isOpen, onClose, onSubmit,errors,setErrors }) => {
  const { mode } = useThemeStore();
  const [formData, setFormData] = useState({
    name: 'The American College',
    location: 'Madurai ,TamilNadu',
    type: '',
    year: '1888',
    departments: 'Data Sceince'
  });

  const refs = {
    name: useRef(null),
    location: useRef(null),
    type: useRef(null),
    year: useRef(null),
    departments: useRef(null)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'College name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.type.trim()) newErrors.type = 'College type is required';
    if (!formData.year.trim()) newErrors.year = 'Year of establishment is required';
    else if (!/^\d{4}$/.test(formData.year.trim())) newErrors.year = 'Enter a valid year';
    if (!formData.departments.trim()) newErrors.departments = 'Departments are required';
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = Object.keys(validationErrors)[0];
      const fieldRef = refs[firstErrorField];
      if (fieldRef && fieldRef.current) {
        fieldRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        fieldRef.current.focus();
      }
      return;
    }

    await onSubmit(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({ name: '', location: '', type: '', year: '', departments: '' });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl transition-all duration-300 ${
        mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white'
      }`}>
        
        {/* Header */}
        <div className={`sticky top-0 z-10 flex items-center justify-between p-6 border-b ${
          mode === 'dark' ? 'bg-[#1B2E31] border-[#294B4E]' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              mode === 'dark' ? 'bg-[#00B2A9]/20' : 'bg-[#0097B2]/10'
            }`}>
              <Building2 className={`w-6 h-6 ${mode === 'dark' ? 'text-[#00B2A9]' : 'text-[#0097B2]'}`} />
            </div>
            <div>
              <h2 className={`text-2xl font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Register College
              </h2>
              <p className={`text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Fill in your college details
              </p>
            </div>
          </div>
          <button onClick={handleClose} className={`p-2 rounded-lg transition-colors ${
            mode === 'dark' ? 'hover:bg-[#0F1E20] text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
          }`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* College Name */}
          <div>
            <label className={`block mb-2 text-sm font-medium flex items-center gap-2 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <Building2 className="w-4 h-4" />
              College Name *
            </label>
            <input
              ref={refs.name}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., ABC College of Engineering"
              className={`w-full px-4 py-3 rounded-lg transition-all duration-300 outline-none ${
                mode === 'dark'
                  ? 'bg-[#0F1E20] border-2 border-[#294B4E] focus:border-[#00B2A9] text-white placeholder-gray-500'
                  : 'bg-gray-50 border-2 border-gray-200 focus:border-[#0097B2] text-gray-900 placeholder-gray-400'
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Location */}
          <div>
            <label className={`block mb-2 text-sm font-medium flex items-center gap-2 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <MapPin className="w-4 h-4" />
              Location *
            </label>
            <input
              ref={refs.location}
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Chennai, TN"
              className={`w-full px-4 py-3 rounded-lg transition-all duration-300 outline-none ${
                mode === 'dark'
                  ? 'bg-[#0F1E20] border-2 border-[#294B4E] focus:border-[#00B2A9] text-white placeholder-gray-500'
                  : 'bg-gray-50 border-2 border-gray-200 focus:border-[#0097B2] text-gray-900 placeholder-gray-400'
              }`}
            />
            {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
          </div>

          {/* College Type */}
          <div>
            <label className={`block mb-2 text-sm font-medium flex items-center gap-2 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <Building2 className="w-4 h-4" />
              College Type *
            </label>
            <select
              ref={refs.type}
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg transition-all duration-300 outline-none ${
                mode === 'dark'
                  ? 'bg-[#0F1E20] border-2 border-[#294B4E] focus:border-[#00B2A9] text-white'
                  : 'bg-gray-50 border-2 border-gray-200 focus:border-[#0097B2] text-gray-900'
              }`}
            >
              <option value="">Select Type</option>
              <option value="Private">Private</option>
              <option value="Government">Government</option>
              <option value="Autonomous">Autonomous</option>
            </select>
            {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
          </div>

          {/* Year of Establishment */}
          <div>
            <label className={`block mb-2 text-sm font-medium flex items-center gap-2 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <Calendar className="w-4 h-4" />
              Year of Establishment *
            </label>
            <input
              ref={refs.year}
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="e.g., 1998"
              className={`w-full px-4 py-3 rounded-lg transition-all duration-300 outline-none ${
                mode === 'dark'
                ? 'bg-[#0F1E20] border-2 border-[#294B4E] focus:border-[#00B2A9] text-white placeholder-gray-500'
                : 'bg-gray-50 border-2 border-gray-200 focus:border-[#0097B2] text-gray-900 placeholder-gray-400'
              }`}
            />
            {errors.year && <p className="mt-1 text-sm text-red-500">{errors.year}</p>}
          </div>

          {/* Departments */}
          <div>
            <label className={`block mb-2 text-sm font-medium flex items-center gap-2 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <FileText className="w-4 h-4" />
              Departments * (comma separated)
            </label>
            <input
              ref={refs.departments}
              type="text"
              name="departments"
              value={formData.departments}
              onChange={handleChange}
              placeholder="e.g., CSE, ECE, MECH"
              className={`w-full px-4 py-3 rounded-lg transition-all duration-300 outline-none ${
                mode === 'dark'
                ? 'bg-[#0F1E20] border-2 border-[#294B4E] focus:border-[#00B2A9] text-white placeholder-gray-500'
                : 'bg-gray-50 border-2 border-gray-200 focus:border-[#0097B2] text-gray-900 placeholder-gray-400'
              }`}
            />
            {errors.departments && <p className="mt-1 text-sm text-red-500">{errors.departments}</p>}
          </div>
        </div>

        {errors.submit && <p className="mt-1 text-sm text-red-500">{errors.submit}</p>}
        {/* Footer */}
        <div className={`sticky bottom-0 flex gap-3 p-6 border-t ${
          mode === 'dark' ? 'bg-[#1B2E31] border-[#294B4E]' : 'bg-white border-gray-200'
        }`}>
          <button
            onClick={handleClose}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors duration-300 ${
              mode === 'dark'
                ? 'bg-[#0F1E20] text-gray-300 hover:bg-[#1a2d30] border-2 border-[#294B4E]'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200'
            }`}
            >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#00B2A9] to-[#0097B2] hover:from-[#009a92] hover:to-[#00839a] text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Register College
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegeFormModal;
