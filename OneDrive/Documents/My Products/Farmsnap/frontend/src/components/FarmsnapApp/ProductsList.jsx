import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductsList = () => {
  const { products, loading } = useSelector((state) => ({
    products: state?.product?.product || [],
    loading: state?.product?.loading || false,
  }));
  const loadingList = Array(13).fill(null)
  return (
    <div className="my-6 px-4 md:px-10 lg:px-18">
      <div className="flex overflow-x-auto scrollbar-hide space-x-4 py-2 ">
        {loading || products.length === 0 ? (
          <div className="flex overflow-x-auto space-x-2 py-2 scrollbar-hide">
            {loadingList.map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-32 md:w-40"
              >
                <div className="flex justify-center items-center">
                  <div className="cursor-pointer rounded-full w-16 h-16 md:w-20 md:h-20 animate-pulse bg-secondary"></div>
                </div>
                <div className="h-4 w-16 md:w-24 bg-secondary rounded mt-2 animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex overflow-x-auto space-x-2 py-2 scrollbar-hide">
            {products.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-32 md:w-60"
              >
                <div className="flex justify-center items-center">
                  <Link to={`/product/${item._id}`}>
                    <img
                      src={item.productimages[0]}
                      alt={item.name}
                      className="cursor-pointer rounded-full size-20 object-cover border border-gray-200"
                    />
                  </Link>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <CiLocationOn className="text-green-500 text-sm" />
                  <h2 className="text-xs md:text-sm">{item.location}</h2>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
