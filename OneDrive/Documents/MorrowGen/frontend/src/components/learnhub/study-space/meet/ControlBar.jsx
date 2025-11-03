// Fixed ControlBar component with proper async handling
import React, { useState, useCallback } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorX,
  Phone,
  Users,
  MoreVertical,
  Loader2
} from 'lucide-react';
import theme from '../../../../constants/theme';

export default function ControlBar({
  micOn,
  camOn,
  shareOn,
  captionsOn,
  openPanel,
  setOpenPanel,
  leave,
  toggleAudio,
  toggleVideo,
  startScreenShare,
  stopScreenShare,
  setCaptionsOn,
  isLoading = false
}) {
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isScreenShareLoading, setIsScreenShareLoading] = useState(false);

  const handleMicToggle = useCallback(async () => {
    if (!toggleAudio || isAudioLoading || isLoading) {
      console.warn('⚠️ toggleAudio function not provided or already loading');
      return;
    }

    try {
      setIsAudioLoading(true);
      console.log('🎤 Toggling microphone...');
      
      const result = await toggleAudio();
      console.log('✅ Microphone toggled:', result ? 'ON' : 'OFF');
    } catch (error) {
      console.error('❌ Failed to toggle microphone:', error);
    } finally {
      setIsAudioLoading(false);
    }
  }, [toggleAudio, isAudioLoading, isLoading]);

  const handleCamToggle = useCallback(async () => {
    if (!toggleVideo || isVideoLoading || isLoading) {
      console.warn('⚠️ toggleVideo function not provided or already loading');
      return;
    }

    try {
      setIsVideoLoading(true);
      console.log('📹 Toggling camera...');
      
      const result = await toggleVideo();
      console.log('✅ Camera toggled:', result ? 'ON' : 'OFF');
    } catch (error) {
      console.error('❌ Failed to toggle camera:', error);
    } finally {
      setIsVideoLoading(false);
    }
  }, [toggleVideo, isVideoLoading, isLoading]);

  const handleScreenShare = useCallback(async () => {
    if (isScreenShareLoading || isLoading) {
      console.warn('⚠️ Screen share already in progress');
      return;
    }

    try {
      setIsScreenShareLoading(true);
      
      if (!shareOn) {
        console.log('🖥️ Starting screen share...');
        
        if (startScreenShare) {
          await startScreenShare();
          console.log('✅ Screen sharing started');
        } else {
          console.warn('⚠️ startScreenShare function not provided');
        }
      } else {
        console.log('🖥️ Stopping screen share...');
        
        if (stopScreenShare) {
          await stopScreenShare();
          console.log('✅ Screen sharing stopped');
        } else {
          console.warn('⚠️ stopScreenShare function not provided');
        }
      }
    } catch (error) {
      console.error('❌ Failed to toggle screen sharing:', error);
    } finally {
      setIsScreenShareLoading(false);
    }
  }, [shareOn, startScreenShare, stopScreenShare, isScreenShareLoading, isLoading]);

  const handleLeaveCall = useCallback(() => {
    console.log('📞 Leaving call...');
    if (leave) {
      leave();
    } else {
      console.warn('⚠️ leave function not provided');
    }
  }, [leave]);

  const controlButtonClass = (isActive, isDestructive = false, isDisabled = false) => {
    const baseClass = "h-10 w-10 rounded-full flex items-center justify-center transition-all duration-200 text-sm";
    if (isDisabled) return `${baseClass} bg-gray-100 text-gray-400 cursor-not-allowed`;
    if (isDestructive) return `${baseClass} bg-red-500 hover:bg-red-600 text-white`;
    if (isActive) return `${baseClass} bg-blue-600 text-white hover:bg-blue-700`;
    return `${baseClass} bg-gray-100 text-gray-700 hover:bg-gray-200`;
  };

  const panelButtonClass = (isActive) => {
    const baseClass = "h-10 w-10 rounded-full flex items-center justify-center transition-all duration-200";
    return isActive
      ? `${baseClass} bg-blue-600 text-white hover:bg-blue-700`
      : `${baseClass} bg-gray-100 text-gray-700 hover:bg-gray-200`;
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-200">
        
        {/* Primary Controls Group */}
        <div className="flex items-center gap-2">
          {/* Audio */}
          <button
            onClick={handleMicToggle}
            disabled={isAudioLoading || isLoading}
            className={controlButtonClass(micOn, false, isAudioLoading || isLoading)}
            title={micOn ? "Mute microphone" : "Unmute microphone"}
            aria-label={micOn ? "Mute microphone" : "Unmute microphone"}
          >
            {isAudioLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : micOn ? (
              <Mic size={18} />
            ) : (
              <MicOff size={18} />
            )}
          </button>

          {/* Video */}
          <button
            onClick={handleCamToggle}
            disabled={isVideoLoading || isLoading}
            className={controlButtonClass(camOn, false, isVideoLoading || isLoading)}
            title={camOn ? "Turn off camera" : "Turn on camera"}
            aria-label={camOn ? "Turn off camera" : "Turn on camera"}
          >
            {isVideoLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : camOn ? (
              <Video size={18} />
            ) : (
              <VideoOff size={18} />
            )}
          </button>

          {/* Screen Share */}
          <button
            onClick={handleScreenShare}
            disabled={isScreenShareLoading || isLoading}
            className={controlButtonClass(shareOn, false, isScreenShareLoading || isLoading)}
            title={shareOn ? "Stop sharing screen" : "Share screen"}
            aria-label={shareOn ? "Stop sharing screen" : "Share screen"}
          >
            {isScreenShareLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : shareOn ? (
              <MonitorX size={18} />
            ) : (
              <Monitor size={18} />
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 mx-3"></div>

        {/* Secondary Controls Group */}
        <div className="flex items-center gap-2">
          {/* People */}
          <button
            onClick={() => setOpenPanel && setOpenPanel(openPanel === "people" ? null : "people")}
            className={panelButtonClass(openPanel === "people")}
            title="Show participants"
            aria-label="Show participants"
          >
            <Users size={18} />
          </button>

          {/* More Options */}
          <button
            onClick={() => console.log('More options')}
            className={panelButtonClass(false)}
            title="More options"
            aria-label="More options"
          >
            <MoreVertical size={18} />
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 mx-3"></div>

        {/* End Call Group */}
        <div className="flex items-center">
          <button
            onClick={handleLeaveCall}
            disabled={isLoading}
            className={controlButtonClass(false, true, isLoading)}
            title="Leave call"
            aria-label="Leave call"
          >
            <Phone size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}