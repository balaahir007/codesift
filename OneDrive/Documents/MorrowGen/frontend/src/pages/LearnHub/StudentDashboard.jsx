import React, { useState } from 'react';
import { Calendar, Target, TrendingUp, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import LearningStats from '../../components/learnhub/LearningStats';

const StudentDashboard = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('week');
    const [currentWeek, setCurrentWeek] = useState(0);

    // Sample data - replace with real data
    const weeklyData = [
        {
            week: 'Week 1',
            currentScore: 75,
            targetScore: 85,
            subjects: [
                { name: 'Mathematics', current: 78, target: 90 },
                { name: 'Physics', current: 72, target: 80 },
                { name: 'Chemistry', current: 75, target: 85 }
            ]
        },
        {
            week: 'Week 2',
            currentScore: 82,
            targetScore: 90,
            subjects: [
                { name: 'Mathematics', current: 85, target: 90 },
                { name: 'Physics', current: 79, target: 80 },
                { name: 'Chemistry', current: 82, target: 85 }
            ]
        },
        {
            week: 'Week 3',
            currentScore: 88,
            targetScore: 95,
            subjects: [
                { name: 'Mathematics', current: 92, target: 90 },
                { name: 'Physics', current: 84, target: 80 },
                { name: 'Chemistry', current: 88, target: 85 }
            ]
        }
    ];

    const monthlyData = {
        month: 'October 2025',
        currentScore: 82,
        targetScore: 90,
        weeklyProgress: [75, 82, 88, 85],
        subjects: [
            { name: 'Mathematics', current: 85, target: 90 },
            { name: 'Physics', current: 78, target: 85 },
            { name: 'Chemistry', current: 82, target: 88 },
            { name: 'Biology', current: 80, target: 85 }
        ]
    };

    const currentData = selectedPeriod === 'week' ? weeklyData[currentWeek] : monthlyData;

    const getProgressColor = (current, target) => {
        const percentage = (current / target) * 100;
        if (percentage >= 100) return 'text-green-600';
        if (percentage >= 80) return 'text-[#00B2A9]';
        if (percentage >= 60) return 'text-[#0097B2]';
        return 'text-orange-500';
    };

    const getProgressBg = (current, target) => {
        const percentage = (current / target) * 100;
        if (percentage >= 100) return 'bg-green-500';
        if (percentage >= 80) return 'bg-[#00B2A9]';
        if (percentage >= 60) return 'bg-[#0097B2]';
        return 'bg-orange-500';
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-8xl mx-auto p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
                    <p className="text-gray-600">Track your progress and achieve your goals</p>
                </div>

                {/* Period Selector */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setSelectedPeriod('week')}
                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${selectedPeriod === 'week'
                            ? 'bg-[#0097B2] text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        Weekly View
                    </button>
                    <button
                        onClick={() => setSelectedPeriod('month')}
                        className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${selectedPeriod === 'month'
                            ? 'bg-[#0097B2] text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        Monthly View
                    </button>
                </div>

                {/* Week Navigation (only for weekly view) */}
                {selectedPeriod === 'week' && (
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
                            disabled={currentWeek === 0}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#0097B2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Previous
                        </button>

                        <h2 className="text-xl font-semibold text-gray-800">
                            {currentData.week || currentData.month}
                        </h2>

                        <button
                            onClick={() => setCurrentWeek(Math.min(weeklyData.length - 1, currentWeek + 1))}
                            disabled={currentWeek === weeklyData.length - 1}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#0097B2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Overall Progress Card */}
                <div className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] rounded-2xl p-6 mb-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold">Overall Progress</h3>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold">{currentData.currentScore}%</div>
                            <div className="text-sm opacity-90">Target: {currentData.targetScore}%</div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-white bg-opacity-20 rounded-full h-3 mb-4">
                        <div
                            className="bg-white rounded-full h-3 transition-all duration-500"
                            style={{ width: `${Math.min((currentData.currentScore / currentData.targetScore) * 100, 100)}%` }}
                        ></div>
                    </div>

                    <div className="flex justify-between text-sm opacity-90">
                        <span>Current: {currentData.currentScore}%</span>
                        <span>{Math.round((currentData.currentScore / currentData.targetScore) * 100)}% of target achieved</span>
                    </div>
                </div>

                <LearningStats />
                {/* Subject Progress */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-6 bg-[#0097B2] rounded-full"></div>
                        <h3 className="text-xl font-semibold text-gray-800">Subject Performance</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentData.subjects.map((subject, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-gray-800">{subject.name}</h4>
                                    <span className={`text-sm font-medium ${getProgressColor(subject.current, subject.target)}`}>
                                        {subject.current}%
                                    </span>
                                </div>

                                <div className="mb-3">
                                    <div className="bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`rounded-full h-2 transition-all duration-500 ${getProgressBg(subject.current, subject.target)}`}
                                            style={{ width: `${Math.min((subject.current / subject.target) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="flex justify-between text-xs text-gray-600">
                                    <span>Target: {subject.target}%</span>
                                    <span>
                                        {subject.current >= subject.target ?
                                            <span className="text-green-600 font-medium">✓ Achieved</span> :
                                            <span>{subject.target - subject.current}% to go</span>
                                        }
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Monthly Progress Chart (only for monthly view) */}
                {selectedPeriod === 'month' && (
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-1 h-6 bg-[#00B2A9] rounded-full"></div>
                            <h3 className="text-xl font-semibold text-gray-800">Weekly Progress</h3>
                        </div>

                        <div className="flex items-end gap-4 h-32">
                            {monthlyData.weeklyProgress.map((score, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center">
                                    <div className="w-full bg-gray-200 rounded-t-lg relative overflow-hidden" style={{ height: '100px' }}>
                                        <div
                                            className="bg-gradient-to-t from-[#0097B2] to-[#00B2A9] rounded-t-lg transition-all duration-700 absolute bottom-0 w-full"
                                            style={{ height: `${score}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-sm font-medium text-gray-600 mt-2">Week {index + 1}</div>
                                    <div className="text-xs text-gray-500">{score}%</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
                        <div className="bg-[#E0F2F5] p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-[#0097B2]" />
                        </div>
                        <div className="text-2xl font-bold text-gray-800 mb-1">
                            {selectedPeriod === 'week' ? '+7%' : '+12%'}
                        </div>
                        <div className="text-sm text-gray-600">Improvement</div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
                        <div className="bg-[#E0F2F5] p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                            <Award className="w-6 h-6 text-[#00B2A9]" />
                        </div>
                        <div className="text-2xl font-bold text-gray-800 mb-1">
                            {currentData.subjects.filter(s => s.current >= s.target).length}
                        </div>
                        <div className="text-sm text-gray-600">Goals Achieved</div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
                        <div className="bg-[#E0F2F5] p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-[#0097B2]" />
                        </div>
                        <div className="text-2xl font-bold text-gray-800 mb-1">
                            {selectedPeriod === 'week' ? '7' : '30'}
                        </div>
                        <div className="text-sm text-gray-600">Days Tracked</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;