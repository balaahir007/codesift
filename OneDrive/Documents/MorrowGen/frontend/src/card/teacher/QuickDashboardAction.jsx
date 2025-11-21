// src/components/teacher/QuickDashboardAction.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickDashboardAction = ({ setActionType, mode, handleNavigation }) => {
  const navigate = useNavigate();
  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const buttonSecondaryBg = mode === 'dark' ? 'bg-[#0F1E20] hover:bg-[#294B4E]' : 'bg-gray-200 hover:bg-gray-300';

  return (
    <div
      className={`p-4 rounded-2xl shadow-sm mt-4 ${cardBg} ${textPrimary}`}
    >
      <h2 className="font-bold text-xl mb-3">Quick Actions</h2>
      <div className='flex flex-col gap-3'>
        <button

          className='text-white bg-primary p-2 hover:bg-secondary duration-300 rounded-md cursor-pointer'
          onClick={() => {
            setActionType('space');
             handleNavigation &&  handleNavigation();
          }}
        >
          Create Study Space
        </button>
        <button
          className='text-white bg-primary p-2 hover:bg-secondary duration-300 rounded-md cursor-pointer'
          onClick={() => {
            setActionType('hacks');
             handleNavigation &&  handleNavigation();
          }}
        >
          Create Hackathon
        </button>
        <button
          className={`p-2 rounded-md cursor-pointer duration-300 ${buttonSecondaryBg}`}
          onClick={() => navigate('/teacher/study-space')}
        >
          View All Study Spaces
        </button>
        <button
          className={`p-2 rounded-md cursor-pointer duration-300 ${buttonSecondaryBg}`}
          onClick={() => navigate('/teacher/hackathons')}
        >
          View All Hackathons
        </button>
      </div>
    </div>
  );
};

export default QuickDashboardAction;
