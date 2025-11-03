// components/ui/Pill.js
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

export default function Pill({ children, className = "", variant = "default" }) {
  const variants = {
    default: `bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300`,
    primary: `text-white`,
    secondary: `text-white`,
    success: `bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300`,
  };

  const style = variant === 'primary' ? { backgroundColor: theme.primary } :
                variant === 'secondary' ? { backgroundColor: theme.secondary } : {};

  return (
    <span 
      className={`px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}