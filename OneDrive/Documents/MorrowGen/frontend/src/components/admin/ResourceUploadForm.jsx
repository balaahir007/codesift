import React, { useState, useEffect } from 'react';
import { X, Upload, File, Link, Tag, FileText, Video, Image, Headphones } from 'lucide-react';
import useResourceStore from '../../zustand/studySpaces/useResourceStore';

const ResourceUploadForm = ({ isOpen, onClose, onSuccess, studySpaceId = null }) => {
  const [allStudySpaces, setAllStudySpaces] = useState([
    { id: '1', name: 'Computer Science Fundamentals' },
    { id: '2', name: 'Data Structures & Algorithms' },
    { id: '3', name: 'Web Development' }
  ]);
  
  const [formData, setFormData] = useState({
    studySpaceId: studySpaceId || '',
    title: '',
    description: '',
    resourceType: 'document',
    externalUrl: '',
    tags: '',
    isPublic: true,
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const resourceTypes = [
    { value: 'document', label: 'Document', icon: FileText },
    { value: 'video', label: 'Video', icon: Video },
    { value: 'image', label: 'Image', icon: Image },
    { value: 'audio', label: 'Audio', icon: Headphones },
    { value: 'link', label: 'External Link', icon: Link },
    { value: 'other', label: 'Other', icon: File },
  ];

  const {uploadResource} = useResourceStore()

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!formData.title) {
        setFormData(prev => ({
          ...prev,
          title: selectedFile.name.split('.')[0]
        }));
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      if (!formData.title) {
        setFormData(prev => ({
          ...prev,
          title: droppedFile.name.split('.')[0]
        }));
      }
    }
  };

  const handleSubmit = async () => {
    if (loading || !formData.title || (!studySpaceId && !formData.studySpaceId)) return;
    
    setLoading(true);

    try {
      // Simulate API call
      await uploadResource(formData)

      // Reset form
      setFormData({
        studySpaceId: studySpaceId || '',
        title: '',
        description: '',
        resourceType: 'document',
        externalUrl: '',
        tags: '',
        isPublic: true,
      });
      setFile(null);
    } catch (error) {
      console.error('Error uploading resource:', error);
      alert('Failed to upload resource. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        style={{ 
          boxShadow: '0 25px 50px -12px rgba(0, 151, 178, 0.15)',
          border: '1px solid rgba(0, 151, 178, 0.1)'
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-6 border-b"
          style={{ 
            borderColor: '#F2F2F2',
            background: 'linear-gradient(135deg, #E0F2F5 0%, #F8FEFF 100%)'
          }}
        >
          <div>
            <h2 
              className="text-2xl font-bold"
              style={{ color: '#0097B2' }}
            >
              Upload Resource
            </h2>
            <p className="text-sm text-gray-600 mt-1">Share learning materials with your study space</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/70 transition-all duration-200"
            style={{ color: '#0097B2' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="space-y-6">
            {/* Study Space Selection */}
            

            {/* Resource Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Resource Type *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {resourceTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = formData.resourceType === type.value;
                  return (
                    <label
                      key={type.value}
                      className={`relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 group hover:scale-105 ${
                        isSelected ? 'shadow-md' : 'hover:shadow-sm'
                      }`}
                      style={{ 
                        borderColor: isSelected ? '#0097B2' : '#D9D9D9',
                        backgroundColor: isSelected ? '#E0F2F5' : '#FAFAFA'
                      }}
                    >
                      <input
                        type="radio"
                        name="resourceType"
                        value={type.value}
                        checked={isSelected}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <Icon 
                        size={24} 
                        className="mb-2 transition-colors duration-200" 
                        style={{ color: isSelected ? '#0097B2' : '#666' }}
                      />
                      <span 
                        className="text-sm font-medium text-center"
                        style={{ color: isSelected ? '#0097B2' : '#666' }}
                      >
                        {type.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* File Upload or External URL */}
            {formData.resourceType === 'link' ? (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  External URL *
                </label>
                <div className="relative">
                  <Link 
                    size={18} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  />
                  <input
                    type="url"
                    name="externalUrl"
                    value={formData.externalUrl}
                    onChange={handleInputChange}
                    required
                    placeholder="https://example.com"
                    className="w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200"
                    style={{ 
                      borderColor: '#D9D9D9',
                      backgroundColor: '#FAFAFA'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0097B2'}
                    onBlur={(e) => e.target.style.borderColor = '#D9D9D9'}
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  File Upload
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 group ${
                    dragActive ? 'scale-105' : 'hover:scale-102'
                  }`}
                  style={{ 
                    borderColor: dragActive ? '#0097B2' : file ? '#00B2A9' : '#D9D9D9',
                    backgroundColor: dragActive ? '#E0F2F5' : file ? '#E0F7F6' : '#FAFAFA'
                  }}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div 
                        className="p-4 rounded-full"
                        style={{ backgroundColor: file ? '#B3E0E9' : '#E0F2F5' }}
                      >
                        <Upload 
                          className="h-8 w-8" 
                          style={{ color: file ? '#00B2A9' : '#0097B2' }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-base font-medium text-gray-700">
                        {file ? (
                          <span style={{ color: '#00B2A9' }}>✓ {file.name}</span>
                        ) : (
                          'Drag and drop a file here, or click to select'
                        )}
                      </p>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-flex items-center px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-105"
                        style={{ 
                          backgroundColor: '#0097B2',
                          color: 'white'
                        }}
                      >
                        Choose File
                      </label>
                      <p className="text-xs text-gray-500">
                        Max file size: 50MB • Supports all common formats
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200"
                style={{ 
                  borderColor: '#D9D9D9',
                  backgroundColor: '#FAFAFA'
                }}
                placeholder="Enter a descriptive title"
                onFocus={(e) => e.target.style.borderColor = '#0097B2'}
                onBlur={(e) => e.target.style.borderColor = '#D9D9D9'}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 resize-none"
                style={{ 
                  borderColor: '#D9D9D9',
                  backgroundColor: '#FAFAFA'
                }}
                placeholder="Describe what this resource covers and how it helps with learning..."
                onFocus={(e) => e.target.style.borderColor = '#0097B2'}
                onBlur={(e) => e.target.style.borderColor = '#D9D9D9'}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Tags
              </label>
              <div className="relative">
                <Tag 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  size={18} 
                />
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200"
                  style={{ 
                    borderColor: '#D9D9D9',
                    backgroundColor: '#FAFAFA'
                  }}
                  placeholder="javascript, tutorial, beginner, algorithms"
                  onFocus={(e) => e.target.style.borderColor = '#0097B2'}
                  onBlur={(e) => e.target.style.borderColor = '#D9D9D9'}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Separate multiple tags with commas to help others find your resource
              </p>
            </div>

            {/* Visibility */}
            <div 
              className="p-4 rounded-xl"
              style={{ backgroundColor: '#F8FEFF' }}
            >
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="isPublic"
                  checked={formData.isPublic}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 rounded border-2 focus:ring-2 transition-all duration-200"
                  style={{ 
                    accentColor: '#0097B2',
                    borderColor: '#0097B2'
                  }}
                />
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Make this resource visible to all members
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    When enabled, all study space members can view and access this resource
                  </p>
                </div>
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end space-y-3 space-y-reverse sm:space-y-0 sm:space-x-3 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 text-sm font-medium border-2 rounded-xl transition-all duration-200 hover:scale-105"
                style={{ 
                  color: '#666',
                  borderColor: '#D9D9D9',
                  backgroundColor: 'white'
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !formData.title || (!studySpaceId && !formData.studySpaceId)}
                className="w-full sm:w-auto px-6 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ 
                  backgroundColor: '#0097B2',
                  color: 'white'
                }}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Uploading...</span>
                  </div>
                ) : (
                  'Upload Resource'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceUploadForm;