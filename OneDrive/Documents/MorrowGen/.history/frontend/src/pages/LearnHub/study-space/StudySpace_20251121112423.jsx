import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import useStudySpacesStore from '../../../zustand/studySpaces/useStudySpaceStore';
import StudySpaceLoadingSpinner from '../../../card/learnhubCards/StudySpaceLoadingSpinner'
import StudySpaceError from '../../../errorsHandling/learnhub/StudySpaceError';
import StudySpaceNavBar from '../../../components/learnhub/study-space/StudySpaceNavBar';
import StudySpaceSlideBar from '../../../components/learnhub/study-space/StudySpaceSlideBar';
import { MessageCircleMore, X } from 'lucide-react';
import StudySpaceChat from './StudySpaceChat';
import socketService from '../../../services/socketService';
import useAuthStore from '../../../zustand/auth/useAuthStore';
import useMeetStore from '../../../zustand/studySpaces/useMeetStore';
import { toast } from 'react-toastify';
import MeetBox from '../../../components/learnhub/study-space/meet/MeetBox';
import useThemeStore from '../../../zustand/themeStore';

const StudySpace = () => {
  const { spaceId } = useParams();
  const [extendMenu, setExtendMenu] = useState(false);
  const [spaceChatOpen, setSpaceChatOpen] = useState(false);
  const [chatPosition, setChatPosition] = useState({ bottom: '1rem', left: '4rem' });
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { checkStudySpaceAuth, studySpace, status, getStudySpaceAdmin, studySpaceAdmin } = useStudySpacesStore();
  const { authUser } = useAuthStore();
  const { mode } = useThemeStore(); // Get theme mode
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

  // Theme classes
  const bgPrimary = mode === 'dark' ? 'bg-[#0A1215]' : 'bg-white';
  const bgContent = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-100';
  const bgCard = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const hoverBg = mode === 'dark' ? 'hover:bg-[#1B2E31]' : 'hover:bg-gray-50';
  const chatBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const buttonBg = mode === 'dark' ? 'bg-[#0097B2]' : 'bg-blue-600';
  const buttonHover = mode === 'dark' ? 'hover:bg-[#00B2A9]' : 'hover:bg-blue-700';

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
      const socket = socketService.connectToSpace(spaceId, authUser.id,authUser);
      
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
    
    // Mobile responsive positioning
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      setChatPosition({ bottom: '5rem', left: '50%', transform: 'translateX(-50%)' });
    } else if (isMeetPage) {
      setChatPosition({ bottom: '4rem', left: '15%' });
    } else {
      setChatPosition({ bottom: extendMenu ? '5rem' : '4rem', left: extendMenu ? '7rem' : '18rem' });
    }
  }, [extendMenu, isMeetPage, spaceChatOpen]);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      if (spaceChatOpen && window.innerWidth < 768) {
        setChatPosition({ bottom: '5rem', left: '50%', transform: 'translateX(-50%)' });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [spaceChatOpen]);

  // Loading state
  if (!spaceId || !authUser?.id || !isInitialized || status?.checkStudySpace?.loading) {
    return <StudySpaceLoadingSpinner/>;
  }

  // Error state
  if (status?.checkStudySpace?.error) {
    return (
      <div className={`w-full h-screen flex items-center justify-center ${bgPrimary}`}>
        <StudySpaceError error={status.checkStudySpace.error} />
      </div>
    );
  }

  // No study space data
  if (!studySpace) {
    return (
      <div className={`w-full h-screen flex items-center justify-center ${bgPrimary}`}>
        <div className="text-center px-4">
          <div className={`${textSecondary} mb-4 text-sm sm:text-base`}>Study space not found</div>
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
            className={`px-4 py-2 ${buttonBg} text-white rounded hover:shadow-lg transition-all text-sm sm:text-base`}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Main content
  return (
    <div className={`w-full h-screen flex flex-col overflow-hidden ${bgPrimary}`}>
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
        {/* Sidebar - Desktop */}
        {!isWhiteBoardPage && !isMeetPage && (
          <div className="hidden lg:block">
            <StudySpaceSlideBar
              extendMenu={extendMenu}
              setExtendMenu={setExtendMenu}
              spaceId={spaceId}
            />
          </div>
        )}

        {/* Sidebar - Mobile Overlay */}
        {!isWhiteBoardPage && !isMeetPage && isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* Sidebar - Mobile Drawer */}
        {!isWhiteBoardPage && !isMeetPage && (
          <div className={`fixed top-0 left-0 h-full z-50 lg:hidden transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <StudySpaceSlideBar
              extendMenu={extendMenu}
              setExtendMenu={setExtendMenu}
              spaceId={spaceId}
            />
          </div>
        )}

        {/* Content Area */}
        <div className={`flex-1 w-full ${bgContent} p-2 sm:p-4 overflow-y-auto overflow-x-hidden relative`}>
          {/* Mobile Menu Button */}
          {!isWhiteBoardPage && !isMeetPage && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden fixed top-16 left-4 z-50 p-2 ${bgCard} rounded-lg border ${borderColor} ${textPrimary}`}
            >
              {isMobileMenuOpen ? (
                <X size={20} />
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          )}
          <Outlet />
        </div>

        {/* Floating Elements */}
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {/* Group Chat Button */}
          <div
            className="absolute bottom-4 pointer-events-auto group"
            style={{
              left: isMeetPage 
                ? window.innerWidth < 768 ? '50%' : '10%'
                : window.innerWidth < 768
                ? '50%'
                : extendMenu ? '7rem' : '17rem',
              transform: window.innerWidth < 768 ? (isMeetPage ? 'translateX(-50%)' : 'translateX(-50%)') : (isMeetPage ? 'translateX(-50%)' : 'none'),
              bottom: window.innerWidth < 768 ? 'calc(4rem + 16px)' : '1rem',
            }}
          >
            {!spaceChatOpen && (
              <div className={`absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform ${bgCard} ${textPrimary} text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg border ${borderColor}`}>
                Group Chat
              </div>
            )}
            <button
              onClick={() => setSpaceChatOpen((prev) => !prev)}
              className={`${buttonBg} text-white rounded-full p-2 shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer`}
              aria-label="Toggle group chat"
            >
              <MessageCircleMore size={24} className="sm:w-6 sm:h-6 w-5 h-5" />
            </button>
          </div>

          {/* Meet Box */}
          {!isMeetPage && (
            <div className="pointer-events-auto overflow-hidden">
              <MeetBox />
            </div>
          )}

          {/* Group Chat Panel - Mobile Responsive */}
          {spaceChatOpen && (
            <div
              ref={groupChatRef}
              className="pointer-events-auto overflow-hidden"
              style={{
                position: 'absolute',
                bottom: chatPosition.bottom,
                left: chatPosition.left,
                transform: chatPosition.transform || (isMeetPage ? 'translateX(-50%)' : undefined),
                width: window.innerWidth < 768 ? 'calc(100vw - 2rem)' : 'auto',
                maxWidth: window.innerWidth < 768 ? '100vw' : '400px',
                maxHeight: window.innerWidth < 768 ? '50vh' : '70vh',
              }}
            >
              <div className={`${chatBg} rounded-lg shadow-2xl border ${borderColor} h-full`}>
                <StudySpaceChat />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudySpace;