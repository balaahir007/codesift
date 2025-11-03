import React, { useRef, useState } from "react";



const OtpInputBox = ({ length=4 }) => {
  const [otp, setOtp] = useState(new Array(length).fill(null));
  const inputRefs = useRef([]);

  const [state, setState] = useState("idle");

  const handleOnClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleOtpChange = (e, index) => {
    if (isNaN(e.target.value)) return;
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    if (e.target.value && index < length - 1)
      inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    const key = e.key;
    const newOtp = [...otp];

    if (key === "Backspace") {
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    } else if (key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  console.log(otp);

  return (
    <div>
      <div className="flex w-full items-center justify-center gap-2">
        {otp.map((item, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            onClick={() => handleOnClick(index)}
            onChange={(e) => handleOtpChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            type="text"
            maxLength={1}
            className="border-1 mt-5 outline-primary rounded border-primary w-12 h-12 flex items-center text-center"
          />
        ))}
      </div>
      <button className="bg-secondary p-2 flex items-center justify-center px-4 rounded-md mt-4 mx-auto w-full cursor-pointer">
        {state === "loading" ? (
          <span className="border-2 text-white border-white rounded-full h-6 w-6 animate-spin border-t-transparent"></span>
        ) : (
          <span className="text-white">Verify</span>
        )}
      </button>
    </div>
  );
};

export default OtpInputBox;
