import React, { useState } from "react";
import MockInterviewOptions from "../../components/learnhub/MockInterviewOptions";
import AttemptedMockInterviewCard from '../../components/learnhub/AttemptedMockInterviewCard'; 
import UnattemptedMockInterviewCard from '../../components/learnhub/UnattemptedMockInterviewCard';
import useThemeStore from "../../zustand/themeStore";

const MockInterviewPage = () => {
  const { mode } = useThemeStore(); // dark or light mode
  const [newMockInterviewFormOpen, setNewMockInterviewFormOpen] = useState(false);
  const [resumeMockInterviewOpen, setResumeMockInterviewOpen] = useState(false);

  // Dynamic colors for theme
  const bgPrimary = mode === "dark" ? "bg-[#122325]" : "bg-white";
  const bgPage = mode === "dark" ? "bg-[#0d1718]" : "bg-backgray";
  const textPrimary = mode === "dark" ? "text-gray-100" : "text-gray-800";
  const textSecondary = mode === "dark" ? "text-gray-300" : "text-gray-700";
  const divider = mode === "dark" ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className={`min-h-screen transition-all duration-300 `}>
      <div className="max-w-7xl mx-auto p-8">
        {/* Hero Section */}
        <div className={`${bgPrimary} rounded-2xl p-8 mb-10 shadow-lg transition-all`}>
          <div className="flex items-start gap-5">
            <div className="bg-backGray bg-opacity-20 p-3 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-7 h-7  ${mode =='dark' ? 'text-white' : 'text-gray-800'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8a4 4 0 11-8 0 4 4 0 018 0zM3 20c0-2.5 3-4 6-4s6 1.5 6 4M21 20v-2a3 3 0 00-3-3h-2"
                />
              </svg>
            </div>

            <div>
              <h1 className={`text-2xl font-bold ${mode =='dark' ? 'text-white' : 'text-gray-800'} mb-2`}>
                Ready for Your Mock Interview?
              </h1>
              <p className={`${mode =='dark' ? 'text-white' : 'text-gray-800'} opacity-90 text-base leading-relaxed max-w-3xl`}>
                Sharpen your skills with realistic interview practice and get expert
                feedback. Prepare yourself to ace your next job opportunity confidently.
              </p>
            </div>
          </div>
        </div>

        {/* Mock Interview Options */}
        <div className="mb-10">
          <MockInterviewOptions />
        </div>

        {/* Attempted Interviews */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-[#0097B2] rounded-full"></div>
            <h2 className={`text-xl font-semibold ${textPrimary}`}>Your Interviews</h2>
            <div className={`flex-1 h-px ${divider}`}></div>
          </div>
          <AttemptedMockInterviewCard />
        </section>

        {/* Unattempted Interviews */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-[#00B2A9] rounded-full"></div>
            <h2 className={`text-xl font-semibold ${textPrimary}`}>
              Take an Interview
            </h2>
            <div className={`flex-1 h-px ${divider}`}></div>
          </div>
          <UnattemptedMockInterviewCard />
        </section>
      </div>
    </div>
  );
};

export default MockInterviewPage;
