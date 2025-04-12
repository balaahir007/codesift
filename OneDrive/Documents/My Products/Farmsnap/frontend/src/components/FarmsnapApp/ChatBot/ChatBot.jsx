import React, { useEffect, useRef, useState } from "react";
import { assets, chatBotHelpCategory } from "../../../assets/assets";
import { TbMessage } from "react-icons/tb";
import { BiHomeSmile, BiLeftArrow, BiSend } from "react-icons/bi";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { MdHelpOutline } from "react-icons/md";
import axios from "axios";
import summuryApi from "../../../common/summuryApi";
import { useNavigate } from "react-router-dom";
import { IoIosSearch, IoMdSend } from "react-icons/io";
import LoadingDots from "../LoadingDots";
import ChatBotHelpMenu from "./ChatBotHelpMenu";

const ChatBot = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [inputText, setInputText] = useState([
    {
      bot: "Hello! How can I assist you with your farming needs today?",
      user: "I want to sell my farm produce. Can you help me?",
    },
    {
      bot: "Of course! What type of produce are you looking to sell?",
      user: "I have fresh vegetables and grains ready for sale.",
    },
    {
      user: "Yes, I need guidance on pricing and delivery options.",
      bot: "That’s great! You can list your produce on our platform. Do you need help setting up your product details?",
    },
  ]);

  const inputRef = useRef(null);
  const [userInput, setUserInput] = useState("d");
  const handelUserInput = (e) => {
    const { value } = e.target;
    setUserInput(value);
  };

  const [menuList, setMenuList] = useState(["Home", "Message", "Help"]);
  const [activeMenu, setActiveMenu] = useState("Home");

  const [chatOpen, setChatOpen] = useState(false);
  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [inputText, userInput]);

  const handleOnChange = (e) => {
    const { value } = e.target;
    setUserInput(value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleOnSubmit();
    }
  };
  const [helpData, setHelpData] = useState("");
  let filterHelpSearchData = chatBotHelpCategory?.filter((item) =>
    item.toLowerCase().trim().includes(helpData)
  );
  const handleHelpOnChange = (e) => {
    setHelpData(e.target.value);
  };
  const [loading, setLoading] = useState(false);
  const [helpCateGory, setHelpCategory] = useState("");
  const handleOnSubmit = async (e) => {
    try {
      setLoading(false);
      e.preventDefault();
      if (!userInput) return;
      const response = await axios.post(summuryApi.chatBotMessageSend, {
        message: userInput,
      });
      setInputText((prev) => [
        ...prev,
        { user: userInput, bot: response?.data?.data },
      ]);
    } catch (error) {}
  };

  const handleHomeMenuActions = (action) => {
    if (action === "Help") {
      setActiveMenu("Help");
    } else if (action === "ResetPassword") {
      if (!currentUser) {
        navigate("/login");
      }
    } else if (action === "CustomerCare") {
      setActiveMenu("Customer Care");
    } else if (action === "services") {
      navigate("/services");
    } else if (action === "Products") {
      navigate("/searchSuggestion");
    }
  };

  useEffect(() => {
    if (chatOpen) {
      inputRef.current?.focus();
    }
  }, [chatOpen]);

  return (
    <div>
      <div className="fixed bottom-5 right-5">
        {!chatOpen ? (
          <img
            src={assets.chatBotIcon}
            className="cursor-pointer w-10 h-10 "
            alt="Chat Icon"
            onClick={() => setChatOpen((prev) => !prev)}
          />
        ) : (
          <div
            className="cursor-pointer w-10 h-10 bg-primary rounded-full flex items-center justify-center text-secondary transition-transform duration-300 active:scale-75 active:rotate-180 "
            onClick={() => setChatOpen(false)}
          >
            <FaAngleDown />
          </div>
        )}
        {chatOpen && (
          <div
            className={`${
              activeMenu === "Home" || activeMenu === "Customer Care"
                ? "bg-gradient-to-t from-white via-white via-50% to-primary "
                : "bg-white "
            } flex flex-col  p-2 z-50 rounded-lg  shadow-lg fixed  bottom-18 md:top-20   right-5`}
          >
            <div
              ref={chatContainerRef}
              className={`overflow-y-scroll ${
                activeMenu === "Home" ? "scrollbar-hide" : ""
              }  lg:px-4 justify-between overflow-y-scroll w-62  lg:w-80 lg:h-130 xl:h-140 h-100`}
            >
              {menuList.map((item, index) => (
                <div key={index} className="h-auto">
                  {item === "Home" && activeMenu == "Home" && (
                    <div className="p-2 text-sm">
                      <img
                        src={assets.logoIcon}
                        className="w-15 md:w-20  text-white"
                        alt=""
                      />
                      <h1 className="text-nowrap text-white text-md md:text-2xl md:mt-5">
                        Hello! <span>{currentUser?.username || "Welcome"}</span>
                      </h1>
                      <h1 className="text-nowrap text-primary text-md md:text-2xl md:mt-1  ">
                        How can We Help?
                      </h1>
                      <div className="bg-white shadow w-55 md:w-60 lg:w-70   mt-5 p-2">
                        <div
                          className="text-[10px] cursor-pointer  md:text-sm  bg-gray-50 hover:bg-secondary hover:text-primary p-1 px-2"
                          onClick={() => handleHomeMenuActions("Help")}
                        >
                          Search a Help?
                        </div>
                        <div
                          className="text-[10px]  cursor-pointer md:text-sm  p-1 px-2 flex items-center justify-between hover:bg-secondary hover:text-primary text-gray-800"
                          onClick={() => handleHomeMenuActions("ResetPassword")}
                        >
                          <span>Reset Password</span>
                          <FaAngleRight />
                        </div>
                        <div
                          className="text-[10px]  cursor-pointer md:text-sm  p-1 px-2 flex items-center justify-between hover:bg-secondary hover:text-primary text-gray-800"
                          onClick={() => handleHomeMenuActions("CustomerCare")}
                        >
                          <span>Customer Care</span>
                          <FaAngleRight />
                        </div>
                        <div
                          className="text-[10px] cursor-pointer  md:text-sm  p-1 px-2 flex items-center justify-between hover:bg-secondary hover:text-primary text-gray-800 "
                          onClick={() => handleHomeMenuActions("services")}
                        >
                          <span>Services</span>
                          <FaAngleRight />
                        </div>
                        <div
                          className="text-[10px] cursor-pointer  md:text-sm  p-1 px-2 flex items-center justify-between hover:bg-secondary hover:text-primary text-gray-800"
                          onClick={() => handleHomeMenuActions("Products")}
                        >
                          <span>Search Products</span>
                          <FaAngleRight />
                        </div>
                      </div>
                      <div
                        className="flex  items-center justify-between bg- text-white rounded-md shadow-md cursor-pointer hover:bg-green-800 text-[12px]  bg-primary w-55 md:w-60 lg:w-70  mt-4 p-2"
                        onClick={() => setActiveMenu("Message")}
                      >
                        <span>Send us a Message</span>
                        <IoMdSend />
                      </div>
                      <div
                        className="text-xs md:text-sm flex items-center text-primary w-full justify-center mt-6"
                        onClick={() => setChatOpen(false)}
                      >
                        Get Started
                      </div>
                    </div>
                  )}
                  {item === "Message" && activeMenu == "Message" && (
                    <div className="p-2  text-sm">
                      <div className="w-full text-center bg-primary p-2">
                        <span className="w-full text-center text-white">
                          Chat with SnapBot
                        </span>
                      </div>

                      <div className="mt-5 pb-10 md:pb-15">
                        {inputText.map((item, index) => (
                          <div key={index} className="text-[12px] w-60">
                            {index === 0 && (
                              <div>
                                <div className="flex bg-secondary md:pl-3 pl-3 p-1  relative  items-center justify-end">
                                  <img
                                    src={assets.chatBotIcon}
                                    alt="Bot"
                                    className="w-5 h-5 absolute left-1 top-4 "
                                  />
                                  <span className=" p-2 rounded-md ml-2">
                                    {item.bot}
                                  </span>
                                </div>
                                <div className="flex gap-2 w-full justify-end items-end text-end text-primary md:ml-6 ">
                                  <span className="pt-2  rounded-md">
                                    {item.user}
                                  </span>
                                </div>
                              </div>
                            )}

                            {index > 1 && (
                              <div className="flex flex-col  relative gap-2 ">
                                <div className="flex gap-2  w-full items-center justify-end text-end text-primary md:ml-6 ">
                                  <span className="p-2 rounded-md">
                                    {index > 2 && item.user}
                                  </span>
                                </div>
                                <div className="bg-secondary pl-3 pt-2 p-2 ">
                                  <img
                                    src={assets.chatBotIcon}
                                    alt="Bot"
                                    className="w-5 h-5 absolute left-0 top- ml-1"
                                  />
                                  <span className=" p-2 rounded-md ml-2">
                                    {item.bot}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-2  text-primary absolute bottom-20 ">
                        <input
                          type="text"
                          className="border rounded-md border-primary bg-white  outline-green-200 p-4 w-full  md:p-2"
                          name="userInput"
                          onChange={handleOnChange}
                          onKeyDown={handleKeyDown}
                          ref={inputRef}
                        />
                        <BiSend
                          className="size-6 cursor-pointer"
                          onClick={handleOnSubmit}
                        />
                      </div>
                    </div>
                  )}
                  {item === "Help" && activeMenu == "Help" && (
                    <div className="p-2 relative ">
                      {helpCateGory ? (
                        <ChatBotHelpMenu
                          helpCateGory={helpCateGory}
                          setHelpCategory={setHelpCategory}
                        />
                      ) : (
                        <div>
                          <div className="text-sm w-full text-center ">
                            Help
                          </div>
                          <div className="flex w-full items-center justify-between mt-2 relative">
                            <input
                              type="text"
                              className="border border-secondary text-[12px] md:text-sm px-2 w-full py-1 bg-secondary rounded-lg outline-none"
                              placeholder="Search For Help"
                              onChange={handleHelpOnChange}
                            />
                            <IoIosSearch className="size-4 md:size-6 absolute right-2 text-primary" />
                          </div>
                          <div>
                            {filterHelpSearchData?.map((category, index) => (
                              <div
                                key={index}
                                className="text-[12px] md:text-sm m-2 flex items-center justify-between  hover:bg-secondary cursor-pointer  p-2 text-primary border-b-1 border-secondary"
                                onClick={() => setHelpCategory(category)}
                              >
                                <span>{category}</span>
                                <FaAngleRight />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {activeMenu == "Customer Care" && (
              <div className="p-2 absolute top-4 text-sm">
                <img
                  src={assets.logoIcon}
                  className="w-15 md:w-20  text-white"
                  alt=""
                />
                <h1 className="text-nowrap text-white text-md md:text-2xl md:mt-3">
                  Hello! <span>{currentUser?.username || "Welcome"}</span>
                </h1>
              </div>
            )}
            <div className="flex w-full  cursor-pointer bg-white text-xs md:text-sm border border-secondary ">
              {menuList?.map((item, index) => (
                <div
                  key={index}
                  className={` flex w-full h-15 items-center justify-center  ${
                    item === activeMenu
                      ? " bg-primary text-white"
                      : "text-black hover:text-primary"
                  }  `}
                  onClick={() => setActiveMenu(item)}
                >
                  <div className={`flex flex-col items-center`}>
                    {item === "Home" ? (
                      <BiHomeSmile />
                    ) : item === "Message" ? (
                      <TbMessage />
                    ) : (
                      <MdHelpOutline />
                    )}
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
