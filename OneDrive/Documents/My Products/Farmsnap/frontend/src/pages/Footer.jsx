import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="md:mx-40">
        <div className="border-t-1 mx-4 mt-3 border-gray-200 py-3 px-2 flex items-center justify-between">
          <img
            src={assets.logoIcon}
            alt=""
            className="lg:w-20  w-10   border-primary"
          />
          <div className="flex gap-2">
            <img src={assets.instaIcon} alt="" className="w-4 lg:w-6" />
            <img src={assets.youtubeIcon} alt="" className="w-4 lg:w-6" />
            <img src={assets.linkedInIcon} alt="" className="w-4 lg:w-6" />
            <img src={assets.XIcon} alt="" className="w-4 lg:w-6" />
          </div>
        </div>
        <div className="flex gap-10 md:gap-30 md:px-10 px-5">
          <div
            className=" 
                 text-gray-700 pb-2 md:font-light"
          >
            <h5 className="font-bold text-primary">Support</h5>
            <div className="flex-col text-gray-500 items-center">
              <p className="text-[8px] md:text-sm">Feadback</p>
              <p className="text-[8px] md:text-sm">Updates</p>
            </div>
          </div>

          <div className=" text-gray-700 pb-2 font-light ">
            <h5 className="font-bold text-primary">Legal</h5>
            <div className="flex-col text-gray-500 items-center">
              <p className="text-[8px] md:text-sm">Privacy</p>
              <p className="text-[8px] md:text-sm">Terms</p>
              <p className="text-[8px] md:text-sm">Contact</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Footer;
