import React, { useState } from "react";
import { Search, MapPin, Briefcase, ExternalLink, Filter, Building, Users, Calendar } from "lucide-react";

const companies = [
  {
    companyName: "TechNova",
    industry: "Information Technology",
    location: "Bangalore, India",
    website: "https://www.technova.com",
    logo: "https://logo.clearbit.com/technova.com",
    jobOpeningsCount: 12,
    founded: "2018",
    employees: "500-1000"
  },
  {
    companyName: "HealthBridge",
    industry: "Healthcare",
    location: "Chennai, India",
    website: "https://www.healthbridge.in",
    logo: "https://logo.clearbit.com/healthbridge.in",
    jobOpeningsCount: 5,
    founded: "2020",
    employees: "100-500"
  },
  {
    companyName: "Finlytics",
    industry: "FinTech",
    location: "Mumbai, India",
    website: "https://www.finlytics.io",
    logo: "https://logo.clearbit.com/finlytics.io",
    jobOpeningsCount: 8,
    founded: "2019",
    employees: "200-500"
  },
  {
    companyName: "EduStack",
    industry: "EdTech",
    location: "Hyderabad, India",
    website: "https://www.edustack.co",
    logo: "https://logo.clearbit.com/edustack.co",
    jobOpeningsCount: 3,
    founded: "2021",
    employees: "50-100"
  },
  {
    companyName: "GreenGrid",
    industry: "Renewable Energy",
    location: "Pune, India",
    website: "https://www.greengrid.org",
    logo: "https://logo.clearbit.com/greengrid.org",
    jobOpeningsCount: 6,
    founded: "2017",
    employees: "300-500"
  },
  {
    companyName: "CloudCraft",
    industry: "Cloud Services",
    location: "Gurgaon, India",
    website: "https://www.cloudcraft.tech",
    logo: "https://logo.clearbit.com/cloudcraft.tech",
    jobOpeningsCount: 15,
    founded: "2016",
    employees: "1000+"
  },
  {
    companyName: "DataMind",
    industry: "Data Analytics",
    location: "Noida, India",
    website: "https://www.datamind.ai",
    logo: "https://logo.clearbit.com/datamind.ai",
    jobOpeningsCount: 9,
    founded: "2019",
    employees: "200-500"
  },
  {
    companyName: "RetailHub",
    industry: "E-commerce",
    location: "Kochi, India",
    website: "https://www.retailhub.in",
    logo: "https://logo.clearbit.com/retailhub.in",
    jobOpeningsCount: 7,
    founded: "2020",
    employees: "100-200"
  },
  {
    companyName: "AutoDrive",
    industry: "Automotive Tech",
    location: "Chennai, India",
    website: "https://www.autodrive.tech",
    logo: "https://logo.clearbit.com/autodrive.tech",
    jobOpeningsCount: 11,
    founded: "2018",
    employees: "500-1000"
  },
  {
    companyName: "CryptoVault",
    industry: "Blockchain",
    location: "Bangalore, India",
    website: "https://www.cryptovault.io",
    logo: "https://logo.clearbit.com/cryptovault.io",
    jobOpeningsCount: 4,
    founded: "2021",
    employees: "50-100"
  },
  {
    companyName: "AgriTech Solutions",
    industry: "Agriculture Technology",
    location: "Chandigarh, India",
    website: "https://www.agritech.co.in",
    logo: "https://logo.clearbit.com/agritech.co.in",
    jobOpeningsCount: 6,
    founded: "2019",
    employees: "100-200"
  },
  {
    companyName: "GameForge",
    industry: "Gaming",
    location: "Mumbai, India",
    website: "https://www.gameforge.studio",
    logo: "https://logo.clearbit.com/gameforge.studio",
    jobOpeningsCount: 8,
    founded: "2020",
    employees: "100-300"
  }
];

const industries = [...new Set(companies.map(company => company.industry))];

const CompanyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === "" || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
       <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Modern office buildings"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/70 to-primary/60"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
            🚀 Top Companies in India
          </h1>
          <p className="text-lg md:text-2xl text-gray-100 mb-6 max-w-2xl">
            Discover your next career opportunity with the best employers
          </p>
          <button className="px-8 py-3 bg-white text-primary font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition duration-300">
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="flex items-center gap-3 bg-white shadow-md rounded-xl p-5 border border-gray-100">
            <Building className="w-6 h-6 text-primary" />
            <div>
              <p className="text-sm text-gray-500">Companies</p>
              <p className="text-lg font-semibold text-gray-800">
                {filteredCompanies.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white shadow-md rounded-xl p-5 border border-gray-100">
            <Briefcase className="w-6 h-6 text-secondary" />
            <div>
              <p className="text-sm text-gray-500">Total Jobs</p>
              <p className="text-lg font-semibold text-gray-800">
                {companies.reduce(
                  (sum, company) => sum + company.jobOpeningsCount,
                  0
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-10 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies, locations, or industries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white shadow-sm"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer min-w-60 bg-white shadow-sm"
            >
              <option value="">All Industries</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCompanies.map((company, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt={`${company.companyName} Logo`}
                      className="w-10 h-10 object-contain"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    <span className="text-lg font-bold text-primary">
                      {company.companyName.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {company.companyName}
                  </h3>
                  <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {company.industry}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{company.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {company.jobOpeningsCount}{" "}
                    {company.jobOpeningsCount !== 1
                      ? "Open Positions"
                      : "Open Position"}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-between items-center mb-5 p-3 bg-gray-50 rounded-lg">
                <div className="text-center flex-1">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Calendar className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-500">Founded</span>
                  </div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {company.founded}
                  </p>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div className="text-center flex-1">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-500">Employees</span>
                  </div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {company.employees}
                  </p>
                </div>
              </div>

              {/* Action */}
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-primary hover:bg-secondary text-white font-medium text-sm rounded-lg transition-colors duration-200"
              >
                <span>Visit Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No companies found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>

  );
};

export default CompanyList;