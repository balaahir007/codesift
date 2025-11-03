import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import useStudySpacesStore from '../../../zustand/studySpaces/useStudySpaceStore';
import StudySpaceLoadingSpinner from '../../../card/learnhubCards/StudySpaceLoadingSpinner'
import StudySpaceError from '../../../errorsHandling/learnhub/StudySpaceError';
import StudySpaceNavBar from '../../../components/learnhub/study-space/StudySpaceNavBar';
import StudySpaceSlideBar from '../../../components/learnhub/study-space/StudySpaceSlideBar';
import { MessageCircleMore } from 'lucide-react';
import StudySpaceChat from './StudySpaceChat';
import socketService from '../../../services/socketService';
import useAuthStore from '../../../zustand/auth/useAuthStore';
import useMeetStore from '../../../zustand/studySpaces/useMeetStore';
import { toast } from 'react-toastify';
import MeetBox from '../../../components/learnhub/study-space/meet/MeetBox';

const StudySpace = () => {
  const { spaceId } = useParams();
  const [extendMenu, setExtendMenu] = useState(false);
  const [spaceChatOpen, setSpaceChatOpen] = useState(false);
  const [chatPosition, setChatPosition] = useState({ bottom: '1rem', left: '4rem' });
  const [isInitialized, setIsInitialized] = useState(false);

  const { checkStudySpaceAuth, studySpace, status, getStudySpaceAdmin, studySpaceAdmin } = useStudySpacesStore();
  const { authUser } = useAuthStore();
  const location = useLocation();
  const isWhiteBoardPage = location.pathname.includes('new-whiteboard');
  const isMeetPage = location.pathname.includes('meet');

  const errorMeg = useMeetStore((state) => state.meetState.errorMeg);
  const clearError = useMeetStore((state) => state.clearError);
  const joinErrorMsg = useMeetStore((state) => state.joinState.errorMeg);
  const { fetchAllMeet, initMeetHandlers } = useMeetStore();

  const groupChatRef = useRef();
  const initializationRef = useRef(false);
  const cleanupRef = useRef(null);

  // Memoized initialization function
  const initializeStudySpace = useCallback(async () => {
    if (!spaceId || !authUser?.id || initializationRef.current) return;

    initializationRef.current = true;
    
    try {
      console.log('🚀 Initializing study space:', spaceId);
      
      // 1. Initialize auth and basic data first
      await Promise.allSettled([
        checkStudySpaceAuth(spaceId),
        getStudySpaceAdmin(spaceId),
        fetchAllMeet(spaceId),
      ]);

      // 2. Connect to socket and join space
      const socket = socketService.connectToSpace(spaceId, authUser.id);
      
      // 3. Initialize meet handlers after socket connection
      initMeetHandlers(spaceId, authUser.id);
      
      // 4. Set up cleanup function
      cleanupRef.current = () => {
        console.log('🧹 Cleaning up study space:', spaceId);
        socketService.disconnectFromSpace(spaceId);
      };
      
      setIsInitialized(true);
      console.log('✅ Study space initialized successfully');
      
    } catch (error) {
      console.error('❌ Error initializing study space:', error);
      initializationRef.current = false; // Reset on error to allow retry
    }
  }, [spaceId, authUser?.id, checkStudySpaceAuth, getStudySpaceAdmin, fetchAllMeet, initMeetHandlers]);

  // Initialize when auth user and spaceId are available
  useEffect(() => {
    let isCancelled = false;
    
    const timer = setTimeout(() => {
      if (!isCancelled && spaceId && authUser?.id) {
        initializeStudySpace();
      }
    }, 100); // Small delay to ensure auth is settled

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [spaceId, authUser?.id, initializeStudySpace]);

  // Reset initialization when spaceId changes
  useEffect(() => {
    // Clean up previous space connection
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    
    initializationRef.current = false;
    setIsInitialized(false);
  }, [spaceId]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  // Handle error messages
  useEffect(() => {
    if (errorMeg) {
      toast.info(errorMeg, {
        style: {
          fontSize: "14px",
          padding: "8px 12px",
        },
      });
      clearError('meetState');
    }
  }, [errorMeg, clearError]);

  // Handle join error messages
  useEffect(() => {
    if (joinErrorMsg) {
      toast.error(joinErrorMsg, {
        style: {
          fontSize: "14px",
          padding: "8px 12px",
        },
      });
      clearError('joinState');
    }
  }, [joinErrorMsg, clearError]);

  // Handle whiteboard page
  useEffect(() => {
    if (isWhiteBoardPage) setExtendMenu(true);
  }, [isWhiteBoardPage]);

  // Handle outside click for chat
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (groupChatRef.current && !groupChatRef.current.contains(e.target)) {
        setSpaceChatOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Handle chat positioning
  useEffect(() => {
    if (!spaceChatOpen) return;
    if (isMeetPage) setChatPosition({ bottom: '4rem', left: '15%' });
    else setChatPosition({ bottom: extendMenu ? '5rem' : '4rem', left: extendMenu ? '7rem' : '18rem' });
  }, [extendMenu, isMeetPage, spaceChatOpen]);

  // Loading state
  if (!spaceId || !authUser?.id || !isInitialized || status?.checkStudySpace?.loading) {
    return <StudySpaceLoadingSpinner/>;
  }

  // Error state
  if (status?.checkStudySpace?.error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <StudySpaceError error={status.checkStudySpace.error} />
      </div>
    );
  }

  // No study space data
  if (!studySpace) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 mb-4">Study space not found</div>
          <button 
            onClick={() => {
              if (cleanupRef.current) {
                cleanupRef.current();
                cleanupRef.current = null;
              }
              initializationRef.current = false;
              setIsInitialized(false);
              initializeStudySpace();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Main content
  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
  {/* Navigation Bar */}
  {!isWhiteBoardPage && !isMeetPage && (
    <StudySpaceNavBar
      spaceAdmin={studySpaceAdmin}
      memberCount={studySpace?.members?.length}
      inviteCode={studySpace?.inviteCode}
      spaceId={spaceId}
    />
  )}

  {/* Main Content Area */}
  <div className="flex flex-1 overflow-hidden relative">
    {/* Sidebar */}
    {!isWhiteBoardPage && !isMeetPage && (
      <StudySpaceSlideBar
        extendMenu={extendMenu}
        setExtendMenu={setExtendMenu}
        spaceId={spaceId}
      />
    )}

    {/* Content Area */}
    <div className="flex-1 w-full bg-gray-100 p-4 overflow-y-auto overflow-x-hidden relative">
      <Outlet />
    </div>

    {/* Floating Elements */}
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Group Chat Button */}
      <div
        className="absolute bottom-4 left-20 pointer-events-auto group"
        style={{
          left: isMeetPage ? '10%' : extendMenu ? '7rem' : '17rem',
          transform: isMeetPage ? 'translateX(-50%)' : 'none',
        }}
      >
        {!spaceChatOpen && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-primary text-white text-xs rounded px-2 py-1 whitespace-nowrap">
            Group Chat
          </div>
        )}
        <MessageCircleMore
          onClick={() => setSpaceChatOpen((prev) => !prev)}
          className="bg-primary text-white rounded-full p-2 shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
          size={42}
        />
      </div>

      {/* Meet Box */}
      {!isMeetPage && (
        <div className="pointer-events-auto overflow-hidden">
          <MeetBox />
        </div>
      )}

      {/* Group Chat Panel */}
      {spaceChatOpen && (
        <div
          ref={groupChatRef}
          className="pointer-events-auto overflow-hidden"
          style={{
            position: 'absolute',
            bottom: chatPosition.bottom,
            left: chatPosition.left,
            transform: isMeetPage ? 'translateX(-50%)' : undefined,
          }}
        >
          <StudySpaceChat />
        </div>
      )}
    </div>
  </div>
</div>

  );
};

export default StudySpace;