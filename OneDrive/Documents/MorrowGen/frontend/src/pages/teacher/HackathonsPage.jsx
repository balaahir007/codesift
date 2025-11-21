import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Users, Trophy, Clock, ArrowRight, Filter, Search } from "lucide-react";
import getDaysLeft from '../../helpers/getDaysLeft'
import useThemeStore from "../../zustand/themeStore";
import HackathonCard from "../../card/teacher/HackathonCard";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import axiosInstance from '../../utils/axiosInstance'
const HackathonsPage = () => {
    const [hackathons, setHackathons] = useState([]);
    const { mode } = useThemeStore()
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Mock data for demonstration
    useEffect(() => {
        const fetchHackathon = async () => {
            try {
                const res = await axiosInstance.get('/hackathons');
                console.log("Hackathon Data:", res);
                setHackathons(res.data.data.hackathons || []); // ✅ ensures it's never undefined
            } catch (error) {
                console.error("Error fetching hackathons:", error);
                setHackathons([]); // fallback to avoid runtime crash
            }
        };
        fetchHackathon();
    }, []);


    const bgPrimary = mode === 'dark' ? 'bg-[#0A1215]' : 'bg-gray-50';
    const bgCard = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
    const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-800';
    const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
    const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
    const hoverBg = mode === 'dark' ? 'hover:bg-[#0F1E20]' : 'hover:bg-gray-50';
    const headerBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-white';

    const getStatusColor = (status) => {
        const colors = {
            open: mode === 'dark' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-200',
            ongoing: mode === 'dark' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200',
            draft: mode === 'dark' ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-50 text-gray-700 border-gray-200',
            closed: mode === 'dark' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-50 text-red-700 border-red-200',
            completed: mode === 'dark' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-50 text-purple-700 border-purple-200'
        };
        return colors[status] || colors.draft;
    };

    const getDifficultyColor = (difficulty) => {
        const colors = {
            beginner: mode === 'dark' ? 'text-green-400' : 'text-green-600',
            intermediate: mode === 'dark' ? 'text-yellow-400' : 'text-yellow-600',
            advanced: mode === 'dark' ? 'text-red-400' : 'text-red-600'
        };
        return colors[difficulty] || colors.intermediate;
    };

    const filteredHackathons = hackathons.filter(hack => {
        const matchesFilter = filter === 'all' || hack.status === filter;
        const matchesSearch = hack.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hack.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesFilter && matchesSearch;
    });






    return (
        <div className={`min-h-screen ${bgPrimary} transition-colors duration-300`}>
            {/* Header */}
            <div className={`bg-backGray border-b ${borderColor} sticky  -top-4 z-10 backdrop-blur-sm bg-opacity-90`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-semibold text-gray-200">Hackathons</h1>
                        <button
                            onClick={() => navigate("post")}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 shadow-md"
                        >
                            <Plus className="w-4 h-4" />
                            Create Hackathon
                        </button>
                    </div>

                    {/* Search and Filter */}
                    <div className="-4 flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${textSecondary}`} />
                            <input
                                type="text"
                                placeholder="Search hackathons..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full pl-10 pr-4 py-2.5 rounded-lg ${bgCard} ${textPrimary} border ${borderColor} focus:outline-none focus:ring-2 ${mode === 'dark' ? 'focus:ring-emerald-500/50' : 'focus:ring-emerald-500'} transition-all`}
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                            {['all', 'open', 'ongoing', 'draft', 'closed'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${filter === status
                                        ? mode === 'dark'
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-emerald-600 text-white'
                                        : `${bgCard} ${textSecondary} border ${borderColor} ${hoverBg}`
                                        }`}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <HackathonCard filteredHackathons={filteredHackathons} />


        </div>
    );
};

export default HackathonsPage;