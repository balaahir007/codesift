import React, { useState } from 'react';
import useAuthStore from '../../../zustand/auth/useAuthStore';
import useStudySpaceStore from '../../../zustand/studySpaces/useStudySpaceStore';
import EmojiInput from './EmojiInput';
import { BsEmojiSmile } from 'react-icons/bs';
import { FiUpload } from 'react-icons/fi';
import { Upload, Image, X, Send, Eye, Lock } from 'lucide-react';
import uploadImage from '../../../utils/uploadImage';
import usePostStore from '../../../zustand/studySpaces/usePostStore';

const PostForm = ({ onClose }) => {
  const { authUser } = useAuthStore();
  const [showPicker, setShowPicker] = useState(false);
  const [formInput, setFormInput] = useState({
    description: '',
    attachments: [],
    visiblityMode: 'Everyone',
  });

  const { studySpace } = useStudySpaceStore()

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const fileData = files.map((file) => ({
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
    setFormInput(prev => {
      const fileToRemove = prev.attachments.find(f => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.url);
      }
      return {
        ...prev,
        attachments: prev.attachments.filter(f => f.id !== id)
      };
    });
  };

  const { uploadPost, status, posts } = usePostStore()
  const handleSubmit = async (e) => {
    console.log("hi");

    e.preventDefault()
    const uploadedUrls = await Promise.all(
      formInput.attachments.map((att) => uploadImage(att.file))
    );

    const payload = {
      description: formInput.description.trim(),
      visiblityMode: formInput.visiblityMode,
      attachments: uploadedUrls,
      spaceId: studySpace.id
    };


    await uploadPost(payload)
    onClose()
    console.log("post for stuidySpace", posts);


  }

  const visibilityMode = ['Everyone', 'Onlyme'];

  return (
    <div className="w-full  p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary text-white flex items-center justify-center font-semibold text-lg h-12 w-12 rounded-full">
          {authUser?.username?.[0]?.toUpperCase()}
        </div>
        <div className="flex flex-col">
          <h1 className="font-semibold text-lg text-gray-900">Create Post</h1>
          <div className='flex items-center gap-2 mt-1'>
            {formInput.visiblityMode === 'Everyone' ? (
              <Eye className="w-4 h-4 text-gray-400" />
            ) : (
              <Lock className="w-4 h-4 text-gray-400" />
            )}
            <select
              name='visiblityMode'
              onChange={handleChange}
              value={formInput.visiblityMode}
              className='text-sm text-gray-500 bg-transparent border-none outline-none cursor-pointer'
            >
              {visibilityMode.map((mode, idx) => (
                <option key={idx} value={mode} className='text-sm text-gray-600'>
                  {mode}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <form className='relative' onSubmit={handleSubmit}>
        <div className="relative border border-gray-200 rounded-xl focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-200">
          <textarea
            onChange={handleChange}
            value={formInput.description}
            name="description"
            placeholder="What's on your mind? Share your thoughts, experiences, or anything exciting! ✨"
            className="w-full min-h-[140px] p-4 pb-14 outline-none resize-none text-sm text-gray-700 placeholder-gray-400 rounded-xl bg-transparent"
          />

          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPicker((prev) => !prev)}
              className="p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 group"
            >
              <BsEmojiSmile className="text-lg text-gray-400 group-hover:text-primary transition-colors" />
            </button>

            <label className="p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer group">
              <FiUpload className="text-lg text-gray-400 group-hover:text-primary transition-colors" />
              <input
                type="file"
                className="hidden"
                accept='image/*'
                onChange={handleFileSelect}
                multiple
              />
            </label>
          </div>
        </div>

{showPicker && (
  <div
    className="absolute top-full mt-2 z-50"
    onClick={(e) => e.stopPropagation()}
    onMouseDown={(e) => e.stopPropagation()}
  >
    <div className="relative bg-white rounded shadow-xl border p-2">
      <EmojiInput
        setFormInput={setFormInput}
        onClose={() => setShowPicker(false)}
      />
    </div>
  </div>
)}



        {formInput.attachments.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
            {formInput.attachments.map((fileData) => (
              <div key={fileData.id} className="relative group">
                <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-primary/30 transition-colors duration-200">
                  {fileData.type === 'image' ? (
                    <img
                      src={fileData.url}
                      alt="Preview"
                      className="w-full h-20 object-cover"
                    />
                  ) : (
                    <div className="w-full h-20 flex items-center justify-center">
                      <div className="text-center">
                        <Upload className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                        <p className="text-xs text-gray-500 px-2 truncate">
                          {fileData.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(fileData.id)}
                  className="absolute -top-1 -right-1 bg-gray-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={!formInput.description.trim() && formInput.attachments.length === 0 || status?.uploading?.loading}
            className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {
              status?.uploading?.loading ? (<>
                Sending...
              </>) : (<>
                <Send className="w-4 h-4" />
                Post
              </>)
            }

          </button>
        </div>
      </form>


    </div>
  );
};

export default PostForm;