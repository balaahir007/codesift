import React from 'react';
import { Briefcase, Search, Filter, Sun, Moon, X, ChevronDown } from 'lucide-react';

const JobSearchHeader = ({
  isDark = false,
  setTheme = () => {},
  searchQuery = '',
  setSearchQuery = () => {},
  filterOptions = {},
  selectedFilters = {},
  setSelectedFilters = () => {},
  showFilterDropdown = null,
  setShowFilterDropdown = () => {},
  activeFiltersCount = 0,
  clearAllFilters = () => {},
  filteredJobsLength = 0
}) => {
  // Theme classes
  const bgPrimary = isDark ? "bg-[#0B1416]" : "bg-white";
  const bgSecondary = isDark ? "bg-[#0F1E20]" : "bg-gray-50";
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-600";
  const border = isDark ? "border-gray-800" : "border-gray-200";

  return (
    <div className={`${bgPrimary} shadow-sm ${border} border-b sticky top-0 z-30 backdrop-blur-sm bg-opacity-95`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-5">
        
        {/* Top Section: Title + Theme Toggle */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] rounded-xl flex items-center justify-center shadow-lg shadow-[#0097B2]/20">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${textPrimary}`}>
                Find Your Dream Job
              </h1>
              <p className={`text-sm ${textSecondary} mt-0.5`}>
                {filteredJobsLength} opportunities available
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`p-2.5 rounded-xl ${bgSecondary} ${textSecondary} hover:text-[#0097B2] transition-all hover:scale-105 active:scale-95`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${textSecondary}`} />
          <input
            type="text"
            placeholder="Search by job title, company, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-12 pr-4 py-3.5 rounded-xl ${bgSecondary} ${border} border ${textPrimary} placeholder-gray-400 focus:ring-2 focus:ring-[#0097B2]/20 focus:border-[#0097B2] transition-all outline-none`}
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <div className={`p-2 rounded-lg ${bgSecondary} flex-shrink-0`}>
            <Filter className={`w-4 h-4 ${textSecondary}`} />
          </div>
          
          {Object.entries(filterOptions).map(([key, options]) => (
            <div key={key} className="relative flex-shrink-0">
              <button
                onClick={() => setShowFilterDropdown(showFilterDropdown === key ? null : key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  selectedFilters[key] 
                    ? 'bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white shadow-md shadow-[#0097B2]/20' 
                    : `${bgSecondary} ${textSecondary} hover:border-[#0097B2]`
                } border ${border} transition-all whitespace-nowrap text-sm font-medium`}
              >
                {selectedFilters[key] || key.charAt(0).toUpperCase() + key.slice(1)}
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilterDropdown === key ? 'rotate-180' : ''}`} />
              </button>
              
              {showFilterDropdown === key && (
                <div className={`absolute top-full mt-2 left-0 ${bgPrimary} ${border} border rounded-xl shadow-xl z-50 min-w-[200px] py-2 overflow-hidden`}>
                  {options.map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedFilters(prev => ({ ...prev, [key]: option }));
                        setShowFilterDropdown(null);
                      }}
                      className={`w-full text-left px-4 py-2.5 ${textPrimary} hover:bg-[#0097B2]/10 transition-colors text-sm font-medium ${
                        selectedFilters[key] === option ? 'bg-[#0097B2]/10 text-[#0097B2]' : ''
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full ${
                isDark 
                  ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30' 
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              } text-sm font-medium transition-all whitespace-nowrap flex-shrink-0`}
            >
              Clear All <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Custom Scrollbar Hide */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default JobSearchHeader;