import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "./zustand/auth/useAuthStore";
import Spinner from "./layouts/Spinner";
import Navbar from "./layouts/Navbar";
import ScrollToTop from "./components/common/ScrollToTop";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStudySpacesStore from "./zustand/studySpaces/useStudySpaceStore";

const App = () => {
  const { isCheckingAuth, checkAuth, authUser, checkPremium } = useAuthStore();
  const location = useLocation();
  const isAdminPage = location.pathname.includes("admin-panel");
  const isCreateStudySpace = location.pathname.includes("study-space/create");
  const isStudySpace = location.pathname.includes("study-space");
  const isLearnHubPage = location.pathname.includes("learnhub");
  const isLoginOrRegisterPage = location.pathname.includes('login') || location.pathname.includes('register');
  const isTeacherDashboardPage = location.pathname.includes('teacher-dashboard')
  const isRecruiterDashboardPage = location.pathname.includes('recruiter-dashboard')
const  navigate = useNavigate()
  // Determine if navbar should be shown
  const showNavbar = !isAdminPage && !isStudySpace && !isCreateStudySpace && !isLoginOrRegisterPage && !isTeacherDashboardPage && !isRecruiterDashboardPage;

  useEffect(() => {
    const initAuth = async () => {
    if (!authUser) {
    await checkAuth();
    }
  };
  initAuth();
}, [checkAuth,authUser]);

  useEffect(() => {
    if (isCreateStudySpace) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isCreateStudySpace]);

  if (isCheckingAuth && !isStudySpace) return <Spinner />;

  return (
    <div className="w-full min-h-screen flex flex-col">
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={2000} />
      {/* Fixed Navbar */}
      {showNavbar && (
        <nav className={`w-full fixed top-0 left-0 z-50 ${isLearnHubPage ? "bg-white shadow-md" : "bg-white"}`}>
          <Navbar />
        </nav>
      )}

      {/* Main Content with proper top spacing */}
      <main className={`
        flex-1 
        ${showNavbar && !isStudySpace && !isLearnHubPage ? 'pt-16' : 'pt-1'} 
        ${isAdminPage ? "p-6 bg-gray-50" : "bg-gray-50"}
      `}>
        <Outlet />
      </main>
    </div>
  );
};

export default App;