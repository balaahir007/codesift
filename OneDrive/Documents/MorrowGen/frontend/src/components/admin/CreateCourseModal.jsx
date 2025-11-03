import { useState } from 'react';
import { X, BookOpen, Info } from 'lucide-react';

const CreateCourseModal = ({ isOpen, onClose, onSubmit }) => {
  const [courseName, setCourseName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!courseName.trim()) {
      setError('Please enter a course name');
      return;
    }

    if (courseName.trim().length < 3) {
      setError('Course name must be at least 3 characters');
      return;
    }

    onSubmit && onSubmit(courseName);
    setCourseName('');
    setError('');
  };

  const handleClose = () => {
    setCourseName('');
    setError('');
    onClose && onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 animate-in fade-in"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 animate-in zoom-in-95"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary100 rounded-lg flex items-center justify-center">
                <BookOpen size={22} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Create New Course
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
            >
              <X size={20} className="text-gray-500 group-hover:text-gray-700" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-6">
              <label 
                htmlFor="courseName" 
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Course Name <span className="text-red-500">*</span>
              </label>
              <input
                id="courseName"
                type="text"
                placeholder="e.g., Advanced React Development"
                value={courseName}
                onChange={(e) => {
                  setCourseName(e.target.value);
                  setError('');
                }}
                onKeyPress={handleKeyPress}
                className={`w-full px-4 py-3 border-2 rounded-lg text-sm outline-none transition-all duration-200 ${
                  error 
                    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-primary200 focus:ring-2 focus:ring-primary100'
                }`}
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-2 animate-in slide-in-from-top-1">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  {error}
                </p>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-primary100/50 border border-primary200 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <Info size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  What would you like to name your course? Don't worry, you can change this later in the course settings.
                </p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!courseName.trim()}
                className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:shadow-none"
              >
                Create Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCourseModal;