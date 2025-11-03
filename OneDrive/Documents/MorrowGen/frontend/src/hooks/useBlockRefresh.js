import { useEffect } from 'react';

const useBlockRefresh = (setShowRefreshModal) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Detect Ctrl+R or F5
      if ((e.key === 'r' && e.ctrlKey) || e.key === 'F5') {
        e.preventDefault();
        sessionStorage.setItem('refreshAttempted', 'true'); // Flag for reload detection
        setShowRefreshModal(true);
      }
    };

    const handlePopState = () => {
      // Prevent back navigation, show modal
      window.history.pushState(null, null, window.location.pathname);
      setShowRefreshModal(true);
    };

    const handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = ''; // required for Chrome to trigger dialog
  };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [setShowRefreshModal]);
};

export default useBlockRefresh;
