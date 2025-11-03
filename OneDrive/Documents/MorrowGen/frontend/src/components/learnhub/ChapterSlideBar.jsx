import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircleQuestion,
  FileText,
  X,
  Menu,
} from "lucide-react";
import { GoPlay } from "react-icons/go";
import { TbCertificate } from "react-icons/tb";
import { GiGraduateCap } from "react-icons/gi";

const ChapterSlideBar = ({
  openItem,
  setOpenItem,
  chapters = [],
  chapterLoading = false,
  extendMenuOptions,
  setExtendMenuOptions,
  onChapterClick,
  selectedChapterId
}) => {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { icon: <GiGraduateCap size={20} />, label: "Course Path", slug: "course-path" },
    { icon: <TbCertificate size={20} />, label: "Certificate", slug: "certificate" },
    { icon: <MessageCircleQuestion size={20} />, label: "Discussions", slug: "discussions" },
  ];

  const handleMenuClick = (slug) => {
    if (slug === 'course-path') {
      setExtendMenuOptions(true);
    } else {
      setExtendMenuOptions(false);
    }
    setOpenItem(slug);
    navigate(`/learnhub/courses/${courseSlug}?section=${slug}`);
  };

  const handleChapterClick = (chapter) => {
    if (onChapterClick) {
      onChapterClick(chapter);
    }
    setMobileMenuOpen(false);
  };

  const getPercentage = (chapter) => {
    if (!chapter.userProgress.length) return 0;
    const { watchedDuration, totalDuration } = chapter.userProgress[0];
    return Math.min(100, Math.round((watchedDuration / totalDuration) * 100));
  };

  const renderContent = () => {
    switch (openItem) {
      case "course-path":
        return (
          <div className="mt-4">
            <h3 className="text-xs sm:text-sm font-semibold mb-2 text-gray-600">
              Chapters
            </h3>
            {chapterLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-16 bg-gray-200 rounded-md"></div>
                  </div>
                ))}
              </div>
            ) : chapters.length > 0 ? (
              <ul className="space-y-2">
                {chapters.map((chapter, i) => {
                  const chapterId = chapter._id || chapter.id;
                  const isSelected = selectedChapterId === chapterId;

                  return (
                    <li
                      key={chapter.id || i}
                      onClick={() => handleChapterClick(chapter)}
                      className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-4 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-200 group mb-2
                        ${isSelected
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-white hover:bg-primary100 border border-gray-100 hover:border-primary200'
                        }`}
                    >
                      <div
                        className={`flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-full transition-all duration-200 flex-shrink-0
                          ${isSelected
                            ? 'bg-white text-primary'
                            : 'bg-primary100 text-primary group-hover:bg-primary200'
                          }`}
                      >
                        <GoPlay size={16} className="sm:w-5 sm:h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-semibold text-xs sm:text-sm truncate mb-1 sm:mb-2 ${
                            isSelected ? 'text-white' : 'text-gray-800'
                          }`}
                        >
                          {chapter.title || `Chapter ${i + 1}`}
                        </p>

                        <div
                          className={`w-full h-1 sm:h-1.5 rounded-full overflow-hidden ${
                            isSelected ? 'bg-white/20' : 'bg-gray-100'
                          }`}
                        >
                          <div
                            className={`h-full transition-all duration-300 rounded-full ${
                              isSelected ? 'bg-white' : 'bg-secondary'
                            }`}
                            style={{ width: `${getPercentage(chapter)}%` }}
                          ></div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="text-xs text-gray-500 p-2 sm:p-3 bg-gray-50 rounded-md text-center">
                No chapters available
              </div>
            )}
          </div>
        );

      case "certificate":
        return (
          <div className="mt-4">
            <h3 className="text-xs sm:text-sm font-semibold mb-2 text-gray-600">
              Certificate
            </h3>
            <p className="text-xs text-gray-500">Complete the course to earn your certificate</p>
          </div>
        );

      case "discussions":
        return (
          <div className="mt-4">
            <h3 className="text-xs sm:text-sm font-semibold mb-2 text-gray-600">
              Discussions
            </h3>
            <p className="text-xs text-gray-500">Join the course discussion forum</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Desktop View - Main Sidebar (w-16) */}
      <div className="hidden md:flex fixed top-16 left-0 lg:left-16 z-40 h-[calc(100vh-4rem)] w-16 bg-white border-r border-gray-200 flex-col shadow-md">
        <div className="flex-1 overflow-y-auto flex flex-col items-center py-6 gap-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleMenuClick(item.slug)}
              className={`flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer transition-all duration-200 ${
                openItem === item.slug
                  ? "bg-primary text-white shadow-md"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              title={item.label}
            >
              {item.icon}
            </div>
          ))}
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setExtendMenuOptions(!extendMenuOptions)}
          className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          title={extendMenuOptions ? "Collapse sidebar" : "Expand sidebar"}
        >
          {extendMenuOptions ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Desktop View - Extended Content Panel */}
      <div
        className={`hidden md:block fixed top-16 left-16 lg:left-32 z-30 h-[calc(100vh-4rem)] bg-white shadow-md border-r border-gray-200 transition-all duration-300 overflow-hidden ${
          extendMenuOptions ? "w-64" : "w-0"
        }`}
      >
        <div
          className={`h-full overflow-y-auto p-3 sm:p-4 ${
            extendMenuOptions ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          {openItem && renderContent()}
        </div>
      </div>

      {/* Mobile View - Floating Menu Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="bg-primary text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition flex items-center justify-center"
          aria-label="Open course menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile View - Slide-in Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-in Panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-80 bg-white shadow-2xl transform transition-transform duration-300 md:hidden overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">Course Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              {menuItems.map((item, index) => (
                <div key={index} className="mb-4">
                  <div
                    onClick={() => handleMenuClick(item.slug)}
                    className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      openItem === item.slug
                        ? "bg-primary text-white shadow-md"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>

                  {/* Render content if menu item is selected */}
                  {openItem === item.slug && (
                    <div className="ml-2 mt-2 pl-2 border-l-2 border-gray-200">
                      {renderContent()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChapterSlideBar;