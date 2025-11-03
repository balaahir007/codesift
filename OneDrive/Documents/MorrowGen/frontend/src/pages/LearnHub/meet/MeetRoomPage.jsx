// Fixed MeetRoomPage with improved error handling and state management
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Moon, Sun, AlertCircle, Loader2 } from "lucide-react";
import VideoTile from "../../../components/learnhub/study-space/meet/VideoTile";
import ControlBar from "../../../components/learnhub/study-space/meet/ControlBar";
import PeoplePanel from "../../../components/learnhub/study-space/meet/PeoplePanel";
import VideoDebugInfo from "../../../components/learnhub/study-space/meet/VideoDebugInfo";
import theme from "../../../constants/theme";
import Pill from "../../../ui/learnhubUi/Pill";
import useMeetStore from "../../../zustand/studySpaces/useMeetStore";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { useLeaveCallHandler } from "../../../hooks/meet/useLeaveCallHandler";
import RefreshModal from '../../../card/learnhubCards/RefreshModal';
import useAuthStore from "../../../zustand/auth/useAuthStore";
import { useWebRTC } from "../../../hooks/meet/useWebRTC";
import socketService from "../../../services/socketService";

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function MeetRoomPage() {
  const [captionsOn, setCaptionsOn] = useState(false);
  const [volumeMuted, setVolumeMuted] = useState(false);
  const [openPanel, setOpenPanel] = useState(null);
  const [pinnedId, setPinnedId] = useState(null);
  const [dark, setDark] = useState(false);
  const [currentMeet, setCurrentMeet] = useState(null);
  const [leaveModel, setLeaveModel] = useState(false);
  const [meetError, setMeetError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [toasts, setToasts] = useState([]);

  const { spaceId, meetId } = useParams();
  const { meets, updateMeetParticipants } = useMeetStore();
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  const resolvedMeetId = (meetId && meetId !== 'null' && meetId !== 'undefined') ? meetId : (currentMeet?.id || null);

  const {
    isInitialized,
    localStream,
    remoteStreams,
    isVideoEnabled,
    isAudioEnabled,
    isScreenSharing,
    connectionStates,
    error: webrtcError,
    isLoading,
    toggleVideo,
    toggleAudio,
    startScreenShare,
    stopScreenShare,
    connectToParticipants
  } = useWebRTC(spaceId, authUser?.id, resolvedMeetId);

  const meet = meets[resolvedMeetId] || currentMeet;

  const didFetchRef = React.useRef(false);
  const didConnectRef = React.useRef(false);

  // Reset refs when meetId changes
  useEffect(() => {
    didFetchRef.current = false;
    didConnectRef.current = false;
    setRetryCount(0);
  }, [resolvedMeetId]);

  // Fetch meet data
  useEffect(() => {
    if (!resolvedMeetId || didFetchRef.current) return;
    didFetchRef.current = true;

    const fetchMeetData = async () => {
      try {
        console.log('📡 Fetching meet data for:', resolvedMeetId);
        const res = await axiosInstance.get(`/study-space/meet/${resolvedMeetId}`);

        if (res.data.data) {
          const meetData = {
            ...res.data.data,
            participants: res.data.data.participants?.map(participant => ({
              id: participant.id,
              userId: participant.userId,
              username: participant.user?.username || participant.username,
              name: participant.user?.username || participant.username,
              meetId: participant.meetId,
              joinedAt: participant.joinedAt,
              role: participant.userId === res.data.data.creatorId ? "Host" : "Participant",
              avatar: participant.user?.profilePicture ||
                `https://api.dicebear.com/9.x/thumbs/svg?seed=${participant.user?.username || participant.username || 'user'}`,
            })) || []
          };
          setCurrentMeet(meetData);
          console.log('✅ Meet data loaded:', meetData);
        }
      } catch (error) {
        console.error('❌ Failed to load meeting data:', error);
        setMeetError("Failed to load meeting data");
      }
    };

    fetchMeetData();
  }, [resolvedMeetId]);

  // Connect to participants when WebRTC is ready
  useEffect(() => {
    if (!isInitialized || !meet?.participants || didConnectRef.current) return;
    didConnectRef.current = true;

    const connectToOthers = async () => {
      try {
        const otherParticipants = meet.participants.filter(p => p.userId !== authUser?.id);
        if (otherParticipants.length > 0) {
          console.log('🔗 Connecting to other participants:', otherParticipants.length);
          connectToParticipants(otherParticipants);
        }
      } catch (error) {
        console.error('❌ Failed to connect to participants:', error);
      }
    };

    // Delay connection to ensure WebRTC is fully ready
    setTimeout(connectToOthers, 1000);
  }, [isInitialized, meet?.participants, authUser?.id, connectToParticipants]);

  // Show a bottom-right toast when someone joins this meet (auto-hide in 3s)
  useEffect(() => {
    try {
      const socket = socketService.getSocket(spaceId, authUser?.id);
      if (!socket) return;

      const onJoined = (participantData) => {
        try {
          const pidMeet = String(participantData?.meetId || '');
          if (pidMeet !== String(resolvedMeetId)) return;
          if (String(participantData?.userId) === String(authUser?.id)) return;
          const name = participantData?.username || `User ${participantData?.userId || ''}`;
          const id = `${participantData?.userId || 'u'}-${Date.now()}`;
          setToasts((prev) => [...prev, { id, message: `${name} joined` }]);
          setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
          }, 3000);
        } catch {}
      };

      socket.on("meet-joined", onJoined);
      return () => {
        try { socket.off("meet-joined", onJoined); } catch {}
      };
    } catch {}
  }, [spaceId, authUser?.id, resolvedMeetId]);

  const now = useClock();
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const allParticipants = useMemo(() => {
    const participants = meet?.participants || [];
    const currentUserInList = participants.some(p => p.userId === authUser?.id);

    if (!currentUserInList && authUser) {
      const currentUserParticipant = {
        id: `user_${authUser.id}`,
        userId: authUser.id,
        username: authUser.username || "You",
        name: "You",
        role: authUser.id === meet?.creatorId ? "Host" : "You",
        avatar: authUser.profilePicture || null,
        isCurrentUser: true
      };
      return [currentUserParticipant, ...participants];
    }

    return participants.map(p => ({
      ...p,
      isCurrentUser: p.userId === authUser?.id,
      name: p.userId === authUser?.id ? "You" : p.name
    }));
  }, [meet?.participants, authUser, meet?.creatorId]);

  const togglePin = useCallback((id) => {
    setPinnedId(p => (p === id ? null : id));
  }, []);

  const handleLeaveCall = useLeaveCallHandler(resolvedMeetId, authUser?.id, spaceId);

  const handleVolumeToggle = useCallback((userId) => {
    setVolumeMuted(v => !v);
  }, []);

  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
    setMeetError(null);
    didFetchRef.current = false;
    didConnectRef.current = false;
  }, []);

  const currentError = webrtcError || meetError;

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  const gridCols = pinnedId
    ? "grid-cols-2"
    : allParticipants.length === 1
      ? "grid-cols-1"
      : allParticipants.length === 2
        ? "grid-cols-2"
        : allParticipants.length <= 4
          ? "grid-cols-2"
          : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  // Loading state
  if (isLoading && !isInitialized) {
    return (
      <div className="h-screen w-full flex items-center justify-center" style={{ backgroundColor: theme.backGray }}>
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-blue-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Joining Meeting</h2>
          <p className="text-gray-600">Setting up your camera and microphone...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (currentError) {
    return (
      <div className="h-screen w-full flex items-center justify-center" style={{ backgroundColor: theme.backGray }}>
        <div className="text-center max-w-md">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Meeting Error</h2>
          <p className="text-gray-600 mb-4">{currentError}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Retry ({retryCount}/3)
            </button>
            <button
              onClick={() => navigate(`/learnhub/study-space/${spaceId}`)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Study Space
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-screen w-full text-gray-900 dark:text-gray-100 flex flex-col"
      style={{ backgroundColor: '#F2F2F2' }}
    >
      {/* Simplified Header */}
      <header
        className="h-14 px-4 flex items-center justify-between border-b"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#D9D9D9'
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold text-sm"
            style={{ backgroundColor: '#0097B2' }}
          >
            M
          </div>
          <div>
            <div className="text-sm font-medium text-gray-800">
              {meet?.name || "Meet Room"}
            </div>
            <div className="text-xs text-gray-500">
              {allParticipants.length} participant{allParticipants.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`text-xs px-2 py-1 rounded-full ${isInitialized
                ? 'text-green-700'
                : 'text-orange-700'
              }`}
            style={{
              backgroundColor: isInitialized ? '#E0F2F5' : '#FEF3CD',
            }}
          >
            {isInitialized ? "Connected" : "Connecting"}
          </div>

          <button
            onClick={() => setDark(d => !d)}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:opacity-80"
            style={{ backgroundColor: '#E0F2F5' }}
            title="Toggle theme"
          >
            {dark ? (
              <Sun size={16} style={{ color: '#0097B2' }} />
            ) : (
              <Moon size={16} style={{ color: '#0097B2' }} />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex min-h-0">
        <main className="flex-1 p-4">
          {allParticipants.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Loader2
                  size={32}
                  className="animate-spin mx-auto mb-3"
                  style={{ color: '#0097B2' }}
                />
                <h3 className="text-base font-medium mb-1 text-gray-800">
                  Joining meeting...
                </h3>
                <p className="text-sm text-gray-600">Please wait</p>
              </div>
            </div>
          ) : (
            <div className={`grid gap-3 auto-rows-[1fr] ${gridCols} h-full`}>
              {allParticipants.map((participant) => (
                <VideoTile
                  key={participant.id || participant.userId}
                  user={participant}
                  isYou={participant.isCurrentUser}
                  pinned={pinnedId === (participant.id || participant.userId)}
                  camOn={
                    participant.isCurrentUser
                      ? isVideoEnabled
                      : (() => {
                          const rs = remoteStreams.get(String(participant.userId));
                          try {
                            const tracks = rs?.getVideoTracks?.() || [];
                            return tracks.some((t) => t.readyState === 'live');
                          } catch {
                            return false;
                          }
                        })()
                  }
                  micOn={participant.isCurrentUser ? isAudioEnabled : true}
                  onPinToggle={() => togglePin(participant.id || participant.userId)}
                  volumeMuted={volumeMuted}
                  onVolumeToggle={() => handleVolumeToggle(participant.userId)}
                  localStream={participant.isCurrentUser ? localStream : null}
                  remoteStream={participant.isCurrentUser ? null : remoteStreams.get(String(participant.userId))}
                />
              ))}
            </div>
          )}
        </main>

        {/* Side Panels */}
        {openPanel === "people" && (
          <div style={{ backgroundColor: '#FFFFFF', borderColor: '#D9D9D9' }}>
            <PeoplePanel
              people={allParticipants}
              close={() => setOpenPanel(null)}
            />
          </div>
        )}
      </div>

      {/* Simplified Footer Controls */}
      <footer
        className="border-t px-4 py-3"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#D9D9D9'
        }}
      >
        <ControlBar
          micOn={isAudioEnabled}
          camOn={isVideoEnabled}
          shareOn={isScreenSharing}
          captionsOn={captionsOn}
          setCaptionsOn={setCaptionsOn}
          openPanel={openPanel}
          setOpenPanel={setOpenPanel}
          leave={() => setLeaveModel(true)}
          toggleAudio={toggleAudio}
          toggleVideo={toggleVideo}
          startScreenShare={startScreenShare}
          stopScreenShare={stopScreenShare}
          isLoading={isLoading}
        />
      </footer>

      {/* Toasts - bottom-right */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div key={t.id} className="bg-black/80 text-white text-sm px-3 py-2 rounded-lg shadow-lg">
            {t.message}
          </div>
        ))}
      </div>

      {/* Leave Confirmation Modal */}
      {leaveModel && (
        <RefreshModal
          onClose={() => setLeaveModel(false)}
          onConfirm={handleLeaveCall}
          message={"Leave meeting?"}
        />
      )}
    </div>
  );
}
