// import React, { useState } from 'react';
// import { 
//   Search, 
//   Filter, 
//   Calendar, 
//   MapPin, 
//   Users, 
//   Trophy, 
//   Clock, 
//   Tag,
//   ExternalLink,
//   Star,
//   ChevronDown,
//   Grid3X3,
//   List,
//   SlidersHorizontal
// } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  Trophy,
  Clock,
  Tag,
  ChevronDown,
  ChevronUp,
  X,
  SlidersHorizontal
} from 'lucide-react';

import HackathonCard from '../../card/teacher/HackathonCard';
import axiosInstance from '../../utils/axiosInstance';
import useThemeStore from '../../zustand/themeStore';
import { HackathonCardSkeleton } from '../../card/HackathonCardSkeleton';

// const hackathons = [
//   {
//     id: 1,
//     title: "CodeStorm 2025",
//     organizer: "IIT Chennai",
//     description: "Build innovative solutions for real-world problems using cutting-edge technology",
//     image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop",
//     status: "Open",
//     type: "In-Person",
//     location: "Chennai, India",
//     startDate: "2025-03-15",
//     endDate: "2025-03-17",
//     duration: "48 hours",
//     participants: 450,
//     maxParticipants: 500,
//     prizePool: "₹5,00,000",
//     tags: ["Web Development", "AI/ML", "Mobile Apps"],
//     difficulty: "Intermediate",
//     registrationDeadline: "2025-03-10",
//     featured: true
//   },
//   {
//     id: 2,
//     title: "AI Innovation Challenge",
//     organizer: "Microsoft India",
//     description: "Develop AI-powered solutions to solve healthcare challenges in rural India",
//     image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
//     status: "Open",
//     type: "Virtual",
//     location: "Online",
//     startDate: "2025-04-01",
//     endDate: "2025-04-03",
//     duration: "72 hours",
//     participants: 234,
//     maxParticipants: 300,
//     prizePool: "₹3,00,000",
//     tags: ["AI/ML", "Healthcare", "Data Science"],
//     difficulty: "Advanced",
//     registrationDeadline: "2025-03-25",
//     featured: false
//   },
//   {
//     id: 3,
//     title: "FinTech Revolution",
//     organizer: "Razorpay",
//     description: "Create the next generation of financial technology solutions",
//     image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=250&fit=crop",
//     status: "Open",
//     type: "Hybrid",
//     location: "Bangalore, India",
//     startDate: "2025-03-22",
//     endDate: "2025-03-24",
//     duration: "48 hours",
//     participants: 189,
//     maxParticipants: 400,
//     prizePool: "₹4,00,000",
//     tags: ["FinTech", "Blockchain", "APIs"],
//     difficulty: "Intermediate",
//     registrationDeadline: "2025-03-18",
//     featured: true
//   },
//   {
//     id: 4,
//     title: "Green Tech Hackathon",
//     organizer: "Tata Consultancy Services",
//     description: "Sustainable technology solutions for environmental challenges",
//     image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
//     status: "Open",
//     type: "In-Person",
//     location: "Mumbai, India",
//     startDate: "2025-04-10",
//     endDate: "2025-04-12",
//     duration: "48 hours",
//     participants: 156,
//     maxParticipants: 250,
//     prizePool: "₹2,50,000",
//     tags: ["CleanTech", "IoT", "Sustainability"],
//     difficulty: "Beginner",
//     registrationDeadline: "2025-04-05",
//     featured: false
//   },
//   {
//     id: 5,
//     title: "Gaming Jam 2025",
//     organizer: "Unity Technologies",
//     description: "Create immersive games and interactive experiences",
//     image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=250&fit=crop",
//     status: "Open",
//     type: "Virtual",
//     location: "Online",
//     startDate: "2025-04-15",
//     endDate: "2025-04-17",
//     duration: "48 hours",
//     participants: 78,
//     maxParticipants: 200,
//     prizePool: "₹1,50,000",
//     tags: ["Gaming", "Unity", "VR/AR"],
//     difficulty: "Intermediate",
//     registrationDeadline: "2025-04-12",
//     featured: false
//   },
//   {
//     id: 6,
//     title: "EduTech Innovation",
//     organizer: "BYJU'S",
//     description: "Revolutionary educational technology for the digital age",
//     image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
//     status: "Closed",
//     type: "Hybrid",
//     location: "Hyderabad, India",
//     startDate: "2025-02-15",
//     endDate: "2025-02-17",
//     duration: "48 hours",


