import React, { useEffect, useState } from 'react'
import getDaysLeft from '../../helpers/getDaysLeft';

import { Calendar, MapPin, Users, Trophy, Clock, ArrowRight, Filter, Search, Heart } from "lucide-react";
import useThemeStore from '../../zustand/themeStore';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

import { showError, showSuccess } from '../../utils/toast.js'
import { extractErrorMessage } from '../../utils/errorHandler.js'


const HackathonCard = ({ filteredHackathons = [], filters = {} }) => {


    const handleDaysLeft = (endDate) => {
        const time = getDaysLeft(endDate);
        return (
            time.yearsAge > 0
                ? `${time.yearsAge} year${time.yearsAge > 1 ? 's' : ''} ago`
                : time.monthsAge > 0
                    ? `${time.monthsAge} month${time.monthsAge > 1 ? 's' : ''} ago`
                    : time.daysLeft > 0
                        ? `${time.daysLeft} days left`
                        : 'Expired'
        )
    }

    const { mode } = useThemeStore()


    const bgPrimary = mode === 'dark' ? 'bg-[#0A1215]' : 'bg-gray-50';
    const bgCard = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
    const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-800';
    const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
    const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
    const hoverBg = mode === 'dark' ? 'hover:bg-[#0F1E20]' : 'hover:bg-gray-50';
    const headerBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-white';


    const navigate = useNavigate()

    const handleNavigate = () => {

    }


    const [savedItems, setSavedItems] = useState({});

    useEffect(() => {
        if (filteredHackathons.length > 0) {
            const newSavedState = {};
            filteredHackathons.forEach((hack) => {
                newSavedState[hack.id] =
                    hack.SavedItems && hack.SavedItems.length > 0;
            })
            setSavedItems(newSavedState);

        }
    }, [filteredHackathons])

    // useEffect(() => {
    //     if (jobInfo?.SavedItems) {
    //         setIsSaved(jobInfo.SavedItems.length > 0);
    //     }
    // }, [jobInfo]);
    const savedItem = async (itemType, itemId, e) => {
        e.stopPropagation()
        try {
            const payload = { itemType, itemId }
            await axiosInstance.post('/saved-items/save', payload)
            const newSaved = savedItems[itemId] || false;
            if (!newSaved) {
                showSuccess("Item saved successfully")
            }
            setSavedItems((prev) => ({
                ...prev,
                [itemId]: !prev[itemId]
            }));
        } catch (error) {
            const msg = extractErrorMessage(error)
            showError(msg)
        }
    }

    const toSlug = (text) =>
        text
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "");

    return (
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-5 sm:gap-6 px- sm:px-6 lg:px-8 py-6 sm:py-8">
            {filteredHackathons.length === 0 ? (
                <div className={`text-center py-12 sm:py-16 ${textSecondary}`}>
                    <p className="text-base sm:text-lg">No hackathons found matching your criteria</p>
                </div>
            ) : (
                filteredHackathons.map((hack) => (
                    <div
                        onClick={() =>
                            navigate(`/hackathons/${hack?.id}/?${toSlug(hack?.title)}`)
                        }
                        key={hack.id}
                        className={`${bgCard} flex flex-col md:flex-row rounded-xl p-4 sm:p-5 border ${borderColor} hover:border-[#0097B2]/40 transition-all duration-300 cursor-pointer`}
                    >
                        {/* Banner Image */}
                        <div
                            className={`${mode === "dark" ? "" : "border border-backGray"} rounded-xl bg-backGray flex items-center justify-center overflow-hidden h-36 sm:h-28 w-full md:w-32 shrink-0 mb-4 md:mb-0`}
                        >
                            <img
                                src={hack.logo || "/default-banner.jpg"}
                                alt={hack.title}
                                className="object-contain h-full w-full"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 md:px-5">
                            <div className='flex items-center mb-1 mt-1 justify-between '>
                                <h2 className={`text-lg sm:text-xl font-semibold ${textPrimary} mb-1`}>
                                    {hack.title}
                                </h2>
                                <button
                                    onClick={(e) => savedItem('hackathon', hack?.id, e)}
                                    className={`h-9 w-9 flex items-center justify-center rounded-lg ${hoverBg} ${textSecondary} transition-all`}
                                    title="Save Hackathon"
                                >
                                    <Heart
                                        className={`w-4 h-4 md:w-5 md:h-5 
        ${savedItems[hack.id] ? "fill-[var(--primary)] text-[var(--primary)]" : ""}
    `}
                                    />
                                </button>
                            </div>
                            <p className={`text-sm ${textSecondary} mb-3 line-clamp-2`}>
                                {hack.description}
                            </p>

                            {/* Info */}
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 text-xs sm:text-sm">
                                <div className="flex items-center gap-1">
                                    <Users className={`w-4 h-4 ${textSecondary}`} />
                                    <span>{hack.registrationCount} Registered</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className={`w-4 h-4 ${textSecondary}`} />
                                    <span className="truncate max-w-[120px] sm:max-w-[150px]">{hack.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className={`w-4 h-4 ${textSecondary}`} />
                                    <span>{handleDaysLeft(hack.endDate)}</span>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {hack?.tags?.slice(0, 3).map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className={`px-2 py-0.5 rounded text-xs ${mode === "dark"
                                            ? "bg-backGray text-white/80"
                                            : "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] sm:text-xs">
                                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                                    <span className={`${textSecondary} font-light`}>
                                        Posted on{" "}
                                        {new Date(hack.startDate).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                    <span className="text-gray-400 hidden sm:inline">•</span>
                                    <span className={`${textSecondary} font-light`}>
                                        {hack?.impression || "0"} Impressions
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>

    )
}

export default HackathonCard
