import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, RefreshCw, LogIn } from 'lucide-react';
import useAuthStore from '../../zustand/auth/useAuthStore';

const StudySpaceError = ({ error, onRetry }) => {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();
  const { authUser, checkAuth, logout } = useAuthStore();

  const isAuthError = error?.errorCode === "NO_TOKEN" ||
    error?.errorCode === 'USER_NOT_FOUND' ||
    error?.errorCode === 'INVALID_TOKEN';

  // Give some time for token refresh before showing login prompt
  useEffect(() => {
    if (isAuthError && retryCount < 2) {
      const timer = setTimeout(() => {
        setRetryCount(prev => prev + 1);
        console.log("stdmjk jsk fd")
        checkAuth(); // Try to refresh auth
      }, 1000);

      return () => clearTimeout(timer);
    } else if (isAuthError && retryCount >= 2) {
      setShowLoginPrompt(true);
    }
  }, [isAuthError, retryCount, checkAuth]);

  const handleRetry = async () => {
    setRetryCount(0);
    setShowLoginPrompt(false);
    if (onRetry) {
      await onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoToLogin = () => {
    logout(); // Clear any invalid auth state
    navigate('/login');
  };

  const handleStayOnPage = () => {
    setShowLoginPrompt(false);
    setRetryCount(0);
  };

  // Show login prompt for auth errors after retries
  if (isAuthError && showLoginPrompt) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Authentication Required
            </h3>

            <p className="text-gray-600 mb-6">
              Your session has expired or there's an authentication issue.
              Please log in again to continue.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleGoToLogin}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Go to Login
              </button>

              <button
                onClick={handleRetry}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>

              <button
                onClick={handleStayOnPage}
                className="w-full px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors text-sm"
              >
                Stay on this page
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading during retry attempts
  if (isAuthError && retryCount > 0 && !showLoginPrompt) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Handle other error types
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-yellow-600" />
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {getErrorTitle(error?.errorCode)}
          </h3>

          <p className="text-gray-600 mb-6">
            {getErrorMessage(error?.errorCode)}
          </p>

          <div className="space-y-3">
            <button
              onClick={handleRetry}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>

            <button
              onClick={() => navigate('/learnhub')}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Go to Learn Hub
            </button>
          </div>

          {error?.message && (
            <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-500">
              Error Details: {error.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getErrorTitle = (errorCode) => {
  switch (errorCode) {
    case 'STUDY_SPACE_NOT_FOUND':
      return 'Study Space Not Found';
    case 'INTERNAL_SERVER_ERROR':
      return 'Server Error';
    case 'NETWORK_ERROR':
      return 'Connection Error';
    case 'ACCESS_DENIED':
      return 'Access Denied';
    default:
      return 'Something went wrong';
  }
};

const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'STUDY_SPACE_NOT_FOUND':
      return 'The study space you\'re looking for doesn\'t exist or you don\'t have access to it.';
    case 'INTERNAL_SERVER_ERROR':
      return 'We\'re experiencing some technical difficulties. Please try again in a moment.';
    case 'NETWORK_ERROR':
      return 'Please check your internet connection and try again.';
    case 'ACCESS_DENIED':
      return 'You don\'t have permission to access this study space.';
    default:
      return 'An unexpected error occurred. Please try refreshing the page.';
  }
};

export default StudySpaceError;