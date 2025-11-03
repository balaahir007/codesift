import React, { useState, useRef } from 'react';

const MockInterviewWithOpenSource = () => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioURL = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioURL);
        audio.play();
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="mt-20">
      <h2 className="text-xl font-bold mb-2">🎙️ AI Voice Interview</h2>
      <div className="flex gap-4">
        <button onClick={startRecording} disabled={recording} className="px-4 py-2 bg-green-500 text-white rounded">
          Start Recording
        </button>
        <button onClick={stopRecording} disabled={!recording} className="px-4 py-2 bg-red-500 text-white rounded">
          Stop Recording
        </button> 
      </div>
    </div>
  );
};

export default MockInterviewWithOpenSource;
