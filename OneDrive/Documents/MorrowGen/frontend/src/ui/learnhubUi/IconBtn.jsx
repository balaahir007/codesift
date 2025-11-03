// components/ui/IconBtn.js
import React from 'react';

const theme = {
  primary: '#0097B2',
  secondary: '#00B2A9',
  tertiary: '#F2F2F2',
  backGray: '#F2F2F2',
  skeleton: '#D9D9D9',
  primary100: '#E0F2F5',
  primary200: '#B3E0E9',
};

export default function IconBtn({ 
  onClick, 
  active, 
  disabled, 
  title, 
  children, 
  variant = "default",
  className = ""
}) {
  const getButtonStyle = () => {
    if (disabled) return "opacity-50 cursor-not-allowed bg-white dark:bg-gray-800";
    if (active) return "text-white shadow-md";
    return "bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100 hover:shadow-md";
  };

  const activeStyle = active ? { backgroundColor: theme.primary } : {};

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group inline-flex items-center justify-center h-11 w-11 rounded-2xl transition-all duration-200 border border-transparent ${getButtonStyle()} ${className}`}
      title={title}
      style={activeStyle}
    >
      {children}
    </button>
  );
}