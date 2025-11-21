import React, { useState } from 'react';
import { Search, Download, Eye, BookOpen, FileText, Play, Star, Filter, Moon, Sun, X } from 'lucide-react';
import useThemeStore from '../../../zustand/themeStore';

const StudySpaceResourcePage = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const {mode} = useThemeStore()
    // Theme colors
    const bgPrimary = mode === 'dark' ? 'bg-[#0A1215]' : 'bg-white';
    const bgContent = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50';
    const bgCard = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
    const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
    const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
    const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
    const hoverBg = mode === 'dark' ? 'hover:bg-[#1B2E31]' : 'hover:bg-gray-50';
    const inputBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
    const headerBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50';
    const popularBg = mode === 'dark' ? 'bg-gradient-to-br from-orange-900/20 to-yellow-900/20' : 'bg-gradient-to-br from-orange-50 to-yellow-50';
    const popularBorder = mode === 'dark' ? 'border-orange-800/30' : 'border-orange-100';

    const categories = ['All', 'Notes', 'E-books', 'Tutorials', 'Previous Papers'];

    const resources = [
        {
            id: 1,
            title: 'Advanced Mathematics Notes',
            description: 'Comprehensive calculus and linear algebra study materials',
            type: 'PDF',
            category: 'Notes',
            downloads: 1247,
            isPopular: true,
            size: '2.4 MB'
        },
        {
            id: 2,
            title: 'Physics Tutorial Series',
            description: 'Video lectures covering mechanics and thermodynamics',
            type: 'Video',
            category: 'Tutorials',
            downloads: 892,
            isPopular: true,
            size: '450 MB'
        },
        {
            id: 3,
            title: 'Computer Science E-book',
            description: 'Complete guide to data structures and algorithms',
            type: 'PDF',
            category: 'E-books',
            downloads: 2156,
            isPopular: true,
            size: '15.7 MB'
        },
        {
            id: 4,
            title: '2023 Chemistry Papers',
            description: 'Previous year question papers with solutions',
            type: 'PDF',
            category: 'Previous Papers',
            downloads: 678,
            isPopular: false,
            size: '8.2 MB'
        },
        {
            id: 5,
            title: 'Biology Lab Manual',
            description: 'Practical experiments and procedures guide',
            type: 'DOC',
            category: 'Notes',
            downloads: 543,
            isPopular: false,
            size: '3.1 MB'
        },
        {
            id: 6,
            title: 'Statistics Crash Course',
            description: 'Quick revision materials for statistical analysis',
            type: 'Video',
            category: 'Tutorials',
            downloads: 734,
            isPopular: true,
            size: '280 MB'
        },
        {
            id: 7,
            title: 'English Literature Essays',
            description: 'Sample essays and writing techniques',
            type: 'DOC',
            category: 'Notes',
            downloads: 421,
            isPopular: false,
            size: '1.8 MB'
        },
        {
            id: 8,
            title: '2022 Mathematics Papers',
            description: 'Previous year exams with detailed solutions',
            type: 'PDF',
            category: 'Previous Papers',
            downloads: 956,
            isPopular: true,
            size: '12.4 MB'
        }
    ];

    const getFileIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'pdf':
                return <FileText className="w-5 h-5 text-red-500" />;
            case 'video':
                return <Play className="w-5 h-5 text-blue-500" />;
            case 'doc':
                return <BookOpen className="w-5 h-5 text-green-500" />;
            default:
                return <FileText className="w-5 h-5 text-gray-500" />;
        }
    };

    const filteredResources = resources.filter(resource => {
        const matchesCategory = activeCategory === 'All' || resource.category === activeCategory;
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const popularResources = resources.filter(resource => resource.isPopular).slice(0, 3);

    // Upload Modal Component
    const UploadModal = () => (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
            <div className={`${bgCard} ${borderColor} border rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8`}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className={`text-xl sm:text-2xl font-bold ${textPrimary}`}>Upload Resource</h2>
                    <button 
                        onClick={() => setShowUploadModal(false)}
                        className={`${textSecondary} ${hoverBg} p-2 rounded-lg transition-colors`}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Title</label>
                        <input 
                            type="text" 
                            className={`w-full px-4 py-2 ${inputBg} ${borderColor} border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0097B2] ${textPrimary}`}
                            placeholder="Enter resource title"
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Category</label>
                        <select className={`w-full px-4 py-2 ${inputBg} ${borderColor} border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0097B2] ${textPrimary}`}>
                            <option>Notes</option>
                            <option>E-books</option>
                            <option>Tutorials</option>
                            <option>Previous Papers</option>
                        </select>
                    </div>
                    <div>
                        <label className={`block text-sm font-medium ${textPrimary} mb-2`}>File</label>
                        <div className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center ${hoverBg} transition-colors cursor-pointer`}>
                            <p className={`${textSecondary} text-sm`}>Click to upload or drag and drop</p>
                            <p className={`${textSecondary} text-xs mt-1`}>PDF, DOC, or Video files</p>
                        </div>
                    </div>
                    <button className="w-full bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all">
                        Upload Resource
                    </button>
                </div>
            </div>
        </div>
    );

    // Mobile Filter Sidebar
    const MobileFilters = () => (
        <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden ${showMobileFilters ? 'block' : 'hidden'}`}>
            <div className={`${bgCard} h-full w-80 max-w-[85vw] p-6 overflow-y-auto`}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-lg font-semibold ${textPrimary}`}>Filters</h3>
                    <button 
                        onClick={() => setShowMobileFilters(false)}
                        className={`${textSecondary} ${hoverBg} p-2 rounded-lg`}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="w-5 h-5 text-[#0097B2]" />
                        <h3 className={`font-semibold ${textPrimary}`}>Categories</h3>
                    </div>
                    <div className="space-y-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => {
                                    setActiveCategory(category);
                                    setShowMobileFilters(false);
                                }}
                                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                    activeCategory === category
                                        ? 'bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white'
                                        : `${textSecondary} ${hoverBg}`
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Popular Resources */}
                <div className={`${popularBg} rounded-xl shadow-sm border ${popularBorder} p-4`}>
                    <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 text-orange-500" />
                        <h3 className={`font-semibold ${textPrimary}`}>Most Popular</h3>
                    </div>
                    <div className="space-y-3">
                        {popularResources.map(resource => (
                            <div key={resource.id} className={`${bgCard} rounded-lg p-3 shadow-sm`}>
                                <div className="flex items-start gap-3">
                                    {getFileIcon(resource.type)}
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`text-sm font-medium ${textPrimary} truncate`}>{resource.title}</h4>
                                        <p className={`text-xs ${textSecondary} mt-1`}>{resource.downloads} downloads</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`min-h-screen bg-backGray ${textPrimary} transition-colors duration-200`}>
            {/* Theme Toggle */}
    
            {/* Header */}
            <div className={`bg-backGray py-8 sm:py-12 ${borderColor} border-b`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10">
                    {/* Left Content */}
                    <div className="space-y-4 md:space-y-5 text-center md:text-left">
                        <h1 className={`text-2xl sm:text-3xl font-bold ${textPrimary} flex items-center justify-center md:justify-start gap-2`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-[#0097B2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6l-2 2h-2v8h12V8h-2l-2-2h-4z" />
                            </svg>
                            Resources
                        </h1>
                        <p className={`${textSecondary} leading-relaxed text-sm sm:text-base`}>
                            Explore study notes, e-books, tutorials, and papers. Everything you need for learning, organized in one place.
                        </p>
                        <p className={`${textSecondary} leading-relaxed text-sm sm:text-base hidden sm:block`}>
                            Stay updated with fresh resources added regularly to support your preparation.
                        </p>
                        <button 
                            onClick={() => setShowUploadModal(true)} 
                            className="bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium shadow hover:shadow-lg transition-all text-sm sm:text-base"
                        >
                            Upload Resources
                        </button>
                    </div>

                    {/* Right Image */}
                    <div className="flex justify-center md:justify-end">
                        <div className={`w-40 h-40 sm:w-52 sm:h-52 ${bgCard} rounded-2xl flex items-center justify-center ${borderColor} border`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 sm:h-28 sm:w-28 text-[#0097B2] opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                {/* Search Bar & Mobile Filter Button */}
                <div className="flex gap-3 mb-6 sm:mb-8">
                    <div className="relative flex-1">
                        <Search className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 ${textSecondary} w-4 h-4 sm:w-5 sm:h-5`} />
                        <input
                            type="text"
                            placeholder="Search resources..."
                            className={`w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 ${inputBg} border ${borderColor} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0097B2] focus:border-transparent shadow-sm ${textPrimary} text-sm sm:text-base`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setShowMobileFilters(true)}
                        className={`lg:hidden ${bgCard} ${borderColor} border px-4 py-2.5 rounded-xl ${hoverBg} transition-colors`}
                    >
                        <Filter className="w-5 h-5 text-[#0097B2]" />
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block lg:w-64 space-y-6">
                        {/* Category Filters */}
                        <div className={`${bgCard} rounded-xl shadow-sm border ${borderColor} p-6`}>
                            <div className="flex items-center gap-2 mb-4">
                                <Filter className="w-5 h-5 text-[#0097B2]" />
                                <h3 className={`font-semibold ${textPrimary}`}>Categories</h3>
                            </div>
                            <div className="space-y-2">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                            activeCategory === category
                                                ? 'bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white'
                                                : `${textSecondary} ${hoverBg}`
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Popular Resources */}
                        <div className={`${popularBg} rounded-xl shadow-sm border ${popularBorder} p-6`}>
                            <div className="flex items-center gap-2 mb-4">
                                <Star className="w-5 h-5 text-orange-500" />
                                <h3 className={`font-semibold ${textPrimary}`}>Most Popular</h3>
                            </div>
                            <div className="space-y-3">
                                {popularResources.map(resource => (
                                    <div key={resource.id} className={`${bgCard} rounded-lg p-3 shadow-sm`}>
                                        <div className="flex items-start gap-3">
                                            {getFileIcon(resource.type)}
                                            <div className="flex-1 min-w-0">
                                                <h4 className={`text-sm font-medium ${textPrimary} truncate`}>{resource.title}</h4>
                                                <p className={`text-xs ${textSecondary} mt-1`}>{resource.downloads} downloads</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Results Header */}
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <h2 className={`text-lg sm:text-xl font-semibold ${textPrimary}`}>
                                {activeCategory === 'All' ? 'All Resources' : activeCategory}
                                <span className={`${textSecondary} font-normal ml-2 text-sm sm:text-base`}>
                                    ({filteredResources.length})
                                </span>
                            </h2>
                        </div>

                        {/* Resource Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                            {filteredResources.map(resource => (
                                <div
                                    key={resource.id}
                                    className={`${bgCard} rounded-xl shadow-sm border ${borderColor} p-4 sm:p-6 hover:shadow-md transition-shadow flex flex-col h-full`}
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                                        <div className="flex items-center gap-2">
                                            {getFileIcon(resource.type)}
                                            <span className={`text-xs sm:text-sm font-medium ${textSecondary}`}>{resource.type}</span>
                                        </div>
                                        {resource.isPopular && (
                                            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-600 px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                                <Star className="w-3 h-3" />
                                                <span className="hidden sm:inline">Popular</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className={`text-base sm:text-lg font-semibold ${textPrimary} mb-2 line-clamp-2`}>{resource.title}</h3>
                                    <p className={`${textSecondary} text-xs sm:text-sm mb-2 line-clamp-2 flex-grow`}>{resource.description}</p>

                                    {/* Size & Downloads */}
                                    <div className={`flex items-center justify-between text-xs sm:text-sm ${textSecondary} mb-3 sm:mb-4`}>
                                        <span>{resource.size}</span>
                                        <span>{resource.downloads} downloads</span>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white px-3 sm:px-4 py-2 rounded-lg font-medium hover:shadow-md transition-shadow flex items-center justify-center gap-2 text-sm sm:text-base">
                                            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                                            <span className="hidden sm:inline">Download</span>
                                            <span className="sm:hidden">Get</span>
                                        </button>
                                        <button className={`px-3 sm:px-4 py-2 border ${borderColor} ${textSecondary} rounded-lg ${hoverBg} transition-colors flex items-center justify-center`}>
                                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* No Results */}
                        {filteredResources.length === 0 && (
                            <div className="text-center py-12">
                                <div className={`${textSecondary} mb-4`}>
                                    <Search className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" />
                                </div>
                                <h3 className={`text-base sm:text-lg font-medium ${textPrimary} mb-2`}>No resources found</h3>
                                <p className={`${textSecondary} text-sm sm:text-base`}>Try adjusting your search terms or category filters</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showUploadModal && <UploadModal />}
            <MobileFilters />
        </div>
    );
};

export default StudySpaceResourcePage;