import React, { useState } from "react";
import MockInterviewOptions from "../../components/learnhub/MockInterviewOptions";
import MockInterviewCard from '../../components/learnhub/MockInterviewCard';
import UnattemptedMockInterviewCard from '../../components/learnhub/UnattemptedMockInterviewCard';
import useThemeStore from "../../zustand/themeStore";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect } from "react";
import { MdAssignment, MdAddCircleOutline } from 'react-icons/md';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { HiOutlineClipboardList } from 'react-icons/hi';
import MockInterviewCardSkeleton from "../../card/learnhubCards/MockInterviewCardSkeleton";
import { ArrowLeftSquare } from "lucide-react";

const MockInterviewPage = () => {
  const { mode } = useThemeStore(); // dark or light mode
  const [newMockInterviewFormOpen, setNewMockInterviewFormOpen] = useState(false);
  const [resumeMockInterviewOpen, setResumeMockInterviewOpen] = useState(false);

  // Dynamic colors for theme
  const bgPrimary = mode === "dark" ? "bg-[#122325]" : "bg-white";
  const bgPage = mode === "dark" ? "bg-[#0d1718]" : "bg-backgray";
  const bgSecondary = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const textPrimary = mode === "dark" ? "text-gray-100" : "text-gray-800";
  const textSecondary = mode === "dark" ? "text-gray-300" : "text-gray-700";
  const divider = mode === "dark" ? "bg-gray-700" : "bg-gray-200";
  const navBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const iconColor = mode === 'dark' ? 'text-gray-500' : 'text-gray-400';
  const borderColor = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';

  const [reccommendedMock, setRecommendedMock] = useState([])
  const [yourMock, setYourMock] = useState([])
  const [loadingObj, setLoadingObj] = useState({
    recommendMockLoading: false,
    yourMockLoading: false,
  })
  const fetchRecommededMocks = async () => {
    try {
      setLoadingObj(prev => ({ ...prev, recommendMockLoading: true }))
      const res = await axiosInstance.get('/interview/recommended-mocks');
      console.log("get Reccommended Mocks : ", res.data)
      setRecommendedMock(res.data.data);
      setLoadingObj(prev => ({ ...prev, recommendMockLoading: false }))
    } catch (error) {

    }
  }
  const fetchYourMocks = async () => {
    try {
      setLoadingObj(prev => ({ ...prev, yourMockLoading: true }))
      const res = await axiosInstance.get('/interview/your-mocks');
      console.log("get Reccommended Mocks : ", res.data)
      setYourMock(res.data.data);
      setLoadingObj(prev => ({ ...prev, yourMockLoading: false }))
    } catch (error) {

    }
  }

  const speak = (text = "Browser does not support voice input.") => {
    if (!window.speechSynthesis) {
      console.warn("SpeechSynthesis not supported.");
      return;
    }
    if (!text) return;

    console.log("Speaking text:", text);
    // Convert non-string values to readable string
    if (typeof text !== "string") {
      text = JSON.stringify(text);
    }

    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95; // speed
    utter.pitch = 1;   // tone
    utter.volume = 1;  // 0 to 1

    // Optional: choose a voice (browser auto picks if not found)
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find(v => v.name.includes("Google UK English Female")) ||
      voices[0];

    if (preferredVoice) {
      utter.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utter);
  };


  useEffect(() => {
    fetchRecommededMocks()
    fetchYourMocks()
  }, [])
  return (
    <div className={`min-h-screen w-full transition-all  duration-300 `}>
      <div className=" mx-auto w-full p-4 md:p-8">
        {/* Hero Section */}
        <div className={`${navBg} rounded-2xl p-8 mb-10 shadow-lg transition-all`}>
          <div className="flex items-start gap-5">
            <div className={`${navBg} bg-opacity-20 p-3 rounded-xl`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-7 h-7  ${mode == 'dark' ? 'text-white' : 'text-gray-800'}`}
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
              <h1 className={`text-2xl font-bold ${mode == 'dark' ? 'text-white' : 'text-gray-800'} mb-2`}>
                Ready for Your Mock Interview?
              </h1>
              <p className={`${mode == 'dark' ? 'text-white' : 'text-gray-800'} opacity-90 text-base leading-relaxed max-w-3xl`}>
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
        {/* Unattempted Interviews */}
        {/* <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-[#00B2A9] rounded-full"></div>
            <h2 className={`text-xl font-semibold ${textPrimary}`}>
              Take an Interview
            </h2>
            <div className={`flex-1 h-px ${divider}`}></div>
          </div>
          <UnattemptedMockInterviewCard />
        </section> */}
        {/* Attempted Interviews */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-[#0097B2] rounded-full"></div>
            <h2 className={`text-xl font-semibold ${textPrimary}`}>Your Interviews</h2>
            <div className={`flex-1 h-px ${divider}`}></div>
          </div>
          {
            loadingObj.yourMockLoading ? (
              <div className={`mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-3 max-w-6xl `}>
                {
                  Array(3).fill(0).map((_, index) => (
                    <MockInterviewCardSkeleton key={index} mode={mode} />
                  ))
                }
              </div>
            ) : yourMock.length === 0 ? (
              <div className={`flex items-center justify-center min-h-[400px]  rounded-xl`}>
                <div className={`text-center p-8 max-w-md`}>
                  {/* Icon Section */}
                  <div className="relative inline-block mb-6">
                    <div className={`w-24 h-24 rounded-full ${bgSecondary} border-2 ${borderColor} flex items-center justify-center mx-auto`}>
                      <MdAssignment className={`text-5xl ${iconColor}`} />
                    </div>
                    {/* Decorative floating icons */}
                    <IoDocumentTextOutline
                      className={`absolute -top-2 -right-2 text-2xl ${iconColor} animate-bounce`}
                      style={{ animationDelay: '0.2s' }}
                    />
                    <HiOutlineClipboardList
                      className={`absolute -bottom-2 -left-2 text-2xl ${iconColor} animate-bounce`}
                      style={{ animationDelay: '0.4s' }}
                    />
                  </div>

                  {/* Text Content */}
                  <h3 className={`text-2xl font-bold ${textPrimary} mb-3`}>
                    No Mock Interviews Yet
                  </h3>
                  <p className={`text-base ${textSecondary} mb-6 leading-relaxed`}>
                    Get started by creating your first mock interview. Choose between a resume-based or form-based interview to practice and improve your skills.
                  </p>

                  {/* Action Button */}


                  {/* Additional Info */}

                </div>
              </div>
            ) : (
              <div className={`mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-3 max-w-6xl `}>
                {
                  yourMock.length > 0 && yourMock.map((mock, index) => (
                    <MockInterviewCard key={index} mocks={mock} />
                  ))
                }
              </div>

            )
          }
        </section>


      </div>
    </div>
  );
};

export default MockInterviewPage;
