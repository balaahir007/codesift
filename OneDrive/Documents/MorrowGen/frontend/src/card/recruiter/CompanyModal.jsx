import React, { useState, useRef } from 'react';
import { Building2, MapPin, FileText, X, Upload, Image as ImageIcon } from 'lucide-react';
import useThemeStore from '../../zustand/themeStore';



const CompanyFormModal = ({ isOpen, onClose, onSubmit }) => {
  const { mode } = useThemeStore();
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    location: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const refs = {
    name: useRef(null),
    location: useRef(null),
    description: useRef(null)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, logo: 'Please upload an image file' }));
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, logo: 'File size should be less than 5MB' }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        setFormData(prev => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
      setErrors(prev => ({ ...prev, logo: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Company name must be at least 2 characters';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    return newErrors;
  };

  const handleSubmit =async () => {
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Scroll to first error
      const firstErrorField = Object.keys(validationErrors)[0];
      const fieldRef = refs[firstErrorField];
      if (fieldRef && fieldRef.current) {
        fieldRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        fieldRef.current.focus();
      }
      return;
    }

    // Submit form
    await onSubmit(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({ name: '', logo: '', location: '', description: '' });
    setErrors({});
    setLogoPreview(null);
    onClose();
  };

  const removeLogo = () => {
    setLogoPreview(null);
    setFormData(prev => ({ ...prev, logo: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div 
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl transition-all duration-300 ${
          mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white'
        }`}
      >
        {/* Header */}
        <div className={`sticky top-0 z-10 flex items-center justify-between p-6 border-b ${
          mode === 'dark' ? 'bg-[#1B2E31] border-[#294B4E]' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              mode === 'dark' ? 'bg-[#00B2A9]/20' : 'bg-[#0097B2]/10'
            }`}>
              <Building2 className={`w-6 h-6 ${
                mode === 'dark' ? 'text-[#00B2A9]' : 'text-[#0097B2]'
              }`} />
            </div>
            <div>
              <h2 className={`text-2xl font-semibold ${
                mode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Register Company
              </h2>
              <p className={`text-sm ${
                mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Fill in your company details
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className={`p-2 rounded-lg transition-colors ${
              mode === 'dark' 
                ? 'hover:bg-[#0F1E20] text-gray-400 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Company Logo */}
          <div>
            <label className={`block mb-2 text-sm font-medium flex items-center gap-2 ${
              mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <ImageIcon className="w-4 h-4" />
              Company Logo
            </label>
            
            {logoPreview ? (
              <div className="relative w-32 h-32 group">
                <img 
                  src={logoPreview} 
                  alt="Logo preview" 
                  className="w-full h-full object-cover rounded-lg border-2 border-dashed border-gray-300"
                />
                <button
                  onClick={removeLogo}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ${
                  mode === 'dark'
                    ? 'bg-[#0F1E20] border-[#294B4E] hover:border-[#00B2A9]'
                    : 'bg-gray-50 border-gray-300 hover:border-[#0097B2]'
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className={`w-8 h-8 ${
                    mode === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <p className={`text-sm ${
                    mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Click to upload company logo
                  </p>
                  <p className={`text-xs ${
                    mode === 'dark' ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {errors.logo && (
              <p className="mt-1 text-sm text-red-500">{errors.logo}</p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label className={`block mb-2 text-sm font-medium flex items-center gap-2 ${
              mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <Building2 className="w-4 h-4" />
              Company Name *
            </label>
            <input
              ref={refs.name}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Tech Solutions Inc."
              className={`w-full px-4 py-3 rounded-lg transition-all duration-300 outline-none ${
                mode === 'dark'
                  ? 'bg-[#0F1E20] border-2 border-[#294B4E] focus:border-[#00B2A9] text-white placeholder-gray-500'
                  : 'bg-gray-50 border-2 border-gray-200 focus:border-[#0097B2] text-gray-900 placeholder-gray-400'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className={`block mb-2 text-sm font-medium flex items-center gap-2 ${
              mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <MapPin className="w-4 h-4" />
              Location *
            </label>
            <input
              ref={refs.location}
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., San Francisco, CA"
              className={`w-full px-4 py-3 rounded-lg transition-all duration-300 outline-none ${
                mode === 'dark'
                  ? 'bg-[#0F1E20] border-2 border-[#294B4E] focus:border-[#00B2A9] text-white placeholder-gray-500'
                  : 'bg-gray-50 border-2 border-gray-200 focus:border-[#0097B2] text-gray-900 placeholder-gray-400'
              }`}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-500">{errors.location}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className={`block mb-2 text-sm font-medium flex items-center gap-2 ${
              mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <FileText className="w-4 h-4" />
              Company Description *
            </label>
            <textarea
              ref={refs.description}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about your company, its mission, and what makes it unique..."
              rows="4"
              className={`w-full px-4 py-3 rounded-lg transition-all duration-300 outline-none resize-none ${
                mode === 'dark'
                  ? 'bg-[#0F1E20] border-2 border-[#294B4E] focus:border-[#00B2A9] text-white placeholder-gray-500'
                  : 'bg-gray-50 border-2 border-gray-200 focus:border-[#0097B2] text-gray-900 placeholder-gray-400'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>
        </div>

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
            Register Company
          </button>
        </div>
      </div>
    </div>
  );
};


export default CompanyFormModal;