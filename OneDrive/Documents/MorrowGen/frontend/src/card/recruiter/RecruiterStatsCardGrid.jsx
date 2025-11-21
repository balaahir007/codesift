// src/components/recruiter/RecruiterStatsCardGrid.jsx
import React from 'react';
import useThemeStore from '../../zustand/themeStore';

const RecruiterStatsCardGrid = ({ stats,mode }) => {
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:max-w-5xl mt-4">
      {stats.map((item, idx) => (
        <div
          key={idx}
          className={`p-4 py-6 rounded-2xl shadow-sm flex flex-col items-center transition-all duration-200
            ${mode === 'dark'
              ? 'text-white bg-[var(--elementBg-dark)] hover:bg-[var(--elementBg-hover-dark)]'
              : 'text-black bg-[var(--elementBg-light)] hover:bg-[var(--elementBg-hover-light)]'}
          `}
        >
          <span className="font-light">{item.title}</span>
          <span className="font-bold text-lg">{item.count}</span>
          <span
            className={`font-light text-sm ${item.positive ? 'text-green-600' : 'text-red-600'
              }`}
          >
            {item.positive ? '+' : '-'}
            {item.percentage}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default RecruiterStatsCardGrid;
