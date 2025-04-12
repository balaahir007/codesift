import React, { useState } from "react";
import { productCategory, tamilNaduDistricts } from "../../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import { CgArrowLeft } from "react-icons/cg";

const SearchFilter = ({setFilterOpen,filterOpen}) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ category: [], location: [] });
  const [filterCategoryName, setFilterCategoryName] = useState("Category");
  const [showMore, setShowMore] = useState({
    category: false,
    location: false,
  });

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked
        ? [...prevFilters[name], value]
        : prevFilters[name].filter((item) => item !== value),
    }));
  };

  const applyFilters = () => {
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      filters[key].forEach((value) => queryParams.append(key, value));
    });

    if (queryParams.toString().trim()) {
      navigate(`/search?${queryParams.toString()}`);
      setFilterOpen(false)
    }
  };

  const clearFilters = () => {
    setFilters({ category: [], location: [] });
  };

  return (
    <div className="w-full ">
      <div className="w-60 h-auto p-4 shadow-md text-sm hidden md:block">
        <div className="flex justify-between">
          <span className="font-medium">Filters</span>
          <span
            className="text-blue-500 cursor-pointer flex items-center gap-1"
            onClick={applyFilters}
          >
            <CiFilter />
            Apply Filters
          </span>
        </div>
        <hr className="my-2" />

        <div className="mt-4 flex flex-wrap gap-4">
          {["category", "location"].map((name, idx) => (
            <div key={idx} className="bg-green-50 p-3 w-full rounded-lg shadow">
              <span className="text-sm font-bold capitalize">{name}</span>

              {(name === "category" ? productCategory : tamilNaduDistricts)
                .slice(0, showMore[name] ? undefined : 8)
                .map((item, index) => (
                  <label key={index} className="block text-sm">
                    <input
                      type="checkbox"
                      name={name}
                      value={item}
                      onChange={handleFilterChange}
                      checked={filters[name].includes(item)}
                      className="mr-2"
                    />
                    {item}
                  </label>
                ))}

              <span
                className="text-xs text-blue-500 cursor-pointer"
                onClick={() =>
                  setShowMore((prev) => ({ ...prev, [name]: !prev[name] }))
                }
              >
                {showMore[name] ? "Show Less" : "Show More"}
              </span>
            </div>
          ))}
        </div>
      </div>
     <div className="md:hidden">
        <div className="flex items-center justify-between h-8 bg-white w-full px-2 pt-4">
          <div className="flex items-center gap-2">
            <CgArrowLeft className="size-6" onClick={() => {setFilterOpen(false)}} />
            Filters
          </div>
          <span
            className="text-xs cursor-pointer text-primary"
            onClick={clearFilters}
          >
            Clear Filters
          </span>
        </div>
        <div className="h-120 text-sm w-full mt-4 shadow-lg flex  bg-secondary">
          <div className="w-1/3 h-full bg-white rounded-md">
            {["Category", "Location"].map((item, index) => (
              <div
                key={index}
                className={`p-2 cursor-pointer ${
                  filterCategoryName === item
                    ? "bg-secondary font-semibold"
                    : ""
                }`}
                onClick={() => setFilterCategoryName(item)}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="w-2/3 overflow-y-scroll scrollbar-hide my-2 px-2">
            {(filterCategoryName === "Category"
              ? productCategory
              : tamilNaduDistricts
            ).map((item, index) => (
              <label key={index} className="block text-sm">
                <input
                  type="checkbox"
                  value={item}
                  name={filterCategoryName.toLowerCase()}
                  onChange={handleFilterChange}
                  checked={filters[filterCategoryName.toLowerCase()].includes(
                    item
                  )}
                  className="mr-2"
                />
                {item}
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center w-full px-2 space-x-2 bg-white  p-4   mt1">
          <button
            className="border border-gray-400 px-3 py-2 w-full rounded-lg bg-gray-200  shadow-md hover:bg-gray-300 transition"
            onClick={() => setFilterOpen(false)}
          >
            Close
          </button>
          <button
            className="bg-primary px-3 py-2 w-full text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            onClick={applyFilters}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
