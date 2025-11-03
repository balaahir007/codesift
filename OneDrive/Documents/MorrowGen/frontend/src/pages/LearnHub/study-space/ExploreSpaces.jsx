import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Users, Search, Sparkles, TrendingUp, Globe2, BookOpen, Target, ArrowRight, UserPlus } from "lucide-react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

const ExploreSpaces = ({ setSection }) => {
    const [publicSpaces, setPublicSpaces] = useState([]);
    const [filteredSpaces, setFilteredSpaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDomain, setSelectedDomain] = useState("all");
    const [joiningSpaceId, setJoiningSpaceId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getPublicSpaces = async () => {
            try {
                setIsLoading(true);
                const spaces = await fetchPublicStudySpaces();
                setPublicSpaces(spaces || []);
                setFilteredSpaces(spaces || []);
            } catch (error) {
                console.error("Error fetching public spaces:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getPublicSpaces();
    }, []);

    const fetchPublicStudySpaces = async () => {
        try {
            const res = await axiosInstance.get("/study-space/getAll/public");
            return res.data.data;
        } catch (error) {
            console.error("Get all study spaces failed", error);
        }
    };

    useEffect(() => {
        let filtered = publicSpaces;

        if (searchQuery) {
            filtered = filtered.filter(
                (space) =>
                    space.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    space.goal?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    space.techSkills?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    space.tags?.some((tag) =>
                        tag.toLowerCase().includes(searchQuery.toLowerCase())
                    )
            );
        }

        if (selectedDomain !== "all") {
            filtered = filtered.filter(
                (space) => space.domain?.toLowerCase() === selectedDomain.toLowerCase()
            );
        }

        setFilteredSpaces(filtered);
    }, [searchQuery, selectedDomain, publicSpaces]);

    const domains = ["all", ...new Set(publicSpaces.map((space) => space.domain))];

    const handleJoinSpace = async (space) => {
        if (!space.inviteCode) {
            toast.error("This space doesn't have an invite code");
            return;
        }

        try {
            setJoiningSpaceId(space.id);
            const response = await axiosInstance.post(
                `/study-space/requests/${space.id}`,
                { inviteCode: space.inviteCode }
            );

            toast.success("Successfully joined the space!");
            
            // Navigate to the study space
            navigate(`/study-space/${space.id}`);
        } catch (error) {
            console.error("Error joining space:", error);
            toast.error(error?.response?.data?.message || "Failed to join space");
        } finally {
            setJoiningSpaceId(null);
        }
    };

    return (
        <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/30">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#0097B2]/10 to-[#00B2A9]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-[#00B2A9]/10 to-[#0097B2]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10 p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/50 overflow-hidden"
                >
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-bl from-[#0097B2]/5 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-tr from-[#00B2A9]/5 to-transparent rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#0097B2] to-[#00B2A9] rounded-lg sm:rounded-xl shadow-lg">
                                <Globe2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#0097B2] to-[#00B2A9] bg-clip-text text-transparent">
                                EXPLORE COMMUNITIES
                            </span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                            Discover Public Study Spaces
                        </h1>

                        <p className="text-slate-600 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 max-w-2xl">
                            Join vibrant learning communities, collaborate with peers worldwide, and achieve your goals together.
                        </p>

                        {/* Stats Pills */}
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#E0F2F5] to-[#B3E0E9] rounded-full">
                                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-[#0097B2]" />
                                <span className="text-xs sm:text-sm font-semibold text-[#0097B2]">
                                    {publicSpaces.length} Active Spaces
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#E0F2F5] to-[#B3E0E9] rounded-full">
                                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#00B2A9]" />
                                <span className="text-xs sm:text-sm font-semibold text-[#00B2A9]">
                                    Global Community
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Search & Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/50"
                >
                    {/* Search Bar */}
                    <div className="relative mb-3 sm:mb-4">
                        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name, goal, skills, or tags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 bg-slate-50 border-2 border-slate-200 rounded-lg sm:rounded-xl text-sm sm:text-base text-slate-900 placeholder-slate-500 focus:outline-none focus:border-[#0097B2] focus:bg-white transition-all"
                        />
                    </div>

                    {/* Domain Filters */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        <span className="text-xs sm:text-sm font-medium text-slate-600 whitespace-nowrap mr-1 sm:mr-2">Filters:</span>
                        {domains.map((domain) => (
                            <motion.button
                                key={domain}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedDomain(domain)}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                                    selectedDomain === domain
                                        ? "bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white shadow-lg"
                                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                }`}
                            >
                                {domain === "all" ? "All Domains" : domain}
                            </motion.button>
                        ))}
                    </div>

                    {/* Results Count */}
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-200">
                        <p className="text-xs sm:text-sm text-slate-600">
                            Showing <span className="font-semibold text-[#0097B2]">{filteredSpaces.length}</span> of{" "}
                            <span className="font-semibold">{publicSpaces.length}</span> spaces
                        </p>
                    </div>
                </motion.div>

                {/* Spaces Grid */}
                <div>
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg animate-pulse overflow-hidden border border-white/50">
                                    <div className="h-24 sm:h-32 bg-gradient-to-br from-slate-200 to-slate-300"></div>
                                    <div className="p-4 sm:p-6 space-y-3">
                                        <div className="h-4 sm:h-5 bg-slate-200 rounded w-3/4"></div>
                                        <div className="h-3 sm:h-4 bg-slate-200 rounded w-1/2"></div>
                                        <div className="space-y-2 pt-2">
                                            <div className="h-3 bg-slate-200 rounded"></div>
                                            <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredSpaces.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-8 sm:p-16 text-center shadow-lg border border-white/50"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">No Spaces Found</h3>
                            <p className="text-sm sm:text-base text-slate-600">Try adjusting your search or filters to discover more communities</p>
                        </motion.div>
                    ) : (
                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {filteredSpaces.map((space, i) => (
                                <motion.div
                                    key={space.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08, duration: 0.4 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    onClick={() => setSection('explore-spaces')}
                                    className="group bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 cursor-pointer"
                                >
                                    {/* Header with Gradient */}
                                    <div className="relative h-24 sm:h-32 bg-gradient-to-br from-[#0097B2] to-[#00B2A9] overflow-hidden">
                                        {/* Animated Background Pattern */}
                                        <div className="absolute inset-0 opacity-20">
                                            <div className="absolute top-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-white rounded-full blur-2xl transform -translate-x-12 sm:-translate-x-16 -translate-y-12 sm:-translate-y-16 group-hover:scale-150 transition-transform duration-500"></div>
                                            <div className="absolute bottom-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-white rounded-full blur-xl transform translate-x-10 sm:translate-x-12 translate-y-10 sm:translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
                                        </div>

                                        {/* Logo */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {space.logo ? (
                                                <img
                                                    src={space.logo}
                                                    alt={space.name}
                                                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl border-2 sm:border-3 border-white shadow-2xl object-cover z-10 group-hover:scale-110 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl border-2 sm:border-3 border-white shadow-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-300">
                                                    <span className="text-white text-xl sm:text-2xl font-bold">
                                                        {space.name?.charAt(0)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Public Badge */}
                                        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                                            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                                            <span className="text-xs font-semibold text-white">Public</span>
                                        </div>

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-white transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                                        {/* Title & Domain */}
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5 sm:mb-2 group-hover:text-[#0097B2] transition-colors line-clamp-1">
                                                {space.name}
                                            </h3>
                                            <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-[#E0F2F5] to-[#B3E0E9] text-[#0097B2] text-xs font-semibold rounded-full capitalize">
                                                {space.domain}
                                            </span>
                                        </div>

                                        {/* Goal */}
                                        {space.goal && (
                                            <div className="flex gap-2">
                                                <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0097B2] flex-shrink-0 mt-0.5 sm:mt-1" />
                                                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">{space.goal}</p>
                                            </div>
                                        )}

                                        {/* Tech Skills */}
                                        {space.techSkills && (
                                            <div className="flex gap-2">
                                                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00B2A9] flex-shrink-0 mt-0.5 sm:mt-1" />
                                                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">{space.techSkills}</p>
                                            </div>
                                        )}

                                        {/* Tags */}
                                        {space.tags?.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                {space.tags.slice(0, 3).map((tag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-md sm:rounded-lg hover:bg-slate-200 transition-colors"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {space.tags.length > 3 && (
                                                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md sm:rounded-lg">
                                                        +{space.tags.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-200">
                                            <div className="flex items-center gap-1.5 sm:gap-2 text-slate-600">
                                                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                <span className="text-xs sm:text-sm font-medium">
                                                    {space.members?.length || 0} members
                                                </span>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleJoinSpace(space);
                                                }}
                                                disabled={joiningSpaceId === space.id}
                                                className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white text-xs sm:text-sm font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {joiningSpaceId === space.id ? (
                                                    <>
                                                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        <span>Joining...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                        <span>Join</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExploreSpaces;