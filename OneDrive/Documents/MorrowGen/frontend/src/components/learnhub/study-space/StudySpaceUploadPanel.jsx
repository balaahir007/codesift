
import useThemeStore from '../../../zustand/themeStore';
import PostForm from './PostForm';
import { X } from 'lucide-react';


const StudySpaceUploadPanel = ({ activeMenu, onClose }) => {
  const { mode } = useThemeStore(); // Get theme mode
  const selected = activeMenu.toLowerCase().trim();

  // Theme classes
  const bgOverlay = mode === 'dark' ? 'bg-black/50' : 'bg-white/40';
  const bgModal = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const closeHover = mode === 'dark' ? 'hover:text-red-400' : 'hover:text-red-500';
  const shadowClass = 'shadow-2xl';

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 ${bgOverlay} backdrop-blur-sm`}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-lg w-full bg-backGray p-6 rounded-lg shadow-lg">        {/* Close Button */}
        <button
          className={`absolute top-3 sm:top-4 right-3 sm:right-4 ${textSecondary} ${closeHover} transition-colors duration-200 p-1 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg`}
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Content */}
        <div className="mt-2">
          {selected === 'post' && <PostForm onClose={onClose} />}
        </div>
      </div>
    </>
  );
};

export default StudySpaceUploadPanel;