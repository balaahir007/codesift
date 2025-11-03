import React, { useState } from "react";
import { Users, Settings, Plus } from "lucide-react";

export const CreatePool = ({  onClose })=> {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [timeLimit, setTimeLimit] = useState(30);
  const [allowMultiple, setAllowMultiple] = useState(false);


  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""]);
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const createPool = () => {
    console.log({
      question,
      description,
      options,
      timeLimit,
      allowMultiple,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-3xl h-[90vh] bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-8 overflow-y-auto z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] rounded-full mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0097B2] to-[#00B2A9] bg-clip-text text-transparent mb-2">
            Create Study Pool
          </h1>
          <p className="text-gray-600">
            Create interactive study sessions for your students
          </p>
        </div>

        {/* Body */}
        <div className="space-y-6">
          {/* Question Input */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Settings className="w-4 h-4 mr-2" />
              Poll Question
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What would you like to ask your students?"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#0097B2] focus:ring-2 focus:ring-[#E0F2F5] transition-all resize-none"
              rows="3"
            />
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              Description (Optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add context or instructions for your poll"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-[#0097B2] focus:ring-2 focus:ring-[#E0F2F5] transition-all"
            />
          </div>

          {/* Options */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Answer Options
              </label>
              {options.length < 6 && (
                <button
                  onClick={addOption}
                  className="flex items-center px-3 py-1 text-sm text-[#0097B2] hover:text-[#007a94] hover:bg-[#E0F2F5] rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Option
                </button>
              )}
            </div>
            <div className="space-y-3">
              {options.map((opt, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(index, e.target.value)
                    }
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-[#0097B2] focus:ring-2 focus:ring-[#E0F2F5] transition-all"
                  />
                  {options.length > 2 && (
                    <button
                      onClick={() => removeOption(index)}
                      className="flex-shrink-0 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-[#F2F2F2] rounded-xl p-4 space-y-4">
            <h3 className="font-semibold text-gray-700 flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Poll Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-600 mb-2">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Time Limit (seconds)
                </label>
                <select
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#0097B2] focus:ring-2 focus:ring-[#E0F2F5]"
                >
                  <option value={15}>15 seconds</option>
                  <option value={30}>30 seconds</option>
                  <option value={60}>1 minute</option>
                  <option value={120}>2 minutes</option>
                  <option value={300}>5 minutes</option>
                  <option value={0}>No limit</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="allowMultiple"
                  checked={allowMultiple}
                  onChange={(e) => setAllowMultiple(e.target.checked)}
                  className="w-4 h-4 text-[#0097B2] border-gray-300 rounded focus:ring-[#0097B2]"
                />
                <label
                  htmlFor="allowMultiple"
                  className="ml-2 text-sm text-gray-600"
                >
                  Allow multiple answers
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 sticky bottom-0 bg-white py-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={createPool}
              className="flex-1 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] hover:from-[#007a94] hover:to-[#009690] text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
            >
              Create Study Pool
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