//     participants: 300,
//     maxParticipants: 300,
//     prizePool: "₹3,50,000",
//     tags: ["EdTech", "Mobile Apps", "Web Development"],
//     difficulty: "Beginner",
//     registrationDeadline: "2025-02-10",
//     featured: false
//   },
//   {
//     id: 7,
//     title: "Cybersecurity Challenge",
//     organizer: "Infosys",
//     description: "Build secure applications and defend against cyber threats",
//     image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
//     status: "Open",
//     type: "Virtual",
//     location: "Online",
//     startDate: "2025-05-01",
//     endDate: "2025-05-03",
//     duration: "48 hours",
//     participants: 67,
//     maxParticipants: 150,
//     prizePool: "₹2,00,000",
//     tags: ["Cybersecurity", "Blockchain", "Encryption"],
//     difficulty: "Advanced",
//     registrationDeadline: "2025-04-25",
//     featured: false
//   },
//   {
//     id: 8,
//     title: "Smart City Solutions",
//     organizer: "Government of Karnataka",
//     description: "Innovative solutions for smart city development and urban planning",
//     image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop",
//     status: "Open",
//     type: "In-Person",
//     location: "Bangalore, India",
//     startDate: "2025-04-20",
//     endDate: "2025-04-22",
//     duration: "48 hours",
//     participants: 234,
//     maxParticipants: 400,
//     prizePool: "₹6,00,000",
//     tags: ["IoT", "Smart Cities", "Data Analytics"],
//     difficulty: "Intermediate",
//     registrationDeadline: "2025-04-15",
//     featured: true
//   }
// ];
const HackathonPage = () => {
  const { mode } = useThemeStore()
  const [searchTerm, setSearchTerm] = useState("");
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false);

  const [expandedFilters, setExpandedFilters] = useState({
    status: true,
    type: true,
    difficulty: true,
    location: false,
    tags: false
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({
    status: [],
    type: [],
    difficulty: [],
    location: [],
    tags: []
  });

  useEffect(() => {
    const fetchHackathon = async () => {
      setLoading(true)
      try {
        const res = await axiosInstance.get('/hackathons');
        console.log("Hackathon Data:", res);
        setHackathons(res.data.data.hackathons || []); // ✅ ensures it's never undefined
      } catch (error) {
        console.error("Error fetching hackathons:", error);
        setHackathons([]); // fallback to avoid runtime crash
      } finally {
        setLoading(false)
      }
    };
    fetchHackathon();
  }, []);

  // Theme classes
  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const sectionBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50';
  const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const inputBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50';
  const bgPrimary = mode === 'dark' ? 'bg-[#0A1415]' : 'bg-gray-50';
  const skeletonColor = mode === "dark" ? "bg-[#294B4E]" : "bg-gray-200";

  // Mock data - replace with your API call
  // useEffect(() => {
  //   setHackathons([
  //     {
  //       id: 1,
  //       title: "CodeStorm 2025",
  //       organizer: "IIT Chennai",
  //       status: "Open",
  //       type: "In-Person",
  //       difficulty: "Intermediate",
  //       location: "Chennai, India",
  //       tags: ["Web Development", "AI/ML"]
  //     },
  //     {
  //       id: 2,
  //       title: "AI Innovation Challenge",
  //       organizer: "Microsoft India",
  //       status: "Open",
  //       type: "Virtual",
  //       difficulty: "Advanced",
  //       location: "Online",
  //       tags: ["AI/ML", "Healthcare"]
  //     },
  //     {
  //       id: 3,
  //       title: "FinTech Revolution",
  //       organizer: "Razorpay",
  //       status: "Open",
  //       type: "Hybrid",
  //       difficulty: "Intermediate",
  //       location: "Bangalore, India",
  //       tags: ["FinTech", "Blockchain"]
  //     }
  //   ]);
  // }, []);

  // Filter options
  const filterOptions = {
    status: ["Open", "Closed", "Upcoming"],
    type: ["Virtual", "In-Person", "Hybrid"],
    difficulty: ["Beginner", "Intermediate", "Advanced"],
    location: ["Online", "Chennai, India", "Bangalore, India", "Mumbai, India"],
    tags: ["Web Development", "AI/ML", "Mobile Apps", "FinTech", "Blockchain", "Healthcare", "IoT"]
  };

  const toggleFilter = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  const clearFilter = (category) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: []
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      status: [],
      type: [],
      difficulty: [],
      location: [],
      tags: []
    });
  };


  

  const filteredHackathons = React.useMemo(() => {
    let filtered = hackathons || [];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(hackathon =>
        hackathon.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hackathon.organizer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hackathon.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (selectedFilters.status.length > 0) {
      filtered = filtered.filter(hackathon =>
        selectedFilters.status.includes(hackathon.status)
      );
    }

    // Type filter
    if (selectedFilters.type.length > 0) {
      filtered = filtered.filter(hackathon =>
        selectedFilters.type.includes(hackathon.type)
      );
    }

    // Difficulty filter
    if (selectedFilters.difficulty.length > 0) {
      filtered = filtered.filter(hackathon =>
        selectedFilters.difficulty.includes(hackathon.difficulty)
      );
    }

    // Location filter
    if (selectedFilters.location.length > 0) {
      filtered = filtered.filter(hackathon =>
        selectedFilters.location.includes(hackathon.location)
      );
    }

    // Tags filter
    if (selectedFilters.tags.length > 0) {
      filtered = filtered.filter(hackathon =>
        selectedFilters.tags.some(tag => hackathon.tags?.includes(tag))
      );
    }

    return filtered;
  }, [hackathons, searchTerm, selectedFilters]);


  const activeFilterCount = Object.values(selectedFilters).flat().length;


  const FilterSection = ({ title, category, options }) => {
    const isExpanded = expandedFilters[category];

    return (
      <div className={`border-b  ${borderColor} pb-4`}>
        <button
          onClick={() => setExpandedFilters(prev => ({ ...prev, [category]: !prev[category] }))}
          className={`w-full flex items-center justify-between ${textPrimary} font-medium mb-3`}
        >
          <span>{title}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isExpanded && (
          <div className="space-y-2">
            {options.map((option) => (
              <label key={option} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedFilters[category].includes(option)}
                  onChange={() => toggleFilter(category, option)}
                  className="w-4 h-4 rounded border-gray-300 text-[#0097B2] focus:ring-[#0097B2]"
                />
                <span className={`ml-2 text-sm ${textSecondary} group-hover:${textPrimary}`}>
                  {option}
                </span>
              </label>
            ))}
            {selectedFilters[category].length > 0 && (
              <button
                onClick={() => clearFilter(category)}
                className="text-xs text-[#0097B2] hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>
    );
  };



  return (
    <div className={`min-h-screen bg-backGray`}>
      {/* Header */}
      {/* Header Section */}
      <div className={`w-full ${cardBg} border-b ${borderColor} py-8 sm:py-12`}>
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6">
          <h1
            className={`text-2xl sm:text-2xl md:text-4xl font-bold leading-tight bg-gradient-to-r from-[#0097B2] to-[#00C6FF] bg-clip-text text-transparent`}
          >
            Join the World's Leading Online & On-Site Hackathons
          </h1>
          <p className={`mt-3 sm:mt-4 text-sm sm:text-base md:text-lg ${textSecondary}`}>
            Explore global challenges, collaborate with top innovators, and showcase your best ideas.
          </p>
        </div>
      </div>

      {
        loading ? (

          <div className="flex-1">
            <HackathonCardSkeleton mode={mode} />
          </div>

        ) : (

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Mobile Filter Toggle */}
              <div className="flex justify-between items-center mb-4 md:hidden">
                <h2 className="text-lg font-semibold text-[#0097B2]">Hackathons</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 text-sm font-medium text-white bg-[#0097B2] px-4 py-2 rounded-lg shadow hover:bg-[#00B8D9] transition"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
              </div>

              {/* Sidebar Filters (Responsive) */}
              <div
                className={`fixed md:static bottom-0 left-0 w-full md:w-80 h-90 md:h-auto bg-backGray border-t md:border-none ${borderColor} p-6 z-50 transform transition-transform duration-300 ease-in-out ${showFilters ? 'translate-y-0' : 'translate-y-full'
                  } md:translate-y-0`}
              >

                {/* Close Button for Mobile */}
                <div className="flex justify-between items-center mb-4 md:hidden">
                  <h2 className="text-lg font-semibold text-[#0097B2]">Filters</h2>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-5 h-5 text-[#0097B2]" />
                  </button>
                </div>
                {loading ? (
                  <div
                    className={`flex items-center justify-between mb-6 animate-pulse ${cardBg} border ${borderColor} rounded-lg p-4`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`hidden md:block w-5 h-5 rounded ${skeletonColor}`}></div>
                      <div className={`hidden md:block w-24 h-4 rounded ${skeletonColor}`}></div>
                      <div className={`w-6 h-4 rounded ${skeletonColor}`}></div>
                    </div>
                    <div className={`w-14 h-3 rounded ${skeletonColor}`}></div>
                  </div>
                ) : (

                  <div className="flex items-center  mb-6">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className={`hidden md:block w-5 h-5 ${textPrimary}`} />
                      <h2 className={`text-lg font-semibold  hidden md:block ${textPrimary}`}>Filters</h2>
                      {activeFilterCount > 0 && (
                        <span className="px-2 py-1 text-xs text-white bg-[#0097B2] rounded-full">
                          {activeFilterCount}
                        </span>
                      )}
                    </div>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={clearAllFilters}
                        className="text-xs text-[#0097B2] hover:underline"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                )}
                {/* Filter Header */}

                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${textSecondary} w-4 h-4`} />
                    <input
                      type="text"
                      placeholder="Search hackathons..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${borderColor} ${inputBg} ${textPrimary} focus:outline-none focus:ring-2 focus:ring-[#0097B2] text-sm`}
                    />
                  </div>
                </div>

                {/* Filter Sections */}
                <div className="space-y-4 mb-5 max-h-[calc(100vh-1000px)] md:max-h-[calc(100vh-300px)] overflow-y-auto">
                  <FilterSection title="Status" category="status" options={filterOptions.status} />
                  <FilterSection title="Type" category="type" options={filterOptions.type} />
                  <FilterSection title="Difficulty" category="difficulty" options={filterOptions.difficulty} />
                  <FilterSection title="Location" category="location" options={filterOptions.location} />
                  <FilterSection title="Technologies" category="tags" options={filterOptions.tags} />
                </div>
              </div>

              {/* Overlay for mobile */}
              {showFilters && (
                <div
                  onClick={() => setShowFilters(false)}
                  className="fixed inset-0 bg-black/40 bg-opacity-40 z-40 md:hidden"
                ></div>
              )}

              {/* Main Content */}
              <div className="flex-1">
                {activeFilterCount > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {Object.entries(selectedFilters).map(([category, values]) =>
                      values.map((value) => (
                        <span
                          key={`${category}-${value}`}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${cardBg} border ${borderColor} ${textPrimary}`}
                        >
                          {value}
                          <button onClick={() => toggleFilter(category, value)}>
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                )}

                {filteredHackathons.length > 0 ? (
                  <HackathonCard filteredHackathons={filteredHackathons} mode={mode} filters={expandedFilters} />
                ) : (
                  <div className={`${cardBg} rounded-lg border ${borderColor} p-12 text-center`}>
                    <Search className={`w-16 h-16 ${textSecondary} mx-auto mb-4`} />
                    <h3 className={`text-xl font-semibold ${textPrimary} mb-2`}>No hackathons found</h3>
                    <p className={textSecondary}>Try adjusting your filters or search term</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      }




    </div>
  );
};

export default HackathonPage;
