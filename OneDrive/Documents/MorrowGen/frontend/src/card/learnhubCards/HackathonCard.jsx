const HackathonCard = ({ hackathon, viewMode }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', { 
      day: 'numeric', month: 'short', year: 'numeric' 
    });
  };

  const getTypeIcon = (type) => {
    if (type === 'Virtual') return '🌐';
    if (type === 'Hybrid') return '🔄';
    return '📍';
  };

  return (
    <div className={`group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-2 overflow-hidden ${
      hackathon.featured ? 'border-cyan-400' : 'border-transparent'
    } ${viewMode === 'list' ? 'flex gap-6' : ''}`}>
      
      {/* Badges */}
      <div className="absolute top-3 right-3 z-10 flex gap-2">
        {hackathon.featured && (
          <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </div>
        )}
        {hackathon.trending && (
          <div className="px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
            <TrendingUp className="w-3 h-3" />
            Trending
          </div>
        )}
      </div>
      
      {/* Image */}
      <div className={`${viewMode === 'list' ? 'w-64 h-48' : 'w-full h-56'} relative overflow-hidden flex-shrink-0`}>
        <img
          src={hackathon.image}
          alt={hackathon.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Status Badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`px-3 py-1.5 text-xs font-bold text-white rounded-full shadow-lg ${
            hackathon.status === 'Open' ? 'bg-green-500' : 'bg-gray-400'
          }`}>
            {hackathon.status}
          </span>
        </div>

        {/* Bookmark */}
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="absolute top-3 left-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-cyan-500 text-cyan-500' : 'text-gray-600'}`} />
        </button>
      </div>
      
      <div className="p-6 flex-1">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors mb-2">
            {hackathon.title}
          </h3>
          <p className="text-sm text-gray-600 font-medium">by {hackathon.organizer}</p>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{hackathon.description}</p>
        
        {/* Details */}
        <div className="space-y-2.5 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-xl">{getTypeIcon(hackathon.type)}</span>
            <span className="font-medium text-gray-700">{hackathon.type}</span>
            <MapPin className="w-4 h-4 ml-2 text-gray-400" />
            <span className="text-gray-600">{hackathon.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-cyan-500" />
            <span>{formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-gray-600">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>{hackathon.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <Users className="w-4 h-4 text-purple-500" />
              <span>{hackathon.participants}/{hackathon.maxParticipants}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="font-bold text-cyan-600">{hackathon.prizePool}</span>
            </div>
          </div>
          
          {/* Difficulty */}
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className={`text-xs font-semibold px-2 py-1 rounded ${
              hackathon.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
              hackathon.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
              'bg-red-100 text-red-700'
            }`}>
              {hackathon.difficulty}
            </span>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {hackathon.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full"
            >
              {tag}
            </span>
          ))}
          {hackathon.tags.length > 3 && (
            <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
              +{hackathon.tags.length - 3}
            </span>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex gap-3">
          <button
            disabled={hackathon.status === 'Closed'}
            className={`flex-1 px-4 py-3 font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md ${
              hackathon.status === 'Closed' 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:scale-105'
            }`}
          >
            {hackathon.status === 'Closed' ? 'Registration Closed' : 'Join Now'}
            {hackathon.status === 'Open' && <ArrowRight className="w-4 h-4" />}
          </button>
          
          <button className="px-4 py-3 text-gray-600 hover:text-cyan-600 border-2 border-gray-200 hover:border-cyan-400 rounded-xl hover:bg-cyan-50 transition-all">
            <ExternalLink className="w-5 h-5" />
          </button>
          
          <button className="px-4 py-3 text-gray-600 hover:text-cyan-600 border-2 border-gray-200 hover:border-cyan-400 rounded-xl hover:bg-cyan-50 transition-all">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        
        {/* Registration Deadline */}
        {hackathon.status === 'Open' && (
          <div className="mt-3 text-xs text-gray-500 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Deadline: {formatDate(hackathon.registrationDeadline)}
          </div>
        )}
      </div>
    </div>
  );
};

export default HackathonCard