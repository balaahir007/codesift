import React, { useState } from 'react';
import { Send, BookOpen, Sparkles, Lightbulb, Moon, Sun } from 'lucide-react';
import useThemeStore from '../../zustand/themeStore';
import CourseLoadingComponent from '../../components/learnhub/CourseLoadingComponent'

const CourseGeneration = () => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [generatedCourse, setGeneratedCourse] = useState(null);

    const { mode } = useThemeStore()
    // Theme classes
    const bgPrimary = mode === 'dark' ? 'bg-[#0F1419]' : 'bg-white';
    const bgSecondary = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
    const bgTertiary = mode === 'dark' ? 'bg-gray-800' : 'bg-gray-50';
    const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
    const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
    const textTertiary = mode === 'dark' ? 'text-gray-500' : 'text-gray-500';
    const borderColor = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';
    const hoverBg = mode === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100';
    const cardBorder = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';
    const errorBorder = mode === 'dark' ? 'border-red-900/30' : 'border-red-200';
    const errorBg = mode === 'dark' ? 'bg-red-900/10' : 'bg-red-50';
    const errorIconBg = mode === 'dark' ? 'bg-red-900/20' : 'bg-red-100';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim() || loading) return;

        setLoading(true);
        setError('');
        setGeneratedCourse(null);

        try {
            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock generated course
            setGeneratedCourse({
                title: "Complete Web Development Course",
                description: "A comprehensive course covering HTML, CSS, and JavaScript fundamentals",
                modules: [
                    {
                        moduleTitle: "HTML Fundamentals",
                        lessons: [
                            { title: "Introduction to HTML", video: "#" },
                            { title: "HTML Elements & Tags", video: "#" },
                            { title: "Forms & Input", video: "#" }
                        ]
                    },
                    {
                        moduleTitle: "CSS Styling",
                        lessons: [
                            { title: "CSS Basics", video: "#" },
                            { title: "Flexbox & Grid", video: "#" }
                        ]
                    }
                ],
                generatedAt: new Date().toISOString()
            });
            setPrompt('');
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

    const toggleTheme = () => {
        setMode(mode === 'dark' ? 'light' : 'dark');
    };

    // Course Result View
    if (generatedCourse && !loading) {
        return (
            <div className={`min-h-screen ${bgPrimary}`}>
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] px-6 py-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <h1 className="text-xl font-semibold text-white">AI Course Generator</h1>
                        </div>
                        <div className="flex items-center gap-3">

                            <button
                                onClick={resetForm}
                                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                            >
                                Generate New Course
                            </button>
                        </div>
                    </div>
                </div>

                {/* Course Result */}
                <div className="p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className={`${bgSecondary} rounded-2xl border ${borderColor} shadow-lg p-8`}>
                            {/* Course Header */}
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-[#E0F2F5] to-[#B3E0E9] rounded-xl flex items-center justify-center">
                                    <BookOpen className="w-8 h-8 text-[#0097B2]" />
                                </div>
                                <div className="flex-1">
                                    <h2 className={`text-3xl font-bold ${textPrimary} mb-2`}>
                                        {generatedCourse.title}
                                    </h2>
                                    <p className={`text-lg ${textSecondary} leading-relaxed`}>
                                        {generatedCourse.description}
                                    </p>
                                </div>
                            </div>

                            {/* Course Modules */}
                            <div className="space-y-6">
                                <h3 className={`text-xl font-semibold ${textPrimary} mb-4`}>Course Modules</h3>
                                {generatedCourse.modules.map((module, moduleIndex) => (
                                    <div key={moduleIndex} className={`border ${cardBorder} rounded-xl p-6 hover:shadow-md transition-shadow`}>
                                        <h4 className={`text-lg font-semibold ${textPrimary} mb-4 flex items-center gap-3`}>
                                            <span className="w-8 h-8 bg-[#00B2A9] text-white rounded-lg flex items-center justify-center text-sm font-bold">
                                                {moduleIndex + 1}
                                            </span>
                                            {module.moduleTitle}
                                        </h4>

                                        <div className="space-y-3">
                                            {module.lessons.map((lesson, lessonIndex) => (
                                                <div key={lessonIndex} className={`flex items-center gap-4 p-3 ${bgTertiary} rounded-lg ${hoverBg} transition-colors`}>
                                                    <div className="w-6 h-6 bg-[#E0F2F5] rounded-full flex items-center justify-center">
                                                        <span className="text-xs font-medium text-[#0097B2]">
                                                            {lessonIndex + 1}
                                                        </span>
                                                    </div>
                                                    <span className={`flex-1 ${textSecondary}`}>
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
                            <div className={`mt-8 p-4 ${bgTertiary} rounded-xl`}>
                                <div className={`flex justify-between items-center text-sm ${textSecondary}`}>
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
        <div className={`min-h-screen  flex flex-col`}>
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] px-6 py-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center mx-auto gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <h1 className="text-xl  font-semibold text-white">AI Course Builder</h1>
                    </div>
                 
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
                    <div className={`max-w-3xl mx-auto p-4 ${errorBg} border ${errorBorder} rounded-xl`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 ${errorIconBg} rounded-lg flex items-center justify-center`}>
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
                        <h2 className={`text-2xl font-semibold ${textPrimary} mb-2`}>
                            Create Your Perfect Course
                        </h2>
                        <p className={`${textSecondary} max-w-md mx-auto`}>
                            Describe what you want to learn, and our AI will generate a
                            personalized course roadmap for you.
                        </p>
                    </div>

                    {/* Input Interface */}
                    <div className="relative">
                        <div className={`relative ${bgSecondary} rounded-2xl border ${borderColor} shadow-sm overflow-hidden focus-within:border-[#0097B2] transition-colors`}>
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
                                className={`w-full p-6 pr-16 ${textPrimary} placeholder-gray-400 border-none outline-none resize-none min-h-[140px] max-h-[300px] text-base leading-relaxed bg-transparent`}
                                style={{ fontFamily: 'inherit' }}
                                disabled={loading}
                            />

                            {/* Character count */}
                            <div className={`absolute bottom-14 right-4 text-xs ${textTertiary}`}>
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
                        <div className={`flex justify-between items-center mt-3 text-sm ${textTertiary}`}>
                            <div className="flex items-center gap-4">
                                <span>
                                    Press{' '}
                                    <kbd className={`px-2 py-1 ${bgTertiary} rounded text-xs`}>
                                        Enter
                                    </kbd>{' '}
                                    to send
                                </span>
                                <span>
                                    <kbd className={`px-2 py-1 ${bgTertiary} rounded text-xs`}>
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
                        <h3 className={`text-sm font-medium ${textSecondary} mb-3`}>
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
                                    className={`flex items-center gap-3 p-4 ${bgSecondary} rounded-xl border ${borderColor} hover:border-[#00B2A9] hover:bg-[#E0F2F5] transition-colors text-sm ${textSecondary} hover:text-gray-900 shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    <div className="w-8 h-8 bg-[#00B2A9] text-white rounded-full flex items-center justify-center shadow">
                                        <Lightbulb className="w-4 h-4" />
                                    </div>
                                    <span className="text-left">{example}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className={`${bgTertiary} border-t ${borderColor} px-6 py-4`}>
                <div className={`flex flex-col sm:flex-row justify-center items-center gap-4 text-sm ${textSecondary}`}>
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