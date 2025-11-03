import React, { useEffect, useState } from "react";
import { homeBanners } from "../../assets/learnhub/learnhubAssets";

const CourseBannerSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === homeBanners.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full  rounded-xl overflow-hidden shadow-lg">
        <img
          src={homeBanners[currentIndex]}
          alt={`banner-${currentIndex}`}
          className="w-full h-[250px] object-cover rounded-xl transition-opacity duration-500"
        />
      </div>

      <div className="flex justify-center mt-3 space-x-2">
        {homeBanners.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all ${
              currentIndex === index
                ? "bg-primary scale-125"
                : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseBannerSection;
