import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import HomeSearchHover from "./HomeSearchHover";
import { useSelector } from "react-redux";
import { assets } from "../../assets/assets";
import { IoIosClose, IoMdArrowBack } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { CgClose, CgProfile } from "react-icons/cg";
import { CiFilter, CiSearch } from "react-icons/ci";
import SearchFilter from "./SearchFilter";

const SearchProductsDisplay = () => {
  const { product } = useParams();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const currentUser = localStorage.getItem("user");
  const products = useSelector((state) => state?.product?.product) || [];
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  console.log("product", product);

  const locations = queryParams.getAll("location");
  const categories = queryParams.getAll("category");
  console.log("locaaa", locations);
  console.log("locaaa", categories);

  const filteredProducts =
    products?.length > 0
      ? products.filter(
          (item) =>
            item?.productName
              ?.toLowerCase()
              ?.trim()
              .includes(product?.toLowerCase()?.trim()) ||
            locations.some((loc) =>
              loc
                .trim()
                .toLowerCase()
                .includes(item?.location?.toLowerCase()?.trim() || "")
            ) ||
            categories.some((category) =>
              category
                .trim()
                .toLowerCase()
                .includes(item?.productName?.toLowerCase()?.trim() || "")
            )
        )
      : [];
  const filterData = filteredProducts?.length > 0 ? filteredProducts : products;

  useEffect(() => {
    if (filteredProducts.length === 0) {
      const similarProduct = filterData?.find((item) =>
        item?.productName
          .toLowerCase()
          .includes(product?.slice(0, 3).toLowerCase().trim())
      );
      if (similarProduct) {
        setErrorMsg(similarProduct?.productName || "");
      } else {
        setErrorMsg("No Products Found");
      }
    } else {
      setErrorMsg("");
    }
  }, [filteredProducts,filterOpen]);
  return (
    <div>
      <div className="flex flex-col items-center gap-6">
        <div className="hidden md:block">
          <HomeSearchHover searchProduct={product} />
        </div>

        {!filterOpen && (
          <div className="shadow md:hidden w-full z-50 lg:px-20 lg:pt-1 px-2 sticky lg:top-0 bg-white md:p-2 mb-6 transition-shadow duration-300  h-15">
            <div className="md:w-200 w-full relative  flex gap-1  justify-between  items-center mt-4">
              <div className="flex items-center gap-2">
                <IoMdArrowBack
                  className=" size-6 sm:size-8 cursor-pointer text-gray-500"
                  onClick={() => navigate(-1)}
                />
                <img
                  src={assets.fsIcon}
                  onClick={() => navigate("/")}
                  alt="Logo"
                  className="h-7"
                />
                <span className="text-sm">
                  {errorMsg === "No Products Found" ? "" : product}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CiSearch
                  className=" right-4 size-6  cursor-pointer"
                  onClick={() => navigate("/searchsuggestion")}
                />
                {currentUser ? (
                  <CgProfile className="size-5" />
                ) : (
                  <button>Login</button>
                )}
              </div>
            </div>
          </div>
        )}
        {filterData?.length > 0 ? (
          <div className="flex">
            {!filterOpen && <div
              className="absolute top-20 right-4 flex md:hidden text-sm items-center text-blue-500 gap-1"
              onClick={() => {
                setFilterOpen(true);
              }}
            >
                <CiFilter />
                <span>Filters</span>
            </div>}
            {/* for Mobile Divices */}
              {filterOpen && <div className="absolute md:hidden top-0 w-full left-0">
                <SearchFilter setFilterOpen={setFilterOpen} filterOpen={filterOpen} />
              </div>}
              {/* For Laptop Divices */}
              <div className=" hidden md:block">
                <SearchFilter setFilterOpen={setFilterOpen} filterOpen={filterOpen} />
              </div>
              <div className="hidden md:block">
              </div>
            <div className="grid grid-cols-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 px-4">
              {filterOpen && (
                <div>
                  <div
                    className="border w-full"
                    onClick={() => setFilterOpen(true)}
                  >
                    {" "}
                  </div>
                </div>
              )}
              {!filterOpen && errorMsg && (
                <div className=" text-sm absolute flex top-20 items-center gap-1 t md:top-20">
                  {errorMsg === "No Products Found" ? (
                    <div className="text-red-500">{errorMsg}</div>
                  ) : (
                    <div
                      className="text-blue-500 cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/search/${encodeURIComponent(errorMsg || " ")}`
                        )
                      }
                    >
                      {" "}
                      <span className="text-black">Did You Mean :</span>{" "}
                      {errorMsg}
                    </div>
                  )}
                </div>
              )}
              {!errorMsg && !filterOpen && (
                <span className="text-primary absolute top-20">{product}</span>
              )}
              {!filterOpen &&
                filterData?.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col w-full bg-white  h-85 rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition p-4"
                  >
                    <Link to={`/product/${item._id}`}>
                      <img
                        src={item?.productimages?.[0]}
                        alt={item?.productName || "Product"}
                        className="md:size-40 size-20 w-30 md:w-60 rounded-md"
                      />
                    </Link>
                    <div className="mt-4 flex flex-col space-y-2 text-gray-700">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {item?.productName || "Unknown Product"}
                      </h2>
                      <p className="text-sm font-medium">
                        By: {item?.farmerName || "N/A"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item?.location?.length > 50
                          ? item?.location?.slice(0, 50) + "..."
                          : item?.location || "Location not available"}
                      </p>
                      <a href={`tel:${item?.mobileNumber || ""}`}>
                        <button className="bg-green-500 hover:bg-green-600 cursor-pointer text-white py-2 px-4 rounded-lg">
                          Contact
                        </button>
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-lg mt-4">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchProductsDisplay;
