import React, { useState } from 'react';
import {
    BookOpen,
    PlayCircle,
    Clock,
    Users,
    CheckCircle,
    Star,
    Download,
    Share2,
    ArrowLeft,
    ExternalLink,
    Calendar,
    Target,
    Award
} from 'lucide-react';

const CourseDisplayComponent = () => {
    // Your WebRTC course data
    const courseData = {
        "id": "eaff5ab2-a7eb-46a3-8528-34abf0247d57",
        "title": "Complete hey i want learn a webRTC Course",
        "description": "A comprehensive course covering all aspects of hey i want learn a webRTC with practical examples and hands-on projects.",
        "modules": [
            {
                "moduleTitle": "Introduction and Fundamentals",
                "description": "Getting started with the basics",
                "lessons": [
                    {
                        "title": "Course Introduction",
                        "video": "https://www.youtube.com/results?search_query=Course%20Introduction%20hey%20i%20tutorial%20beginner",
                        "duration": "21 min"
                    },
                    {
                        "title": "Basic Concepts",
                        "video": "https://www.youtube.com/results?search_query=Basic%20Concepts%20hey%20i%20tutorial%20beginner",
                        "duration": "26 min"
                    },
                    {
                        "title": "Setting Up Environment",
                        "video": "https://www.youtube.com/results?search_query=Setting%20Up%20Environment%20hey%20i%20tutorial%20beginner",
                        "duration": "12 min"
                    },
                    {
                        "title": "First Steps",
                        "video": "https://www.youtube.com/results?search_query=First%20Steps%20hey%20i%20tutorial%20beginner",
                        "duration": "13 min"
                    }
                ],
                "estimatedTime": "3 hours"
            },
            {
                "moduleTitle": "Core Concepts",
                "description": "Deep dive into essential topics",
                "lessons": [
                    {
                        "title": "Key Principles",
                        "video": "https://www.youtube.com/results?search_query=Key%20Principles%20hey%20i%20tutorial%20beginner",
                        "duration": "28 min"
                    },
                    {
                        "title": "Best Practices",
                        "video": "https://www.youtube.com/watch?v=jqw-BOxzRzE",
                        "duration": "29 min"
                    },
                    {
                        "title": "Common Patterns",
                        "video": "https://www.youtube.com/watch?v=ddRQ9DXsbNA",
                        "duration": "28 min"
                    },
                    {
                        "title": "Practical Examples",
                        "video": "https://www.youtube.com/results?search_query=Practical%20Examples%20hey%20i%20tutorial%20beginner",
                        "duration": "29 min"
                    }
                ],
                "estimatedTime": "5 hours"
            },
            {
                "moduleTitle": "Advanced Topics",
                "description": "Advanced concepts and techniques",
                "lessons": [
                    {
                        "title": "Advanced Techniques",
                        "video": "https://www.youtube.com/watch?v=XwKX7eym4EA",
                        "duration": "14 min"
                    },
                    {
                        "title": "Real-world Applications",
                        "video": "https://www.youtube.com/results?search_query=Real-world%20Applications%20hey%20i%20tutorial%20beginner",
                        "duration": "10 min"
                    },
                    {
                        "title": "Performance Optimization",
                        "video": "https://www.youtube.com/results?search_query=Performance%20Optimization%20hey%20i%20tutorial%20beginner",
                        "duration": "28 min"
                    },
                    {
                        "title": "Troubleshooting",
                        "video": "https://www.youtube.com/results?search_query=Troubleshooting%20hey%20i%20tutorial%20beginner",
                        "duration": "14 min"
                    }
                ],
                "estimatedTime": "4 hours"
            },
            {
                "moduleTitle": "Projects and Practice",
                "description": "Apply your knowledge with projects",
                "lessons": [
                    {
                        "title": "Practice Exercises",
                        "video": "https://www.youtube.com/results?search_query=Practice%20Exercises%20hey%20i%20tutorial%20beginner",
                        "duration": "25 min"
                    },
                    {
                        "title": "Mini Projects",
                        "video": "https://www.youtube.com/results?search_query=Mini%20Projects%20hey%20i%20tutorial%20beginner",
                        "duration": "22 min"
                    },
                    {
                        "title": "Capstone Project",
                        "video": "https://www.youtube.com/watch?v=pCj0Jr-ktp4",
                        "duration": "28 min"
                    },
                    {
                        "title": "Next Steps",
                        "video": "https://www.youtube.com/results?search_query=Next%20Steps%20hey%20i%20tutorial%20beginner",
                        "duration": "21 min"
                    }
                ],
                "estimatedTime": "3 hours"
            }
        ],
        "sourcePrompt": "hey i want learn a webRTC",
        "generatedAt": "2025-09-13T00:26:40.066Z",
        "videoSource": "youtube_api",
        "stats": {
            "totalModules": 4,
            "totalLessons": 16,
            "estimatedHours": 16,
            "difficulty": "Beginner to Intermediate"
        }
    };

    const [activeModule, setActiveModule] = useState(0);
    const [completedLessons, setCompletedLessons] = useState(new Set());

    const toggleLessonComplete = (moduleIndex, lessonIndex) => {
        const lessonId = `${moduleIndex}-${lessonIndex}`;
        const newCompleted = new Set(completedLessons);

        if (newCompleted.has(lessonId)) {
            newCompleted.delete(lessonId);
        } else {
            newCompleted.add(lessonId);
        }

        setCompletedLessons(newCompleted);
    };

    const handleBack = () => {
        // Handle navigation back
        console.log('Navigate back');
    };

    // Calculations
    const totalLessons = courseData.modules.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedCount = completedLessons.size;
    const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleBack}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] rounded-xl flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-semibold text-gray-900 truncate max-w-md">
                                        {courseData.title}
                                    </h1>
                                    <p className="text-sm text-gray-500">
                                        {courseData.modules.length} modules • {totalLessons} lessons
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Progress Ring */}
                            <div className="relative w-12 h-12">
                                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                                    <circle
                                        cx="18" cy="18" r="16"
                                        fill="none"
                                        stroke="#e5e7eb"
                                        strokeWidth="3"
                                    />
                                    <circle
                                        cx="18" cy="18" r="16"
                                        fill="none"
                                        stroke="#0097B2"
                                        strokeWidth="3"
                                        strokeDasharray={`${progressPercentage}, 100`}
                                        className="transition-all duration-300"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs font-semibold text-[#0097B2]">
                                        {Math.round(progressPercentage)}%
                                    </span>
                                </div>
                            </div>

                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Share2 className="w-5 h-5 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Download className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Course Overview */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-8">
                            <div className="flex items-start gap-6 mb-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-[#0097B2] to-[#00B2A9] rounded-2xl flex items-center justify-center shadow-lg">
                                    <BookOpen className="w-10 h-10 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                        {courseData.title}
                                    </h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {courseData.description}
                                    </p>
                                </div>
                            </div>

                            {/* Course Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-xl">
                                {[
                                    { icon: Calendar, label: 'Duration', value: `${courseData.stats.estimatedHours} hours` },
                                    { icon: BookOpen, label: 'Lessons', value: `${totalLessons} lessons` },
                                    { icon: Target, label: 'Level', value: courseData.stats.difficulty },
                                    { icon: Award, label: 'Modules', value: `${courseData.stats.totalModules} modules` }
                                ].map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm">
                                            <stat.icon className="w-5 h-5 text-[#0097B2]" />
                                        </div>
                                        <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                                        <div className="text-sm font-semibold text-gray-900">{stat.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Course Modules */}
                        <div className="space-y-6">
                            {courseData.modules.map((module, moduleIndex) => (
                                <div
                                    key={moduleIndex}
                                    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                                >
                                    {/* Module Header */}
                                    <div
                                        className={`p-6 cursor-pointer transition-colors ${activeModule === moduleIndex
                                                ? 'bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white'
                                                : 'bg-gray-50 hover:bg-gray-100'
                                            }`}
                                        onClick={() => setActiveModule(activeModule === moduleIndex ? -1 : moduleIndex)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${activeModule === moduleIndex
                                                        ? 'bg-white/20 text-white'
                                                        : 'bg-[#0097B2] text-white'
                                                    }`}>
                                                    {moduleIndex + 1}
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-semibold mb-1">
                                                        {module.moduleTitle}
                                                    </h3>
                                                    <p className={`text-sm ${activeModule === moduleIndex ? 'text-white/80' : 'text-gray-500'
                                                        }`}>
                                                        {module.lessons.length} lessons • {module.estimatedTime}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {/* Module Progress */}
                                                <div className="text-right">
                                                    <div className="text-sm font-medium">
                                                        {module.lessons.filter((_, lessonIndex) =>
                                                            completedLessons.has(`${moduleIndex}-${lessonIndex}`)
                                                        ).length}/{module.lessons.length}
                                                    </div>
                                                    <div className="text-xs opacity-80">completed</div>
                                                </div>

                                                <div className={`transform transition-transform ${activeModule === moduleIndex ? 'rotate-180' : ''
                                                    }`}>
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Module Lessons */}
                                    {activeModule === moduleIndex && (
                                        <div className="divide-y divide-gray-100">
                                            {module.lessons.map((lesson, lessonIndex) => {
                                                const lessonId = `${moduleIndex}-${lessonIndex}`;
                                                const isCompleted = completedLessons.has(lessonId);

                                                return (
                                                    <div
                                                        key={lessonIndex}
                                                        className="p-6 hover:bg-gray-50 transition-colors"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <button
                                                                onClick={() => toggleLessonComplete(moduleIndex, lessonIndex)}
                                                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isCompleted
                                                                        ? 'bg-[#00B2A9] border-[#00B2A9] text-white'
                                                                        : 'border-gray-300 hover:border-[#00B2A9]'
                                                                    }`}
                                                            >
                                                                {isCompleted && <CheckCircle className="w-4 h-4" />}
                                                            </button>

                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-3 mb-1">
                                                                    <PlayCircle className="w-4 h-4 text-[#0097B2]" />
                                                                    <h4 className={`font-medium ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'
                                                                        }`}>
                                                                        {lesson.title}
                                                                    </h4>
                                                                </div>
                                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                                    <div className="flex items-center gap-1">
                                                                        <Clock className="w-3 h-3" />
                                                                        <span>{lesson.duration}</span>
                                                                    </div>
                                                                    <span className="text-[#00B2A9] font-medium">Video available</span>
                                                                </div>
                                                            </div>

                                                            <a
                                                                href={lesson.video}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="px-4 py-2 bg-[#0097B2] text-white rounded-lg hover:bg-[#007A94] transition-colors text-sm font-medium flex items-center gap-2"
                                                            >
                                                                Watch <ExternalLink className="w-3 h-3" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Progress Card */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>

                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-600">Overall Progress</span>
                                        <span className="text-sm font-semibold text-[#0097B2]">
                                            {completedCount}/{totalLessons}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] h-3 rounded-full transition-all duration-500"
                                            style={{ width: `${progressPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {courseData.modules.map((module, index) => {
                                        const moduleCompleted = module.lessons.filter((_, lessonIndex) =>
                                            completedLessons.has(`${index}-${lessonIndex}`)
                                        ).length;
                                        const moduleProgress = (moduleCompleted / module.lessons.length) * 100;

                                        return (
                                            <div key={index} className="flex items-center justify-between py-2">
                                                <span className="text-sm text-gray-600 truncate flex-1">
                                                    {module.moduleTitle}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                                        <div
                                                            className="bg-[#00B2A9] h-1.5 rounded-full transition-all duration-300"
                                                            style={{ width: `${moduleProgress}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-xs text-gray-500 w-8 text-right">
                                                        {Math.round(moduleProgress)}%
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Course Info Card */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Details</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-[#0097B2]/10 rounded-lg flex items-center justify-center">
                                            <Calendar className="w-4 h-4 text-[#0097B2]" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">Created</div>
                                            <div className="text-xs text-gray-500">
                                                {new Date(courseData.generatedAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-[#00B2A9]/10 rounded-lg flex items-center justify-center">
                                            <Users className="w-4 h-4 text-[#00B2A9]" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">Level</div>
                                            <div className="text-xs text-gray-500">{courseData.stats.difficulty}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-[#0097B2]/10 rounded-lg flex items-center justify-center">
                                            <Star className="w-4 h-4 text-[#0097B2]" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">Source</div>
                                            <div className="text-xs text-gray-500">{courseData.videoSource.replace('_', ' ').toUpperCase()}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button className="w-full py-3 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                                    Start Learning
                                </button>
                                <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                                    Save for Later
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDisplayComponent;