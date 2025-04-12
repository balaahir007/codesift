import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../../assets/assets";
import { FaHome, FaUsers } from "react-icons/fa";
import { AiOutlineAppstore } from "react-icons/ai";
import { MdOutlineQueryStats } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandle = () => {
    navigate('/login')
    localStorage.removeItem('token')
  };

  const menuItems = [
    { text: "General", link: "/admin-pannel/general", icon: <FaHome /> },
    {
      text: "Products",
      link: "/admin-pannel/products",
      icon: <AiOutlineAppstore />,
    },
    { text: "Users", link: "/admin-pannel/users", icon: <FaUsers /> },
    {
      text: "Stats",
      link: "/admin-pannel/stats",
      icon: <MdOutlineQueryStats />,
    },
  ];

  return (
    <div>
      <div className="hidden md:block fixed">
        <div className="lg:left-10  lg:h-160 h-140 m-4 md:m-16 bg-[#CED4D1] rounded-md p-5 md:w-40 lg:w-60 w-32 flex flex-col gap-6 shadow-md">
          <img
            src={assets.logoIcon}
            onClick={() => navigate("/")}
            alt="Logo"
            className="w-16 md:w-20 cursor-pointer mx-auto"
          />
          <div className="flex flex-col gap-4 md:mt-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-[#009951] hover:text-white transition"
              >
                {item.icon}
                <span className="text-sm">{item.text}</span>
              </Link>
            ))}
            <div
              className="flex items-center  gap-3 p-2 rounded-md cursor-pointer lg:mt-70 mt-40 hover:bg-[#009951] hover:text-white transition"
              onClick={logoutHandle}
            >
              <IoLogOut />
              <span className="text-sm">Logout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed  z-50 w-full">
        <div className="flex items-center justify-between p-4   bg-white shadow-xs">
          <div className="flex items-center gap-2 px-2">
            <HiMenu
              className="size-6 cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
            <img
              src={assets.logoIcon}
              onClick={() => navigate("/")}
              alt="Logo"
              className="w-20 -mt-1 cursor-pointer"
            />
          </div>
          <div>
          <CgProfile className="size-6" />
          </div>
        </div>
            
        {menuOpen && (
          <>
            <div
              className="fixed top-0 left-0 w-full h-full z-40"
              onClick={() => setMenuOpen(false)}
            ></div>
            <div className="fixed top-0 left-0 w-60 h-full bg-white p-6 shadow-lg z-50">
            <div className="flex bg-secondary p-4 items-center gap-4">
              <CgProfile className="size-6 text-primary" />
              <h2 className="font-bold text-primary">{"Admin Pannel"}</h2>
            </div>
              <div className="flex flex-col gap-2 mt-10">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className="py-2 px-4 flex items-center text-sm gap-4 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </Link>
                ))}
                <div
                  className="px-4 py-2 flex items-center gap-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setMenuOpen(false);
                    logoutHandle();
                  }}
                >
                  <IoLogOut />
                  <span className="text-sm">Logout</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
