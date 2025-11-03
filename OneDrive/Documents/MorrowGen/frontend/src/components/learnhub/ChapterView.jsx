import React, { useEffect, useState, useCallback, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Play, Clock, BookOpen, AlertCircle } from "lucide-react";
import useAuthStore from "../../zustand/auth/useAuthStore";
import throttle from 'lodash/throttle';

// Skeleton Component
const ChapterSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 animate-pulse">
      <div className="h-8 w-3/4 bg-gray-200 rounded-lg mb-4"></div>

      <div className="relative w-full aspect-video bg-gray-200 rounded-xl mb-6 flex items-center justify-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
          <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-gray-400 border-b-8 border-b-transparent ml-1"></div>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Description Skeleton */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Additional Content Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="h-5 w-24 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="h-5 w-24 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

// Error State Component
const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Failed to Load Chapter
        </h2>
        <p className="text-gray-600 mb-6">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          No Chapter Selected
        </h2>
        <p className="text-gray-600">
          Please select a chapter from the sidebar to view its content.
        </p>
      </div>
    </div>
  );
};

const ChapterView = ({ chapterId, courseId }) => {
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [courseProgress, setCourseProgress] = useState(0);
  const [error, setError] = useState(null);


  // Use refs to store latest values for throttled function
  const latestValuesRef = useRef({
    chapter,
    courseId
  });

  // Update ref whenever values change
  useEffect(() => {
    latestValuesRef.current = {  chapter, courseId };
  }, [ chapter, courseId]);

  // Create throttled function once with useRef
  const sendProgressThrottled = useRef(
    throttle(async (watched, total) => {
      const {  chapter, courseId } = latestValuesRef.current;
      
      if ( !chapter?.id) return;
      
      try {
        await axiosInstance.patch("/course/progress", {
          courseId: courseId,
          chapterId: chapter.id,
          watchedDuration: Math.floor(watched),
          totalDuration: Math.floor(total)
        });
        console.log("✅ Progress updated");
      } catch (err) {
        console.error("❌ Error updating progress:", err);
      }
    }, 10000)
  ).current;

  // Cleanup throttled function on unmount
  useEffect(() => {
    return () => {
      sendProgressThrottled.cancel();
    };
  }, [sendProgressThrottled]);

  const fetchChapter = useCallback(async () => {
    if (!chapterId) return;

    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.get(`/course/chapter/${chapterId}`);
      setChapter(res.data.data);
      console.log('Fetched Chapter:', res.data);
    } catch (error) {
      console.error('Error fetching chapter:', error);
      setError(error.response?.data?.message || 'Failed to load chapter content');
      setChapter(null);
    } finally {
      setLoading(false);
    }
  }, [chapterId]);

  useEffect(() => {
    if (chapterId) {
      fetchChapter();
    } else {
      setChapter(null);
      setLoading(false);
    }
  }, [chapterId, fetchChapter]);

  useEffect(() => {
    const fetchCourseProgress = async () => {
      try {
        const res = await axiosInstance.get(`/${courseId}/progress/chapter/${chapterId}`);
        console.log("Course completion:", res.data.percentage);
        setCourseProgress(res.data.percentage);
      } catch (error) {
        console.error("Failed to fetch course progress", error);
      }
    };

    if (courseId && chapterId) fetchCourseProgress();
  }, [courseId, chapterId]);

  const handleProgressUpdate = (e) => {
    const video = e.target;
    sendProgressThrottled(video.currentTime, video.duration);
  };

  const handleVideoEnd = (e) => {
    const video = e.target;
    // Cancel any pending throttled calls and send final progress immediately
    sendProgressThrottled.cancel();
    
    const { authUser, chapter, courseId } = latestValuesRef.current;
    
    if (!authUser?.id || !chapter?.id) return;
    
    // Send final progress with actual video duration
    axiosInstance.patch("/course/progress", {
      userId: authUser.id,
      courseId: courseId,
      chapterId: chapter.id,
      watchedDuration: Math.floor(video.duration),
      totalDuration: Math.floor(video.duration)
    }).then(() => {
      console.log("✅ Chapter marked as complete");
    }).catch((err) => {
      console.error("❌ Error marking chapter complete:", err);
    });
  };

  // Loading State
  if (loading) {
    return <ChapterSkeleton />;
  }

  // Error State
  if (error) {
    return <ErrorState message={error} onRetry={fetchChapter} />;
  }

  // Empty State (no chapter selected)
  if (!chapterId) {
    return <EmptyState />;
  }

  // No chapter data
  if (!chapter) {
    return <ChapterSkeleton />;
  }

  // Main Content
  return (
    <div className="max-w-5xl mx-auto p-2">
      {/* Chapter Header */}
      <div className="mb-6 md:-mt-2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {chapter.title}
        </h1>

        {chapter.attachMentUrl && (
          <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden mb-6 shadow-lg">
            <video
              className="w-full h-full"
              src={chapter.attachMentUrl}
              controls
              autoPlay
              onTimeUpdate={handleProgressUpdate}
              onEnded={handleVideoEnd}
              controlsList="nodownload"
              poster={chapter.thumbnail}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600">
          {chapter.duration && (
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{chapter.duration} mins</span>
            </div>
          )}
          {chapter.lessons && (
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{chapter.lessons} lessons</span>
            </div>
          )}
        </div>
      </div>

      {/* Chapter Description */}
      {chapter.description && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            About This Chapter
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {chapter.description}
          </p>
        </div>
      )}

      {/* Additional Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Learning Objectives */}
        {chapter.objectives && chapter.objectives.length > 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Learning Objectives
            </h3>
            <ul className="space-y-2">
              {chapter.objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-primary mt-1">✓</span>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Key Takeaways */}
        {chapter.keyTakeaways && chapter.keyTakeaways.length > 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Key Takeaways
            </h3>
            <ul className="space-y-2">
              {chapter.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-purple-600 mt-1">→</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-8">
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition shadow-md">
          <Play className="w-5 h-5" />
          Continue Learning
        </button>
        <button className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition">
          Mark as Complete
        </button>
      </div>
    </div>
  );
};

export default ChapterView;