import React from 'react';
import { 
    BookOpen, 
    Brain, 
    Target, 
    Users, 
    Clock, 
    Lightbulb,
    FileText,
    Zap,
    CheckCircle,
    Settings
} from 'lucide-react';

const CourseLoadingComponent = ({
    loadingText = "Generating Your Course",
    subText = "Creating personalized learning content...",
    showProgress = true
}) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0097B2]/5 via-white/95 to-[#00B2A9]/5 flex items-center justify-center p-6 relative overflow-hidden">
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#0097B2]/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[#00B2A9]/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-[#0097B2]/3 to-[#00B2A9]/3 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>

            <div className="max-w-md w-full relative z-10">
                {/* Main Loading Animation */}
                <div className="text-center mb-6">
                    <div className="relative mb-4">
                        {/* Multi-layered spinning rings */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 border-2 border-[#0097B2]/20 border-t-[#0097B2] rounded-full animate-spin"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 border-2 border-[#00B2A9]/20 border-b-[#00B2A9] rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '2s'}}></div>
                        </div>

                        {/* Central icon with pulse effect */}
                        <div className="relative z-10 flex items-center justify-center">
                            <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-[#0097B2]/10">
                                <Brain className="w-5 h-5 text-[#0097B2] animate-pulse" />
                            </div>
                        </div>

                        {/* Orbiting particles */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            {[0, 1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="absolute"
                                    style={{
                                        transform: `rotate(${i * 60}deg)`,
                                        animation: `orbit 4s linear infinite`,
                                        animationDelay: `${i * 0.3}s`
                                    }}
                                >
                                    <div className="w-2 h-2 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] rounded-full shadow-lg" 
                                         style={{transform: 'translateX(30px)'}} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Loading text with typewriter effect */}
                    <h2 className="text-xl font-bold bg-gradient-to-r from-[#0097B2] to-[#00B2A9] bg-clip-text text-transparent mb-2">
                        {loadingText}
                    </h2>
                    <p className="text-gray-600 text-sm font-medium animate-pulse">{subText}</p>
                </div>

                {/* Enhanced Progress Steps */}
                {showProgress && (
                    <div className="space-y-3 mb-6">
                        {[
                            { icon: Lightbulb, text: "Analyzing learning objectives", color: "from-yellow-400 to-orange-500", delay: "0s" },
                            { icon: FileText, text: "Structuring course content", color: "from-blue-400 to-blue-600", delay: "1s" },
                            { icon: Settings, text: "Customizing difficulty level", color: "from-purple-400 to-purple-600", delay: "2s" },
                            { icon: CheckCircle, text: "Finalizing your course", color: "from-green-400 to-green-600", delay: "3s" }
                        ].map((step, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/40 transition-all duration-700 hover:shadow-lg hover:scale-105 animate-slideInLeft"
                                style={{ animationDelay: step.delay }}
                            >
                                <div className="relative">
                                    <div className={`w-8 h-8 bg-gradient-to-br ${step.color} rounded-lg flex items-center justify-center shadow-lg transform transition-transform duration-500 hover:rotate-12`}>
                                        <step.icon className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#00B2A9] rounded-full animate-ping"></div>
                                </div>
                                
                                <div className="flex-1">
                                    <span className="text-gray-800 font-medium text-sm">{step.text}</span>
                                </div>
                                
                                <div className="flex space-x-1">
                                    {[0, 1, 2].map((i) => (
                                        <div
                                            key={i}
                                            className="w-1 h-4 bg-gradient-to-t from-[#0097B2] to-[#00B2A9] rounded-full animate-wave"
                                            style={{ animationDelay: `${i * 0.15 + index * 0.1}s` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Compact Skeleton Preview */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-white/20 space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#0097B2]/20 to-[#00B2A9]/20 rounded-md animate-pulse"></div>
                        <div className="flex-1 space-y-1">
                            <div className="h-2 bg-gradient-to-r from-[#0097B2]/15 to-[#00B2A9]/15 rounded-md animate-pulse"></div>
                            <div className="h-1 bg-gradient-to-r from-[#00B2A9]/15 to-[#0097B2]/15 rounded-md animate-pulse w-2/3"></div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        {[85, 70, 95].map((width, i) => (
                            <div 
                                key={i}
                                className="h-1 bg-gradient-to-r from-[#0097B2]/10 to-[#00B2A9]/10 rounded-md animate-pulse"
                                style={{ 
                                    width: `${width}%`,
                                    animationDelay: `${i * 0.1}s`
                                }}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-1 pt-1">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="h-3 bg-gradient-to-r from-[#0097B2]/8 to-[#00B2A9]/8 rounded-md animate-pulse"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            />
                        ))}
                    </div>
                </div>

                {/* Compact Time Estimate */}
                <div className="text-center mt-3">
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full border border-[#0097B2]/10">
                        <Clock className="w-3 h-3 text-[#0097B2] animate-pulse" />
                        <p className="text-[#0097B2] font-medium text-xs">~30-60 seconds</p>
                    </div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes orbit {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes wave {
                    0%, 40%, 100% {
                        transform: scaleY(0.4);
                    }
                    20% {
                        transform: scaleY(1);
                    }
                }

                .animate-slideInLeft {
                    animation: slideInLeft 0.8s ease-out forwards;
                }

                .animate-wave {
                    animation: wave 1.4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default CourseLoadingComponent;