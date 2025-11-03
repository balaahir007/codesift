import React, { useEffect, useState } from 'react';
import { RiChatVoiceAiFill } from 'react-icons/ri';
import userAvatar from '../../assets/learnhub/images/avatar2.png';
import '../../ui/learnhubUi/InterviewAgent.css';
import cn from 'classnames';
import { FiPhoneOff, FiPlay, FiMessageSquare } from 'react-icons/fi';
import CountdownTimer from './CountdownTimer';

const InterviewAgent = ({ callStatus, aiText, speaking, onVapiStop, onVapiCall, interviewName, timer }) => {
    const [timerOn,setTimerOn] = useState(false)
    useEffect(()=>{
        if(aiText?.trim() != '' && !timerOn){
            setTimerOn(true)
        }
    },[aiText])
    useEffect(()=>{
        onVapiCall()
    },[])
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Timer */}
                <div className="flex justify-end mb-6">
                    {
                        timerOn && (

                            <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-white/20">
                                <CountdownTimer timer={timer} />
                            </div>
                        )
                    }
                </div>

                {/* Title */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl border border-white/20 mb-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
                        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                            AI Mock Interview
                            {interviewName?.charAt(0).toUpperCase() + interviewName?.slice(1) || 'Interview Session'}
                        </h1>
                    </div>
                    <p className="text-lg text-slate-600 font-medium">
                    </p>
                </div>

                {/* Main Interview Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-8 max-w-5xl mx-auto">
                    {/* AI Interviewer Card */}
                    <div className={`relative group transition-all duration-500 ${speaking === 'assistant' ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity blur"></div>
                        <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 h-full">
                            <div className="flex flex-col items-center text-center space-y-6">
                                {/* AI Avatar */}
                                <div className="relative">
                                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
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
                                    <h3 className="text-2xl font-bold text-slate-800">AI Interviewer</h3>
                                    <p className="text-slate-600 max-w-xs leading-relaxed">
                                        Ready to evaluate your skills and provide valuable feedback
                                    </p>
                                </div>

                                {speaking === 'assistant' && (
                                    <div className="flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                                        <span className="text-sm text-blue-700 font-medium ml-2">Speaking...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* User Card */}
                    <div className={`relative group transition-all duration-500 ${speaking === 'user' ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity blur"></div>
                        <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 h-full">
                            <div className="flex flex-col items-center text-center space-y-6">
                                {/* User Avatar */}
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/50">
                                        <img
                                            src={userAvatar}
                                            alt="User Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {speaking === 'user' && (
                                        <>
                                            <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping"></div>
                                            <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-pulse"></div>
                                        </>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-slate-800">Balaji</h3>
                                    <p className="text-slate-600 max-w-xs leading-relaxed">
                                        Prepared and confident, ready to showcase my abilities
                                    </p>
                                </div>

                                {speaking === 'user' && (
                                    <div className="flex items-center gap-2 bg-emerald-50 rounded-full px-4 py-2">
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                                        <span className="text-sm text-emerald-700 font-medium">You're speaking...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Response Section */}
                {aiText && (
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                    <FiMessageSquare className="text-white text-lg" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-slate-800 mb-2">AI Interviewer</h4>
                                    <p className={cn(
                                        'text-slate-700 leading-relaxed transition-all duration-700',
                                        'animate-fadeIn opacity-100'
                                    )}>
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