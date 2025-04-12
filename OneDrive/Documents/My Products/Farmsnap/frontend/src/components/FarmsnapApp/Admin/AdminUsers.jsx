import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import summuryApi from "../../../common/summuryApi.js";
import { CgProfile, CgSearch } from "react-icons/cg";
import convertToHour from "../../../helpers/FarmsnapAppHelpers/convertToHour.js";
import { assets } from "../../../assets/assets.js";
import { HiOutlineDotsVertical } from "react-icons/hi";

const AdminUsers = () => {
  const [usersInfo, setUsersInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showDotsOption, setShowDotsOption] = useState({});

  const [formData, setFormData] = useState({ category: "", search: "" });
  const dotsRef = useRef(null);
  const userAccomplishment = [
    { count: 1200, text: "Peoples" },
    { count: 1052, text: "User" },
    { count: 148, text: "Admin" },
  ];
      useEffect(() => {
          const handleClickOutside = (event) => {
              if (dotsRef.current && !dotsRef.current.contains(event.target)) {
                  setShowDotsOption({});
              }
          };
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
              document.removeEventListener("mousedown", handleClickOutside);
          };
      }, []);

  const token = localStorage.getItem("token");

  const fetchAllUsers = useCallback(async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await axios.post(
        summuryApi.GetAllUsersByAdmin,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response?.data?.data) {
        setUsersInfo(response?.data?.data);
        console.log("response?.data?.data", response?.data?.data);
      } else {
        throw new Error(response?.data?.error || "Failed to fetch users");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.toLowerCase().trim() || "",
    }));
  };

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const changeAdminOrGenaral = async(userId,role)=>{
    const response = await fetch(summuryApi.changeUserAdminOrGenaral,{
      method : "POST",
      headers : {
        Authorization : `Bearer ${token}` ,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userId,role})
    })
  }

  const filterUsersData = usersInfo?.filter((user) => {
    return (
      (!formData.category || user?.role?.toLowerCase() === formData.category) &&
      (!formData.search ||
        user?.username?.toLowerCase().includes(formData.search))
    );
  });

  return (
    <div className="p-6 pb-20 md:px-10 lg:px-16 xl:w-280 lg:w-200 md:w-180 w-full overflow-y-scroll h-full scrollbar-hide fixed rounded-md bg-white shadow">
      <div className="grid grid-cols-3 gap-4  text-center">
        {userAccomplishment.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center border-gray-100 ${
              index === 2 && "border-none"
            } border-r-2`}
          >
            <h1 className="font-bold md:text-xl text-sm text-green-800">
              {item.count}
            </h1>
            <span className="text-sm text-green-600">{item.text}</span>
          </div>
        ))}
      </div>
      <div>
        <div className="flex gap-4 mb-2 ">
          <div className="flex justify-center gap-2 items-center mt-6 w-full">
            <div className="relative xl:w-full">
              <CgSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-700 text-lg" />
              <input
                type="text"
                name="search"
                className="border rounded-md text-sm pl-10 pr-4 border-green-300 focus:outline-green-200 py-2 w-full bg-white"
                placeholder="Search for Products"
                onChange={handleChange}
              />
            </div>
            <div
              className="p-2 text-nowrap gap-2 rounded-md flex text-sm bg-primary hover:bg-green-800 cursor-pointer text-white"
              onClick={() => setShowProductForm(true)}
            >
              <button className="cursor-pointer">+</button>
              <button className="hidden md:block cursor-pointer">
                Add User
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={formData.category}
            onChange={handleChange}
            name="category"
            className="bg-[#CED4D1]  focus:outline-none overflow-auto scrollbar-hide h-full rounded-lg px-3 py-2 text-sm text-whie shadow"
          >
            <option value="">All Roles</option>
            <option value="admin">ADMIN</option>
            <option value="genaral">GENARAL</option>
          </select>
        </div>
      </div>

      {loading && (
        <p className="text-center text-green-700">Loading users...</p>
      )}
      {errorMsg && <p className="text-center text-red-600">{errorMsg}</p>}

      <div
        className="mt-6 text-xs md:text-sm grid grid-cols-1  gap-6 xl:w-250"
        ref={dotsRef}
      >
        {filterUsersData.length > 0 ? (
          filterUsersData.map((item) => (
            <div
              key={item?._id}
              className="bg-white shadow-md rounded-2xl p-6 relative hover:bg-[#CED4D1]"
            >
              <h1 className="font-semibold text-green-800">{item?.username}</h1>
              <div className="flex md:gap-6 gap-2 items-center mt-2">
                <img
                  src={assets.profileIcon}
                  className="size-8 cursor-pointer rounded-lg shadow"
                  alt="User"
                />
              </div>
              <div className="flex items-center justify-between gap-1 md:gap-2 text-nowrap text-[12px] md:text-sm text-gray-600 mt-2">
                <div className="md:flex md:flex-row flex flex-col gap-1 md:gap-2">
                  <h1 className="text-green-700">{item?.username}</h1>
                  <span className=" cursor-pointer border-b-1 border-gray-100 ">{item?.email || "N/A"}</span>
                  <span>{item?.role}</span>
                </div>
              </div>
              <HiOutlineDotsVertical
                onClick={() =>
                  setShowDotsOption((prev) => ({
                    [item?._id]: !prev[item?._id],
                  }))
                }
                className="cursor-pointer text-green-700 absolute top-4 right-4"
              />
              {showDotsOption[item?._id] && (
                <div className="absolute bg-white top-8 right-5 text-black flex flex-col border border-primary items-center text-xs shadow-md rounded p-2">
                  <button
                    className="cursor-pointer hover:text-white hover:bg-green-600 rounded w-full p-1"
                    onClick={() => changeAdminOrGenaral(item?._id,item?.role)}
                  >
                    ADMIN
                  </button>
                  <button
                    className="cursor-pointer hover:text-white hover:bg-green-600 rounded w-full p-1"
                    onClick={() => changeAdminOrGenaral(item?._id,item?.role)}
                  >
                    GENARAL
                  </button>
                  <button
                    className="cursor-pointer hover:text-white hover:bg-red-600 rounded w-full p-1"
                    onClick={() => deleteProduct(item?._id)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))          
    
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;

