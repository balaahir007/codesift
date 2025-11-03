import { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import { resumeFormValidation } from "../../utils/validation/InterviewFormValidations.js";
import useInterviewStore from "../../zustand/mockInterviewStore/useFormInterviewStore.js";
import { useNavigate } from "react-router-dom";

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
            console.log("form data",data);

            await resumeGenerateQuestion(data);
            navigate(`/learnhub/mock-interview/resume/start`)
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

    return (
        <div className={`p-4 ${pdfPreview ? 'h-[520px] overflow-y-scroll' : ''}`}>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Resume Based Mock Interview
            </h2>

            <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto rounded-2xl space-y-6 sm:max-w-full">
                <label className="flex flex-col items-center gap-2 border-primary border p-4 rounded-md cursor-pointer">
                    <FaUpload className="h-8 w-6 text-primary sm:h-6 sm:w-5" />
                    <span className="px-4 py-1 bg-primary text-white rounded-md text-sm">
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
                {errors.file && <p className="text-red-600 text-sm mt-1">{errors.file}</p>}

                {pdfPreview && (
                    <div className=" border-primary border rounded-md overflow-hidden mt-4 max-w-full" style={{ height: 300 }}>
                        <iframe
                            src={pdfPreview}
                            width="100%"
                            height="100%"
                            title="PDF Preview"
                            className=""
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary"
                    >
                        {questionTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    {errors.type && <p className="text-red-600 text-sm mt-1">{errors.type}</p>}
                </div>

                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label className="block text-sm font-medium mb-1 text-gray-700">Timer</label>
                        <select
                            name="timer"
                            value={formData.timer}
                            onChange={handleChange}
                            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${errors.timer ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-400'}`}
                        >
                            {timerOptions.map(min => (
                                <option key={min} value={min}>{min} Minutes</option>
                            ))}
                        </select>
                        {errors.timer && <p className="text-red-600 text-sm mt-1">{errors.timer}</p>}
                    </div>

                    <div className="w-1/2">
                        <label className="block text-sm font-medium mb-1 text-gray-700">No. of Questions</label>
                        <select
                            name="questionAmount"
                            value={formData.questionAmount}
                            onChange={handleChange}
                            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${errors.questionAmount ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-400'}`}
                        >
                            {questionAmounts.map(amt => (
                                <option key={amt} value={amt}>{amt} Questions</option>
                            ))}
                        </select>
                        {errors.questionAmount && <p className="text-red-600 text-sm mt-1">{errors.questionAmount}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Question Level</label>
                    <select
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        className="w-full p-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary"
                    >
                        {questionLevels.map((level) => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                    {errors.level && <p className="text-red-600 text-sm mt-1">{errors.level}</p>}
                </div>

                {errors.formError && <p className="text-red-600 text-sm mt-1">{errors.formError}</p>}

                <div className="flex flex-wrap justify-end gap-3">
                    <button
                        type="submit"
                        className={`gap-2 items-center flex text-white px-5 py-2 rounded-lg transition ${isLoading ? 'bg-[#66C5D5] cursor-not-allowed' : 'bg-[#0097B2] hover:bg-[#007A8F]'}`}
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5"></span>
                        )}
                        <span>{isLoading ? 'Creating...' : 'Create Interview'}</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResumeQuestionForm;
