// src/components/teacher/TeacherStatsCardGrid.jsx
import React from 'react';

const TeacherStatsCardGrid = ({ stats, mode }) => {
  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const hoverBg = mode === 'dark' ? 'hover:bg-[#294B4E]' : 'hover:bg-gray-50';

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:max-w-5xl mt-4">
      {stats.map((item, idx) => (
        <div
          key={idx}
          className={`p-4 py-6 rounded-2xl shadow-sm flex flex-col items-center transition-all duration-200
            ${cardBg} ${textPrimary} ${hoverBg}
          `}
        >
          <span className="font-light">{item.title}</span>
          <span className="font-bold text-lg">{item.count}</span>
          <span
            className={`font-light text-sm ${item.positive ? 'text-green-600' : 'text-red-600'}`}
          >
            {item.positive ? '+' : '-'}
            {item.percentage}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default TeacherStatsCardGrid;
