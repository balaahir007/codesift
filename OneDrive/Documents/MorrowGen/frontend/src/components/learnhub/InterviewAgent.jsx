import React, { useEffect, useState } from 'react';
import { RiChatVoiceAiFill } from 'react-icons/ri';
import userAvatar from '../../assets/learnhub/images/avatar2.png';
import '../../ui/learnhubUi/InterviewAgent.css';
import cn from 'classnames';
import { FiPhoneOff, FiPlay, FiMessageSquare } from 'react-icons/fi';
import CountdownTimer from './CountdownTimer';
import useThemeStore from '../../zustand/themeStore';

const InterviewAgent = ({ callStatus, aiText, speaking, onVapiStop, onVapiCall, interviewName = '', timer }) => {
    const [timerOn, setTimerOn] = useState(false)
    useEffect(() => {
        if (aiText?.trim() != '' && !timerOn) {
            setTimerOn(true)
        }
    }, [aiText])

    console.log("timer in interview agent", timer)
    console.log("call status in interview agent", callStatus)
    console.log("speaking in interview agent", speaking)
    console.log("aiText in interview agent", aiText)
    console.log("interviewName in interview agent", interviewName)
    useEffect(() => {
        onVapiCall()
    }, [])

    

    const { mode } = useThemeStore();

    // Theme variables
    const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-800';
    const textSecondary = mode === 'dark' ? 'text-gray-300' : 'text-gray-600';
    const textTertiary = mode === 'dark' ? 'text-gray-400' : 'text-gray-500';
    const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';

    return (
        <div className="min-h-screen bg-gradient-to-br bg-backGray p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Timer */}

                <div className="flex justify-end mb-6">
                    {timerOn && (
                        <div className={`rounded-full px-4 py-2 shadow-lg border 
                        ${mode === 'dark'
                                ? 'text-primary border-white/10 backdrop-blur-md'
                                : ' border-white/20 backdrop-blur-sm'
                            }`}
                        >
                            <CountdownTimer timer={timer} />
                        </div>
                    )}
                </div>

                {/* Title */}
                <div className="text-center mb-12">
                    <div className={`inline-flex items-center gap-3 rounded-2xl px-6 py-4 shadow-xl mb-4 border transition
                    ${mode === 'dark'
                            ? 'bg-[#1B2E31]/90 border-white/10 backdrop-blur-md'
                            : 'bg-white/90 border-white/20 backdrop-blur-sm'
                        }`}
                    >
                        <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>

                        <h1 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r 
                        ${mode === 'dark'
                                ? 'from-gray-100 to-gray-300'
                                : 'from-slate-700 to-slate-900'
                            } bg-clip-text text-transparent`}
                        >
                            AI Mock Interview —{" "}
                            {interviewName?.charAt(0).toUpperCase() + interviewName?.slice(1)}
                        </h1>
                    </div>
                </div>

                {/* Main Interview Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-8 max-w-5xl mx-auto">

                    {/* AI Interviewer Card */}
                    <div className={`relative group transition-all duration-500 
                    ${speaking === 'assistant' ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
                    >
                        <div className={`absolute inset-0 rounded-3xl opacity-20 blur transition-opacity
                        ${mode === 'dark'
                                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:opacity-30'
                                : 'bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:opacity-30'
                            }`}
                        ></div>

                        <div className={`relative rounded-3xl p-8 shadow-xl border h-full transition
                        ${cardBg} ${mode === 'dark' ? 'border-white/10' : 'border-white/20'}`}
                        >
                            <div className="flex flex-col items-center text-center space-y-6">

                                {/* Avatar */}
                                <div className="relative">
                                    <div className={`w-32 h-32 rounded-full flex items-center justify-center shadow-2xl 
                                    ${mode === 'dark'
                                            ? 'bg-gradient-to-br from-blue-600 to-cyan-600'
                                            : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                                        }`}
                                    >
                                        <RiChatVoiceAiFill className="text-white text-6xl" />
                                    </div>

                                    {speaking === 'assistant' && (
                                        <>
                                            <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping"></div>
                                            <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-pulse"></div>
                                        </>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <h3 className={`text-2xl font-bold ${textPrimary}`}>AI Interviewer</h3>
                                    <p className={`${textSecondary} max-w-xs leading-relaxed`}>
                                        Ready to evaluate your skills and provide valuable feedback
                                    </p>
                                </div>

                                {speaking === 'assistant' && (
                                    <div className={`flex items-center gap-2 rounded-full px-4 py-2 
                                    ${mode === 'dark' ? 'bg-blue-900/40' : 'bg-blue-50'}`}
                                    >
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                                        <span className={`text-sm font-medium ${mode === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                                            Speaking...
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* USER CARD — themed the same way */}
                    <div className={`relative group transition-all duration-500 
                    ${speaking === 'user' ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
                    >
                        <div className={`absolute inset-0 rounded-3xl opacity-20 blur transition-opacity
                        ${mode === 'dark'
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:opacity-30'
                                : 'bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:opacity-30'
                            }`}
                        ></div>

                        <div className={`relative rounded-3xl p-8 shadow-xl border h-full transition
                        ${cardBg} ${mode === 'dark' ? 'border-white/10' : 'border-white/20'}`}
                        >
                            <div className="flex flex-col items-center text-center space-y-6">

                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/50">
                                        <img src={userAvatar} className="w-full h-full object-cover" />
                                    </div>

                                    {speaking === 'user' && (
                                        <>
                                            <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping"></div>
                                            <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-pulse"></div>
                                        </>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <h3 className={`text-2xl font-bold ${textPrimary}`}>Balaji</h3>
                                    <p className={`${textSecondary} max-w-xs leading-relaxed`}>
                                        Prepared and confident, ready to showcase my abilities
                                    </p>
                                </div>

                                {speaking === 'user' && (
                                    <div className={`flex items-center gap-2 rounded-full px-4 py-2
                                    ${mode === 'dark' ? 'bg-emerald-900/40' : 'bg-emerald-50'}`}
                                    >
                                        <span className={`text-sm font-medium 
                                        ${mode === 'dark' ? 'text-emerald-400' : 'text-emerald-700'}`}>
                                            You're speaking...
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>

                {/* AI Response Section */}
                {aiText && (
                    <div className="max-w-4xl mx-auto mb-8">
                        <div
                            className={cn(
                                `${cardBg} backdrop-blur-sm rounded-2xl p-6 shadow-xl border`,
                                mode === "dark" ? "border-gray-700" : "border-gray-200"
                            )}
                        >
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                    <FiMessageSquare className="text-white text-lg" />
                                </div>

                                {/* Text */}
                                <div className="flex-1">
                                    <h4 className={`font-semibold mb-2 ${textPrimary}`}>AI Interviewer</h4>

                                    <p
                                        className={cn(
                                            `${textSecondary} leading-relaxed transition-all duration-700`,
                                            "animate-fadeIn opacity-100"
                                        )}
                                    >
                                        {aiText}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                )}

                {/* Control Panel */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                    {callStatus !== 'ACTIVE' ? (
                        <button
                            onClick={onVapiCall}
                            disabled={callStatus === 'LOADING'}
                            className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {callStatus === 'LOADING' ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <FiPlay className="text-xl" />
                            )}
                            <span className="text-lg">
                                {callStatus === 'LOADING' ? 'Connecting...' :
                                    callStatus === 'INACTIVE' || callStatus === 'FINISHED' ? 'Start Interview' : 'Start Call'}
                            </span>
                            {callStatus === 'INACTIVE' || callStatus === 'FINISHED' ? (
                                <div className="absolute inset-0 rounded-2xl bg-emerald-400/20 animate-pulse"></div>
                            ) : null}
                        </button>
                    ) : (
                        <button
                            onClick={onVapiStop}
                            className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            <FiPhoneOff className="text-xl" />
                            <span className="text-lg">End Interview</span>
                        </button>
                    )}

                    {callStatus === 'FINISHED' && (
                        <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-700 hover:text-slate-900 font-semibold rounded-2xl shadow-lg hover:shadow-xl border border-slate-200 hover:border-slate-300 transition-all duration-300">
                            <FiMessageSquare className="text-lg" />
                            <span>View Feedback</span>
                        </button>
                    )}
                </div>

                {/* Status Indicator */}
                <div className="flex justify-center mt-6">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <div className={cn(
                            'w-2 h-2 rounded-full',
                            callStatus === 'ACTIVE' ? 'bg-green-500 animate-pulse' :
                                callStatus === 'LOADING' ? 'bg-yellow-500 animate-pulse' :
                                    callStatus === 'FINISHED' ? 'bg-blue-500' : 'bg-slate-400'
                        )}></div>
                        <span className="font-medium">
                            {callStatus === 'ACTIVE' ? 'Interview Active' :
                                callStatus === 'LOADING' ? 'Connecting...' :
                                    callStatus === 'FINISHED' ? 'Interview Completed' : 'Ready to Start'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewAgent;