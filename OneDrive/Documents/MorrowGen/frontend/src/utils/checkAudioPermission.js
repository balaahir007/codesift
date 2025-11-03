const checkAudioPermission = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    return true;
  } catch {
    alert('Microphone permission is required to start the interview.');
    return false;
  }
};

export default checkAudioPermission