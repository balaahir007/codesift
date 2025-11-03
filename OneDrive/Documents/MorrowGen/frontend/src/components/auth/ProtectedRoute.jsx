import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../zustand/auth/useAuthStore";

// Define user roles


const ProtectedRoute = ({
  allowedRoles = [],
  redirectPath = "/login",
  children
}) => {
  const useAuthStore = create((set) => ({
    authUser: { role: "user", isAuthenticated: true }, // mock for testing
  }));
  // Not authenticated - redirect to login
  if (!authUser || !authUser.isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // Authenticated but doesn't have required role
  if (!allowedRoles.includes(authUser.role)) {
    const roleRedirects = {
      user: "/learnhub",
      teacher: "/teacher-dashboard",
      recruiter: "/recruiter-dashboard",
      admin: "/admin-panel/dashboard",
    };

    return <Navigate to={roleRedirects[authUser.role] || "/"} replace />;
  }

  // User has correct role - render the protected content
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
