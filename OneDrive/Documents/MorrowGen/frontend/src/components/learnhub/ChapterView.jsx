import React, { useEffect, useState, useCallback, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Play, Clock, BookOpen, AlertCircle } from "lucide-react";
import useAuthStore from "../../zustand/auth/useAuthStore";
import useThemeStore from "../../zustand/themeStore";
import throttle from 'lodash/throttle';

// Skeleton Component
const ChapterSkeleton = ({ mode }) => {
  const skeletonBg = mode === 'dark' ? 'bg-gray-700' : 'bg-gray-200';
  const skeletonDarker = mode === 'dark' ? 'bg-gray-600' : 'bg-gray-300';
  const skeletonLighter = mode === 'dark' ? 'bg-gray-800' : 'bg-gray-400';
  const containerBg = mode === 'dark' ? 'bg-gray-900' : 'bg-backGray';
  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const borderColor = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';

  return (
    <div className={`max-w-5xl ${containerBg} mx-auto p-6 animate-pulse`}>
      <div className={`h-8 w-3/4 ${skeletonBg} rounded-lg mb-4`}></div>

      <div className={`relative w-full aspect-video ${skeletonBg} rounded-xl mb-6 flex items-center justify-center`}>
        <div className={`w-16 h-16 ${skeletonDarker} rounded-full flex items-center justify-center`}>
          <div className={`w-0 h-0 border-t-8 border-t-transparent border-l-12 ${mode === 'dark' ? 'border-l-gray-500' : 'border-l-gray-400'} border-b-8 border-b-transparent ml-1`}></div>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className={`h-5 w-5 ${skeletonBg} rounded`}></div>
          <div className={`h-4 w-20 ${skeletonBg} rounded`}></div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`h-5 w-5 ${skeletonBg} rounded`}></div>
          <div className={`h-4 w-16 ${skeletonBg} rounded`}></div>
        </div>
      </div>

      {/* Description Skeleton */}
      <div className={`${cardBg} rounded-xl border ${borderColor} p-6 mb-6`}>
        <div className={`h-6 w-32 ${skeletonBg} rounded mb-4`}></div>
        <div className="space-y-3">
          <div className={`h-4 w-full ${skeletonBg} rounded`}></div>
          <div className={`h-4 w-full ${skeletonBg} rounded`}></div>
          <div className={`h-4 w-3/4 ${skeletonBg} rounded`}></div>
        </div>
      </div>

      {/* Additional Content Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`${cardBg} rounded-xl border ${borderColor} p-6`}>
          <div className={`h-5 w-24 ${skeletonBg} rounded mb-3`}></div>
          <div className={`h-4 w-full ${skeletonBg} rounded`}></div>
        </div>
        <div className={`${cardBg} rounded-xl border ${borderColor} p-6`}>
          <div className={`h-5 w-24 ${skeletonBg} rounded mb-3`}></div>
          <div className={`h-4 w-full ${skeletonBg} rounded`}></div>
        </div>
      </div>
    </div>
  );
};

// Error State Component
const ErrorState = ({ message, onRetry, mode }) => {
  const errorBg = mode === 'dark' ? 'bg-red-900/30' : 'bg-red-50';
  const errorBorder = mode === 'dark' ? 'border-red-800' : 'border-red-200';
  const errorText = mode === 'dark' ? 'text-red-400' : 'text-red-500';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-800';
  const textSecondary = mode === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const buttonBg = mode === 'dark' ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600';

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className={`${errorBg} border ${errorBorder} rounded-xl p-8 text-center`}>
        <AlertCircle className={`w-16 h-16 ${errorText} mx-auto mb-4`} />
        <h2 className={`text-xl font-semibold ${textPrimary} mb-2`}>
          Failed to Load Chapter
        </h2>
        <p className={`${textSecondary} mb-6`}>{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className={`${buttonBg} text-white px-6 py-2 rounded-lg transition`}
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = ({ mode }) => {
  const emptyBg = mode === 'dark' ? 'bg-gray-800' : 'bg-gray-50';
  const emptyBorder = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const emptyIcon = mode === 'dark' ? 'text-gray-500' : 'text-gray-400';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-800';
  const textSecondary = mode === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className={`${emptyBg} border ${emptyBorder} rounded-xl p-12 text-center`}>
        <BookOpen className={`w-16 h-16 ${emptyIcon} mx-auto mb-4`} />
        <h2 className={`text-xl font-semibold ${textPrimary} mb-2`}>
          No Chapter Selected
        </h2>
        <p className={textSecondary}>
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

  const { mode } = useThemeStore();

  // Theme variables
  const containerBg = mode === 'dark' ? 'bg-gray-900' : 'bg-backGray';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const textTertiary = mode === 'dark' ? 'text-gray-400' : 'text-gray-700';
  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const borderColor = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const buttonPrimaryBg = mode === 'dark' ? 'bg-primary hover:bg-primary/90' : 'bg-primary hover:bg-primary/90';
  const buttonSecondaryBg = mode === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50';
  const buttonSecondaryText = mode === 'dark' ? 'text-gray-200' : 'text-gray-700';
  const buttonSecondaryBorder = mode === 'dark' ? 'border-gray-600' : 'border-gray-300';
  const blueGradient = mode === 'dark' ? 'from-blue-900/30 to-gray-800' : 'from-blue-50 to-white';
  const blueBorder = mode === 'dark' ? 'border-blue-800' : 'border-blue-200';
  const purpleGradient = mode === 'dark' ? 'from-purple-900/30 to-gray-800' : 'from-purple-50 to-white';
  const purpleBorder = mode === 'dark' ? 'border-purple-800' : 'border-purple-200';
  const purpleText = mode === 'dark' ? 'text-purple-400' : 'text-purple-600';

  // Use refs to store latest values for throttled function
  const latestValuesRef = useRef({
    chapter,
    courseId
  });

  // Update ref whenever values change
  useEffect(() => {
    latestValuesRef.current = { chapter, courseId };
  }, [chapter, courseId]);

  // Create throttled function once with useRef
  const sendProgressThrottled = useRef(
    throttle(async (watched, total) => {
      const { chapter, courseId } = latestValuesRef.current;

      if (!chapter?.id) return;

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
    return <ChapterSkeleton mode={mode} />;
  }

  // Error State
  if (error) {
    return <ErrorState message={error} onRetry={fetchChapter} mode={mode} />;
  }

  // Empty State (no chapter selected)
  if (!chapterId) {
    return <EmptyState mode={mode} />;
  }

  // No chapter data
  if (!chapter) {
    return <ChapterSkeleton mode={mode} />;
  }

  // Main Content
  return (
    <div className={`max-w-5xl mx-auto p-2 `}>
      {/* Chapter Header */}
      <div className="mb-6 md:-mt-2">
        <h1
          className={`text-3xl md:text-4xl font-extrabold tracking-tight leading-tight 
              ${textPrimary} mb-4`}
        >
          {chapter.title
            ?.charAt(0)
            ?.toUpperCase() + chapter.title?.slice(1)}
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
        <div className={`flex flex-wrap items-center gap-4 ${textSecondary}`}>
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
        <div className={`${cardBg} rounded-xl border ${borderColor} p-6 mb-6 shadow-sm`}>
          <h2 className={`text-xl font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
            <BookOpen className="w-5 h-5 text-primary" />
            About This Chapter
          </h2>
          <p className={`${textTertiary} leading-relaxed whitespace-pre-line`}>
            {chapter.description}
          </p>
        </div>
      )}

      {/* Additional Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Learning Objectives */}
        {chapter.objectives && chapter.objectives.length > 0 && (
          <div className={`bg-gradient-to-br ${blueGradient} rounded-xl border ${blueBorder} p-6 shadow-sm`}>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-3`}>
              Learning Objectives
            </h3>
            <ul className="space-y-2">
              {chapter.objectives.map((objective, index) => (
                <li key={index} className={`flex items-start gap-2 text-sm ${textTertiary}`}>
                  <span className="text-primary mt-1">✓</span>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Key Takeaways */}
        {chapter.keyTakeaways && chapter.keyTakeaways.length > 0 && (
          <div className={`bg-gradient-to-br ${purpleGradient} rounded-xl border ${purpleBorder} p-6 shadow-sm`}>
            <h3 className={`text-lg font-semibold ${textPrimary} mb-3`}>
              Key Takeaways
            </h3>
            <ul className="space-y-2">
              {chapter.keyTakeaways.map((takeaway, index) => (
                <li key={index} className={`flex items-start gap-2 text-sm ${textTertiary}`}>
                  <span className={`${purpleText} mt-1`}>→</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-8">
        <button className={`flex items-center gap-2 ${buttonPrimaryBg} text-white px-6 py-3 rounded-lg transition shadow-md`}>
          <Play className="w-5 h-5" />
          Continue Learning
        </button>
        <button className={`flex items-center gap-2 ${buttonSecondaryBg} ${buttonSecondaryText} border ${buttonSecondaryBorder} px-6 py-3 rounded-lg transition`}>
          Mark as Complete
        </button>
      </div>
    </div>
  );
};

export default ChapterView;