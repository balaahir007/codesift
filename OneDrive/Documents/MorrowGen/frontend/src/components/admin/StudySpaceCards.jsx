import React from 'react';
import { Users, Calendar, Eye, EyeOff, Crown, Target, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudySpaceCards = ({ studySpace }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const navigate = useNavigate()

  const getDomainColor = (domain) => {
    const colors = {
      'machine learning': 'bg-blue-50 text-blue-700 border-blue-200',
      'psychology': 'bg-purple-50 text-purple-700 border-purple-200',
      'science': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'engineering': 'bg-orange-50 text-orange-700 border-orange-200',
      'mathematics': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'default': 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return colors[domain?.toLowerCase()] || colors.default;
  };

  if (!studySpace) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E0F2F5' }}>
          <Users className="w-8 h-8" style={{ color: '#0097B2' }} />
        </div>
        <div className="text-gray-600 text-lg font-medium">No study space found</div>
        <div className="text-gray-500 text-sm mt-1">Create your first study space to get started</div>
      </div>
    );
  }

  return (
    <div className=" rounded-3xl overflow-hidden bg-white shadow-lg  hover:shadow-2xl transition-all duration-500 hover:scale-105 flex flex-col" >
      {/* Header Section */}
      <div className="relative h-40 flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #0097B2 0%, #00B2A9 100%)' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-4 right-8 w-24 h-24 rounded-full opacity-10 bg-white"></div>
          <div className="absolute bottom-6 left-6 w-16 h-16 rounded-full opacity-10 bg-white"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full opacity-5 bg-white transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Logo */}
        <div className="relative z-10">
          {studySpace.logo ? (
            <img
              src={studySpace.logo}
              alt={`${studySpace.name} logo`}
              className="w-20 h-20 rounded-2xl border-4 border-white shadow-xl object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center bg-white/90 backdrop-blur-sm">
              <span className="text-2xl font-bold" style={{ color: '#0097B2' }}>
                {studySpace.name?.charAt(0)?.toUpperCase() || 'S'}
              </span>
            </div>
          )}
        </div>

        {/* Admin Badge */}
        {studySpace.isAdmin && (
          <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg">
            <Crown className="w-3.5 h-3.5" />
            Admin
          </div>
        )}

        {/* Visibility Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 text-white text-xs font-medium bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-xl">
          {studySpace.visibility === 'private' ? (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              Private
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              Public
            </>
          )}
        </div>

        {/* Member Count */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-white text-xs font-medium bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-xl">
          <Users className="w-3.5 h-3.5" />
          {studySpace.members?.length || 0}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Title and Domain */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 capitalize mb-2 group-hover:text-transparent  transition-all duration-300"
          >
            {studySpace.name}
          </h3>
          {studySpace.domain && (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold border-2 capitalize ${getDomainColor(studySpace.domain)}`}>
              <Target className="w-3.5 h-3.5" />
              {studySpace.domain}
            </span>
          )}
        </div>

        {/* Goal and Tech Skills */}
        <div className="space-y-3 mb-4">
          {studySpace.goal && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E0F2F5' }}>
                <Target className="w-4 h-4" style={{ color: '#0097B2' }} />
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Goal</span>
                <p className="text-sm text-gray-700 mt-0.5 leading-relaxed">{studySpace.goal}</p>
              </div>
            </div>
          )}

          {studySpace.techSkills && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E0F2F5' }}>
                <Code className="w-4 h-4" style={{ color: '#00B2A9' }} />
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tech Skills</span>
                <p className="text-sm text-gray-700 mt-0.5 leading-relaxed">{studySpace.techSkills}</p>
              </div>
            </div>
          )}
        </div>

        {/* Tags */}
        {studySpace.tags?.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {studySpace.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-50 text-gray-600 px-3 py-1 rounded-lg text-xs font-medium border"
                  style={{ borderColor: '#E0F2F5' }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Rules */}
        {studySpace.rules && (
          <div className="mb-4 p-3 rounded-xl border-2" style={{ backgroundColor: '#F2F2F2', borderColor: '#E0F2F5' }}>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Rules</span>
            <p className="text-sm text-gray-700 leading-relaxed">{studySpace.rules}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-4">
          {/* Created Date and Invite Code */}
          <div className="py-2 justify-between items-center mb-4 text-xs">
            <div className="flex items-center gap-1.5 text-gray-500">
              <Calendar className="w-3.5 h-3.5" />
              <span className="font-medium">{formatDate(studySpace.createdAt)}</span>
            </div>
            {studySpace.inviteCode && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">Code:</span>
                <code
                  className="px-2 py-1 rounded-lg text-xs font-bold border"
                  style={{
                    backgroundColor: '#E0F2F5',
                    color: '#0097B2',
                    borderColor: '#B3E0E9',
                  }}
                >
                  {studySpace.inviteCode}
                </code>
              </div>

            )}
          </div>

          {/* Action Button */}
          <button
            onClick={() => {
              navigate(`requests/${studySpace.id}`);
            }}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl text-white font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #0097B2 0%, #00B2A9 100%)' }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #007a94 0%, #008a82 100%)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #0097B2 0%, #00B2A9 100%)';
            }}
          >
            <Eye className="w-4 h-4" />
            View Requests
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudySpaceCards;