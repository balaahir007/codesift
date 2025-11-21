import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { BiSearch } from 'react-icons/bi';
import { MdPerson } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import NewMeetButton from './NewMeetButton';
import useStudySpacesStore from '../../../zustand/studySpaces/useStudySpaceStore';
import useAuthStore from '../../../zustand/auth/useAuthStore';
import InviteLinkInput from './InviteLinkInput';
import meetClientService from '../../../services/meetClientService';
import { useNavigate } from 'react-router-dom';
import useThemeStore from '../../../zustand/themeStore';
import { BsSun, BsMoon } from 'react-icons/bs';

const StudySpaceNavBar = ({ spaceAdmin, memberCount, inviteCode, spaceId }) => {


    const { mode ,toggleTheme} = useThemeStore()
    const [openCopyBtn, setOpenCopyBtn] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate()

    const { authUser } = useAuthStore()

    const isUser_Admin = Number(spaceAdmin) === Number(authUser?.id);

    const shareScreen = async () => {
        if (spaceId && authUser?.id) {
            const meetData = await meetClientService.createNewMeet(spaceId, authUser?.id);
            navigate(`meet/${meetData.id}`)
        }
    };

    const bgPrimary = mode === 'dark' ? 'bg-[#0A1415]' : 'bg-gray-50';
    const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
    const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
    const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
    const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
    const accentBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-100';

    return (
        <div className={`w-full h-14 bg-backGray border-b ${borderColor} relative px-2 sm:px-4 flex items-center justify-between`}>
            {/* Left Section */}
            <div className="flex items-center gap-1 sm:gap-2">
                <span className="w-7 h-7 bg-primary text-white flex items-center justify-center rounded-md text-sm font-medium">
                    {authUser?.email?.[0]?.toUpperCase() || 'U'}
                </span>
                <div className={`hidden sm:flex items-center gap-1 text-sm ${textPrimary}`}>
                    <span className="font-medium">Study Space</span>
                    <IoIosArrowDown className="text-xs" />
                </div>
            </div>

            {/* Search Box */}
            <div
                className={`${accentBg} px-2 py-1 rounded-md flex items-center gap-2 transition-all duration-300 ease-in-out ${isFocused ? 'w-32 sm:w-48 lg:w-64' : 'w-24 sm:w-40 lg:w-52'
                    }`}
            >
                <BiSearch className={`text-base ${textSecondary}`} />
                <input
                    type="text"
                    placeholder="Search"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`bg-transparent outline-none text-sm ${textPrimary} placeholder:${textSecondary} w-full`}
                />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-1 sm:gap-2">
                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className={`${accentBg} h-7 w-7 flex items-center justify-center rounded-md cursor-pointer ${mode === 'dark' ? 'hover:bg-[#1B2E31]' : 'hover:bg-gray-200'
                        } transition`}
                    aria-label="Toggle theme"
                >
                    {mode === 'dark' ? (
                        <BsSun className={`text-sm ${textPrimary}`} />
                    ) : (
                        <BsMoon className={`text-sm ${textPrimary}`} />
                    )}
                </button>

                {isUser_Admin && (
                    <div className="hidden sm:block">
                        <NewMeetButton shareScreen={shareScreen} />
                    </div>
                )}

                {/* Members */}
                <div className={`flex items-center gap-1 ${accentBg} h-7 px-2 rounded-md text-xs ${textPrimary}`}>
                    <MdPerson className="text-sm" />
                    <span className="font-semibold">{memberCount || 0}</span>
                </div>

                {/* Invite Button */}
                <div
                    onClick={() => setOpenCopyBtn(true)}
                    className={`flex items-center gap-1 ${accentBg} h-7 px-2 rounded-md text-xs ${textPrimary} cursor-pointer ${mode === 'dark' ? 'hover:bg-[#1B2E31]' : 'hover:bg-gray-200'
                        } transition`}
                >
                    <FaPlus className="text-[10px]" />
                    <span className="hidden sm:inline font-semibold">Invite</span>
                </div>

                {openCopyBtn && (
                    <div className={`fixed sm:absolute top-16 left-1/2 sm:left-auto sm:right-4 transform -translate-x-1/2 sm:translate-x-0 z-50 ${cardBg} shadow-lg border ${borderColor} rounded-lg`}>
                        <InviteLinkInput inviteCode={inviteCode} />
                    </div>
                )}

                {/* Create New Space (admin only) */}
                {isUser_Admin && (
                    <div
                        onClick={() => navigate('/admin-panel/studyspace')}
                        className="hidden md:flex bg-primary text-white text-xs font-medium h-7 px-3 items-center rounded-md cursor-pointer hover:opacity-90 transition"
                    >
                        New Space
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudySpaceNavBar;
