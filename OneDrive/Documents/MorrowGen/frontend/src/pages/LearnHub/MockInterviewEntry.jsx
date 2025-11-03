import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InterviewAgent from '../../components/learnhub/InterviewAgent';
import useFormInterviewStore from '../../zustand/mockInterviewStore/useFormInterviewStore';
import { vapi } from '../../lib/vapi';
import RefreshModal from '../../card/learnhubCards/RefreshModal';
import useBlockRefresh from '../../hooks/useBlockRefresh';
import useInterviewEffects from '../../hooks/useInterviewEffects';

const MockInterviewEntry = () => {
  const { interviewName } = useParams();

  const { interviewData } = useFormInterviewStore();
  console.log("interview Dtaa",interviewData);
  

  const [aiText, setAiText] = useState('');
  const candidateAnswers = [];
  const [showRefreshModal, setShowRefreshModal] = useState(false);
  const [speaking, setSpeaking] = useState(null);
  const [callStatus, setCallStatus] = useState('idle');

  const navigate = useNavigate();
  useBlockRefresh(setShowRefreshModal);

  console.log(interviewData.question)

  const questions =
    interviewData && Array.isArray(interviewData.question)
      ? interviewData.question.join("\n")
      : "";
  useInterviewEffects({
    questions,
    callStatus,
    interviewData,
    setCallStatus,
    setAiText,
    setSpeaking,
    mode: interviewName,
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

  const handleStopVapi = () => {
    vapi.stop();
    setCallStatus('INACTIVE');
  };

  const startInterview = ()=>{
    vapi.start()
  }
  const handleCallVapi = () => {
    startInterview();
  };


  return (
    <div className="w-full">
      {showRefreshModal && (
        <RefreshModal
          onConfirm={handleConfirmRefresh}
          onCancel={handleCancel}
          message={`If you refresh the page, you'll be redirected to   the previous page.`}
        />
      )}

      <div className="z-20 px-2">
        <InterviewAgent
          username="Balaji"
          interviewName={interviewName}
          userId="user1"
          type="generate"
          timer={interviewData?.candidateData?.timer}
          onVapiStop={handleStopVapi}
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
