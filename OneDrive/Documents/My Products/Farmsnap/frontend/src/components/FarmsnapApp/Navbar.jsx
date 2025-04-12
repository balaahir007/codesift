import { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { HiMenu } from "react-icons/hi";
import { IoChatboxOutline } from "react-icons/io5";
import { useAuthStore } from "../../zustandStateManagement/useAuthstore";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [adminMenu, setAdminMenu] = useState(false);
  const location = useLocation();
  const {authUser,logout} = useAuthStore()

  const logoutHandle = () => {
    logout()
    navigate('/login')
  };
  useEffect(()=>{
    
  },[])
  

  const currentUserFOrMobile = true;
  useEffect(() => {
    setAdminMenu(location.pathname.startsWith("/admin-pannel"));
  }, [location.pathname]);

  return (
    <nav
      className={` ${
        adminMenu
          ? ""
          : "shadow-xs w-full z-50 lg:px-20 lg:pt-1 sticky top-0 bg-white  mb-6 p-2 transition-shadow duration-300"
      }`}
    >
      {!adminMenu && (
        <div className="w-full flex items-center ml-4 my-3 justify-between  px-4 md:justify-around">
          <div className=" items-center flex-col">
            <HiMenu
              className="absolute left-4  cursor-pointer size-6 block md:hidden"
              onClick={() => setMenuOpen(true)}
            />
            <img
              src={assets.logoIcon}
              onClick={() => navigate("/")}
              alt="Logo"
              className="w-20 ml-1 -mt-1 cursor-pointer"
            />
          </div>
          {!adminMenu && (
            <div className="flex text-sm gap-4 text-nowrap">
              {[
                { text: "Home", link: "/" },
                { text: "Our Farmers", link: "/our-farmers" },
                { text: "Become a Seller", link: "/become-a-seller" },
                { text: "Shipment", link: "/shipment" },
                { text: "Services", link: "/services" },
                { text: "Chat With Farmers", link: "/chat" },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className={`hidden md:block md:text-[10px] lg:text-xs ${
                    item.text === "Chat With Farmers" 
                      ? ""
                      : "hover:bg-[#CFF7D3]"
                  } px-2 py-1 rounded-md`}
                >
                  {item.text === "Chat With Farmers" ? (
                    <span className="bg-gradient-to-r to-green-500 from-green-700 px-4 py-2 rounded-lg hover:scale-105 transition-all duration-300 ease-in-out shadow-lg text-white md:top-5 lg:top-4 absolute backdrop-blur-sm">
                      {item.text}
                    </span>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </Link>
              ))}
            </div>
          )}

          <div className="flex items-center ml-40 gap-2 lg:ml-40">
            {!authUser && (
              <div>
                <button
                  className="px-2 rounded-lg text-sm  md:hidden "
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <div className="hidden md:block">
                  <div className="flex gap-2 text-nowrap">
                    <button
                      className="bg-[#E3E3E3] hover:bg-[#cfcece] cursor-pointer py-1 px-2 rounded-md text-sm"
                      onClick={() => navigate("/login")}
                    >
                      Sign in
                    </button>
                    <button
                      className="text-white bg-primary hover:bg-green-900 py-1 cursor-pointer px-2 rounded-md text-sm"
                      onClick={() => navigate("/register")}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            )}
            {authUser && (
              <div
                className="relative"
                onMouseEnter={() => setProfileOpen(true)}
                onMouseLeave={() => setProfileOpen(false)}
              >
                {!adminMenu && <CgProfile className="size-6 cursor-pointer" onClick={()=>navigate('/my-profile')}/>}
                {profileOpen && (
                  <div className="absolute hidden md:block right-0 mt-2 w-50 top-4 text-sm bg-white shadow-md p-3 rounded-md">
                    {[
                      {
                        icon: assets.myProfileIcon,
                        text: "My Account",
                        link: "/my-profile",
                      },
                      { icon: assets.cartIcon, text: "Cart", link: "/cart" },
                    ].map((item, index) => (
                      <Link
                        key={index}
                        to={item.link}
                        className="flex items-center gap-3 p-2 hover:bg-gray-100"
                      >
                        <img src={item.icon} alt="" className="w-5 h-5" />
                        {item.text}
                      </Link>
                    ))}
                    <Link
                      to={"/admin-pannel"}
                      className="p-2 flex items-center space-x-4 cursor-pointer hover:bg-gray-100"
                    >
                      <img
                        src={assets.administratorIcon}
                        alt="Logout"
                        className="w-5 h-5"
                      />
                      <span>Admin Pannel</span>
                    </Link>
                    <div
                      className="p-2 flex items-center gap-3 cursor-pointer hover:bg-gray-100"
                      onClick={logoutHandle}
                    >
                      <img
                        src={assets.logOut}
                        alt="Logout"
                        className="w-5 h-5"
                      />
                      <span>Logout</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-opacity-30"
            onClick={() => setMenuOpen(false)}
          ></div>

          <div className="fixed left-0 top-0 w-72 h-full bg-white shadow-md z-50">
            <div className="flex bg-secondary p-4 items-center gap-4">
              <img
                src={assets.fsIcon}
                alt=""
                className="size-6  rounded-full"
              />
              <h2 className="font-bold text-primary">
                {authUser?.username || "Welcome"}
              </h2>
            </div>

            {!adminMenu && (
              <div className="mt-4 px-2" onClick={() => setMenuOpen(false)}>
                {[
                  {
                    icon: <IoChatboxOutline/>,
                    text: "Chat With Farmers",
                    link: "/chat",
                  },
                  {
                    icon: assets.farmerIcon,
                    text: "Our Farmers",
                    link: "/our-farmers",
                  },
                  {
                    icon: assets.sellIcon,
                    text: "Sell on Farmsnap",
                    link: "/become-a-seller",
                  },
                  {
                    icon: assets.shipmentIcon,
                    text: "Shipment",
                    link: "/shipment",
                  },
                  {
                    icon: assets.maintanceIcon,
                    text: "Services",
                    link: "/services",
                  },
                  { icon: assets.cartIcon, text: "Cart", link: "/cart" },
                  {
                    icon: assets.myProfileIcon,
                    text: "My Account",
                    link: "/my-profile",
                  },
                ].map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className="py-3 px-4 flex items-center gap-4 hover:bg-gray-100"
                  >
                    
                   {index > 0 ? <img src={item.icon} alt={item.text} className="size-4" /> : <span>{item.icon}</span> }
                    <span className="text-sm">{item.text}</span>
                  </Link>
                ))}

                <div
                  className="px-4 py-2 flex items-center gap-4 cursor-pointer "
                  onClick={logoutHandle}
                >
                  <img src={assets.logOut} alt="Logout" className="size-4 " />
                  <span className="text-sm">Logout</span>
                </div>
                <div
                  onClick={() => navigate("/admin-pannel")}
                  className="px-4 py-2 flex items-center justify-center gap-2  cursor-pointer border-2 border-secondary m-6 "
                >
                  <img
                    src={assets.administratorIcon}
                    alt=""
                    srcset=""
                    className="size-4"
                  />
                  <span className="text-sm">Admin Pannel</span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
