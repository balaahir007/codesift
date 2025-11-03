import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { courseData } from "../../assets/learnhub/learnhubAssets";

const AllCoursesCard = () => {
  const navigate = useNavigate();

  return (
    <div className=" p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Most Popular Certificates</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {courseData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg relative shadow hover:shadow-lg p-2 transition-transform hover:scale-105 cursor-pointer"
            onClick={() =>
              navigate(`/learnhub/courses/${item.id}`, {
                state: { videoLink: item.videoLink },
              })
            }
          >

            {item.isFree && (
              <div className="absolute top-3 right-3 z-20 bg-white px-2 py-1 rounded-full text-xs font-semibold text-gray-700 shadow">
                Free
              </div>
            )}
            <img
              src={item.image}
              alt={item.altText}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div className="p-4">
              <div className="flex items-center space-x-2">
                <img
                  src={item.icon}
                  alt={item.courseBy}
                  className="w-5 h-5 rounded-full"
                />
                <p className="text-sm text-gray-600 font-medium hover:text-gray-800 transition-colors">
                  {item.courseBy}
                </p>
              </div>
              <h3 className="text-gray-800 font-semibold text-sm mt-2">{item.title}</h3>
              <p className="text-gray-500 text-xs mt-1">{item.category}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/learnhub/courses/${item.id}`, {
                    state: { videoLink: item.videoLink },
                  });
                }}
                className="mt-3 flex items-center justify-center gap-1 rounded-md bg-primary text-white text-xs px-3 py-1 hover:bg-secondary transition"
              >
                <FaPlayCircle className="text-sm" />
                {item.buttonLabel}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCoursesCard;
