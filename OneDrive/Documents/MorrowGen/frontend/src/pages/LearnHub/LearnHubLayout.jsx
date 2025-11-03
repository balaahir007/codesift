import React, { useState, useEffect } from 'react';
import SlideMenu from '../../components/learnhub/SlideMenu';
import { Outlet, useLocation } from 'react-router-dom';

const LearnHubLayout = () => {
  const [extendMenuOptions, setExtendMenuOptions] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navbarHeight = 24;
  const location = useLocation();

  // detect course detail page (exclude /learnhub/courses)
  const isCourseDetailPage =
    location.pathname.startsWith("/learnhub/courses/") &&
    location.pathname !== "/learnhub/courses";

  const isInterviewGoing =
    location.pathname.includes('start') || location.pathname.includes('resume');

  // ✅ Collapse sidebar when visiting course detail or interview pages
  useEffect(() => {
    if (isCourseDetailPage || isInterviewGoing) {
      setExtendMenuOptions(false);
    } else {
      setExtendMenuOptions(true);
    }
  }, [isCourseDetailPage, isInterviewGoing]);

  // ✅ Handle responsive behaviour
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);

      if (width > 768 && width < 1228 && !isInterviewGoing && !isCourseDetailPage) {
        setExtendMenuOptions(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isInterviewGoing, isCourseDetailPage]);

  return (
    <div className="flex -ml-4 -mt-2 min-h-screen bg-gray-100 pt-16">
      {/* ✅ Hide sidebar on course details or mobile */}
        <SlideMenu
        isCourseDetailPage={isCourseDetailPage}
          extendMenuOptions={extendMenuOptions}
          isInterviewGoing={isInterviewGoing}
          setExtendMenuOptions={setExtendMenuOptions}
        />

      <div
        className="w-full transition-all duration-300 -ml-2 px-2"
        style={{
          marginLeft:
            isMobile || isCourseDetailPage
              ? 0
              : extendMenuOptions
              ? 224
              : 64,
          marginTop: navbarHeight,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default LearnHubLayout;
