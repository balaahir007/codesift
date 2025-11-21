import React, { useEffect, useState } from 'react';
import { Code2 } from "lucide-react"; // You can change to any icon
import { Cpu } from "lucide-react"; // You can change icon to Code2, Sparkles, etc.
import useThemeStore from '../../zustand/themeStore';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance'
import { Heart, HeartOff, ExternalLink, UserPlus, LogIn } from "lucide-react";

const HackathonDetailPage = () => {

    const { mode } = useThemeStore()

    const [isSaved, setIsSaved] = useState();

    const navigate = useNavigate()
    const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
    const sectionBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50';
    const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
    const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
    const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
    const bgPrimary = mode === 'dark' ? 'bg-[#0A1415]' : 'bg-gray-50';
    const hoverBg = mode === "dark" ? "hover:bg-[#0F1E20]" : "hover:bg-gray-100";

    const { id } = useParams()


    const handleRegsiterAndJoin = (type, name) => {
        if (!name) return;
        if (type === 'register') {
            navigate(`/hackathons/${id}-${name}/register`)
        } else {
            navigate(`/hackathons/${id}-${name}/join`)

        }
    }
    const [loading, setLoading] = useState(false)
    const [hackathonData, setHackathonData] = useState([])
    useEffect(() => {
        const getHackathonById = async () => {
            try {
                const res = await axiosInstance.get(`/hackathons/${id}`)
                console.log("hackathon Data : ", res.data)
                if (res.data) {
                    setHackathonData(res.data.data)
                }

            } catch (error) {

            }
        }
        getHackathonById()
    }, [id])

    useEffect(() => {
        if (hackathonData?.SavedItems) {
            setIsSaved(hackathonData.SavedItems.length > 0)
        }
    })
    // const hackathon = {
    //     title: 'InnovateX Hackathon 2025',
    //     description:
    //         'A global hackathon for developers, designers, and innovators to build impactful tech solutions.',
    //     longDescription:
    //         'Join the InnovateX Hackathon 2025 — a 5-day virtual event bringing together the brightest minds in technology. Compete in exciting challenges, network with mentors, and win prizes worth over $10,000!',
    //     type: 'virtual',
    //     location: 'Online',
    //     venue: 'Zoom / Discord Channels',
    //     logo: 'https://via.placeholder.com/120?text=InnovateX',
    //     bannerImage: './images/darkBanner.png',
    //     startDate: '2025-12-01',
    //     endDate: '2025-12-05',
    //     registrationStartDate: '2025-11-15',
    //     registrationDeadline: '2025-11-30',
    //     maxParticipants: '500',
    //     minTeamSize: '1',
    //     maxTeamSize: '4',
    //     prizePool: '$10,000',
    //     tags: ['AI', 'Web3', 'Sustainability', 'FinTech'],
    //     difficulty: 'intermediate',
    //     themes: ['Sustainability', 'Education', 'Healthcare', 'FinTech'],
    //     eligibility: 'Open to all students and professionals worldwide',
    //     rules:
    //         'Teams must submit projects before the deadline. All code must be original. Plagiarism leads to disqualification.',
    //     contactEmail: 'support@innovatex.com',
    //     websiteUrl: 'https://www.innovatexhackathon.com',
    //     discordUrl: 'https://discord.gg/innovatex',
    //     slackUrl: 'https://innovatex.slack.com',
    //     registrationCount: 342,
    // };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };



    const daysRemaining = () => {
        const end = new Date(hackathonData.endDate);
        const today = new Date();
        const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
        return diff > 0 ? `${diff} days left` : 'Ended';
    };

    const InfoCard = ({ icon, label, value }) => (
        <div className={`${cardBg} rounded-lg p-3 sm:p-4 border ${borderColor}`}>
            <div className="flex items-start gap-3">
                <span className="text-2xl text-[#0097B2] flex-shrink-0">{icon}</span>
                <div className="min-w-0">
                    <p className={`text-xs sm:text-sm ${textSecondary} mb-1`}>{label}</p>
                    <p className={`text-sm sm:text-base font-semibold ${textPrimary} break-words`}>
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`min-h-screen ${bgPrimary}`}>
            {/* Header */}
            <div className={`${cardBg} border-b ${borderColor}`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <button onClick={() => navigate(-1)} className={`flex items-center gap-2 ${textSecondary} hover:${textPrimary} mb-4 sm:mb-6 transition`}>
                        <span className="text-xl">←</span>
                        <span className="text-sm sm:text-base">Back</span>
                    </button>

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex items-start gap-4">
                            {hackathonData.logo ? (
                                <img
                                    src={hackathonData.logo}
                                    alt={hackathonData.title}
                                    className="w-16 h-16 bg-backGray shadow-md sm:w-20 sm:h-20 rounded-lg object-contain "
                                />
                            ) : (
                                <div
                                    className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-lg $${borderColor} border border-primary`}
                                >
                                    <Cpu size={32} className={textPrimary} />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${textPrimary} mb-2`}>
                                    {hackathonData.title}
                                </h1>
                                <p className={`text-sm sm:text-base ${textSecondary}`}>{hackathonData.description}</p>
                            </div>
                        </div>


                        <div className="flex gap-2 items-center sm:flex-col">

                            {/* Register */}
                            <button
                                onClick={() => handleRegsiterAndJoin("register", hackathonData.title)}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-secondary transition font-semibold text-sm sm:text-base whitespace-nowrap"
                            >
                                <UserPlus className="w-4 h-4" />
                                Register
                            </button>

                            {/* Join */}
                            <button
                                onClick={() => handleRegsiterAndJoin("join", hackathonData.title)}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-backGray text-primary   rounded-lg hover:scale-105 transition font-semibold text-sm sm:text-base whitespace-nowrap"
                            >
                                <LogIn className="w-4 h-4" />
                                Join
                            </button>

                            {/* Like / Save */}
                            <button
                                onClick={() => savedItem('job', jobInfo?.id)}
                                className={`h-9 w-9 flex items-center justify-center rounded-lg ${hoverBg} ${textSecondary} transition-all`}
                                title="Save job"
                            >
                                <Heart
                                    className={`w-4 h-4 md:w-5 md:h-5 
                                   ${isSaved ? "fill-[var(--primary)] text-[var(--primary)]" : ""}
                               `}
                                />
                            </button>


                            {/* External Link */}
                            <button
                                className={`flex items-center justify-center gap-2 px-4 py-2 ${cardBg} border ${borderColor} ${textPrimary}
    rounded-lg hover:border-[var(--primary)]/40 transition font-semibold text-sm sm:text-base`}
                            >
                                <ExternalLink className="w-4 h-4" />
                            </button>

                        </div>

                    </div>
                </div>
            </div>

            {/* Banner */}
            {!hackathonData.bannerImage ? (
                <img
                    src={hackathonData.bannerImage || 'https://img.freepik.com/free-vector/tech-repair-facebook-cover-template_23-2150046975.jpg?semt=ais_hybrid&w=740&q=80'}
                    alt="Banner"
                    className="w-full h-48 sm:h-80 px-4 my-2 md:mt-0 mb-5 md:px-15  object-cover rounded-xl"
                />
            ) : (
                <div
                    className={`w-full h-48 sm:h-80  rounded-xl flex flex-col items-center justify-center  transition-all duration-300`}
                >
                    <div
                        className={`p-4 ${textPrimary}`}
                    >
                        <Code2 size={48} className={textPrimary} />
                    </div>
                    <p className={`mt-3 text-sm font-medium ${textPrimary}`}>
                        No banner available
                    </p>
                </div>
            )}
            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Quick Info Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                            <InfoCard
                                icon="📅"
                                label="Starts"
                                value={formatDate(hackathonData.startDate)}
                            />
                            <InfoCard
                                icon="⏰"
                                label="Ends"
                                value={formatDate(hackathonData.endDate)}
                            />
                            <InfoCard
                                icon="📍"
                                label="Location"
                                value={hackathonData.location}
                            />
                            <InfoCard
                                icon="👥"
                                label="Registrations"
                                value={`${hackathonData.registrationCount}/${hackathonData.maxParticipants}`}
                            />
                        </div>

                        {/* Overview Section */}
                        <div className={`${cardBg} rounded-xl p-5 sm:p-6 border ${borderColor}`}>
                            <h2 className={`text-xl sm:text-2xl font-bold ${textPrimary} mb-4`}>Overview</h2>
                            <p className={`${textSecondary} leading-relaxed text-sm sm:text-base`}>
                                {hackathonData.longDescription}
                            </p>
                        </div>

                        {/* Details Section */}
                        <div className={`${cardBg} rounded-xl p-5 sm:p-6 border ${borderColor}`}>
                            <h2 className={`text-xl sm:text-2xl font-bold ${textPrimary} mb-4`}>Details</h2>
                            <div className="space-y-4">
                                <div>
                                    <p className={`text-sm font-semibold ${textSecondary} mb-2`}>Themes</p>
                                    <div className="flex flex-wrap gap-2">
                                        {hackathonData?.themes?.map((theme, idx) => (
                                            <span
                                                key={idx}
                                                className={`px-3 py-1 rounded-full text-xs sm:text-sm ${mode === 'dark'
                                                    ? 'bg-[#0F1E20] text-[#0097B2]'
                                                    : 'bg-blue-50 text-blue-700'
                                                    }`}
                                            >
                                                {theme}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className={`text-sm font-semibold ${textSecondary} mb-2`}>Team Size</p>
                                    <p className={`text-sm sm:text-base ${textPrimary}`}>
                                        {hackathonData.minTeamSize} - {hackathonData.maxTeamSize} members
                                    </p>
                                </div>

                                <div>
                                    <p className={`text-sm font-semibold ${textSecondary} mb-2`}>Difficulty</p>
                                    <p className={`text-sm sm:text-base ${textPrimary} capitalize`}>
                                        {hackathonData.difficulty}
                                    </p>
                                </div>

                                <div>
                                    <p className={`text-sm font-semibold ${textSecondary} mb-2`}>Eligibility</p>
                                    <p className={`text-sm sm:text-base ${textPrimary}`}>{hackathonData.eligibility}</p>
                                </div>
                            </div>
                        </div>

                        {/* Rules Section */}
                        <div className={`${cardBg} rounded-xl p-5 sm:p-6 border ${borderColor}`}>
                            <h2 className={`text-xl sm:text-2xl font-bold ${textPrimary} mb-4 flex items-center gap-2`}>
                                <span className="text-2xl">📖</span>
                                Rules & Guidelines
                            </h2>
                            <p className={`${textSecondary} leading-relaxed text-sm sm:text-base`}>
                                {hackathonData.rules}
                            </p>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-4">
                        {/* Prize Pool */}
                        <div className={`${cardBg} rounded-xl p-5 sm:p-6 border ${borderColor}`}>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-2xl">🏆</span>
                                <h3 className={`font-bold ${textPrimary} text-lg`}>Prize Pool</h3>
                            </div>
                            <p className="text-3xl font-bold text-[#0097B2]">{hackathonData.prizePool}</p>
                        </div>

                        {/* Time Status */}
                        <div className={`${cardBg} rounded-xl p-5 sm:p-6 border ${borderColor}`}>
                            <p className={`text-sm ${textSecondary} mb-2`}>Registration Deadline</p>
                            <p className={`text-lg sm:text-xl font-bold ${textPrimary}`}>
                                {formatDate(hackathonData.registrationDeadline)}
                            </p>
                            <p className="text-[#0097B2] font-semibold text-sm mt-2">{daysRemaining()}</p>
                        </div>

                        {/* Links */}
                        <div className={`${cardBg} rounded-xl p-5 sm:p-6 border ${borderColor} space-y-3`}>
                            <h3 className={`font-bold ${textPrimary} mb-4`}>Connect</h3>

                            <a
                                href={`mailto:${hackathonData.contactEmail}`}
                                className={`flex items-center gap-3 p-3 rounded-lg ${mode === 'dark'
                                    ? 'hover:bg-[#0F1E20]'
                                    : 'hover:bg-gray-100'
                                    } transition text-sm sm:text-base`}
                            >
                                <span className="text-xl">✉️</span>
                                <span className={textSecondary}>Email</span>
                            </a>

                            <a
                                href={hackathonData.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-3 p-3 rounded-lg ${mode === 'dark'
                                    ? 'hover:bg-[#0F1E20]'
                                    : 'hover:bg-gray-100'
                                    } transition text-sm sm:text-base`}
                            >
                                <span className="text-xl">🌐</span>
                                <span className={textSecondary}>Website</span>
                            </a>

                            <a
                                href={hackathonData.discordUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-3 p-3 rounded-lg ${mode === 'dark'
                                    ? 'hover:bg-[#0F1E20]'
                                    : 'hover:bg-gray-100'
                                    } transition text-sm sm:text-base`}
                            >
                                <span className="text-xl">💬</span>
                                <span className={textSecondary}>Discord</span>
                            </a>

                            <a
                                href={hackathonData.slackUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-3 p-3 rounded-lg ${mode === 'dark'
                                    ? 'hover:bg-[#0F1E20]'
                                    : 'hover:bg-gray-100'
                                    } transition text-sm sm:text-base`}
                            >
                                <span className="text-xl">💼</span>
                                <span className={textSecondary}>Slack</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HackathonDetailPage;