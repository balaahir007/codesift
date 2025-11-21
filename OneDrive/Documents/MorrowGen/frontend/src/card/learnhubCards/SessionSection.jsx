import React from 'react';

const SessionsCard = ({ sessions, mode = 'light' }) => {
  if (!sessions?.length) {
    return null;
  }

  // Theme colors
  const isDark = mode === 'dark';
  const cardBg = isDark ? 'bg-[#1B2E31]' : 'bg-white';
  const cardBorder = isDark ? 'border-gray-700' : 'border-gray-100';
  const textPrimary = isDark ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';
  const textAccent = isDark ? 'text-[#00B2A9]' : 'text-[#0097B2]';
  const hoverShadow = isDark ? 'hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]' : 'hover:shadow-lg';
  const divider = isDark ? 'border-gray-700' : 'border-gray-100';

  const getStatusBadge = (status) => {
    const badges = {
      live: { 
        text: "🔴 Live", 
        style: isDark 
          ? "bg-red-900/40 text-red-400 border border-red-700 animate-pulse" 
          : "bg-red-100 text-red-700 animate-pulse"
      },
      upcoming: { 
        text: "⏰ Upcoming", 
        style: isDark 
          ? "bg-yellow-900/40 text-yellow-400 border border-yellow-700" 
          : "bg-yellow-100 text-yellow-700"
      },
      finished: { 
        text: "✅ Completed", 
        style: isDark 
          ? "bg-gray-700/40 text-gray-400 border border-gray-600" 
          : "bg-gray-100 text-gray-600"
      },
    };
    
    return badges[status] || badges.upcoming;
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sessions.map((session) => {
        const badge = getStatusBadge(session.status);
        
        return (
          <div
            key={session.id}
            className={`${cardBg} rounded-xl shadow-sm border ${cardBorder} overflow-hidden ${hoverShadow} transition-all duration-300 hover:-translate-y-1 group`}
          >
            {/* Session Image */}
            <div className="relative overflow-hidden h-48">
              <img
                src={session.sessionImage}
                alt={session.sessionTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Dark overlay for better contrast in dark mode */}
              {isDark && (
                <div className="absolute inset-0 bg-black/20"></div>
              )}
              <div className="absolute top-3 left-3 z-10">
                <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${badge.style}`}>
                  {badge.text}
                </span>
              </div>
            </div>

            {/* Session Content */}
            <div className="p-6">
              <h3 className={`text-lg font-bold ${textPrimary} mb-2 line-clamp-1 group-hover:text-[#0097B2] transition-colors`}>
                {session.sessionHeading}
              </h3>
              <p className={`${textAccent} font-medium text-sm mb-2`}>
                {session.sessionTitle}
              </p>
              <p className={`${textSecondary} text-sm mb-4 line-clamp-2`}>
                {session.sessionDescription}
              </p>

              {/* Date and Time */}
              <div className={`flex items-center gap-4 text-sm ${textSecondary} mb-4 pb-4 border-b ${divider}`}>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  {session.sessionDate}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {session.sessionTime}
                </span>
              </div>

              {/* Action Button */}
              {session.whatsappGroupLink && (
                <a
                  href={session.whatsappGroupLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 ${
                    isDark 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white font-medium rounded-lg transition-all duration-200 text-sm group shadow-md hover:shadow-lg`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Join WhatsApp Group
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SessionsCard;