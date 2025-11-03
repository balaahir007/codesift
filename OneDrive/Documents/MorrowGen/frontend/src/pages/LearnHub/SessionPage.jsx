import React, { useState, useMemo } from "react";
import { sessions } from "../../assets/learnhub/learnhubAssets";
import SessionSection from "../../card/learnhubCards/SessionSection";

const SessionPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter and categorize sessions
  const categorized = useMemo(() => {
    const filtered = sessions.filter((session) =>
      session.sessionTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.sessionHeading?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.sessionDescription?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return {
      all: filtered,
      live: filtered.filter((s) => s.status === "live"),
      upcoming: filtered.filter((s) => s.status === "upcoming"),
      finished: filtered.filter((s) => s.status === "finished"),
    };
  }, [searchQuery]);

  const getSessionCount = (status) => categorized[status]?.length || 0;

  const tabs = [
    { id: "all", label: "All Sessions", count: getSessionCount("all"), color: "blue" },
    { id: "live", label: "Live", count: getSessionCount("live"), color: "green" },
    { id: "upcoming", label: "Upcoming", count: getSessionCount("upcoming"), color: "yellow" },
    { id: "finished", label: "Completed", count: getSessionCount("finished"), color: "gray" },
  ];

  const getTabStyles = (tab) => {
    const baseStyles = "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2";
    const isActive = activeTab === tab.id;
    
    const colorStyles = {
      blue: isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-blue-600 hover:bg-blue-50",
      green: isActive ? "bg-green-100 text-green-700" : "text-gray-600 hover:text-green-600 hover:bg-green-50",
      yellow: isActive ? "bg-yellow-100 text-yellow-700" : "text-gray-600 hover:text-yellow-600 hover:bg-yellow-50",
      gray: isActive ? "bg-gray-100 text-gray-700" : "text-gray-600 hover:text-gray-600 hover:bg-gray-50",
    };

    return `${baseStyles} ${colorStyles[tab.color]}`;
  };

  const clearSearch = () => setSearchQuery("");

  return (
    <div className="min-h-screen bg-gradient-to-br bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r text-primary bg-clip-text  mb-3">
            Learning Sessions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Track your learning journey with live classes, upcoming schedules, and completed sessions.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by title, heading, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-gray-700 placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={getTabStyles(tab)}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className="bg-white/80 text-xs px-2 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-8">
          {searchQuery && (
            <div className="text-center py-4">
              <p className="text-gray-600">
                Found <span className="font-semibold text-primary">{categorized.all.length}</span> session{categorized.all.length !== 1 ? 's' : ''} 
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>
          )}

          {/* Sessions Display */}
          {activeTab === "all" ? (
            <>
              {categorized.live.length > 0 && (
                <SessionSection
                  title="🔴 Live Sessions"
                  sessions={categorized.live}
                  color="green"
                />
              )}
              {categorized.upcoming.length > 0 && (
                <SessionSection
                  title="⏰ Upcoming Sessions"
                  sessions={categorized.upcoming}
                  color="yellow"
                />
              )}
              {categorized.finished.length > 0 && (
                <SessionSection
                  title="✅ Completed Sessions"
                  sessions={categorized.finished}
                  color="gray"
                />
              )}
            </>
          ) : (
            <SessionSection
              title={tabs.find(t => t.id === activeTab)?.label}
              sessions={categorized[activeTab]}
              color={tabs.find(t => t.id === activeTab)?.color}
            />
          )}

          {categorized[activeTab].length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Sessions Found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchQuery 
                  ? `No sessions match your search "${searchQuery}". Try different keywords.`
                  : `No ${activeTab === "all" ? "" : activeTab} sessions available at the moment.`
                }
              </p>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="mt-4 text-primary hover:text-primary/80 font-medium"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SessionPage