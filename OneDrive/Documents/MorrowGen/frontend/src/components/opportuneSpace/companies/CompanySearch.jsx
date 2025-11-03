import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const CompanySearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Search Companies</h2>

      <div className="relative">
        <FiSearch className="absolute top-3.5 left-3 text-gray-500 text-lg" />
        <input
          type="text"
          placeholder="Type a company name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default CompanySearch;
