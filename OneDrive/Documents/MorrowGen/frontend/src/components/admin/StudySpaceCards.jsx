import React from 'react';
import { Users, Calendar, Eye, EyeOff, Crown, Target, Code, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudySpaceCards = ({ studySpace = {}, mode = 'light' }) => {
  const navigate = useNavigate();

  // Theme colors
  const bgPrimary = mode === 'dark' ? 'bg-[#0A1415]' : 'bg-gray-50';
  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const inputBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-white';
  const hoverBg = mode === 'dark' ? 'hover:bg-[#0F1E20]' : 'hover:bg-gray-50';

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

  const getDomainColor = (domain) => {
    if (mode === 'dark') {
      const darkColors = {
        'machine learning': 'bg-blue-900/30 text-blue-300 border-blue-700/50',
        'psychology': 'bg-purple-900/30 text-purple-300 border-purple-700/50',
        'science': 'bg-emerald-900/30 text-emerald-300 border-emerald-700/50',
        'engineering': 'bg-orange-900/30 text-orange-300 border-orange-700/50',
        'mathematics': 'bg-indigo-900/30 text-indigo-300 border-indigo-700/50',
        'default': 'bg-gray-800/30 text-gray-300 border-gray-700/50'
      };
      return darkColors[domain?.toLowerCase()] || darkColors.default;
    } else {
      const lightColors = {
        'machine learning': 'bg-blue-50 text-blue-700 border-blue-200',
        'psychology': 'bg-purple-50 text-purple-700 border-purple-200',
        'science': 'bg-emerald-50 text-emerald-700 border-emerald-200',
        'engineering': 'bg-orange-50 text-orange-700 border-orange-200',
        'mathematics': 'bg-indigo-50 text-indigo-700 border-indigo-200',
        'default': 'bg-gray-50 text-gray-700 border-gray-200'
      };
      return lightColors[domain?.toLowerCase()] || lightColors.default;
    }
  };

  // Empty state when no study space
  if (!studySpace || !studySpace.name) {
    return (
      <div className={`text-center py-16 px-6    mx-auto mt-2 rounded-3xl ${cardBg} ${borderColor} border-2`}>
        <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-[#E0F2F5]'}`}>
          <BookOpen className={`w-10 h-10 ${mode === 'dark' ? 'text-[#00B2A9]' : 'text-[#0097B2]'}`} />
        </div>
        <div className={`${textPrimary} text-xl font-bold mb-2`}>No study space found</div>
        <div className={`${textSecondary} text-sm max-w-md mx-auto`}>
          Create your first study space to collaborate with others and achieve your learning goals
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-3xl overflow-hidden ${cardBg} shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 flex flex-col`}>
      {/* Header Section */}
      <div onClick={() => {
        navigate(`/study-space/${studySpace.id}`);
      }} className="relative h-40 flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #0097B2 0%, #00B2A9 100%)' }}>
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
          <h3 className={`text-xl font-bold ${textPrimary} capitalize mb-2 transition-all duration-300`}>
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
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-[#E0F2F5]'}`}>
                <Target className="w-4 h-4" style={{ color: '#0097B2' }} />
              </div>
              <div>
                <span className={`text-xs font-semibold ${textSecondary} uppercase tracking-wide`}>Goal</span>
                <p className={`text-sm ${textSecondary} mt-0.5 leading-relaxed`}>{studySpace.goal}</p>
              </div>
            </div>
          )}

          {studySpace.techSkills && (
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-[#E0F2F5]'}`}>
                <Code className="w-4 h-4" style={{ color: '#00B2A9' }} />
              </div>
              <div>
                <span className={`text-xs font-semibold ${textSecondary} uppercase tracking-wide`}>Tech Skills</span>
                <p className={`text-sm ${textSecondary} mt-0.5 leading-relaxed`}>{studySpace.techSkills}</p>
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
                  className={`${mode === 'dark' ? 'bg-[#0F1E20] text-gray-300 border-[#294B4E]' : 'bg-gray-50 text-gray-600 border-[#E0F2F5]'} px-3 py-1 rounded-lg text-xs font-medium border`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Rules */}
        {studySpace.rules && (
          <div className={`mb-4 p-3 rounded-xl border-2 ${mode === 'dark' ? 'bg-[#0F1E20] border-[#294B4E]' : 'bg-[#F2F2F2] border-[#E0F2F5]'}`}>
            <span className={`text-xs font-semibold ${textSecondary} uppercase tracking-wide block mb-1`}>Rules</span>
            <p className={`text-sm ${textSecondary} leading-relaxed`}>{studySpace.rules}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-4">
          {/* Created Date and Invite Code */}
          <div className="py-2 justify-between items-center mb-4 text-xs">
            <div className={`flex items-center gap-1.5 ${textSecondary}`}>
              <Calendar className="w-3.5 h-3.5" />
              <span className="font-medium">{formatDate(studySpace.createdAt)}</span>
            </div>
            {studySpace.inviteCode && (
              <div className="flex items-center gap-2 mt-2">
                <span className={`${textSecondary} font-medium`}>Code:</span>
                <code
                  className={`px-2 py-1 rounded-lg text-xs font-bold border ${mode === 'dark'
                      ? 'bg-[#0F1E20] text-[#00B2A9] border-[#294B4E]'
                      : 'bg-[#E0F2F5] text-[#0097B2] border-[#B3E0E9]'
                    }`}
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