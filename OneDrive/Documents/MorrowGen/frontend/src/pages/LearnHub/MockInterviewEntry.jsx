import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InterviewAgent from '../../components/learnhub/InterviewAgent';
import useFormInterviewStore from '../../zustand/mockInterviewStore/useFormInterviewStore';
import { vapi } from '../../lib/vapi';
import RefreshModal from '../../card/learnhubCards/RefreshModal';
import useBlockRefresh from '../../hooks/useBlockRefresh';
import useInterviewEffects from '../../hooks/useInterviewEffects';
import axiosInstance from '../../utils/axiosInstance';
import useAuthStore from '../../zustand/auth/useAuthStore';
import checkAudioPermission from '../../utils/checkAudioPermission';

const MockInterviewEntry = () => {
  const { sessionId, action, domainName, interviewType } = useParams();

  const { interviewData } = useFormInterviewStore();
  console.log("interview Dtaa", interviewData);
  const [domain, setDomain] = useState(domainName)
  const [interviewOngoing, setInterviewOngoing] = useState(false);
  const [interviewQuestions, setInterviewQuestions] = useState(interviewData);
  const [timer, setTimer] = useState(0)
  useEffect(() => {
    const fetchInterviewData = async () => {
      if (interviewData?.question?.length > 0) return;
      try {
        const res = await axiosInstance.get(`/interview/session/${sessionId}`);
        const extractQuestions = res.data?.questions?.map((item) => item.questionText);
        console.log("res data from uestion", extractQuestions);
        setInterviewQuestions(extractQuestions);
        setDomain(res.data?.domain || domainName)
        setTimer(res.data?.timer)
      } catch (error) {

      }
    }
    fetchInterviewData()
  }, [sessionId, interviewData]);

  const [aiText, setAiText] = useState('');
  const candidateAnswers = [];
  const [showRefreshModal, setShowRefreshModal] = useState(false);
  const [speaking, setSpeaking] = useState(null);
  const [callStatus, setCallStatus] = useState('idle');
  const timerRef = useRef(null);
  const isInterviewRunning = useRef(false);

  const navigate = useNavigate();
  useBlockRefresh(setShowRefreshModal);

  console.log(interviewData.question)

  const questions =
    interviewQuestions && Array.isArray(interviewQuestions)
      ? interviewQuestions?.join("\n")
      : "";
  const { authUser } = useAuthStore()
  const [vapiFormAssistant, setVapiFormAssistant] = useState(null);
  const [vapiResumeAssistant, setVapiResumeAssistant] = useState(null);

  const startInterview = async () => {
    if (questions?.length === 0 || callStatus === "ACTIVE") return;

    const hasMic = await checkAudioPermission();
    if (!hasMic) return;
    let assistantOptions = vapiFormAssistant !== null ? vapiFormAssistant : vapiResumeAssistant;

    try {
      isInterviewRunning.current = true;
      await vapi.start(assistantOptions);
      setCallStatus("ACTIVE");
    } catch (err) {
      console.error("Error starting vapi:", err);
      setCallStatus("ERROR");
      isInterviewRunning.current = false;
    }
  };
  useInterviewEffects({
    questions,
    setVapiFormAssistant,
    setVapiResumeAssistant,
    callStatus,
    domainName: domain,
    userName: authUser?.username,
    setCallStatus,
    setAiText,
    setSpeaking,
    startInterview,
    isInterviewRunning,
    mode: interviewType,
    candidateAnswers,
  });


  const handleConfirmRefresh = () => {
    vapi.stop();
    setShowRefreshModal(false);
    navigate('/learnhub/mock-interview');
  };

  const handleCancel = () => {
    setShowRefreshModal(false);
  };






  const handleCallVapi = () => {
    startInterview();
  };

  //   const startInterview = async () => {
  // setInterviewOngoing(true);
  //   vapi.start();
  //   // Set start time in backend if not already
  //   // await axiosInstance.patch(`/interview/session/${sessionId}/start`);
  //   // Start timer interval
  //   // timerRef.current = setInterval(async () => {
  //   //   setTimer(prev => prev + 1);
  //   //   await axiosInstance.patch(`/interview/session/${sessionId}/update-timer`, {
  //   //     timeSpent: timer + 1
  //   //   });
  //   // }, 1000);
  // };


  const stopInterview = async () => {
    setInterviewOngoing(false);
    vapi.stop();
    setCallStatus('INACTIVE');
    clearInterval(timerRef.current);
    // Save final timeSpent and mark completed
    await axiosInstance.patch(`/interview/session/${sessionId}/complete`, {
      timeSpent: timer
    });
  };

  // Frontend example (React)
  useEffect(() => {
    if (interviewOngoing) {
      const interval = setInterval(async () => {
        await axiosInstance.patch(`/interview/${sessionId}/update-timer`, {
          method: "PATCH",
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="w-full bg-backGray">
      {showRefreshModal && (
        <RefreshModal
          onConfirm={handleConfirmRefresh}
          onCancel={handleCancel}
          message={`If you refresh the page, you'll be redirected to   the previous page.`}
        />
      )}

      <div className="z-20 px-2 bg-backGray">
        <InterviewAgent
          username={authUser.username}
          interviewName={domainName}
          userId="user1"
          type="generate"
          timer={timer}
          onVapiStop={stopInterview}
          aiText={aiText}
          callStatus={callStatus}
          speaking={speaking}
          onVapiCall={handleCallVapi}
        />
      </div>
    </div>
  );
};

export default MockInterviewEntry;
