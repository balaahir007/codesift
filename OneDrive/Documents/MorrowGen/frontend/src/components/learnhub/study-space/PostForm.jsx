import React, { useState } from 'react';
import useAuthStore from '../../../zustand/auth/useAuthStore';
import useStudySpaceStore from '../../../zustand/studySpaces/useStudySpaceStore';
import EmojiInput from './EmojiInput';
import { BsEmojiSmile } from 'react-icons/bs';
import { FiUpload } from 'react-icons/fi';
import { Upload, Image, X, Send, Eye, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import uploadFile from '../../../utils/uploadFile';
import usePostStore from '../../../zustand/studySpaces/usePostStore';
import useThemeStore from '../../../zustand/themeStore';

const PostForm = ({ onClose }) => {
  const { authUser } = useAuthStore();
  const { mode } = useThemeStore(); // Get theme mode
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formInput, setFormInput] = useState({
    description: '',
    attachments: [],
    visiblityMode: 'Everyone',
  });

  const { studySpace } = useStudySpaceStore();
  const { uploadPost, status } = usePostStore();

  // Theme classes
  const bgPrimary = mode === 'dark' ? 'bg-[#0A1215]' : 'bg-white';
  const bgCard = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-gray-50';
  const bgHover = mode === 'dark' ? 'hover:bg-[#0F1E20]' : 'hover:bg-gray-100';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const borderFocus = mode === 'dark' ? 'focus-within:border-[#0097B2] focus-within:ring-[#0097B2]/20' : 'focus-within:border-blue-500 focus-within:ring-blue-500/10';
  const inputBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-white';
  const placeholderText = mode === 'dark' ? 'placeholder-gray-500' : 'placeholder-gray-400';
  const previewBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50';
  const previewBorder = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const previewHover = mode === 'dark' ? 'hover:border-[#0097B2]/30' : 'hover:border-blue-500/30';
  const emojiPickerBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const emojiPickerBorder = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const buttonBg = 'bg-gradient-to-r from-[#0097B2] to-[#00B2A9]';
  const buttonHover = 'hover:from-[#0097B2]/90 hover:to-[#00B2A9]/90';
  const buttonDisabled = 'disabled:opacity-50 disabled:cursor-not-allowed';

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 50 * 1024 * 1024; // 50MB

    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        setError(`File ${file.name} is too large. Max size is 50MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const fileData = validFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'file',
      name: file.name,
    }));

    setFormInput((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...fileData],
    }));
  };

  const removeFile = (id) => {
    setFormInput((prev) => {
      const fileToRemove = prev.attachments.find((f) => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.url);
      }
      return {
        ...prev,
        attachments: prev.attachments.filter((f) => f.id !== id),
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formInput.description.trim() && formInput.attachments.length === 0) {
      setError('Please write something or add attachments');
      return;
    }

    try {
      const uploadedUrls = await Promise.all(
        formInput.attachments.map((att) => uploadFile(att.file))
      );

      const payload = {
        description: formInput.description.trim(),
        visiblityMode: formInput.visiblityMode,
        attachments: uploadedUrls,
        spaceId: studySpace.id,
      };

      await uploadPost(payload);
      setSuccess('Post published successfully!');
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err?.message || 'Failed to post. Please try again.');
    }
  };

  const visibilityMode = ['Everyone', 'Onlyme'];

  return (
    <div className={`w-full max-w-2xl p-4 sm:p-2 bg-backGray rounded-lg sm:rounded-xl`}>
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white flex items-center justify-center font-semibold text-lg h-10 w-10 sm:h-12 sm:w-12 rounded-full flex-shrink-0">
          {authUser?.username?.[0]?.toUpperCase()}
        </div>
        <div className="flex-1">
          <h1 className={`font-bold text-lg sm:text-2xl ${textPrimary}`}>Create Post</h1>
          <div className="flex items-center gap-2 mt-1 sm:mt-2">
            {formInput.visiblityMode === 'Everyone' ? (
              <Eye className="w-4 h-4 text-[#0097B2]" />
            ) : (
              <Lock className="w-4 h-4 text-[#0097B2]" />
            )}
            <select
              name="visiblityMode"
              onChange={handleChange}
              value={formInput.visiblityMode}
              className={`text-xs sm:text-sm font-medium ${textSecondary} bg-transparent border-none outline-none cursor-pointer hover:${textPrimary} transition-colors`}
            >
              {visibilityMode.map((mode, idx) => (
                <option key={idx} value={mode} className={`${textPrimary}`}>
                  {mode}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-2 p-3 sm:p-4 mb-4 bg-red-500/10 border border-red-500/20 rounded-lg animate-in">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="flex items-start gap-2 p-3 sm:p-4 mb-4 bg-green-500/10 border border-green-500/20 rounded-lg animate-in">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
        </div>
      )}

      {/* Form */}
      <form className="relative" onSubmit={handleSubmit}>
        {/* Textarea */}
        <div
          className={`relative border ${borderColor} rounded-xl ${borderFocus} transition-all duration-200 overflow-hidden`}
        >
          <textarea
            onChange={handleChange}
            value={formInput.description}
            name="description"
            placeholder="What's on your mind? Share your thoughts, experiences, or anything exciting! ✨"
            className={`w-full min-h-[120px] sm:min-h-[140px] p-3 sm:p-4 pb-12 sm:pb-14 outline-none resize-none text-sm sm:text-base ${textPrimary} ${placeholderText} rounded-xl ${inputBg} transition-colors`}
          />

          {/* Toolbar */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setShowPicker((prev) => !prev)}
              className={`p-2 rounded-lg ${bgHover} transition-colors duration-150 group`}
              title="Add emoji"
            >
              <BsEmojiSmile className={`text-lg ${textSecondary} group-hover:text-[#0097B2] transition-colors`} />
            </button>

            <label className={`p-2 rounded-lg ${bgHover} transition-colors duration-150 cursor-pointer group`} title="Upload files">
              <FiUpload className={`text-lg ${textSecondary} group-hover:text-[#0097B2] transition-colors`} />
              <input
                type="file"
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.txt,.xlsx,.xls"
                onChange={handleFileSelect}
                multiple
              />
            </label>
          </div>
        </div>

        {/* Emoji Picker */}
        {showPicker && (
          <div
            className="absolute top-full mt-2 z-50 w-full sm:w-auto"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className={`relative ${emojiPickerBg} rounded-lg shadow-xl border ${emojiPickerBorder} p-2`}>
              <EmojiInput
                setFormInput={setFormInput}
                onClose={() => setShowPicker(false)}
              />
            </div>
          </div>
        )}

        {/* File Previews */}
        {formInput.attachments.length > 0 && (
          <div className="mt-4 sm:mt-6">
            <p className={`text-xs sm:text-sm font-medium ${textSecondary} mb-3`}>
              {formInput.attachments.length} file{formInput.attachments.length !== 1 ? 's' : ''} attached
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {formInput.attachments.map((fileData) => (
                <div key={fileData.id} className="relative group">
                  <div className={`${previewBg} rounded-lg overflow-hidden border ${previewBorder} ${previewHover} transition-all duration-200`}>
                    {fileData.type === 'image' ? (
                      <img
                        src={fileData.url}
                        alt="Preview"
                        className="w-full h-20 sm:h-24 object-cover"
                      />
                    ) : (
                      <div className="w-full h-20 sm:h-24 flex flex-col items-center justify-center">
                        <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-[#0097B2] mb-1" />
                        <p className="text-xs text-gray-500 px-1 truncate text-center">
                          {fileData.name.length > 10 ? `${fileData.name.slice(0, 10)}...` : fileData.name}
                        </p>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(fileData.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 shadow-lg"
                    title="Remove file"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 mt-4 sm:mt-6">
          <button
            type="button"
            onClick={onClose}
            className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-200 ${textSecondary} ${bgHover} text-sm sm:text-base`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={(!formInput.description.trim() && formInput.attachments.length === 0) || status?.uploading?.loading}
            className={`w-full sm:w-auto ${buttonBg} text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold hover:shadow-lg ${buttonHover} transition-all duration-200 ${buttonDisabled} flex items-center justify-center gap-2 text-sm sm:text-base`}
          >
            {status?.uploading?.loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Posting...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Post</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;