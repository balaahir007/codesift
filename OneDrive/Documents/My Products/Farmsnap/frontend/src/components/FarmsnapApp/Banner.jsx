import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { BannerImages } from "../../assets/assets";
import HomeSearchHover from "./HomeSearchHover";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [slide, setSlide] = useState(0);
  const [searchData, setSearchData] = useState("");
  const [searchClick, setSearchClick] = useState(false);
  const [isMobileSearch, setIsMobileSearch] = useState(window.innerWidth < 768);
  const navigate = useNavigate();


  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prevSlide) => (prevSlide + 1) % BannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
      setSearchClick(true);
      navigate('/searchsuggestion')
  };


  return (
    <div>
      {searchClick ? (
        <div className="w-full absolute inset-0  bg-white/100 z-80 transition-all">
          <HomeSearchHover setSearchClick={setSearchClick}/>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center lg:p-0">
          <div className="relative w-full px-2 max-w-xs sm:max-w-md lg:max-w-lg">
            <CiSearch
              className="text-2xl absolute top-2 left-3 text-gray-500 cursor-pointer"
            />
            <input
              type="text"
              placeholder="Search for Products"
              name="searchData"
              onClick={handleSearch}
              className="border-2 md:text-sm w-full border-green-300 py-2 pl-10 pr-3 rounded-lg text-gray-500 text-sm focus:border-green-500 outline-none"
            />
          </div>

          <h2 className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700">
            Our Hardworking Farmers
          </h2>
          <div className="w-full sm:max-w-full lg:max-w-full mt-4 relative flex justify-center">
            <div className="w-full overflow-hidden relative rounded-xl">
              <div
                className="w-full min-w-screen flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${slide * 100}%)` }}
              >
                {BannerImages.map((item, index) => (
                  <img
                    key={index}
                    src={item}
                    alt="Banner"
                    className="px-6 sm:px-16 sm:min-w-full object-cover lg:flex-shrink-0 h-40 md:h-50"
                  />
                ))}
              </div>
            </div>
            <div className="absolute bottom-4 flex space-x-2">
              {BannerImages.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    slide === index ? "bg-green-500 scale-125" : "bg-gray-300"
                  }`}
                ></span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
