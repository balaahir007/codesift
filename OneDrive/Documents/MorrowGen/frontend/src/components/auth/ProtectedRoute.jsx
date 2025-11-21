import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../zustand/auth/useAuthStore";

const ProtectedRoute = ({ allowedRoles = [], redirectPath = "/login" }) => {
  const { authUser } = useAuthStore();
  console.log("🔍 ProtectedRoute -> authUser:", authUser);
  if (!authUser || !authUser.role) {
    return <Navigate to={redirectPath} replace />;
  }

  // Authenticated but invalid role
  if (!allowedRoles.includes(authUser.role)) {
    const roleRedirects = {
      user: "/learnhub",
      teacher: "/teacher/dashboard",
      recruiter: "/recruiter/dashboard",
      admin: "/admin-panel/dashboard",
    };

    return <Navigate to={roleRedirects[authUser.role] || "/"} replace />;
  }

  // ✅ Must return <Outlet> to show nested routes
  return <Outlet />;
};

export default ProtectedRoute;
