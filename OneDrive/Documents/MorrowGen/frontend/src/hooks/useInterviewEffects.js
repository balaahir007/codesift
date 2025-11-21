import { useEffect, useRef } from "react";
import { vapi } from "../lib/vapi.js";
import checkAudioPermission from "../utils/checkAudioPermission";
import vapiFormAssistantConfiguration from "../utils/vapiFormAssistantConfiguration";
import vapiResumeAssistantConfiguration from "../utils/vapiResumeAssistantConfiguration";

const FINAL_MESSAGE =
  "That's the end of our interview. Thanks for chatting! Keep building your skills!";

const useInterviewEffects = ({
  questions,
  callStatus,
  userName,
  domainName,
  startInterview,
  mode,
  setVapiResumeAssistant,
  setVapiFormAssistant,
  setCallStatus,
  setAiText,
  setSpeaking,
  candidateAnswers,
  isInterviewRunning,
}) => {
  const speakingTimeout = useRef(null);

  console.log("config", typeof questions);

  const initInterview = async () => {
    if (mode === "resume") {
      setVapiFormAssistant(
        vapiResumeAssistantConfiguration(questions, userName)
      );
    } else {
      setVapiResumeAssistant(
        vapiFormAssistantConfiguration(domainName, userName, questions)
      );
    }

    try {
      startInterview();
    } catch (err) {
      console.error("Error starting vapi:", err);
      setCallStatus("ERROR");
      isInterviewRunning.current = false;
    }
  };

  useEffect(() => {
    if (questions?.length === 0 || callStatus === "ACTIVE") return;
    initInterview();
  }, [questions, callStatus]);

  useEffect(() => {
    const onMessage = (msg) => {
      const content = msg.transcript || msg.text || "";
      if (!content) return;

      if (msg.role === "assistant") {
        setAiText(content);
        setSpeaking("assistant");
        clearTimeout(speakingTimeout.current);
        speakingTimeout.current = setTimeout(() => setSpeaking(null), 2000);

        if (content.toLowerCase().includes(FINAL_MESSAGE.toLowerCase())) {
          setTimeout(() => {
            vapi.stop();
            setCallStatus("FINISHED");
            isInterviewRunning.current = false;
          }, 2500);
        }
      } else if (msg.role === "user") {
        candidateAnswers.push(content);
        setSpeaking("user");
        clearTimeout(speakingTimeout.current);
        speakingTimeout.current = setTimeout(() => setSpeaking(null), 2000);
      }
    };

    const onCallStatus = () => {
      const status = vapi.call?.status;
      if (status) setCallStatus(status);
    };

    vapi.on("message", onMessage);
    vapi.on("conversationEnd", () => {
      setCallStatus("FINISHED");
      isInterviewRunning.current = false;
    });
    onCallStatus();

    return () => {
      vapi.off("message", onMessage);
      clearTimeout(speakingTimeout.current);
      if (isInterviewRunning.current) {
        vapi.stop()?.then(() => {
          isInterviewRunning.current = false;
          setCallStatus("INACTIVE");
        });
      }
    };
  }, []);

  useEffect(() => {
    const onSpeechStart = (e) => {
      const speaker = e?.speaker?.toLowerCase();
      setSpeaking(
        speaker === "assistant" || speaker === "ai"
          ? "assistant"
          : speaker === "user" || speaker === "human"
          ? "user"
          : null
      );
    };

    const onSpeechEnd = (e) => {
      const speaker = e?.speaker?.toLowerCase();
      if (
        speaker === "assistant" ||
        speaker === "ai" ||
        speaker === "user" ||
        speaker === "human"
      ) {
        setSpeaking(null);
      }
    };

    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, [setSpeaking]);
};

export default useInterviewEffects;
