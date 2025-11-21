import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecentStudySpacesCard = ({ studySpaces, mode }) => {
  const navigate = useNavigate();
  
  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const hoverBg = mode === 'dark' ? 'hover:bg-[#0F1E20]' : 'hover:bg-gray-50';
  
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'closed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'on hold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div
      className={`p-4 rounded-2xl shadow-sm mt-4 ${cardBg} ${textPrimary}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">Recent Study Spaces</h2>
        <button
          className="text-sm text-primary hover:text-secondary duration-300"
          onClick={() => navigate('/teacher/study-space')}
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {studySpaces.map((space, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer
              ${borderColor} ${hoverBg}
            `}
            onClick={() => navigate(`/teacher/study-space/${idx + 1}`)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{space.title}</h3>
                <p className={`text-sm ${textSecondary}`}>
                  {space.category}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(space.status)}`}>
                {space.status}
              </span>
            </div>

            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-4 text-sm">
                <span className={textSecondary}>
                  <span className="font-semibold">{space.students}</span> Students
                </span>
                <span className={textSecondary}>
                  {space.dateCreated}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentStudySpacesCard;