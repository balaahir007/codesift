import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/ProtectedRoute";

// Auth Pages
import LoginForm from "../pages/auth/Login";
import RegisterForm from "../pages/auth/Register";

// Home
import Home from "../pages/Home";

// LearnHub Pages
import LearnHubLayout from "../pages/LearnHub/LearnHubLayout";
import CoursePage from "../pages/LearnHub/CoursePage";
import SessionPage from "../pages/LearnHub/SessionPage";
import DashboardPage from "../pages/LearnHub/DashboardPage";
import MenterShipPage from "../pages/LearnHub/MenterShipPage";
import DisplayCourseVideo from "../pages/LearnHub/DisplayCourseVideo";
import MockInterviewPage from "../pages/LearnHub/MockInterviewPage";
import MockInterviewEntry from "../pages/LearnHub/MockInterviewEntry";
import MockInterviewWithOpenSource from "../pages/LearnHub/MockInterviewWithOpenSource";
import StudentDashboard from "../pages/LearnHub/StudentDashboard";
import PlansPage from "../pages/LearnHub/PlansPage";
import CourseGenerationPage from "../pages/LearnHub/CourseGenerationPage";
import CourseDisplayComponent from "../components/learnhub/CourseDisplayComponent";
import CourseDetails from "../pages/LearnHub/CourseDetails";

// Study Space Pages
import CreateStudySpacePage from "../pages/LearnHub/group-study/CreateStudyGroupPage";
import Whiteboard from "../pages/LearnHub/study-space/Whiteboard";
import StudySpaceHome from "../pages/LearnHub/study-space/StudySpaceHome";
import StudySpace from "../pages/LearnHub/study-space/StudySpace";
import JoinStudySpace from "../components/learnhub/study-space/JoinStudySpace";
import StudySpacePosts from "../pages/LearnHub/study-space/StudySpacePosts";
import UserProfile from "../components/learnhub/study-space/UserProfile";
import StudySpacePost from "../components/learnhub/study-space/StudySpacePost";
import StudySpaceNotes from "../components/learnhub/study-space/StudySpaceNotes";
import StudySpaceWhiteBoard from "../components/learnhub/study-space/whiteboard/StudySpaceWhiteBoard";
import ScreenShareComponent from "../pages/LearnHub/study-space/ScreenShareComponent";
import MeetRoomPage from "../pages/LearnHub/meet/MeetRoomPage";
import StudySpaceResourcePage from "../pages/LearnHub/study-space/StudySpaceResourcePage";
import { StudySpacePool } from "../pages/LearnHub/study-space/StudySpacePool";

// Admin Pages
import AdminDashBoard from "../pages/admin/AdminDashBoard";
import SessionManagement from "../pages/admin/SessionManagement";
import AdminHome from "../pages/admin/AdminHome";
import Certification from "../pages/admin/Certification";
import AdminStudySpaceManagement from "../pages/admin/AdminStudySpaceManagement ";
import StudySpaceRequests from "../components/admin/StudySpaceRequests";
import CreateStudySpaceForm from "../components/admin/CreateStudySpaceForm";
import ResourceManagementAdmin from "../components/admin/ResourceManagementAdmin";
import CoursesPage from "../pages/admin/Course/CoursesPage";
import CourseCreatePage from "../pages/admin/Course/CreatePage";

// OpportuneSpace Pages
import JobsPage from "../pages/OpportuneSpace/JobsPage";
import InternshipPage from "../pages/OpportuneSpace/InternshipPage";
import HackathonPage from "../pages/OpportuneSpace/HackathonPage";
import CompaniesPage from "../pages/OpportuneSpace/CompaniesPage";
import JobDetails from "../components/opportuneSpace/jobs/JobDetails";

// Teacher Space Manage
import TeacherSpaceDashboard from '../pages/teacher/TeacherSpaceDashboard';

