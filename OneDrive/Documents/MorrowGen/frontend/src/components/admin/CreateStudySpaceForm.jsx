import React, { useState } from 'react';
import { Users, Globe, Lock, Plus, X, Upload, Target, Code, Tag } from 'lucide-react';
import useStudySpacesStore from '../../zustand/studySpaces/useStudySpaceStore';
import uploadFile from '../../utils/uploadFile';

// Mock validation function since the original isn't available
const validateStudySpaceForm = (formData) => {
  const errors = {};
  
  if (!formData.name.trim()) {
    errors.name = 'Study space name is required';
  } else if (formData.name.length < 3) {
    errors.name = 'Study space name must be at least 3 characters';
  }
  
  if (!formData.domain) {
    errors.domain = 'Please select a domain';
  }
  
  if (!formData.goal.trim()) {
    errors.goal = 'Learning goal is required';
  } else if (formData.goal.length < 10) {
    errors.goal = 'Learning goal must be at least 10 characters';
  }
  
  if (!formData.techSkills.trim()) {
    errors.techSkills = 'Technical skills are required';
  }
  
  if (formData.tags.length === 0) {
    errors.tags = 'At least one tag is required';
  }
  
  return errors;
};

// Mock valid domains
const validDomains = [
  'technology', 'science', 'mathematics', 'engineering', 'medicine',
  'business', 'arts', 'literature', 'history', 'psychology',
  'data science', 'web development', 'mobile development', 'ai/ml'
];

const CreateStudySpaceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    goal: '',
    techSkills: '',
    tags: [],
    logo: '',
    visibility: 'private',
    rules: '',
  });

  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
      
      if (errors.tags) {
        setErrors(prev => ({
          ...prev,
          tags: ''
        }));
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };
  const {createStudySpace,status} = useStudySpacesStore()
const handleSubmit = async () => {
  const validatedErrors = validateStudySpaceForm(formData);
  if (Object.keys(validatedErrors).length > 0) {
    setErrors(validatedErrors);
    return;
  }

  setIsSubmitting(true);
  try {
    const uploaded_url = await uploadFile(formData.logo);
    const payload = {
      ...formData,
      logo: uploaded_url,
    };

    await createStudySpace(payload);
    setErrors({});
  } catch (error) {
    console.error('Error creating study space:', error);
    alert('Error creating study space. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};


  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          logo: 'Logo file size must be less than 5MB'
        }));
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          logo: 'Please select a valid image file'
        }));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          logo: e.target.result
        }));
        
        // Clear logo error
        if (errors.logo) {
          setErrors(prev => ({
            ...prev,
            logo: ''
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const ErrorMessage = ({ error }) => {
    if (!error) return null;
    return (
      <span className="text-red-500 text-sm mt-1 block">
        {error}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 flex z-50  items-center justify-center bg-black/50 p-4">
      <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Study Space</h1>
          <p className="text-gray-600">Build your collaborative learning environment</p>
        </div>

        <div className="space-y-6">
          {/* Logo Upload */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24  rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-secondary transition-colors">
                {formData.logo ? (
                  <img src={formData.logo} alt="Logo" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Upload logo (optional)</p>    
            <ErrorMessage error={errors.logo} />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Study Space Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter study space name"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring- focus:border-indigo-500 transition-all ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <ErrorMessage error={errors.name} />
          </div>

          {/* Domain */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Target className="inline w-4 h-4 mr-1" />
              Domain *
            </label>
            <select
              name="domain"
              value={formData.domain}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-none transition-all ${
                errors.domain ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select domain</option>
              {validDomains.map(domain => (
                <option key={domain} value={domain}>
                  {domain.charAt(0).toUpperCase() + domain.slice(1)}
                </option>
              ))}
            </select>
            <ErrorMessage error={errors.domain} />
          </div>

          {/* Goal */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Learning Goal *
            </label>
            <textarea
              name="goal"
              value={formData.goal}
              onChange={handleInputChange}
              placeholder="Describe what you want to achieve in this study space"
              rows={3}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-indigo-500 transition-all resize-none ${
                errors.goal ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <ErrorMessage error={errors.goal} />
          </div>

          {/* Tech Skills */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Code className="inline w-4 h-4 mr-1" />
              Technical Skills *
            </label>
            <input
              type="text"
              name="techSkills"
              value={formData.techSkills}
              onChange={handleInputChange}
              placeholder="e.g., React, Python, Machine Learning"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-indigo-500 transition-all ${
                errors.techSkills ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <ErrorMessage error={errors.techSkills} />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Tag className="inline w-4 h-4 mr-1" />
              Tags *
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-indigo-600 hover:text-indigo-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <ErrorMessage error={errors.tags} />
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-indigo-500 transition-all"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Visibility
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={formData.visibility === 'private'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <Lock className="w-4 h-4 mr-1" />
                Private
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={formData.visibility === 'public'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <Globe className="w-4 h-4 mr-1" />
                Public
              </label>
            </div>
          </div>

          {/* Rules */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Community Rules
            </label>
            <textarea
              name="rules"
              value={formData.rules}
              onChange={handleInputChange}
              placeholder="Set guidelines for your study space (optional)"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-indigo-500 transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating Study Space...
              </span>
            ) : (
              'Create Study Space'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateStudySpaceForm;