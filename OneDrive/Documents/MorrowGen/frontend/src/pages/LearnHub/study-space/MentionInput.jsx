import React, { useState, useEffect } from 'react';
import useAuthStore from '../../../zustand/auth/useAuthStore';
import socketService from '../../../services/socketService';
import useThemeStore from '../../../zustand/themeStore';

const dummyUsers = ['balaji_dev', 'sara123', 'john_doe', 'dev_master', 'balaji_dev', 'sara123', 'john_doe', 'dev_master'];

const MentionInput = ({ inputValue, setInputValue, onKeyPress, disabled, placeholder, setTypingUsers }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { authUser } = useAuthStore();

  const handleChange = (e) => {
    const val = e.target.value;
    setInputValue(val);

    const atIndex = val.lastIndexOf('@');
    if (atIndex !== -1) {
      const query = val.slice(atIndex + 1).toLowerCase();
      const matched = dummyUsers.filter((user) =>
        user.toLowerCase().startsWith(query)
      );
      setSuggestions(matched);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelect = (user) => {
    const atIndex = inputValue.lastIndexOf('@');
    const newText =
      inputValue.substring(0, atIndex + 1) + user + ' ';
    setInputValue(newText);
    setShowSuggestions(false);
  };

  const { mode } = useThemeStore(); // Get theme mode

  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={onKeyPress}
        disabled={disabled}
        placeholder={placeholder}
        className={`${textPrimary} w-full 
      border 
      px-4 
      py-2 
      rounded-full 
      outline-none
      transition
        border-gray-300
      bg-backGray
      disabled:bg-gray-100 dark:disabled:bg-[#2a2a2a]`}
      
      />

      {showSuggestions && suggestions.length > 0 && (
        <div
          className={`${textPrimary}  absolute 
        left-0 
        right-0 
        top-full
        mt-2 
        z-20 
        max-h-60 
        overflow-y-auto 
        rounded-lg 
        shadow-xl 
        border 
       bg-backGray border-gray-200 `}



        >
          {suggestions.map((user, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(user)}
              className="
            px-4 
            py-2 
            cursor-pointer 
            text-gray-800 
            dark:text-gray-200
            hover:bg-gray-100 
            bg-backGray
            transition
          "
            >
              @{user}
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default MentionInput;
