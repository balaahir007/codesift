import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Assignment from "../../components/learnhub/Assignment";
import RecommendedCourses from "../../components/learnhub/RecommendedCourses";

const DisplayCourseVideo = () => {
  const location = useLocation();
  const video = location.state?.videoLink;
  const { videoId } = useParams();
  
  const [isCompleted, setIsCompleted] = useState(false);
  const [assignmentOptionOpen, setAssignmentOptionOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [watchProgress, setWatchProgress] = useState(0);
  
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const iframeId = "youtube-player";

  // Extract YouTube ID from URL
  const extractYouTubeID = (url) => {
    if (!url) return null;
    const regex = /(?:\/|v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Load YouTube API
  const loadYouTubeAPI = () => {
    return new Promise((resolve) => {
      if (window.YT && window.YT.Player) {
        resolve();
        return;
      }
      
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.head.appendChild(script);
      }
      
      window.onYouTubeIframeAPIReady = () => resolve();
    });
  };

  // Handle player state changes
  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      setIsCompleted(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  // Track video progress
  const trackProgress = () => {
    if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
      const currentTime = playerRef.current.getCurrentTime();
      const duration = playerRef.current.getDuration();
      const progress = duration ? (currentTime / duration) * 100 : 0;
      setWatchProgress(Math.min(progress, 100));
    }
  };

  // Initialize YouTube player
  useEffect(() => {
    if (!video) return;

    const youtubeId = extractYouTubeID(video);
    if (!youtubeId) {
      setIsLoading(false);
      return;
    }

    let mounted = true;

    const initializePlayer = async () => {
      try {
        await loadYouTubeAPI();
        
        if (!mounted) return;

        playerRef.current = new window.YT.Player(iframeId, {
          videoId: youtubeId,
          playerVars: {
            rel: 0,
            modestbranding: 1,
            fs: 1,
            cc_load_policy: 0,
            iv_load_policy: 3,
            autohide: 0,
          },
          events: {
            onReady: () => {
              if (mounted) setIsLoading(false);
            },
            onStateChange: onPlayerStateChange,
          },
        });

        // Track progress every 2 seconds
        intervalRef.current = setInterval(trackProgress, 2000);
      } catch (error) {
        console.error("Error initializing YouTube player:", error);
        if (mounted) setIsLoading(false);
      }
    };

    initializePlayer();

    return () => {
      mounted = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error("Error destroying player:", error);
        }
      }
    };
  }, [video]);

  // Handle assignment start
  const handleStartAssignment = () => {
    setAssignmentOptionOpen(true);
  };

  // Handle assignment close
  const handleCloseAssignment = () => {
    setAssignmentOptionOpen(false);
  };

  const isYouTubeVideo = video && (video.includes("youtube.com") || video.includes("youtu.be"));

  if (!video) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Video Not Found</h2>
          <p className="text-gray-600">The video link is missing or invalid.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Video Container */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto p-4 lg:p-8">
          <div className="relative">
            {/* Video Player */}
            <div className="relative bg-black rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-video w-full">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white z-10">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
                      <p className="text-lg">Loading video...</p>
                    </div>
                  </div>
                )}

                {isYouTubeVideo ? (
                  <div
                    id={iframeId}
                    className="w-full h-full"
                  />
                ) : (
                  <video
                    className="w-full h-full"
                    controls
                    onLoadedData={() => setIsLoading(false)}
                    onEnded={() => setIsCompleted(true)}
                  >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              {/* Assignment Overlay */}
              {assignmentOptionOpen && (
                <div className="absolute inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-lg shadow-xl">
                    <h3 className="text-xl font-semibold mb-4">Assignment Mode</h3>
                    <p className="text-gray-600 mb-4">Video is paused for assignment completion.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            {watchProgress > 0 && !isCompleted && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(watchProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${watchProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Completion Message & Assignment Button */}
            {isCompleted && !assignmentOptionOpen && (
              <div className="mt-6 text-center p-6 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-green-500 text-4xl mb-3">🎉</div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Video Completed!
                </h3>
                <p className="text-green-700 mb-4">
                  Great job! You've finished watching the video.
                </p>
                <button
                  onClick={handleStartAssignment}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  <span className="mr-2">📝</span>
                  Start Assignment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Assignment Modal */}
      {assignmentOptionOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Assignment</h2>
              <button
                onClick={handleCloseAssignment}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                aria-label="Close assignment"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <Assignment
                setIsCompleted={setIsCompleted}
                closeAssignment={handleCloseAssignment}
              />
            </div>
          </div>
        </div>
      )}

      {/* Recommended Courses */}
      <div className="max-w-8xl mx-auto p-4 lg:p-8">
        <div className={`transition-all duration-300 ${isCompleted ? 'mt-8' : 'mt-12'}`}>
          <RecommendedCourses />
        </div>
      </div>
    </div>
  );
};

export default DisplayCourseVideo;