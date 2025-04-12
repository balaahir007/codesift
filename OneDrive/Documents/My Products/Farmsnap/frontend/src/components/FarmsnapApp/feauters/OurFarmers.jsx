import React, { useState, useEffect } from "react";
import { CgSearch } from "react-icons/cg";
import { farmersData as initialData } from "../../../assets/assets";
import { useSelector } from "react-redux";
import axios from "axios";

const OurFarmers = () => {
  const Products = useSelector((state) => state?.product?.product)
  console.log("produ",Products);
  
  const [farmers, setFarmers] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const handleRequests = async(requestType, itemID) => {

    const reponse = await axios.post('/add-request',{farmerId : itemID},{
      withCredentials : true
          })

    const data = reponse.data

    setFarmers((prevFarmers) =>
      prevFarmers.map((item) =>
        item.id === itemID && requestType === "Request"
          ? { ...item, status: "Pending" }
          : item
      )
    );
  };

  const handleSearchInputBox = (e) => {
    setSearchText(e.target.value.toLowerCase());

  };

  useEffect(() => {
    setFarmers(
      initialData.filter(
        (item) =>
          item.location.toLowerCase().includes(searchText) ||
          item.product.toLowerCase().includes(searchText)
      )
    );
  }, [searchText]);

  return (
    <div className="px-5 md:mx-10">
      <div className="mb-4">
        <span className="text-xs md:text-sm font-semibold">
          Connect with Our Farmers – Fresh & Direct 🌾
        </span>
        <hr className="border-b border-primary w-16 mt-1" />
        <div className="bg-[#DCFDE7] rounded-lg flex items-center w-full max-w-lg md:max-w-xl h-10 md:h-12 mt-3 relative px-2">
          <input
            type="text"
            placeholder="Find Sellers"
            value={searchText}
            onChange={handleSearchInputBox}
            className="text-sm md:text-base w-full py-2 pl-3 pr-10 focus:outline-none bg-transparent"
          />
          <CgSearch className="absolute right-3 text-gray-500 text-lg md:text-xl cursor-pointer" />
        </div>
      </div>
      <div>
        <span className="text-[14px] md:text-[16px] font-semibold">Top Sellers</span>
        <div className="overflow-y-auto h-120 scrollbar-hide">
          <table className="min-w-full border border-collapse border-gray-300 text-[12px] md:text-[14px]">
            <thead className="bg-[#C7EDCD] text-gray-700">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left">Location</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Product</th>
                <th className="border border-gray-300 px-3 py-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {farmers.length > 0 ? (
                farmers.map((item) => (
                  <tr key={item.id} className="text-center">
                    <td className="border border-gray-300 px-3 py-2 text-left">{item.location}</td>
                    <td className="border border-gray-300 px-3 py-2 text-left">{item.product}</td>
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      <button
                        className={`status-button ${item.status.toLowerCase()}`}
                        onClick={() => {handleRequests(item.status, item.id)}}
                      >
                        {item.status}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OurFarmers;
