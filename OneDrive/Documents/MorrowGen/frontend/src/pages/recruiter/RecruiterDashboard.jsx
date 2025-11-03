// src/pages/RecruiterDashboard.jsx
import React from "react";

const RecruiterDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recruiter Dashboard</h1>
      <p className="text-gray-600 mb-4">
        Manage your recruiter activities — post opportunities, review applicants, and more.
      </p>

      <div className="space-y-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Add New Opportunity
        </button>

        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="font-semibold text-lg">Example Opportunity</h2>
          <p className="text-gray-500 text-sm">Posted 2 days ago</p>
          <div className="mt-3 flex gap-2">
            <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Edit</button>
            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
