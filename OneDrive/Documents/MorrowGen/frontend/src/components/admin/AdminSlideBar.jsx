import React from 'react';
import { FaTachometerAlt, FaCalendarAlt, FaBook,  FaTimes , FaBookOpen, FaChalkboardTeacher, FaCertificate,FaGraduationCap    } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';


const menuOptions = [
  { 
    label: 'Dashboard', 
    icon: <FaTachometerAlt className="w-5 h-5" />, 
    path: '/admin-panel/dashboard' 
  },
  { 
    label: 'Session Management', 
    icon: <FaCalendarAlt className="w-5 h-5" />, 
    path: '/admin-panel/session-management' 
  },
  { 
    label: 'Courses',   // simpler & cleaner
    icon: <FaGraduationCap className="w-5 h-5" />, 
    path: '/admin-panel/course' 
  },
  { 
    label: 'Resources',  // was duplicate, now unique
    icon: <FaBookOpen className="w-5 h-5" />, 
    path: '/admin-panel/resourses' 
  },
  { 
    label: 'Study Spaces', 
    icon: <FaChalkboardTeacher className="w-5 h-5" />, 
    path: '/admin-panel/studyspace' 
  },
  { 
    label: 'Certifications', 
    icon: <FaCertificate className="w-5 h-5" />, 
    path: '/admin-panel/certification' 
  },
];


const AdminSlideBar = ({ isOpen, onClose }) => {
    const location = useLocation();

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex-col z-30 shadow-sm">
                {/* Logo/Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-center bg-primary100 rounded-lg p-3">
                        <h1 className="text-lg font-bold text-primary">Admin Panel</h1>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {menuOptions.map(({ label, icon, path }) => {
                            const isActive = location.pathname === path || 
                                           (path !== '/admin-panel/dashboard' && location.pathname.startsWith(path));
                            
                            return (
                                <li key={label}>
                                    <Link
                                        to={path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                                            isActive 
                                                ? 'bg-primary text-white shadow-sm' 
                                                : 'text-gray-700 hover:bg-primary100 hover:text-primary'
                                        }`}
                                    >
                                        <span className={`transition-colors ${
                                            isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary'
                                        }`}>
                                            {icon}
                                        </span>
                                        <span className="font-medium text-sm">{label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500 text-center">
                        <p>Admin Panel v1.0</p>
                        <p className="mt-1">© 2024 Your Company</p>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className={`md:hidden fixed left-0 top-0 h-full w-64 bg-white transform transition-transform duration-300 z-50 shadow-lg ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                {/* Mobile Header with Close Button */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center justify-center bg-primary100 rounded-lg p-2 flex-1 mr-3">
                        <h1 className="text-lg font-bold text-primary">Admin Panel</h1>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {menuOptions.map(({ label, icon, path }) => {
                            const isActive = location.pathname === path || 
                                           (path !== '/admin-panel/dashboard' && location.pathname.startsWith(path));
                            
                            return (
                                <li key={label}>
                                    <Link
                                        to={path}
                                        onClick={onClose}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                                            isActive 
                                                ? 'bg-primary text-white shadow-sm' 
                                                : 'text-gray-700 hover:bg-primary100 hover:text-primary'
                                        }`}
                                    >
                                        <span className={`transition-colors ${
                                            isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary'
                                        }`}>
                                            {icon}
                                        </span>
                                        <span className="font-medium text-sm">{label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default AdminSlideBar;
