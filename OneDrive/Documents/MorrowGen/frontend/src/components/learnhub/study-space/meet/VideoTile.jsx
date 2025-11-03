// Fixed VideoTile component with Google Meet UI styling
import React, { useEffect, useRef, useState } from 'react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Pin,
  Maximize2,
  Minimize2,
  Wifi
} from 'lucide-react';

export default function VideoTile({
  user,
  isYou,
  pinned,
  camOn,
  micOn,
  onPinToggle,
  volumeMuted,
  onVolumeToggle,
  localStream,
  remoteStream,
}) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [streamError, setStreamError] = useState(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  const stream = isYou ? localStream : remoteStream;

  // Debug logging
  React.useEffect(() => {
    console.log(`🎥 VideoTile Debug - ${isYou ? 'Local' : 'Remote'}:`, {
      hasStream: !!stream,
      camOn,
      micOn,
      streamId: stream?.id,
      videoTracks: stream?.getVideoTracks()?.length || 0,
      audioTracks: stream?.getAudioTracks()?.length || 0,
      user: user?.name
    });
  }, [stream, camOn, micOn, isYou, user?.name]);

  // Handle video stream
  useEffect(() => {
    const v = videoRef.current;

    // If no element or no stream, stop loading state and exit
    if (!v || !stream) {
      setIsVideoLoading(false);
      return;
    }

    let isMounted = true;
    const cleanupFns = [];

    const tryPlay = async () => {
      if (!isMounted || !v) return;
      try {
        await v.play();
        console.log('✅ Video playing for:', user?.name || 'Unknown');
        setStreamError(null);
        setIsVideoLoading(false);
      } catch (err) {
        console.warn('⚠️ Video autoplay prevented:', err);
        // Defer playback until a user interaction happens
        const playOnInteraction = () => {
          v.play().catch(console.warn);
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('touchstart', playOnInteraction);
        };
        document.addEventListener('click', playOnInteraction);
        document.addEventListener('touchstart', playOnInteraction);
        cleanupFns.push(() => {
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('touchstart', playOnInteraction);
        });
        setIsVideoLoading(false);
      }
    };

    const setupVideo = () => {
      setIsVideoLoading(true);
      setStreamError(null);

      // Bind stream to element
      v.srcObject = stream;
      // Keep the <video> element muted for BOTH local and remote to satisfy autoplay policies.
      // Remote audio is handled via the hidden <audio> element below.
      v.muted = true;
      v.playsInline = true;
      v.controls = false;

      const videoTracks = stream.getVideoTracks();

      if (videoTracks && videoTracks.length > 0) {
        // If track is initially muted or paused, attempt play again on unmute
        const track = videoTracks[0];
        const onUnmute = () => {
          tryPlay();
        };
        try {
          track.addEventListener('unmute', onUnmute);
          cleanupFns.push(() => track.removeEventListener('unmute', onUnmute));
        } catch {}

        // Try to play immediately
        tryPlay();
      } else {
        // No video track yet (e.g., remote enabled later via replaceTrack)
        // Wait for addtrack event and then try to play
        const onAddTrack = (e) => {
          if (e?.track?.kind === 'video') {
            console.log('🎥 Remote video track added:', e.track.label || 'unknown');
            v.srcObject = stream;
            tryPlay();
            try { stream.removeEventListener('addtrack', onAddTrack); } catch {}
          }
        };
        try {
          stream.addEventListener('addtrack', onAddTrack);
          cleanupFns.push(() => stream.removeEventListener('addtrack', onAddTrack));
        } catch {}

        // End loading quickly; avatar/overlay will show until cam actually on
        setTimeout(() => {
          if (isMounted) setIsVideoLoading(false);
        }, 400);
      }
    };

    setupVideo();

    return () => {
      isMounted = false;
      cleanupFns.forEach((fn) => {
        try { fn(); } catch {}
      });
    };
  }, [stream, isYou, user?.name, camOn]);


  // Handle audio stream (for remote participants only)
  useEffect(() => {
    if (!audioRef.current || !remoteStream || isYou) {
      return;
    }

    const audioElement = audioRef.current;
    let isMounted = true;

    const setupAudio = async () => {
      try {
        audioElement.srcObject = remoteStream;
        audioElement.muted = !!volumeMuted;
        audioElement.volume = volumeMuted ? 0 : 1;
  
        // If no audio track yet, wait for it to be added (common on slow joins)
        const audioTracks = remoteStream.getAudioTracks();
        if ((audioTracks?.length || 0) === 0) {
          console.log('ℹ️ No remote audio track yet. Waiting for addtrack…');
          const onAddTrack = (e) => {
            if (e?.track?.kind === 'audio') {
              console.log('🎧 Remote audio track added:', e.track.label || 'unknown');
              audioElement.srcObject = remoteStream;
              // attempt playback after audio track arrives
              audioElement.play().then(() => {
                setAudioBlocked(false);
              }).catch((err) => {
                console.warn('⚠️ Audio play after addtrack prevented:', err);
                setAudioBlocked(true);
              });
              remoteStream.removeEventListener('addtrack', onAddTrack);
            }
          };
          remoteStream.addEventListener('addtrack', onAddTrack);
        }
  
        // Play audio
        if (isMounted) {
          try {
            await audioElement.play();
            console.log('✅ Audio playing for:', user?.name || 'Unknown');
            setAudioBlocked(false);
          } catch (playError) {
            console.warn('⚠️ Audio autoplay prevented:', playError);
            // Defer playback until a user interaction happens
            setAudioBlocked(true);
            const playOnInteraction = () => {
              audioElement.play().then(() => {
                setAudioBlocked(false);
              }).catch(console.warn);
              document.removeEventListener('click', playOnInteraction);
              document.removeEventListener('touchstart', playOnInteraction);
              document.removeEventListener('keydown', playOnInteraction);
            };
            document.addEventListener('click', playOnInteraction);
            document.addEventListener('touchstart', playOnInteraction);
            document.addEventListener('keydown', playOnInteraction);
          }
        }
      } catch (error) {
        console.error('❌ Audio setup failed:', error);
      }
    };

    setupAudio();

    return () => {
      isMounted = false;
    };
  }, [remoteStream, volumeMuted, isYou, user?.name]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current && !isYou) {
      audioRef.current.muted = !!volumeMuted;
      audioRef.current.volume = volumeMuted ? 0 : 1;
    }
  }, [volumeMuted, isYou]);

  const name = user?.name || user?.username || 'User';
  const initials = (name || 'U').slice(0, 2).toUpperCase();

  const borderClass = pinned 
    ? 'ring-2 ring-blue-600 shadow-lg' 
    : 'hover:ring-1 hover:ring-gray-300 hover:shadow-md';

  const handleTryPlayAudio = () => {
    if (!isYou && audioBlocked && audioRef.current) {
      audioRef.current.play().then(() => {
        setAudioBlocked(false);
      }).catch(console.warn);
    }
  };

  return (
    <div
      className={`relative rounded-lg overflow-hidden bg-gray-900 ${borderClass} transition-all duration-200 cursor-pointer group ${isCompact ? 'scale-90 md:scale-95' : 'scale-100'}`}
      onClick={handleTryPlayAudio}
      role="button"
      tabIndex={0}
    >
      {/* Video or Avatar */}
      <div className="aspect-video w-full relative bg-gray-900">
        {stream && !streamError ? (
          <>
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              autoPlay
              playsInline
              controls={false}
              style={{ 
                transform: isYou ? 'scaleX(-1)' : 'none',
                opacity: camOn ? '1' : '0'
              }}
            />
            {isVideoLoading && (
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <div className="text-white text-sm">Connecting...</div>
                </div>
              </div>
            )}
            {/* Camera off state - show avatar/initials */}
            {!camOn && (
              <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-700 shadow-lg mb-2"
                    draggable={false}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className={`w-20 h-20 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center text-xl font-medium text-gray-300 shadow-lg mb-2 ${
                    user?.avatar ? 'hidden' : 'flex'
                  }`}
                >
                  {initials}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center bg-gray-900">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={name}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-700 shadow-lg mb-2"
                draggable={false}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className={`w-20 h-20 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center text-xl font-medium text-gray-300 shadow-lg mb-2 ${
                user?.avatar ? 'hidden' : 'flex'
              }`}
            >
              {initials}
            </div>
            {streamError && (
              <div className="text-red-400 text-xs text-center px-4">
                Connection issues
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom overlay with name and status */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
        <div className="flex items-center justify-between">
          {/* Name */}
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-medium truncate max-w-32">
              {name}
            </span>
            {isYou && (
              <span className="text-gray-300 text-xs bg-black/40 px-2 py-0.5 rounded-full">
                You
              </span>
            )}
          </div>
          
          {/* Status indicators */}
          <div className="flex items-center gap-1">
            {/* Mic indicator */}
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              micOn 
                ? 'bg-green-600/80 text-white' 
                : 'bg-red-600/80 text-white'
            }`}>
              {micOn ? (
                <Mic size={12} />
              ) : (
                <MicOff size={12} />
              )}
            </div>
            
            {/* Camera indicator */}
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              camOn 
                ? 'bg-green-600/80 text-white' 
                : 'bg-red-600/80 text-white'
            }`}>
              {camOn ? (
                <Video size={12} />
              ) : (
                <VideoOff size={12} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Top overlay with controls (visible on hover) */}
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {/* Size toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsCompact((v) => !v);
          }}
          className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
          title={isCompact ? 'Make larger' : 'Make smaller'}
        >
          {isCompact ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
        </button>

        {/* Pin button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPinToggle();
          }}
          className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
          title={pinned ? 'Unpin participant' : 'Pin participant'}
        >
          <Pin size={14} className={pinned ? 'fill-current' : ''} />
        </button>
        
        {/* Volume control for remote participants */}
        {!isYou && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onVolumeToggle();
            }}
            className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
            title={volumeMuted ? 'Unmute participant' : 'Mute participant'}
          >
            {volumeMuted ? (
              <VolumeX size={14} />
            ) : (
              <Volume2 size={14} />
            )}
          </button>
        )}
      </div>

      {/* Connection status indicator */}
      {stream && (
        <div className="absolute top-2 left-2">
          <div className="flex items-center gap-1 bg-black/60 rounded-full px-2 py-1">
            <Wifi size={10} className="text-green-400" />
          </div>
        </div>
      )}

      {/* Autoplay blocked notification */}
      {!isYou && audioBlocked && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/80 text-white text-xs px-3 py-2 rounded-lg shadow-lg border border-gray-600">
            <div className="flex items-center gap-2">
              <VolumeX size={14} />
              <span>Tap to enable audio</span>
            </div>
          </div>
        </div>
      )}

      {/* Speaking indicator (optional - you can add speaking detection logic) */}
      {micOn && stream && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full border-2 border-green-400 rounded-lg opacity-0 animate-pulse" 
               style={{
                 animationDuration: '1s',
                 animationIterationCount: 'infinite',
                 animationTimingFunction: 'ease-in-out'
               }} />
        </div>
      )}

      {/* Hidden audio element for remote audio control */}
      {!isYou && (
        <audio 
          ref={audioRef} 
          className="hidden" 
          autoPlay 
          playsInline
        />
      )}
    </div>
  );
}