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

const StudySpaceNavBar = ({ spaceAdmin, memberCount, inviteCode, spaceId }) => {
    

    const [openCopyBtn, setOpenCopyBtn] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate()

    const {authUser} = useAuthStore()

    const isUser_Admin = Number(spaceAdmin) === Number(authUser?.id);

        const shareScreen = async() => {
            if (spaceId && authUser?.id) {
                const meetData = await meetClientService.createNewMeet(spaceId, authUser?.id);
                navigate(`meet/${meetData.id}`)
            }
        };

    return (
        <div className="w-full h-14 bg-white border-b border-gray-200 relative px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="w-7 h-7 bg-primary text-white flex items-center justify-center rounded-md text-sm font-medium">
                    {authUser?.email?.[0]?.toUpperCase() || 'U'}
                </span>
                <div className="flex items-center gap-1 text-sm text-gray-800">
                    <span className="font-medium">Study Space</span>
                    <IoIosArrowDown className="text-xs" />
                </div>
            </div>

            {/* Search Box */}
            <div
                className={`bg-backGray px-2 py-1 rounded-md flex items-center gap-2 transition-all duration-300 ease-in-out ${isFocused ? 'w-64 lg:w-72' : 'w-40 lg:w-62'
                    }`}
            >
                <BiSearch className="text-base text-gray-600" />
                <input
                    type="text"
                    placeholder="Search"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="bg-transparent outline-none text-sm text-gray-700 w-full"
                />
            </div>

            <div className="flex items-center gap-2">

                {isUser_Admin && (
                    <NewMeetButton shareScreen={shareScreen} />
                )}
                {/* Members */}
                <div className="flex items-center gap-1 bg-backGray h-7 px-2 rounded-md text-xs text-gray-700">
                    <MdPerson className="text-sm" />
                    <span className="font-semibold">{memberCount || 0}</span>
                </div>

                <div
                    onClick={() => setOpenCopyBtn(true)}
                    className="flex items-center gap-1 bg-backGray h-7 px-2 rounded-md text-xs text-gray-700 cursor-pointer hover:bg-gray-200 transition"
                >
                    <FaPlus className="text-[10px]" />
                    <span className="font-semibold">Invite</span>
                </div>
                {openCopyBtn && (
                    <div className="absolute top-16 right-1/40 transform -translate-x-1/3 z-50 bg-white shadow-lg border border-gray-200 rounded-lg">
                        <InviteLinkInput inviteCode={inviteCode} />
                    </div>
                )}

                {/* Create New Space (admin only) */}
                {isUser_Admin && (
                    <div onClick={()=>navigate('/admin-panel/studyspace')} className="bg-primary text-white text-xs font-medium h-7 px-3 flex items-center rounded-md cursor-pointer hover:opacity-90 transition">
                        New Space
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudySpaceNavBar;
