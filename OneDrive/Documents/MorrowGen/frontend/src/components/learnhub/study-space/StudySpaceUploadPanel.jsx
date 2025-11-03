import React from 'react';
import PostForm from './PostForm'

const StudySpaceUploadPanel = ({ activeMenu, onClose }) => {
const selected = activeMenu.toLowerCase().trim()

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-white/40 bg-opacity-50"
      />

      {/* Modal */}
      <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          ❌
        </button>
       {
        selected == 'post' && <PostForm onClose={onClose}/>
       }
      </div>
    </>
  );
};

export default StudySpaceUploadPanel;
