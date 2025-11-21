import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { HiMenuAlt3 } from "react-icons/hi";
import useThemeStore from "../../zustand/themeStore";
import useAuthStore from "../../zustand/auth/useAuthStore";

const TeacherNavbar = ({ extendMenu, setExtendMenu }) => {
    const { toggleTheme, mode } = useThemeStore();
    const { authUser } = useAuthStore();

    return (
        <nav
            className={`shadow transition-colors duration-300 border-b-1 ${
                mode === "dark" 
                    ? "bg-backGray border-secondary" 
                    : "bg-backGray border-[var(--elementBg-light)]"
            }`}
        >
            <div className="p-3 lg:px-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setExtendMenu(!extendMenu)}
                        className={`p-2 flex md:hidden rounded-md transition-colors duration-200 ${
                            mode === "dark"
                                ? "hover:bg-[var(--elementBg-hover-dark)] bg-[var(--elementBg-dark)]"
                                : "hover:bg-[var(--elementBg-hover-light)] bg-[var(--elementBg-light)]"
                        }`}
                        aria-label="Toggle menu"
                    >
                        <HiMenuAlt3
                            className={`text-2xl ${
                                mode === "dark" ? "text-gray-300" : "text-gray-700"
                            }`}
                        />
                    </button>

                    {/* Logo */}
                    <img
                        src={mode === "dark" ? "/darkLogo.png" : "/logo.png"}
                        alt="logo"
                        className="h-8 w-auto object-contain"
                    />
                </div>

                <div className="flex items-center gap-2 md:gap-3">
           

                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-md transition-colors duration-200 ${
                            mode === "dark"
                                ? "hover:bg-[var(--elementBg-hover-dark)] bg-[var(--elementBg-dark)]"
                                : "hover:bg-[var(--elementBg-hover-light)] bg-[var(--elementBg-light)]"
                        }`}
                        aria-label="Toggle theme"
                    >
                        {mode === "dark" ? (
                            <MdLightMode className="text-xl md:text-2xl text-gray-300" />
                        ) : (
                            <MdDarkMode className="text-xl md:text-2xl text-gray-700" />
                        )}
                    </button>

                    {/* Notifications */}
                    <button
                        className={`p-2 rounded-md transition-colors duration-200 cursor-pointer ${
                            mode === "dark"
                                ? "hover:bg-[var(--elementBg-hover-dark)] bg-[var(--elementBg-dark)]"
                                : "hover:bg-[var(--elementBg-hover-light)] bg-[var(--elementBg-light)]"
                        }`}
                        aria-label="Notifications"
                    >
                        <IoIosNotificationsOutline
                            className={`text-xl md:text-2xl ${
                                mode === "dark" ? "text-gray-300" : "text-gray-700"
                            }`}
                        />
                    </button>

                    {/* Profile */}
                    {authUser && authUser.profilePicture ? (
                        <img
                            src={authUser.profilePicture}
                            alt="Profile"
                            title="Profile"
                            className="size-8 md:size-10 cursor-pointer rounded-full object-cover"
                        />
                    ) : (
                        <button
                            className={`p-2 rounded-md transition-colors duration-200 cursor-pointer ${
                                mode === "dark"
                                    ? "bg-[var(--elementBg-dark)] hover:bg-[var(--elementBg-hover-dark)]"
                                    : "bg-[var(--elementBg-light)] hover:bg-[var(--elementBg-hover-light)]"
                            }`}
                            aria-label="Profile"
                        >
                            <CiUser
                                className={`text-xl md:text-2xl ${
                                    mode === "dark" ? "text-gray-300" : "text-gray-700"
                                }`}
                            />
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};


export default TeacherNavbar
