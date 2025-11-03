// Fixed useWebRTC hook with proper error handling and state management
import { useState, useEffect, useCallback, useRef } from 'react';
import webRTCService from '../../services/webRTCService';
import socketService from '../../services/socketService';

export const useWebRTC = (spaceId, userId, meetId) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState(new Map());
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [connectionStates, setConnectionStates] = useState(new Map());
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const initializedRef = useRef(false);
  const cleanupRef = useRef(null);

  const initialize = useCallback(async () => {
    const validMeet = !!meetId && meetId !== 'null' && meetId !== 'undefined';
    if (!spaceId || !userId || !validMeet) {
      console.warn('⚠️ Missing required parameters for WebRTC initialization:', { spaceId, userId, meetId });
      return;
    }
    
    if (initializedRef.current) {
      console.log('ℹ️ WebRTC already initialized');
      return;
    }

    try {
      initializedRef.current = true;
      setIsLoading(true);
      setError(null);

      console.log('🚀 Initializing WebRTC...', { spaceId, userId, meetId });

      const stream = await webRTCService.initialize(spaceId, userId, meetId);
      setLocalStream(stream);
      setIsInitialized(true);

      // Set up event handlers
      webRTCService.onRemoteStreamAdded = (remoteUserId, stream) => {
        console.log('📺 Remote stream added:', remoteUserId);
        setRemoteStreams(prev => {
          const next = new Map(prev);
          next.set(String(remoteUserId), stream);
          return next;
        });
      };

      webRTCService.onRemoteStreamRemoved = (remoteUserId) => {
        console.log('📺 Remote stream removed:', remoteUserId);
        setRemoteStreams(prev => {
          const next = new Map(prev);
          next.delete(String(remoteUserId));
          return next;
        });
      };

      webRTCService.onConnectionStateChange = (remoteUserId, state) => {
        console.log('🔗 Connection state changed:', remoteUserId, state);
        setConnectionStates(prev => {
          const next = new Map(prev);
          next.set(String(remoteUserId), state);
          return next;
        });
      };

      // Set up cleanup function
      cleanupRef.current = () => {
        console.log('🧹 Cleaning up WebRTC hook');
        webRTCService.cleanup();
        setIsInitialized(false);
        setLocalStream(null);
        setRemoteStreams(new Map());
        setConnectionStates(new Map());
        setError(null);
        setIsLoading(false);
        initializedRef.current = false;
      };

      console.log('✅ WebRTC initialized successfully');

    } catch (err) {
      console.error('❌ WebRTC initialization failed:', err);
      setError(err?.message || 'Failed to initialize WebRTC');
      initializedRef.current = false;
      setIsInitialized(false);
    } finally {
      setIsLoading(false);
    }
  }, [spaceId, userId, meetId]);

  const cleanup = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
  }, []);

  const connectToParticipants = useCallback((participants) => {
    if (!isInitialized || !participants?.length) {
      console.warn('⚠️ Cannot connect to participants - not initialized or no participants');
      return;
    }
    
    const others = participants.filter(p => String(p.userId ?? p.id) !== String(userId));
    if (others.length) {
      console.log('🔗 Connecting to participants:', others.length);
      webRTCService.connectToParticipants(others);
    }
  }, [isInitialized, userId]);

  const toggleVideo = useCallback(async () => {
    if (!isInitialized) {
      console.warn('⚠️ Cannot toggle video - not initialized');
      return isVideoEnabled;
    }
    try {
      const next = await webRTCService.toggleVideo();
      setIsVideoEnabled(next);
      // If a local stream was created lazily by the service, sync it into state
      const ls = webRTCService.getLocalStream?.();
      if (ls && !localStream) setLocalStream(ls);
      return next;
    } catch (error) {
      console.error('❌ Failed to toggle video:', error);
      return isVideoEnabled;
    }
  }, [isInitialized, isVideoEnabled, localStream]);

  const toggleAudio = useCallback(async () => {
    if (!isInitialized) {
      console.warn('⚠️ Cannot toggle audio - not initialized');
      return isAudioEnabled;
    }
    try {
      const next = await webRTCService.toggleAudio();
      setIsAudioEnabled(next);
      // If a local stream was created lazily by the service, sync it into state
      const ls = webRTCService.getLocalStream?.();
      if (ls && !localStream) setLocalStream(ls);
      return next;
    } catch (error) {
      console.error('❌ Failed to toggle audio:', error);
      return isAudioEnabled;
    }
  }, [isInitialized, isAudioEnabled, localStream]);

  const startScreenShare = useCallback(async () => {
    if (!isInitialized) {
      console.warn('⚠️ Cannot start screen share - not initialized');
      return null;
    }
    
    try {
      const stream = await webRTCService.startScreenShare();
      if (stream) {
        setIsScreenSharing(true);
      }
      return stream;
    } catch (error) {
      console.error('❌ Failed to start screen share:', error);
      throw error;
    }
  }, [isInitialized]);

  const stopScreenShare = useCallback(async () => {
    if (!isInitialized) {
      console.warn('⚠️ Cannot stop screen share - not initialized');
      return;
    }
    
    try {
      await webRTCService.stopScreenShare();
      setIsScreenSharing(false);
    } catch (error) {
      console.error('❌ Failed to stop screen share:', error);
      throw error;
    }
  }, [isInitialized]);

  // Initialize when parameters are available
  useEffect(() => {
    const validMeet = !!meetId && meetId !== 'null' && meetId !== 'undefined';
    if (spaceId && userId && validMeet) {
      initialize();
    }
    
    return () => {
      cleanup();
    };
  }, [spaceId, userId, meetId, initialize, cleanup]);

  // Sync state with service and handle socket events
  useEffect(() => {
    if (!isInitialized) return;
    
    const socket = socketService.getSocket(spaceId, userId);
    if (!socket) return;

    // Handle media state changes from other participants
    const handleMediaStateChange = ({ userId: remoteUserId, meetId: remoteMeetId, audioEnabled, videoEnabled }) => {
      if (String(remoteMeetId) !== String(meetId)) return;
      if (String(remoteUserId) === String(userId)) return; // Don't handle our own state changes
      
      console.log('📡 Received media state change from:', remoteUserId, { audioEnabled, videoEnabled });
      
      // Update connection states to reflect media changes
      setConnectionStates(prev => {
        const next = new Map(prev);
        next.set(String(remoteUserId), 'connected');
        return next;
      });
    };

    // Handle screen share state changes from other participants
    const handleScreenShareChange = ({ userId: remoteUserId, meetId: remoteMeetId, isSharing }) => {
      if (String(remoteMeetId) !== String(meetId)) return;
      if (String(remoteUserId) === String(userId)) return; // Don't handle our own state changes
      
      console.log('🖥️ Received screen share state change from:', remoteUserId, { isSharing });
    };

    // Register socket event listeners
    socket.on('webrtc-media-state', handleMediaStateChange);
    socket.on('webrtc-screen-share', handleScreenShareChange);

    const interval = setInterval(() => {
      try {
        // Sync video state
        const videoState = webRTCService.isVideoEnabled;
        if (videoState !== isVideoEnabled) {
          setIsVideoEnabled(videoState);
        }

        // Sync audio state
        const audioState = webRTCService.isAudioEnabled;
        if (audioState !== isAudioEnabled) {
          setIsAudioEnabled(audioState);
        }

        // Sync screen sharing state
        const screenState = webRTCService.isScreenSharing;
        if (screenState !== isScreenSharing) {
          setIsScreenSharing(screenState);
        }

        // Sync connection states
        const next = new Map();
        for (const [rid, pc] of webRTCService.peerConnections) {
          next.set(String(rid), pc?.connectionState || 'new');
        }
        setConnectionStates(next);

        // Sync local stream
        if (!localStream) {
          const ls = webRTCService.getLocalStream?.();
          if (ls) {
            setLocalStream(ls);
          }
        }
      } catch (error) {
        console.error('❌ Error syncing WebRTC state:', error);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      socket.off('webrtc-media-state', handleMediaStateChange);
      socket.off('webrtc-screen-share', handleScreenShareChange);
    };
  }, [isInitialized, isVideoEnabled, isAudioEnabled, isScreenSharing, localStream, spaceId, userId, meetId]);

  return {
    isInitialized,
    localStream,
    remoteStreams,
    isVideoEnabled,
    isAudioEnabled,
    isScreenSharing,
    connectionStates,
    error,
    isLoading,
    initialize,
    cleanup,
    connectToParticipants,
    toggleVideo,
    toggleAudio,
    startScreenShare,
    stopScreenShare,
  };
};

export default useWebRTC;
