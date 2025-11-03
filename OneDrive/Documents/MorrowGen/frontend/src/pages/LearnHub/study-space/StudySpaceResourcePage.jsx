import React, { useState } from 'react';
import { Search, Download, Eye, BookOpen, FileText, Play, Calendar, Star, Filter } from 'lucide-react';
import ResourceUploadForm from '../../../components/admin/ResourceUploadForm';

const StudySpaceResourcePage = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [showUploadModal, setShowUploadModal] = useState(false);
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

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-white py-12">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10">

                    {/* Left Content */}
                    <div className="space-y-5 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center md:justify-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#0097B2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6l-2 2h-2v8h12V8h-2l-2-2h-4z" />
                            </svg>
                            Resources
                        </h1>
                        <p className="text-gray-600 leading-relaxed">
                            Explore study notes, e-books, tutorials, and papers.
                            Everything you need for learning, organized in one place.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Stay updated with fresh resources added regularly to support your preparation.
                        </p>

                        {/* CTA Button */}
                        <button onClick={() => setShowUploadModal(true)} className="bg-[#0097B2] text-white px-6 py-2 rounded-lg font-medium shadow hover:bg-[#008399] transition">
                            Upload Resources
                        </button>
                    </div>
                    {showUploadModal && (
                        <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-[9999]">

                            <ResourceUploadForm
                                isOpen={showUploadModal}
                                onClose={() => setShowUploadModal(false)}
                                onSuccess={(data) => {
                                    console.log("Upload successful:", data);
                                }}
                            />
                        </div>

                    )}


                    {/* Right Image */}
                    <div className="flex justify-center md:justify-end">
                        <img
                            src="/resources-sharing.png"
                            alt="Resource Sharing Illustration"
                            className="w-52 h-52 object-contain"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Search Bar */}
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search for study materials, notes, tutorials..."
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0097B2] focus:border-transparent shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-64 space-y-6">
                        {/* Category Filters */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Filter className="w-5 h-5 text-[#0097B2]" />
                                <h3 className="font-semibold text-gray-800">Categories</h3>
                            </div>
                            <div className="space-y-2">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeCategory === category
                                            ? 'bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Popular Resources */}
                        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl shadow-sm border border-orange-100 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Star className="w-5 h-5 text-orange-500" />
                                <h3 className="font-semibold text-gray-800">Most Popular</h3>
                            </div>
                            <div className="space-y-3 ">
                                {popularResources.map(resource => (
                                    <div key={resource.id} className="bg-white rounded-lg p-3 shadow-sm">
                                        <div className="flex items-start gap-3">
                                            {getFileIcon(resource.type)}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-medium text-gray-800 truncate">{resource.title}</h4>
                                                <p className="text-xs text-gray-500 mt-1">{resource.downloads} downloads</p>
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
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {activeCategory === 'All' ? 'All Resources' : activeCategory}
                                <span className="text-gray-500 font-normal ml-2">({filteredResources.length} items)</span>
                            </h2>
                        </div>

                        {/* Resource Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredResources.map(resource => (
                                <div
                                    key={resource.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow flex flex-col h-full min-h-[280px]"
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            {getFileIcon(resource.type)}
                                            <span className="text-sm font-medium text-gray-600">{resource.type}</span>
                                        </div>
                                        {resource.isPopular && (
                                            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                                <Star className="w-3 h-3" />
                                                Popular
                                            </div>
                                        )}
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{resource.title}</h3>
                                    <p className="text-gray-600 text-sm mb-2 line-clamp-2 flex-grow">{resource.description}</p>

                                    {/* Size & Downloads */}
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <span>{resource.size}</span>
                                        <span>{resource.downloads} downloads</span>
                                    </div>

                                    {/* Buttons aligned bottom */}
                                    <div className="flex gap-2 ">
                                        <button className="flex-1 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white px-4 py-2 rounded-lg font-medium hover:shadow-md transition-shadow flex items-center justify-center gap-2">
                                            <Download className="w-4 h-4" />
                                            Download
                                        </button>
                                        <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>


                        {/* No Results */}
                        {filteredResources.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <Search className="w-16 h-16 mx-auto" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-600 mb-2">No resources found</h3>
                                <p className="text-gray-500">Try adjusting your search terms or category filters</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudySpaceResourcePage;