import React from 'react';

const NoteForm = () => {
  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
      <div className="max-w-md w-full
       bg-white p-6 border border-gray-300 rounded-xl shadow-xl space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">Create a Note</h1>

        <input
          type="text"
          className="h-12 w-full px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 "
          placeholder="Title"
        />

        <textarea
          rows={4}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg resize-none  "
          placeholder="Take a note..."
        />

        <div className="flex justify-end">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;
