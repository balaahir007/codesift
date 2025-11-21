import React from "react";
import { CgProfile } from "react-icons/cg";
import {
    FaCheckCircle,
    FaRegBookmark,
    FaQuestionCircle,
    FaBriefcase,
    FaCog,
    FaChartLine,
    FaArrowRight,
    FaUsers,
} from "react-icons/fa";
import useAuthStore from "../../../zustand/auth/useAuthStore";
import { useNavigate } from "react-router-dom";
import useThemeStore from "../../../zustand/themeStore";

const ProfileDialogBox = React.forwardRef((props, ref) => {
        const { user = { name: "Balaji ", progress: 70 }, onClose } = props;

    const { authUser } = useAuthStore();
    const navigate = useNavigate();
    const { mode } = useThemeStore();

    const [progress, setProgress] = React.useState(user.progress || 0);

    authUser && React.useEffect(() => {
        let completedSteps = 0;
        if (authUser.resume) completedSteps += 1;
        if (authUser.skills && authUser.skills.length > 0) completedSteps += 1;
        if (authUser.githubUrl) completedSteps += 1;
        if (authUser.linkedinUrl) completedSteps += 1;
        if (authUser.mobileNumber) completedSteps += 1;

        const totalSteps = 5;
        const calculatedProgress = Math.min((completedSteps / totalSteps) * 100, 100);
        setProgress(calculatedProgress);
    })

    const menuItems = [
        { label: "My Profile", icon: <CgProfile className="text-base" />, path: 'profile', description: "View and edit" },
        { label: "My Applications", icon: <FaBriefcase className="text-base" />, path: 'applications', description: "Track status" },
        
        { label: "Saved", icon: <FaRegBookmark className="text-base" />, path: 'saved', description: "Bookmarked" },
        // { label: "Team Management", icon: <FaUsers className="text-base" />, path: 'team-management', description: "Manage team" },
        { label: "Settings", icon: <FaCog className="text-base" />, path: 'settings', description: "Preferences" },
    ];

    const cardBg = mode === "dark" ? "bg-[#1B2E31]" : "bg-white";
    const borderColor = mode === "dark" ? "border-[#243B3E]" : "border-gray-100";
    const textPrimary = mode === "dark" ? "text-white" : "text-gray-900";
    const textSecondary = mode === "dark" ? "text-gray-400" : "text-gray-500";
    const textTertiary = mode === "dark" ? "text-gray-500" : "text-gray-400";
    const hoverBg = mode === "dark" ? "hover:bg-[#0F1E20]" : "hover:bg-gray-50";
    const progressBg = mode === "dark" ? "bg-[#243B3E]" : "bg-gray-100";
    const sectionBg = mode === "dark" ? "bg-[#142528]" : "bg-gradient-to-br from-gray-50 to-gray-100/50";
    const dividerColor = mode === "dark" ? "border-[#243B3E]" : "border-gray-100";

    return (
        <div
            ref={ref}
            className={`fixed md:absolute ml-2 md:ml-0  top-13 right-0  w-[300px]  md:w-[360px] h-[90vh] md:h-auto md:max-h-[91vh] ${cardBg} shadow-2xl rounded-2xl md:rounded-2xl border-t md:border ${borderColor} z-50 overflow-y-auto transition-all duration-300 transform md:transform-none  'translate-y-full md:translate-y-0'
                `}        >
            {/* Header Section */}
            <div className={`relative px-5 pt-5 pb-4 ${mode === "dark" ? "bg-gradient-to-br from-[#142528] via-[#1B2E31] to-[#1B2E31]" : "bg-gradient-to-br from-white via-gray-50 to-gray-100/30"}`}>
                <div className="flex items-start gap-3 sm:gap-4">
                    {/* Profile Picture */}
                    <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ...">
                            <div className="w-full h-full rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden backdrop-blur-sm">
                                {authUser?.profilePicture ? (
                                    <img
                                        src={authUser.profilePicture}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <CgProfile className="text-2xl text-primary" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                        <h2 className={`text-sm sm:text-base font-bold ${textPrimary} mb-0.5 truncate`}>
                            {authUser?.username || user.name}
                        </h2>
                        <button
                            onClick={() => {
                                if (item.path) {
                                    navigate('/profile')
                                    onClose && onClose();  // CLOSE THE MENU POPUP
                                }
                            }}
                            className={`text-xs text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1 group transition-all`}
                        >
                            View Profile
                            <FaArrowRight className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Progress Section */}
                <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                        <span className={`text-[11px] font-semibold ${textSecondary} flex items-center gap-1.5 uppercase tracking-wider`}>
                            <FaChartLine className="text-primary text-xs" />
                            Profile Strength
                        </span>
                        <span className={`text-xs font-bold ${textPrimary} px-2 py-0.5 rounded-full ${mode === "dark" ? "bg-[#243B3E]" : "bg-white"}`}>
                            {progress}%
                        </span>
                    </div>
                    <div className={`relative w-full ${progressBg} rounded-full h-1.5 overflow-hidden shadow-inner`}>
                        <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-primary/80 rounded-full transition-all duration-700 ease-out shadow-sm"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                        </div>
                    </div>
                    <p className={`text-[10px] ${textTertiary}`}>
                        {user.progress >= 80 ? "Excellent! Your profile looks great" : "Complete your profile to get noticed"}
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className={`border-t ${dividerColor}`}></div>

            {/* Quick Status Card */}
            <div className="px-5 py-4">
                <div className={`rounded-xl p-3 sm:p-3.5 ${sectionBg} border ${borderColor} shadow-sm`}>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className={`text-[11px] sm:text-xs ${textPrimary} uppercase tracking-wider`}>
                            Profile Status
                        </h3>
                        <div className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${mode === "dark" ? "bg-[#1B2E31] text-green-400" : "bg-green-50 text-green-600"}`}>
                            2/3 Done
                        </div>
                    </div>
                    <ul className={`text-xs ${textSecondary} space-y-2`}>
                        <li className="flex items-center gap-2.5">
                            <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                <FaCheckCircle className="text-green-500 text-xs" />
                            </div>
                            <span className="font-medium">Resume Updated</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                <FaCheckCircle className="text-green-500 text-xs" />
                            </div>
                            <span className="font-medium">Skills Added</span>
                        </li>
                        <li className="flex items-center gap-2.5 opacity-50">
                            <div className={`w-5 h-5 rounded-full ${mode === "dark" ? "bg-[#243B3E]" : "bg-gray-200"} flex items-center justify-center flex-shrink-0`}>
                                <div className="w-2 h-2 rounded-full border-2 border-current"></div>
                            </div>
                            <span className="font-medium">Profile Summary Missing</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Divider */}
            <div className={`border-t ${dividerColor}`}></div>

            {/* Menu Options */}
            <div className="px-3 py-3">
                <div className="space-y-0.5 ov">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                if (item.path) {
                                    navigate(`/${item.path}`);
                                    onClose && onClose();  // CLOSE THE MENU POPUP
                                }
                            }}
                            className={`flex items-center gap-3 px-2.5 sm:px-3 py-2.5 
  rounded-xl ${hoverBg} cursor-pointer transition-all group 
  border border-transparent hover:border-primary/5 hover:shadow-sm`}                        >
                            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${mode === "dark" ? "bg-[#142528]" : "bg-gray-100"} flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-all`}>
                                <span className="text-primary group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className={`text-sm sm:text-base font-semibold ${textPrimary} truncate`}>
                                    {item.label}
                                </div>
                                <div className={`text-[9px] sm:text-[10px] ${textTertiary} truncate`}>
                                    {item.description}
                                </div>
                            </div>
                            <FaArrowRight className={`text-xs ${textTertiary} group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default ProfileDialogBox;