import React, { useState } from 'react';
import { Send, BookOpen, Sparkles } from 'lucide-react';
import CourseLoadingComponent from '../../components/learnhub/CourseLoadingComponent';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { Lightbulb } from 'lucide-react';

const CourseGeneration = () => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [generatedCourse, setGeneratedCourse] = useState(null);
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim() || loading) return;

        setLoading(true);
        setError('');
        setGeneratedCourse(null);

        try {
            const payload = {
                prompt,
                options: {
                    maxModules: 6,
                    maxLessonsPerModule: 5
                }
            }
            const response = await axiosInstance.post('/learnhub/course/generate', payload);
            if (!response.data) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const courseId = await response.data;
            navigate(`${courseId}`)
            setPrompt(''); // Clear the input
        } catch (error) {
            console.error('Course generation error:', error);
            setError('Failed to generate course. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setGeneratedCourse(null);
        setError('');
        setPrompt('');
    };

    // If we have a generated course, show it
    if (generatedCourse && loading) {
        return (
            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] px-6 py-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <h1 className="text-xl font-semibold text-white">AI Course Generator</h1>
                        </div>
                        <button
                            onClick={resetForm}
                            className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                        >
                            Generate New Course
                        </button>
                    </div>
                </div>

                {/* Course Result */}
                <div className="p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
                            {/* Course Header */}
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-[#E0F2F5] to-[#B3E0E9] rounded-xl flex items-center justify-center">
                                    <BookOpen className="w-8 h-8 text-[#0097B2]" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                        {generatedCourse.title}
                                    </h2>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        {generatedCourse.description}
                                    </p>
                                </div>
                            </div>

                            {/* Course Modules */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Course Modules</h3>
                                {generatedCourse.modules.map((module, moduleIndex) => (
                                    <div key={moduleIndex} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3">
                                            <span className="w-8 h-8 bg-[#00B2A9] text-white rounded-lg flex items-center justify-center text-sm font-bold">
                                                {moduleIndex + 1}
                                            </span>
                                            {module.moduleTitle}
                                        </h4>

                                        <div className="space-y-3">
                                            {module.lessons.map((lesson, lessonIndex) => (
                                                <div key={lessonIndex} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                    <div className="w-6 h-6 bg-[#E0F2F5] rounded-full flex items-center justify-center">
                                                        <span className="text-xs font-medium text-[#0097B2]">
                                                            {lessonIndex + 1}
                                                        </span>
                                                    </div>
                                                    <span className="flex-1 text-gray-700">
                                                        {lesson.title}
                                                    </span>
                                                    {lesson.video && (
                                                        <a
                                                            href={lesson.video}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="px-3 py-1 bg-[#0097B2] text-white text-xs rounded-lg hover:bg-[#007A94] transition-colors"
                                                        >
                                                            Watch Video
                                                        </a>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Course Info */}
                            <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                    <span>Generated: {new Date(generatedCourse.generatedAt).toLocaleDateString()}</span>
                                    <span>{generatedCourse.modules.length} modules • {generatedCourse.modules.reduce((acc, mod) => acc + mod.lessons.length, 0)} lessons</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] px-6 py-4 shadow-sm">
                <div className="flex items-center justify-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <h1 className="text-xl font-semibold text-white">AI Course Generator</h1>
                </div>
            </div>

            {/* Loading Overlay */}
            {loading && (
                <div className="bg-white/80 fixed inset-0 z-50">
                    <CourseLoadingComponent
                        loadingText="Generating Your Course"
                        subText="AI is crafting your personalized learning path..."
                    />
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="mx-6 mt-4">
                    <div className="max-w-3xl mx-auto p-4 bg-red-50 border border-red-200 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                <span className="text-red-600 text-sm">⚠️</span>
                            </div>
                            <div>
                                <p className="text-red-800 font-medium">Generation Failed</p>
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-3xl">
                    {/* Welcome Message */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-[#E0F2F5] rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                            <BookOpen className="w-8 h-8 text-[#0097B2]" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                            Create Your Perfect Course
                        </h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Describe what you want to learn, and our AI will generate a
                            personalized course roadmap for you.
                        </p>
                    </div>

                    {/* Input Interface */}
                    <div className="relative">
                        <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden focus-within:border-[#0097B2] transition-colors">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }
                                }}
                                placeholder="E.g., 'Create a beginner-friendly web development course with HTML, CSS, and JavaScript'"
                                className="w-full p-6 pr-16 text-gray-900 placeholder-gray-400 border-none outline-none resize-none min-h-[140px] max-h-[300px] text-base leading-relaxed"
                                style={{ fontFamily: 'inherit' }}
                                disabled={loading}
                            />

                            {/* Character count */}
                            <div className="absolute bottom-14 right-4 text-xs text-gray-400">
                                {prompt.length} characters
                            </div>

                            {/* Submit Button */}
                            <div className="absolute bottom-4 right-4">
                                <button
                                    onClick={handleSubmit}
                                    disabled={!prompt.trim() || loading}
                                    className="group p-3 bg-[#0097B2] text-white rounded-xl hover:bg-[#007A94] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                                >
                                    <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Helper text */}
                        <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                                <span>
                                    Press{' '}
                                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">
                                        Enter
                                    </kbd>{' '}
                                    to send
                                </span>
                                <span>
                                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">
                                        Shift + Enter
                                    </kbd>{' '}
                                    for new line
                                </span>
                            </div>
                            <span className="text-xs text-[#0097B2] font-medium">
                                AI-powered generation
                            </span>
                        </div>
                    </div>

                    {/* Example Prompts */}
                    <div className="mt-10">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">
                            Try these examples:
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                'Create a 5-week Python programming course for beginners',
                                'Design a digital marketing course focusing on social media',
                                'Build a data science course with hands-on projects',
                                'Develop a UX/UI design course for career switchers',
                            ].map((example, index) => (
                                <button
                                    key={index}
                                    onClick={() => setPrompt(example)}
                                    disabled={loading}
                                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-[#00B2A9] hover:bg-[#E0F2F5] transition-colors text-sm text-gray-700 hover:text-gray-900 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {/* Icon */}
                                    <div className="w-8 h-8 bg-[#00B2A9] text-white rounded-full flex items-center justify-center shadow">
                                        <Lightbulb className="w-4 h-4" />
                                    </div>
                                    {/* Example text */}
                                    <span className="text-left">{example}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#0097B2] rounded-full animate-pulse"></div>
                            <span>Powered by AI</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div
                                className="w-2 h-2 bg-[#00B2A9] rounded-full animate-pulse"
                                style={{ animationDelay: '0.5s' }}
                            ></div>
                            <span>Personalized Learning</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div
                                className="w-2 h-2 bg-[#0097B2] rounded-full animate-pulse"
                                style={{ animationDelay: '1s' }}
                            ></div>
                            <span>Instant Generation</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseGeneration;