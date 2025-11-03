import React, { useEffect, useState } from 'react';
import MockInterviewOptions from '../../components/learnhub/MockInterviewOptions';
import AttemptedMockInterviewCard from '../../components/learnhub/AttemptedMockInterviewCard ';
import UnattemptedMockInterviewCard from '../../components/learnhub/UnattemptedMockInterviewCard';

const MockInterviewPage = () => {
    return (
        <div className='min-h-screen bg-white'>
            <div className="max-w-8xl mx-auto p-8">
                {/* Clean Hero Section */}
                <div className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] rounded-2xl p-8 mb-8 shadow-lg">
                    <div className="flex items-start gap-4">
                        <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-black\" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M17 8a4 4 0 11-8 0 4 4 0 018 0zM3 20c0-2.5 3-4 6-4s6 1.5 6 4M21 20v-2a3 3 0 00-3-3h-2" />
                            </svg>

                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-2">
                                Ready for Your Mock Interview?
                            </h1>
                            <p className="text-white opacity-90 text-base leading-relaxed max-w-3xl">
                                Sharpen your skills with realistic interview practice and get expert feedback. Prepare yourself to ace your next job opportunity confidently.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mock Interview Options */}
                <div className="mb-8">
                    <MockInterviewOptions />
                </div>

                {/* Your Interviews Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-6 bg-[#0097B2] rounded-full"></div>
                        <h2 className='text-xl font-semibold text-gray-800'>
                            Your Interviews
                        </h2>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>
                    <AttemptedMockInterviewCard />
                </div>

                {/* Take Interview Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-6 bg-[#00B2A9] rounded-full"></div>
                        <h2 className='text-xl font-semibold text-gray-800'>
                            Take an Interview
                        </h2>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>
                    <UnattemptedMockInterviewCard />
                </div>
            </div>
        </div>
    );
};

export default MockInterviewPage;
