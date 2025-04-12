import React, { useEffect, useState, useRef, useCallback } from "react";
import Spinner from "./Spinner";
import summuryApi from "../../common/summuryApi";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";

const limit = 10;
const TopPicksByFarmer = ({heading}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState([]);
  const spinnerRef = useRef(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadingList = Array(10).fill(null);

  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return; 
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.get(
        `${summuryApi.getLimitProducts}?limit=${limit}&page=${page}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.data;

      if (Array.isArray(result.data) && result.data.length > 0) {
        setData((prev) => [...prev, ...result.data]);
      } else {
        setHasMore(false); 
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally{
      setLoading(false)
    }
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchProducts();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchProducts]); 

  return (
    <div>
    <h1 className="mx-3 md:mx-10 my-4 text-primary border-b-secondary  border-b ">{heading}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.map((item) => (
          <div key={item._id} className="flex flex-col items-center">
            <Link to={`/product/${item._id}`}>
              <img
                src={item.productimages?.[0] || "placeholder.jpg"}
                alt={item.name}
                className="w-28 h-20 md:w-38 md:h-24 object-cover rounded-md"
              />
            </Link>
            <div className="flex items-center mt-2">
              <CiLocationOn className="text-green-500 text-sm" />
              <h2 className="text-xs md:text-sm ml-1">{item.location || "Unknown"}</h2>
            </div>
          </div>
        ))}

        {loading &&
          data.length === 0 &&
          loadingList.map((_, index) => (
            <div key={index} className="flex flex-col items-center animate-pulse">
              <div className="bg-secondary w-28 h-20 md:w-38 md:h-24 rounded-md" />
              <div className="flex items-center mt-2">
                <div className="bg-secondary w-4 h-4 rounded-full"></div>
                <div className="ml-1 bg-secondary w-16 h-4"></div>
              </div>
            </div>
          ))}
      </div>
          <span>{errorMsg}</span>
      <div ref={spinnerRef} className="mt-4 flex w-full items-center justify-center">
        {loading && <Spinner text={'Please Wait...'} />}
      </div>
    </div>
  );
};

export default TopPicksByFarmer;