// Profile & Misc
import Profile from "../pages/auth/Profile";
import AdminCoursesPage from "../pages/admin/Course/CoursesPage";
import LearnHubHome from "../pages/LearnHub/LearnHubHome";
import ExploreSpaces from "../pages/LearnHub/study-space/ExploreSpaces";
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // ========================================
      // PUBLIC ROUTES
      // ========================================
      { path: "", element: <Home /> },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },

      // ========================================
      // ADMIN ROUTES (Protected)
      // ========================================
      {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "admin-panel",
            element: <AdminHome />,
            children: [
              { path: "session-management", element: <SessionManagement /> },
              { path: "dashboard", element: <AdminDashBoard /> },
              { path: "resourses", element: <ResourceManagementAdmin /> },
              { path: "course", element: <AdminCoursesPage /> },
              { path: "course/:id", element: <CourseCreatePage /> },
              { path: "studyspace", element: <AdminStudySpaceManagement /> },
              { path: "studyspace/requests/:spaceId", element: <StudySpaceRequests /> },
              { path: "certification", element: <Certification /> },
            ],
          },
        ],
      },

      // ========================================
      // TEACHER ROUTES (Protected)
      // ========================================
      {
        element: <ProtectedRoute allowedRoles={["teacher"]} />,
        children: [
          { path: "teacher-dashboard", element: <TeacherSpaceDashboard /> },
        ],
      },

      // ========================================
      // RECRUITER ROUTES (Protected)
      // ========================================
      {
        element: <ProtectedRoute allowedRoles={["recruiter"]} />,
        children: [
          { path: "recruiter-dashboard", element: <RecruiterDashboard /> },
        ],
      },

      // ========================================
      // USER/STUDENT ROUTES (Protected)
      // ========================================
      {
        element: <ProtectedRoute allowedRoles={["user"]} />,
        children: [
          {
            path: "learnhub",
            element: <LearnHubLayout />,
            children: [
              { path: "", element: <LearnHubHome /> },
              { path: "plans", element: <PlansPage /> },
              { path: "courses", element: <CoursePage /> },
              { path: "courses/:courseSlug", element: <CourseDetails /> },
              { path: "courses/:videoId", element: <DisplayCourseVideo /> },
              { path: "course-generation", element: <CourseGenerationPage /> },
              { path: "course-generation/:courseId", element: <CourseDisplayComponent /> },
              { path: "dashboard", element: <StudentDashboard /> },
              { path: "profile", element: <Profile /> },
              { path: "sessions", element: <SessionPage /> },
              { path: "mentorship", element: <MenterShipPage /> },
              { path: "mock-interview", element: <MockInterviewPage /> },
              { path: "mock-interview/:interviewName/:action", element: <MockInterviewEntry /> },
            ],
          },

          // Study Space Routes
          { path: "study-space", element: <StudySpaceHome /> },
          { path: "study-space/join/:inviteCode", element: <JoinStudySpace /> },
          {
            path: "study-space/:spaceId",
            element: <StudySpace />,
            children: [
              { path: "create", element: <CreateStudySpacePage /> },
              { path: "posts", element: <StudySpacePosts /> },
              { path: "resource", element: <StudySpaceResourcePage /> },
              { path: "notes", element: <StudySpaceNotes /> },
              { path: "pool", element: <StudySpacePool /> },
              { path: "whiteboard", element: <StudySpaceWhiteBoard /> },
              { path: "share-screen", element: <ScreenShareComponent /> },
              { path: "post/:postId", element: <StudySpacePost /> },
              { path: "user/:userId", element: <UserProfile /> },
              { path: "new-whiteboard/:WhiteboardId", element: <Whiteboard /> },
              { path: "meet/:meetId", element: <MeetRoomPage /> },
            ],
          },

          // Other User Routes
          { path: "newInterview", element: <MockInterviewWithOpenSource /> },
        ],
      },

      // ========================================
      // OPPORTUNESPACE ROUTES (Accessible to all authenticated users)
      // ========================================
      {
        element: <ProtectedRoute allowedRoles={[ "user"]} />,
        children: [
          { path: "jobs", element: <JobsPage /> },
          { path: "job-listings/:jobId", element: <JobDetails /> },
          { path: "internships", element: <InternshipPage /> },
          { path: "hackathons", element: <HackathonPage /> },
          { path: "companies", element: <CompaniesPage /> },
        ],
      },
    ],
  },
]);

export default router;