import { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import { resumeFormValidation } from "../../utils/validation/InterviewFormValidations.js";
import useInterviewStore from "../../zustand/mockInterviewStore/useFormInterviewStore.js";
import { useNavigate } from "react-router-dom";
import useThemeStore from "../../zustand/themeStore.js";

const ResumeQuestionForm = ({ onClose }) => {
  const questionTypes = ['HR', 'Technical', 'Mixed', 'Behavioural'];
  const questionAmounts = [10, 20, 30, 40];
  const questionLevels = ['Easy', 'Medium', 'Hard'];
  const timerOptions = [5, 10, 20, 30];

  const [errors, setErrors] = useState({});
  const [pdfPreview, setPdfPreview] = useState(null);


  const [formData, setFormData] = useState({
    type: questionTypes[0],
    questionAmount: questionAmounts[0],
    level: questionLevels[0],
    timer: timerOptions[0],
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setPdfPreview(url);
      setFormData((prev) => ({
        ...prev,
        file: file
      }))
    }
  };

  useEffect(() => {
    return () => {
      if (pdfPreview) {
        URL.revokeObjectURL(pdfPreview);
      }
    };
  }, [pdfPreview]);

  const { isLoading, resumeGenerateQuestion } = useInterviewStore();
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = resumeFormValidation(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("hi");


    try {
      const data = new FormData();
      data.append("file", formData.file);
      data.append("type", formData.type);
      data.append("questionAmount", formData.questionAmount);
      data.append("level", formData.level);
      data.append("timer", formData.timer);
      data.append("type", "resume");
      const sessionId = await resumeGenerateQuestion(data);
      console.log("Session ID:", sessionId);
      const type = 'resume';
      navigate(`/learnhub/mock-interview/${type}/${sessionId}/start`);
      onClose()
    } catch (error) {
      setErrors({ formError: error.message || "Something went wrong" });
    }
  };

  const handleCancel = () => {
    setFormData({
      type: questionTypes[0],
      questionAmount: questionAmounts[0],
      level: questionLevels[0],
      timer: timerOptions[0],
      file: null,
    });
    setPdfPreview(null);
    setErrors({});
    onClose();
  };

  const { mode } = useThemeStore();

  // 🎨 Theme Colors
  const bgPrimary = mode === "dark" ? "bg-[#0F1419]" : "bg-white";
  const textPrimary = mode === "dark" ? "text-gray-100" : "text-gray-800";
  const textSecondary = mode === "dark" ? "text-gray-300" : "text-gray-700";
  const borderColor = mode === "dark" ? "border-gray-700" : "border-gray-300";
  const inputBg = mode === "dark" ? "bg-[#1B2E31]" : "bg-white";
  const placeholderColor =
    mode === "dark" ? "placeholder-gray-500" : "placeholder-gray-400";

  return (
    <div
      className={`p-6 rounded-xl max-w-md mx-auto  transition-colors duration-300 ${mode==='dark' ? "bg-backGray text-white" : "bg-white text-gray-800"} mx-2 transition-all duration-300 ${pdfPreview ? "h-[520px] overflow-y-scroll" : ""
        } `}
    >
      <h2 className={`text-2xl font-bold text-center mb-6 ${mode==='dark' ? "text-white" : "text-gray-800"}`}>

        Resume Based Mock Interview
      </h2>

      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-sm md:max-w-md mx-auto rounded-2xl space-y-6 sm:max-w-full`}
      >
        {/* Upload Section */}
        <label
          className={`flex flex-col items-center gap-2 border ${borderColor} p-4 rounded-md cursor-pointer hover:bg-opacity-90 transition ${inputBg}`}
        >
          <FaUpload className="h-8 w-6 text-[#00B2A9] sm:h-6 sm:w-5" />
          <span className="px-4 py-1 bg-[#00B2A9] text-white rounded-md text-sm">
            Choose File
          </span>
          <input
            type="file"
            name="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {errors.file && (
          <p className="text-red-500 text-sm mt-1">{errors.file}</p>
        )}

        {/* PDF Preview */}
        {pdfPreview && (
          <div
            className={`border ${borderColor} rounded-md overflow-hidden mt-4 max-w-full`}
            style={{ height: 300 }}
          >
            <iframe
              src={pdfPreview}
              width="100%"
              height="100%"
              title="PDF Preview"
              className="rounded-md"
            />
          </div>
        )}

        {/* Question Type */}
        <div>
          <label
            className={`block text-sm font-medium mb-1 ${textSecondary}`}
          >
            Question Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={`w-full p-2 border ${borderColor} ${inputBg} ${textPrimary} ${placeholderColor} rounded-lg focus:ring-2 focus:ring-[#00B2A9] outline-none`}
          >
            {questionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type}</p>
          )}
        </div>

        {/* Timer & Question Amount */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label
              className={`block text-sm font-medium mb-1 ${textSecondary}`}
            >
              Timer
            </label>
            <select
              name="timer"
              value={formData.timer}
              onChange={handleChange}
              className={`w-full border ${borderColor} ${inputBg} ${textPrimary} rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00B2A9] outline-none`}
            >
              {timerOptions.map((min) => (
                <option key={min} value={min}>
                  {min} Minutes
                </option>
              ))}
            </select>
            {errors.timer && (
              <p className="text-red-500 text-sm mt-1">{errors.timer}</p>
            )}
          </div>

          <div className="w-1/2">
            <label
              className={`block text-sm font-medium mb-1 ${textSecondary}`}
            >
              No. of Questions
            </label>
            <select
              name="questionAmount"
              value={formData.questionAmount}
              onChange={handleChange}
              className={`w-full border ${borderColor} ${inputBg} ${textPrimary} rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00B2A9] outline-none`}
            >
              {questionAmounts.map((amt) => (
                <option key={amt} value={amt}>
                  {amt} Questions
                </option>
              ))}
            </select>
            {errors.questionAmount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.questionAmount}
              </p>
            )}
          </div>
        </div>

        {/* Question Level */}
        <div>
          <label
            className={`block text-sm font-medium mb-1 ${textSecondary}`}
          >
            Question Level
          </label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className={`w-full p-2 border ${borderColor} ${inputBg} ${textPrimary} rounded-lg focus:ring-2 focus:ring-[#00B2A9] outline-none`}
          >
            {questionLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.level && (
            <p className="text-red-500 text-sm mt-1">{errors.level}</p>
          )}
        </div>

        {/* Form Error */}
        {errors.formError && (
          <p className="text-red-500 text-sm mt-1">{errors.formError}</p>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap justify-end gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className={`gap-2 items-center flex text-white px-5 py-2 rounded-lg transition-all duration-200 ${isLoading
              ? "bg-[#66C5D5] cursor-not-allowed"
              : "bg-[#00B2A9] hover:bg-[#0097B2]"
              }`}
          >
            {isLoading && (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5"></span>
            )}
            <span>{isLoading ? "Creating..." : "Create Interview"}</span>
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className={`px-5 py-2 rounded-lg transition-all duration-200 ${mode === "dark"
              ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
              }`}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default ResumeQuestionForm;
