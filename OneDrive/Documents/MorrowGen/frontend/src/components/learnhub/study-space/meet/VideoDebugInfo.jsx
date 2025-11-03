// Debug component to help troubleshoot video display issues
import React from 'react';

export default function VideoDebugInfo({ 
  localStream, 
  isVideoEnabled, 
  isAudioEnabled, 
  isInitialized,
  user 
}) {
  if (!localStream) {
    return null;
  }

  const videoTracks = localStream.getVideoTracks();
  const audioTracks = localStream.getAudioTracks();

  return (
    <div className="fixed top-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded z-50 text-xs">
      <div><strong>Debug Info:</strong></div>
      <div>User: {user?.name || 'Unknown'}</div>
      <div>Initialized: {isInitialized ? 'Yes' : 'No'}</div>
      <div>Video Enabled: {isVideoEnabled ? 'Yes' : 'No'}</div>
      <div>Audio Enabled: {isAudioEnabled ? 'Yes' : 'No'}</div>
      <div>Video Tracks: {videoTracks.length}</div>
      <div>Audio Tracks: {audioTracks.length}</div>
      {videoTracks.length > 0 && (
        <div>Video Track Enabled: {videoTracks[0].enabled ? 'Yes' : 'No'}</div>
      )}
      {audioTracks.length > 0 && (
        <div>Audio Track Enabled: {audioTracks[0].enabled ? 'Yes' : 'No'}</div>
      )}
      <div>Stream ID: {localStream.id}</div>
    </div>
  );
}
