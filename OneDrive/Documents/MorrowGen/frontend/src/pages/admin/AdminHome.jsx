import React, { useState } from 'react'
import AdminSlideBar from '../../components/admin/AdminSlideBar'
import { Outlet, useLocation } from 'react-router-dom'
import AdminNavbar from '../../components/admin/AdminNavbar'

const AdminHome = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    // hide navbar for course details pages
    const hideNavbar = location.pathname.includes("/admin-panel/course/");

    return (
        <div className="min-h-screen bg-backGray">
            {/* Mobile Sidebar Overlay */}
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

            {/* Main Content Area */}
            <div className="md:ml-64 transition-all duration-300">
                {/* Top Navigation */}
                {!hideNavbar && (
                    <div className="sticky top-0 z-30">
                        <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />
                    </div>
                )}

                {/* Page Content */}
                <div className="p-4 md:p-6">
                    <div className="w-full max-w-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHome 