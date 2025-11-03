import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ChapterSlideBar from '../../components/learnhub/ChapterSlideBar';
import ChapterView from '../../components/learnhub/ChapterView';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import CourseCertificate from '../../components/learnhub/CourseCertificate';
import useAuthStore from '../../zustand/auth/useAuthStore';

const CourseDetails = () => {
  const { courseSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [courseId, setCourseId] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [chapterLoading, setChapterLoading] = useState(false);
  const [extendMenuOptions, setExtendMenuOptions] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const searchParams = new URLSearchParams(location.search);
  const currentSection = searchParams.get('section') || 'course-path';
  const chapterId = searchParams.get('chapter') || null;
  const [openItem, setOpenItem] = useState(currentSection);
  const [mainSection, assignmentId, subSection] = currentSection.split("/");    
  const [courseData, setCourseData] = useState(null);

  const [fetchCourseLoading, setFetchCourseLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setExtendMenuOptions(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchCourseData = async (id) => {
    setFetchCourseLoading(true);
    try {
      const res = await axiosInstance.get(`/course/${id}`);
      setCourseData(res.data.data);
    } catch (error) {
      setCourseData(null);
      toast.error('Failed to fetch course data');
    } finally {
      setFetchCourseLoading(false);
    }
  };

  const fetchChaptersAndProgress = async (id) => {
    try {
      setChapterLoading(true);
      console.log('Fetching chapters for courseId:', id);
      const res = await axiosInstance.get(`/course/${id}/attachments`);
      const fetchedChapters = res.data.data || [];
      console.log('Fetched Chapters:', fetchedChapters);
      setChapters(fetchedChapters);

      if (fetchedChapters.length > 0) {
        const totals = fetchedChapters.reduce(
          (acc, chapter) => {
            const progress = chapter.userProgress[0] || {
              watchedDuration: 0,
              totalDuration: 0
            };
            acc.watched += progress.watchedDuration;
            acc.total += progress.totalDuration;
            return acc;
          },
          { watched: 0, total: 0 }
        );

        const percent = totals.total
          ? Math.min(100, Math.round((totals.watched / totals.total) * 100))
          : 0;
        
        console.log("Calculated percentage:", percent);
        setProgress(percent);
      }
    } catch (error) {
      console.error('Error fetching chapters:', error);
      toast.error('Failed to fetch chapters');
      setChapters([]);
    } finally {
      setChapterLoading(false);
    }
  };

  useEffect(() => {
    if (courseSlug) {
      const id = courseSlug.split('=')[1];
      if (id) {
        setCourseId(id);
        fetchCourseData(id);
        fetchChaptersAndProgress(id);
        console.log('Extracted Course ID:', id);
      } else {
        console.error('Invalid courseSlug format:', courseSlug);
        toast.error('Invalid course URL');
      }
    }
  }, [courseSlug]);

  useEffect(() => {
    setOpenItem(currentSection);
  }, [currentSection]);

  useEffect(() => {
    if (courseId) {
      if (currentSection === 'certificate') {
        console.log('Refreshing progress for certificate section');
        fetchChaptersAndProgress(courseId);
      } else if (currentSection === 'course-path') {
        console.log('Refreshing chapters for course-path section');
        fetchChaptersAndProgress(courseId);
      }
    }
  }, [currentSection, courseId]);

  const handleChapterClick = (chapter) => {
    navigate(`/learnhub/courses/${courseSlug}?section=course-path&chapter=${chapter._id || chapter.id}`);
    if (isMobile) {
      setExtendMenuOptions(false);
    }
  };
  
  const { authUser } = useAuthStore();

  const renderSectionContent = () => {
    switch (currentSection) {
      case 'course-path':
        return (
          <>
            <ChapterView chapterId={chapterId} courseId={courseId} />
          </>
        );

      case 'certificate':
        return (
          <CourseCertificate 
            fetchCourseLoading={fetchCourseLoading} 
            courseId={courseId} 
            progress={progress} 
            title={courseData?.title} 
            userName={authUser?.username} 
            certificateThreshold={courseData?.certificateThreshold} 
          />
        );

      case 'discussions':
        return (
          <div className="max-w-5xl mx-auto text-center py-12 sm:py-20 px-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Discussions</h1>
            <div className="bg-white p-6 sm:p-10 rounded-lg shadow-sm inline-block">
              <p className="text-gray-600 text-base sm:text-lg mb-3">
                💬 We're currently working on the Discussions feature.
              </p>
              <p className="text-gray-500 text-sm">
                Soon, you'll be able to interact with other learners and share your thoughts here.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Course Details</h1>
            <p className="text-gray-600">Select a section from the sidebar</p>
          </div>
        );
    }
  };

  // Calculate margin based on sidebar state
  const getMarginLeft = () => {
    if (isMobile) return '0';
    return extendMenuOptions ? '373px' : '96px';
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <ChapterSlideBar
        openItem={openItem}
        setOpenItem={setOpenItem}
        chapters={chapters}
        chapterLoading={chapterLoading}
        extendMenuOptions={extendMenuOptions}
        setExtendMenuOptions={setExtendMenuOptions}
        onChapterClick={handleChapterClick}
        selectedChapterId={chapterId}
      />

      <div
        className="flex-1 p-3 sm:p-4 md:p-6 bg-gray-50 min-h-screen transition-all duration-300"
        style={{ marginLeft: getMarginLeft() }}
      >
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default CourseDetails;