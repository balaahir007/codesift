import React, { useState, useRef, useEffect } from 'react';
import { Monitor, MonitorOff, Users, Wifi, WifiOff } from 'lucide-react';
import socketService from '../../../services/socketService';

const ScreenShareComponent = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [viewers, setViewers] = useState(0);
  const [error, setError] = useState('');

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const wsRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);

  // WebSocket connection
  useEffect(() => {
    connectWebSocket();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      stopScreenShare();
    };
  }, []);

  const connectWebSocket = () => {
    try {
      // Replace with your WebSocket server URL
      wsRef.current = socketService.connectToSpace();
      
      wsRef.current.onopen = () => {
        setIsConnected(true);
        setError('');
        console.log('WebSocket connected');
      };

      wsRef.current.onmessage = handleWebSocketMessage;

      wsRef.current.onerror = (error) => {
        setError('WebSocket connection failed');
        console.error('WebSocket error:', error);
      };

      wsRef.current.onclose = () => {
        setIsConnected(false);
        console.log('WebSocket disconnected');
      };
    } catch (err) {
      setError('Failed to connect to signaling server');
    }
  };

  const handleWebSocketMessage = async (event) => {
    try {
      const message = JSON.parse(event.data);
      
      switch (message.type) {
        case 'offer':
          await handleOffer(message.offer);
          break;
        case 'answer':
          await handleAnswer(message.answer);
          break;
        case 'ice-candidate':
          await handleIceCandidate(message.candidate);
          break;
        case 'viewer-count':
          setViewers(message.count);
          break;
        default:
          console.log('Unknown message type:', message.type);
      }
    } catch (err) {
      console.error('Error handling WebSocket message:', err);
    }
  };

  const createPeerConnection = () => {
    const config = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    };

    const pc = new RTCPeerConnection(config);

    pc.onicecandidate = (event) => {
      if (event.candidate && wsRef.current) {
        sendMessage({
          type: 'ice-candidate',
          candidate: event.candidate
        });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    pc.onconnectionstatechange = () => {
      console.log('Connection state:', pc.connectionState);
    };

    return pc;
  };

  const sendMessage = (message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  };

  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          mediaSource: 'screen'
        },
        audio: true
      });

      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Create peer connection and add tracks
      peerConnectionRef.current = createPeerConnection();
      stream.getTracks().forEach(track => {
        peerConnectionRef.current.addTrack(track, stream);
      });

      // Create and send offer
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      
      sendMessage({
        type: 'offer',
        offer: offer
      });

      setIsSharing(true);
      setError('');

      // Handle stream end (user stops sharing via browser UI)
      stream.getVideoTracks()[0].onended = () => {
        stopScreenShare();
      };

    } catch (err) {
      setError('Failed to start screen sharing: ' + err.message);
      console.error('Error starting screen share:', err);
    }
  };

  const stopScreenShare = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    setIsSharing(false);
  };

  const handleOffer = async (offer) => {
    peerConnectionRef.current = createPeerConnection();
    await peerConnectionRef.current.setRemoteDescription(offer);
    
    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);
    
    sendMessage({
      type: 'answer',
      answer: answer
    });
  };

  const handleAnswer = async (answer) => {
    if (peerConnectionRef.current) {
      await peerConnectionRef.current.setRemoteDescription(answer);
    }
  };

  const handleIceCandidate = async (candidate) => {
    if (peerConnectionRef.current) {
      await peerConnectionRef.current.addIceCandidate(candidate);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Screen Share</h2>
        
        {/* Status Bar */}
        <div className="flex items-center space-x-4 mb-4">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
            isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
          
          <div className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            <Users className="w-4 h-4" />
            <span>{viewers} viewers</span>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Control Button */}
        <button
          onClick={isSharing ? stopScreenShare : startScreenShare}
          disabled={!isConnected}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            isSharing
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed'
          }`}
        >
          {isSharing ? (
            <>
              <MonitorOff className="w-5 h-5" />
              <span>Stop Sharing</span>
            </>
          ) : (
            <>
              <Monitor className="w-5 h-5" />
              <span>Start Screen Share</span>
            </>
          )}
        </button>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Local Video (Your Screen) */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-700">Your Screen</h3>
          <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-contain"
            />
            {!isSharing && (
              <div className="flex items-center justify-center h-full bg-gray-800 text-gray-400">
                <div className="text-center">
                  <Monitor className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No screen sharing active</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Remote Video (Viewer's Perspective) */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-700">Remote View</h3>
          <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
            <div className="flex items-center justify-center h-full bg-gray-800 text-gray-400">
              <div className="text-center">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Waiting for remote connection</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-2">Connection Info</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>WebSocket:</strong> {isConnected ? 'Connected' : 'Disconnected'}</p>
          <p><strong>Screen Share:</strong> {isSharing ? 'Active' : 'Inactive'}</p>
          <p><strong>Peer Connection:</strong> {peerConnectionRef.current ? peerConnectionRef.current.connectionState : 'Not established'}</p>
        </div>
      </div>
    </div>
  );
};

export default ScreenShareComponent;