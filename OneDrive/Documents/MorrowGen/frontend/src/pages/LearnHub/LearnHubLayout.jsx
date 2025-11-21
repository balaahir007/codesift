import React, { useState, useEffect } from 'react';
import SlideMenu from '../../components/learnhub/SlideMenu';
import { Outlet, useLocation } from 'react-router-dom';
import useThemeStore from '../../zustand/themeStore';

const LearnHubLayout = () => {
  const [extendMenuOptions, setExtendMenuOptions] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navbarHeight = 0;
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

  const {mode} = useThemeStore()

  return (
    <div className="flex -ml-4  min-h-screen bg-backGray pt-16">
      {/* ✅ Hide sidebar on course details or mobile */}
        <SlideMenu
        isCourseDetailPage={isCourseDetailPage}
          extendMenuOptions={extendMenuOptions}
          isInterviewGoing={isInterviewGoing}
          mode={mode}
          setExtendMenuOptions={setExtendMenuOptions}
        />

      <div
        className="w-full relative transition-all duration-300 translate-x-2 md:translate-x-0  "
        style={{
          marginLeft:
            isMobile || isCourseDetailPage
              ? 0
              : extendMenuOptions
              ? 224
              : 64,
          marginTop: '',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default LearnHubLayout;
