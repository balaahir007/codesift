import React, { useState, useEffect } from 'react';
import useAuthStore from '../../../zustand/auth/useAuthStore';
import socketService from '../../../services/socketService';

const dummyUsers = ['balaji_dev', 'sara123', 'john_doe', 'dev_master','balaji_dev', 'sara123', 'john_doe', 'dev_master'];

const MentionInput = ({inputValue, setInputValue,onKeyPress,disabled,placeholder,setTypingUsers}) => {
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

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={onKeyPress}
        disabled={disabled}

        placeholder={placeholder}
        className="w-full border px-4 py-2 rounded-full outline-none"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className={`fixed z-10 bottom-25 right-${inputValue.length} bg-white border rounded-md mt-1 overflow-y-scroll h-60 shadow-lg`}>
          {suggestions.map((user, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(user)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
