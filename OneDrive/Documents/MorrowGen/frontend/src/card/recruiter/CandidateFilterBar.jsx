import React, { useState } from "react";
import { Search, X } from "lucide-react";
import useThemeStore from "../../zustand/themeStore";

const CandidateFilterBar = ({ onFilter }) => {
  const { mode } = useThemeStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    stage: "",
    location: "",
    experience: "",
  });

  const handleFilterChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilter({ ...updated, search: searchTerm });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilter({ ...filters, search: value });
  };

  const clearFilters = () => {
    setFilters({ stage: "", location: "", experience: "" });
    setSearchTerm("");
    onFilter({});
  };

  const bgClass = mode === "dark" ? "bg-[#1B2332]" : "bg-white";
  const borderClass = mode === "dark" ? "border-gray-700" : "border-gray-200";

  return (
    <div
      className={`w-full p-4 rounded-2xl shadow-md border ${bgClass} ${borderClass} mb-6`}
    >
      {/* Search Input */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name, email, or company..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200
              ${
                mode === "dark"
                  ? "bg-[#252F45] border-gray-700 text-gray-100 focus:ring-indigo-500"
                  : "bg-gray-50 border-gray-300 text-gray-800 focus:ring-indigo-400"
              }`}
          />
        </div>

        {/* Clear Button */}
        <button
          onClick={clearFilters}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold border transition-all duration-300
            ${
              mode === "dark"
                ? "bg-[#252F45] border-gray-700 text-gray-300 hover:border-indigo-500 hover:text-indigo-300"
                : "bg-gray-50 border-gray-300 text-gray-700 hover:border-indigo-500 hover:text-indigo-600"
            }`}
        >
          <X className="w-4 h-4" /> Clear
        </button>
      </div>

      {/* Filter Options */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
        <select
          value={filters.stage}
          onChange={(e) => handleFilterChange("stage", e.target.value)}
          className={`p-2.5 rounded-xl border text-sm focus:ring-2 focus:outline-none
            ${
              mode === "dark"
                ? "bg-[#252F45] border-gray-700 text-gray-100 focus:ring-indigo-500"
                : "bg-gray-50 border-gray-300 text-gray-700 focus:ring-indigo-400"
            }`}
        >
          <option value="">All Status</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
          className={`p-2.5 rounded-xl border text-sm focus:ring-2 focus:outline-none
            ${
              mode === "dark"
                ? "bg-[#252F45] border-gray-700 text-gray-100 focus:ring-indigo-500"
                : "bg-gray-50 border-gray-300 text-gray-700 focus:ring-indigo-400"
            }`}
        >
          <option value="">All Locations</option>
          <option value="Chennai">Chennai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>

        <select
          value={filters.experience}
          onChange={(e) => handleFilterChange("experience", e.target.value)}
          className={`p-2.5 rounded-xl border text-sm focus:ring-2 focus:outline-none
            ${
              mode === "dark"
                ? "bg-[#252F45] border-gray-700 text-gray-100 focus:ring-indigo-500"
                : "bg-gray-50 border-gray-300 text-gray-700 focus:ring-indigo-400"
            }`}
        >
          <option value="">All Experience</option>
          <option value="0">Fresher</option>
          <option value="1">1 Year</option>
          <option value="2">2 Years</option>
          <option value="3">3+ Years</option>
        </select>
      </div>
    </div>
  );
};

export default CandidateFilterBar;
