import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSlideBar from "../../components/admin/AdminSlideBar";
import AdminNavbar from "../../components/admin/AdminNavbar";

const AdminHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Hide navbar in course section
  const hideNavbar = location.pathname.includes("/admin-panel/course/");

  return (
    <div className="min-h-screen w-full bg-backGray flex">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AdminSlideBar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Wrapper */}
      <div className="flex-1 md:ml-64 transition-all duration-300">

        {/* Top Navbar */}
        {!hideNavbar && (
          <div className="sticky top-0 z-30">
            <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />
          </div>
        )}

        {/* Page Content */}
        <div className="p-2 md:p-4">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default AdminHome;
