import React from "react";
import { assets } from "../../assets/assets";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 flex items-center justify-center animate-bounce">
              <img src={assets.fsIcon} alt="" />
            </div>
          </div>
        </div>
        <div>
            <h2 className="text-2xl font-bold">Welcome to Farmsnap</h2>
            <p className="text-base-content/60">
            Start a conversation by selecting a farmer</p>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
