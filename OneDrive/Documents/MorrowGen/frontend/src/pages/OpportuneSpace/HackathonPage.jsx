import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  Clock, 
  Tag,
  ExternalLink,
  Star,
  ChevronDown,
  Grid3X3,
  List,
  SlidersHorizontal
} from 'lucide-react';

const hackathons = [
  {
    id: 1,
    title: "CodeStorm 2025",
    organizer: "IIT Chennai",
    description: "Build innovative solutions for real-world problems using cutting-edge technology",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop",
    status: "Open",
    type: "In-Person",
    location: "Chennai, India",
    startDate: "2025-03-15",
    endDate: "2025-03-17",
    duration: "48 hours",
    participants: 450,
    maxParticipants: 500,
    prizePool: "₹5,00,000",
    tags: ["Web Development", "AI/ML", "Mobile Apps"],
    difficulty: "Intermediate",
    registrationDeadline: "2025-03-10",
    featured: true
  },
  {
    id: 2,
    title: "AI Innovation Challenge",
    organizer: "Microsoft India",
    description: "Develop AI-powered solutions to solve healthcare challenges in rural India",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
    status: "Open",
    type: "Virtual",
    location: "Online",
    startDate: "2025-04-01",
    endDate: "2025-04-03",
    duration: "72 hours",
    participants: 234,
    maxParticipants: 300,
    prizePool: "₹3,00,000",
    tags: ["AI/ML", "Healthcare", "Data Science"],
    difficulty: "Advanced",
    registrationDeadline: "2025-03-25",
    featured: false
  },
  {
    id: 3,
    title: "FinTech Revolution",
    organizer: "Razorpay",
    description: "Create the next generation of financial technology solutions",
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=250&fit=crop",
    status: "Open",
    type: "Hybrid",
    location: "Bangalore, India",
    startDate: "2025-03-22",
    endDate: "2025-03-24",
    duration: "48 hours",
    participants: 189,
    maxParticipants: 400,
    prizePool: "₹4,00,000",
    tags: ["FinTech", "Blockchain", "APIs"],
    difficulty: "Intermediate",
    registrationDeadline: "2025-03-18",
    featured: true
  },
  {
    id: 4,
    title: "Green Tech Hackathon",
    organizer: "Tata Consultancy Services",
    description: "Sustainable technology solutions for environmental challenges",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
    status: "Open",
    type: "In-Person",
    location: "Mumbai, India",
    startDate: "2025-04-10",
    endDate: "2025-04-12",
    duration: "48 hours",
    participants: 156,
    maxParticipants: 250,
    prizePool: "₹2,50,000",
    tags: ["CleanTech", "IoT", "Sustainability"],
    difficulty: "Beginner",
    registrationDeadline: "2025-04-05",
    featured: false
  },
  {
    id: 5,
    title: "Gaming Jam 2025",
    organizer: "Unity Technologies",
    description: "Create immersive games and interactive experiences",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=250&fit=crop",
    status: "Open",
    type: "Virtual",
    location: "Online",
    startDate: "2025-04-15",
    endDate: "2025-04-17",
    duration: "48 hours",
    participants: 78,
    maxParticipants: 200,
    prizePool: "₹1,50,000",
    tags: ["Gaming", "Unity", "VR/AR"],
    difficulty: "Intermediate",
    registrationDeadline: "2025-04-12",
    featured: false
  },
  {
    id: 6,
    title: "EduTech Innovation",
    organizer: "BYJU'S",
    description: "Revolutionary educational technology for the digital age",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
    status: "Closed",
    type: "Hybrid",
    location: "Hyderabad, India",
    startDate: "2025-02-15",
    endDate: "2025-02-17",
    duration: "48 hours",
    participants: 300,
    maxParticipants: 300,
    prizePool: "₹3,50,000",
    tags: ["EdTech", "Mobile Apps", "Web Development"],
    difficulty: "Beginner",
    registrationDeadline: "2025-02-10",
    featured: false
  },
  {
    id: 7,
    title: "Cybersecurity Challenge",
    organizer: "Infosys",
    description: "Build secure applications and defend against cyber threats",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
    status: "Open",
    type: "Virtual",
    location: "Online",
    startDate: "2025-05-01",
    endDate: "2025-05-03",
    duration: "48 hours",
    participants: 67,
    maxParticipants: 150,
    prizePool: "₹2,00,000",
    tags: ["Cybersecurity", "Blockchain", "Encryption"],
    difficulty: "Advanced",
    registrationDeadline: "2025-04-25",
    featured: false
  },
  {
    id: 8,
    title: "Smart City Solutions",
    organizer: "Government of Karnataka",
    description: "Innovative solutions for smart city development and urban planning",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop",
    status: "Open",
    type: "In-Person",
    location: "Bangalore, India",
    startDate: "2025-04-20",
    endDate: "2025-04-22",
    duration: "48 hours",
    participants: 234,
    maxParticipants: 400,
    prizePool: "₹6,00,000",
    tags: ["IoT", "Smart Cities", "Data Analytics"],
    difficulty: "Intermediate",
    registrationDeadline: "2025-04-15",
    featured: true
  }
];

const HackathonPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    type: "",
    difficulty: "",
    location: "",
    tags: ""
  });
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  // Get unique values for filter options
  const statuses = [...new Set(hackathons.map(h => h.status))];
  const types = [...new Set(hackathons.map(h => h.type))];
  const difficulties = [...new Set(hackathons.map(h => h.difficulty))];
  const locations = [...new Set(hackathons.map(h => h.location))];
  const allTags = [...new Set(hackathons.flatMap(h => h.tags))];

  // Filter and sort hackathons
  const filteredHackathons = hackathons
    .filter(hackathon => {
      const matchesSearch = hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           hackathon.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           hackathon.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filters.status === "" || hackathon.status === filters.status;
      const matchesType = filters.type === "" || hackathon.type === filters.type;
      const matchesDifficulty = filters.difficulty === "" || hackathon.difficulty === filters.difficulty;
      const matchesLocation = filters.location === "" || hackathon.location === filters.location;
      const matchesTags = filters.tags === "" || hackathon.tags.includes(filters.tags);
      
      return matchesSearch && matchesStatus && matchesType && matchesDifficulty && matchesLocation && matchesTags;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "featured":
          return b.featured - a.featured;
        case "deadline":
          return new Date(a.registrationDeadline) - new Date(b.registrationDeadline);
        case "prizePool":
          return parseInt(b.prizePool.replace(/[^\d]/g, "")) - parseInt(a.prizePool.replace(/[^\d]/g, ""));
        case "participants":
          return b.participants - a.participants;
        default:
          return 0;
      }
    });

  const getStatusColor = (status) => {
    return status === 'Open' ? '#0097B2' : '#D9D9D9';
  };

  const getTypeIcon = (type) => {
    if (type === 'Virtual') return '🌐';
    if (type === 'Hybrid') return '🔄';
    return '📍';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const handleJoinHackathon = (hackathon) => {
    if (hackathon.status === 'Open') {
      alert(`Joining ${hackathon.title}! You will be redirected to the registration page.`);
    } else {
      alert('Registration is closed for this hackathon.');
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #E0F2F5 0%, #B3E0E9 50%, #F2F2F2 100%)' }}>
      
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-20" style={{ borderColor: '#D9D9D9' }}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ 
                background: 'linear-gradient(135deg, #0097B2 0%, #00B2A9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Discover Hackathons
              </h1>
              <p className="text-gray-600 mt-1">Find and join amazing hackathons from around the world</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{filteredHackathons.length}</span> hackathons found
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center border rounded-lg" style={{ borderColor: '#D9D9D9' }}>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === 'grid' ? 'text-white' : 'text-gray-600'}`}
                  style={{ backgroundColor: viewMode === 'grid' ? '#0097B2' : 'transparent' }}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === 'list' ? 'text-white' : 'text-gray-600'}`}
                  style={{ backgroundColor: viewMode === 'list' ? '#0097B2' : 'transparent' }}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Search and Filters Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search hackathons, organizers, or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent bg-white/90 backdrop-blur-sm"
                style={{ 
                  '--tw-ring-color': '#0097B2',
                  borderColor: '#D9D9D9'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0097B2'}
                onBlur={(e) => e.target.style.borderColor = '#D9D9D9'}
              />
            </div>
            
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-4 pr-8 py-3 border rounded-xl focus:ring-2 focus:border-transparent bg-white/90 backdrop-blur-sm appearance-none cursor-pointer min-w-40"
                style={{ 
                  '--tw-ring-color': '#0097B2',
                  borderColor: '#D9D9D9'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0097B2'}
                onBlur={(e) => e.target.style.borderColor = '#D9D9D9'}
              >
                <option value="featured">Featured First</option>
                <option value="deadline">By Deadline</option>
                <option value="prizePool">By Prize Pool</option>
                <option value="participants">By Popularity</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
            
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 border rounded-xl hover:bg-gray-50 transition-colors"
              style={{ borderColor: '#D9D9D9' }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {Object.values(filters).filter(Boolean).length > 0 && (
                <span className="px-2 py-1 text-xs text-white rounded-full" style={{ backgroundColor: '#0097B2' }}>
                  {Object.values(filters).filter(Boolean).length}
                </span>
              )}
            </button>
          </div>
          
          {/* Filters Panel */}
          {showFilters && (
            <div className="p-6 bg-white rounded-xl border shadow-sm" style={{ borderColor: '#D9D9D9' }}>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="w-full p-2 border rounded-lg text-sm"
                    style={{ borderColor: '#D9D9D9' }}
                  >
                    <option value="">All Status</option>
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                
                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                    className="w-full p-2 border rounded-lg text-sm"
                    style={{ borderColor: '#D9D9D9' }}
                  >
                    <option value="">All Types</option>
                    {types.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
                    className="w-full p-2 border rounded-lg text-sm"
                    style={{ borderColor: '#D9D9D9' }}
                  >
                    <option value="">All Levels</option>
                    {difficulties.map(diff => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>
                
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                    className="w-full p-2 border rounded-lg text-sm"
                    style={{ borderColor: '#D9D9D9' }}
                  >
                    <option value="">All Locations</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                
                {/* Tags Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Technology</label>
                  <select
                    value={filters.tags}
                    onChange={(e) => setFilters({...filters, tags: e.target.value})}
                    className="w-full p-2 border rounded-lg text-sm"
                    style={{ borderColor: '#D9D9D9' }}
                  >
                    <option value="">All Technologies</option>
                    {allTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setFilters({status: "", type: "", difficulty: "", location: "", tags: ""})}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Hackathons Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
          : "space-y-6"
        }>
          {filteredHackathons.map((hackathon) => (
            <div
              key={hackathon.id}
              className={`group bg-white/95 backdrop-blur-sm rounded-2xl shadow-sm p-6 hover:shadow-xl transition-all duration-300 border ${
                viewMode === 'list' ? 'flex gap-6' : ''
              }`}
              style={{ borderColor: hackathon.featured ? '#0097B2' : '#D9D9D9' }}
            >
              {/* Featured Badge */}
              {hackathon.featured && (
                <div className="absolute -top-2 -right-2">
                  <div 
                    className="px-3 py-1 text-xs font-medium text-white rounded-full flex items-center gap-1"
                    style={{ backgroundColor: '#0097B2' }}
                  >
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </div>
                </div>
              )}
              
              {/* Hackathon Image */}
              <div className={`${viewMode === 'list' ? 'w-48 h-32' : 'w-full h-48'} rounded-xl overflow-hidden mb-4 flex-shrink-0`}>
                <img
                  src={hackathon.image}
                  alt={hackathon.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-1">
                      {hackathon.title}
                    </h3>
                    <p className="text-sm text-gray-600">by {hackathon.organizer}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-2 py-1 text-xs font-medium text-white rounded-full"
                      style={{ backgroundColor: getStatusColor(hackathon.status) }}
                    >
                      {hackathon.status}
                    </span>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {hackathon.description}
                </p>
                
                {/* Details Grid */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-lg">{getTypeIcon(hackathon.type)}</span>
                    <span>{hackathon.type}</span>
                    <MapPin className="w-4 h-4 ml-2" />
                    <span>{hackathon.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{hackathon.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{hackathon.participants}/{hackathon.maxParticipants}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="w-4 h-4" />
                      <span style={{ color: '#0097B2' }} className="font-medium">{hackathon.prizePool}</span>
                    </div>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {hackathon.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs font-medium text-white rounded-full"
                      style={{ backgroundColor: '#0097B2' }}
                    >
                      {tag}
                    </span>
                  ))}
                  {hackathon.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
                      +{hackathon.tags.length - 3} more
                    </span>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleJoinHackathon(hackathon)}
                    disabled={hackathon.status === 'Closed'}
                    className={`flex-1 px-4 py-2 font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                      hackathon.status === 'Closed' 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'text-white hover:shadow-lg'
                    }`}
                    style={{ 
                      backgroundColor: hackathon.status === 'Closed' ? '#D9D9D9' : '#0097B2'
                    }}
                    onMouseEnter={(e) => {
                      if (hackathon.status !== 'Closed') {
                        e.target.style.backgroundColor = '#007a94';
                        e.target.style.transform = 'translateY(-1px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (hackathon.status !== 'Closed') {
                        e.target.style.backgroundColor = '#0097B2';
                        e.target.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    {hackathon.status === 'Closed' ? 'Registration Closed' : 'Join Hackathon'}
                  </button>
                  
                  <button className="px-4 py-2 text-gray-600 hover:text-gray-800 border rounded-xl hover:bg-gray-50 transition-colors"
                          style={{ borderColor: '#D9D9D9' }}>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Registration Deadline */}
                {hackathon.status === 'Open' && (
                  <div className="mt-3 text-xs text-gray-500">
                    Registration deadline: {formatDate(hackathon.registrationDeadline)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredHackathons.length === 0 && (
          <div className="text-center py-16">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#D9D9D9' }}
            >
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No hackathons found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HackathonPage;