import React, { useState } from "react";
import useThemeStore from "../../zustand/themeStore";

// Mock OtpInputBox component for demo
const OtpInputBox = ({ mobilenumber,mode}) => {
  const inputBg = mode == 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const inputBorder = mode == 'dark' ? 'border-[#294B4E]' : 'border-gray-300';
  const inputText = mode == 'dark' ? 'text-white' : 'text-gray-900';
  const focusBorder = 'focus:border-[#0097B2]';

  return (
    <div className="space-y-3">
      <div className="text-center">
        <p className={`${mode == 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm mb-3 transition-colors duration-300`}>
          Enter the OTP sent to {mobilenumber}
        </p>
        <div className="flex justify-center gap-2">
          {[1,2,3,4,5,6].map((i) => (
            <input
              key={i}
              type="text"
              maxLength="1"
              className={`w-10 h-10 text-center border-2 ${inputBorder} rounded-lg ${focusBorder} focus:outline-none ${inputBg} ${inputText} transition-colors duration-300`}
            />
          ))}
        </div>
      </div>
      <button className="w-full bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white font-bold py-3 rounded-xl hover:scale-105 transition-all duration-300">
        Verify & Book Session
      </button>
    </div>
  );
};

const BookMenterShip = ({  }) => {
  const [otp, setOtp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+91 ");
  const [errorMsg, setErrorMsg] = useState(null);
  const {mode} = useThemeStore()

  // Theme colors
  const cardBg = mode == 'dark' ? 'bg-[#1B2E31]/90' : 'bg-white/90';
  const cardBorder = mode == 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const inputBg = mode == 'dark' ? 'bg-[#0F1E20]/80' : 'bg-white/80';
  const inputBorder = mode == 'dark' ? 'border-[#294B4E]' : 'border-gray-300';
  const inputText = mode == 'dark' ? 'text-white' : 'text-gray-900';
  const placeholderText = mode == 'dark' ? 'placeholder-gray-500' : 'placeholder-gray-500';
  const textPrimary = mode == 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = mode == 'dark' ? 'text-gray-400' : 'text-gray-600';
  const errorColor = 'border-red-400';
  const successBg = mode == 'dark' ? 'bg-[#00B2A9]/20' : 'bg-[#00B2A9]/10';
  const infoBg = mode == 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50';
  const infoBorder = mode == 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const trustText = mode == 'dark' ? 'text-gray-500' : 'text-gray-500';
  const dividerBorder = mode == 'dark' ? 'border-[#294B4E]' : 'border-gray-200';

  const handleMobile = (e) => {
    let value = e.target.value;
    if (!value.startsWith("+91 ")) {
      value = "+91 ";
    }
    const onlyNumbers = value.slice(4).replace(/\D/g, "");
    if (onlyNumbers.length <= 10) {
      setPhoneNumber(`+91 ${onlyNumbers}`);
    }
  };

  const submitMobileNumberInput = (e) => {
    e.preventDefault();
    const removeSpace = phoneNumber.split(" ")[1];

    if (removeSpace.length !== 10) {
      return setErrorMsg("Please provide a valid mobile number.");
    }
    setErrorMsg(null);
    setOtp(true);
  };

  return (
    <div className="relative  bg-backGray p-8 md:px-20 ">
      {/* Background effects matching banner */}
      {/* <div className={`absolute -top-10 -left-10 w-32 h-32 ${mode == 'dark' ? 'bg-[#0097B2]/20' : 'bg-[#0097B2]/10'}   transition-colors duration-300`}></div>
      <div className={`absolute -bottom-10 -right-10 w-24 h-24 ${mode == 'dark' ? 'bg-[#00B2A9]/20' : 'bg-[#00B2A9]/10'}  delay-1000 transition-colors duration-300`}></div>
       */}
      <div className="relative z-10 flex flex-col md:flex-row items-center bg-backGray justify-between gap-8">
        {/* Image Section */}
        <div className="mb-5 md:mb-0 flex-shrink-0">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <img
              src={`${mode == 'dark' ? './images/darkBanner.png' : './images/1one1Poster.png'}`}
              alt="Poster"
              className={`relative w-50 md:w-80 h-auto object-cover rounded-2xl border-2 ${cardBorder} shadow-2xl transition-colors duration-300`}
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-[400px]">
          <div className={`${cardBg} backdrop-blur-md border ${cardBorder} p-6 rounded-2xl shadow-2xl relative overflow-hidden transition-colors duration-300`}>
            {/* Decorative elements */}
            <div className={`absolute top-0 right-0 w-20 h-20 ${mode == 'dark' ? 'bg-[#00B2A9]/10' : 'bg-[#00B2A9]/5'} rounded-full blur-xl transition-colors duration-300`}></div>
            <div className={`absolute bottom-0 left-0 w-16 h-16 ${mode == 'dark' ? 'bg-[#0097B2]/10' : 'bg-[#0097B2]/5'} rounded-full blur-xl transition-colors duration-300`}></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center md:text-left mb-6">
                <h1 className={`font-bold text-2xl ${textPrimary} mb-2 transition-colors duration-300`}>
                  Book your free 1-on-1 session
                </h1>
                <p className={`${textSecondary} text-sm transition-colors duration-300`}>
                  Get personalized career guidance from experts
                </p>
              </div>

              {/* Form Container */}
              <div className="md:p-4 p-2 w-full rounded-md space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    disabled={otp}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${inputBg} backdrop-blur-md ${inputText} ${placeholderText} transition-all duration-300 outline-none ${
                      errorMsg 
                        ? errorColor
                        : otp 
                          ? `border-[#00B2A9] ${successBg}` 
                          : `${inputBorder} focus:border-[#0097B2] hover:border-[#00B2A9]/70`
                    } ${otp ? 'cursor-not-allowed opacity-75' : ''}`}
                    placeholder="Enter a Mobile Number"
                    maxLength={14}
                    value={phoneNumber}
                    onChange={handleMobile}
                  />
                  {otp && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-5 h-5 bg-[#00B2A9] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Error Message */}
                {errorMsg && (
                  <span className="text-red-500 text-sm flex items-center gap-2">
                    <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                    {errorMsg}
                  </span>
                )}

                {/* Info Message */}
                {!otp && (
                  <div className={`${infoBg} rounded-lg p-3 mt-2 border ${infoBorder} transition-colors duration-300`}>
                    <span className={`${textSecondary} text-sm text-center block transition-colors duration-300`}>
                      We'll send an OTP for verification
                    </span>
                  </div>
                )}

                {/* OTP Input */}
                {otp && (
                  <div className={`${infoBg} backdrop-blur-md rounded-xl p-4 border ${infoBorder} transition-colors duration-300`}>
                    <OtpInputBox mobilenumber={phoneNumber} mode ={mode } />
                  </div>
                )}

                {/* Submit Button */}
                {!otp && (
                  <button
                    onClick={submitMobileNumberInput}
                    type="button"
                    className="group relative w-full bg-gradient-to-r from-[#0097B2] to-[#00B2A9] hover:from-[#007A94] hover:to-[#009490] text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[#0097B2]/25 overflow-hidden mt-5"
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center justify-center">
                      Book a Demo
                    </span>
                  </button>
                )}
              </div>

              {/* Trust Indicators */}
              <div className={`mt-4 pt-4 border-t ${dividerBorder} transition-colors duration-300`}>
                <div className={`flex items-center justify-center gap-4 ${trustText} text-xs transition-colors duration-300`}>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#00B2A9] rounded-full"></div>
                    <span>Secure</span>
                  </div>
                  <div className={`w-1 h-1 ${mode == 'dark' ? 'bg-gray-700' : 'bg-gray-400'} rounded-full transition-colors duration-300`}></div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-[#0097B2] rounded-full"></div>
                    <span>Verified</span>
                  </div>
                  <div className={`w-1 h-1 ${mode == 'dark' ? 'bg-gray-700' : 'bg-gray-400'} rounded-full transition-colors duration-300`}></div>
                  <span>No Spam</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMenterShip;