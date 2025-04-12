import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack, IoMdCloseCircle } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { GoArrowUpLeft } from "react-icons/go";
import { CgClose, CgProfile } from "react-icons/cg";
import { assets } from "../../assets/assets";
import { useSelector } from "react-redux";

const HomeSearchHover = ({ searchProduct }) => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState(searchProduct || "");
  const [data, setData] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const products = useSelector((state) => state?.product?.product) || [];

  const applyFilters = () => {
    const queryString = new URLSearchParams(filters).toString();
    navigate(`/products?${queryString}`);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchData.trim()) return [];
    return Array.from(
      new Map(
        products
          .filter((product) =>
            product.productName.toLowerCase().includes(searchData.toLowerCase())
          )
          .map((product) => [product.productName, product])
      ).values()
    );
  }, [searchData]);

  const passSearchDataHandle = useCallback(
    (e, fromData, searchValue = "") => {
      if (e?.preventDefault) e.preventDefault();
      const finalSearch = searchValue.trim() || searchData.trim();
      if (!finalSearch) return;

      if (
        e?.key === "Enter" ||
        fromData === "searchBtn" ||
        fromData === "suggestion"
      ) {
        navigate(`/search/${encodeURIComponent(finalSearch)}?`);
        setShowDropdown(false);
        setSearchData(finalSearch);
        setHighlightedIndex(-1);
      }
    },
    [searchData, navigate]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowDown") {
        setHighlightedIndex((prev) =>
          prev < filteredProducts.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter") {
        passSearchDataHandle(
          e,
          "suggestion",
          filteredProducts[highlightedIndex]?.productName || searchData
        );
      }
    },
    [filteredProducts, highlightedIndex, passSearchDataHandle, searchData]
  );

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchData(value);
    setShowDropdown(value.trim().length > 0);
    setHighlightedIndex(-1);
  }, []);

  useEffect(() => {
    setData(
      highlightedIndex >= 0
        ? filteredProducts[highlightedIndex]?.productName || ""
        : ""
    );
  }, [highlightedIndex, filteredProducts]);

  return (
    <div className="md:shadow-xs w-full z-50 lg:px-20 lg:pt-1 sticky lg:top-0 bg-white md:p-2 mb-6 transition-shadow duration-300">
      <div className="flex w-full md:justify-center items-center gap-0 md:gap-8 md:mt-2 text-sm">
        <img
          src={assets.logoIcon}
          onClick={() => navigate("/")}
          alt="Logo"
          className="w-20 h-8 ml-1 -mt-1 hidden md:block cursor-pointer"
        />
        <div className="md:w-200 w-full relative">
          <div className="relative flex items-center">
            <input
              type="search"
              ref={inputRef}
              placeholder="Search for products"
              value={highlightedIndex >= 0 ? data : searchData}
              enterkeyhint="search"
              aria-label="Search input"
              onKeyDown={handleKeyDown}
              onChange={handleSearchChange}
              className="p-2 pl-12 h-12 rounded-md w-full pr-8 border-none bg-secondary outline-none"
            />
            <IoMdArrowBack
              className="absolute left-3 size-5 cursor-pointer text-gray-500"
              onClick={()=>navigate(-1)}            />
            {searchData && <IoMdCloseCircle className="absolute size-5 text-gray-500 right-2 md:hidden" onClick={()=>setSearchData('')}/>}
            <IoSearch
              className="absolute hidden md:block right-4 size-4 cursor-pointer"
              onClick={(e) => passSearchDataHandle(e, "searchBtn")}
            />
          </div>

          {showDropdown && filteredProducts.length > 0 && (
            <div className="absolute w-full bg-white shadow-md rounded-md z-50 mt-1">
              {filteredProducts.map((item, index) => (
                <div
                  key={item.productName}
                  className={`p-2 px-4 gap-2 cursor-pointer ${
                    highlightedIndex === index ? "bg-gray-200" : ""
                  }`}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={(e) =>
                    passSearchDataHandle(e, "suggestion", item.productName)
                  }
                >
                  <div className="flex justify-between items-center">
                    <span className="w-full p-2">{item.productName}</span>
                    <GoArrowUpLeft className="size-5 text-gray-500 w-8 h-8" />
                  </div>
                  <hr className="text-gray-50" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className="relative hidden md:block"
          onMouseEnter={() => setProfileOpen(true)}
          onMouseLeave={() => setProfileOpen(false)}
        >
          <CgProfile className="size-6 cursor-pointer" />
          {profileOpen && (
            <div className="absolute hidden md:block right-0 mt-2 w-50 top-4 text-sm bg-white shadow-md p-3 rounded-md">
              {[
                {
                  icon: assets.myProfileIcon,
                  text: "My Account",
                  link: "/my-profile",
                },
                { icon: assets.cartIcon, text: "Cart", link: "/cart" },
              ].map((item) => (
                <a
                  key={item.text}
                  href={item.link}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100"
                >
                  <img src={item.icon} alt="" className="w-5 h-5" />
                  {item.text}
                </a>
              ))}
              <a
                href="/admin-pannel"
                className="p-2 flex items-center space-x-4 cursor-pointer hover:bg-gray-100"
              >
                <img
                  src={assets.administratorIcon}
                  alt="Admin Panel"
                  className="w-5 h-5"
                />
                <span>Admin Panel</span>
              </a>
              <div
                className="p-2 flex items-center gap-3 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                <img src={assets.logOut} alt="Logout" className="w-5 h-5" />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeSearchHover;
