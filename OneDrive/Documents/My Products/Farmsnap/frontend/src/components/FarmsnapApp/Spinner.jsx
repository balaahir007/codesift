import React from "react";

const Spinner = ({text}) => {
  return (
    <div className="flex justify-center flex-col  items-center  w-full mx-20 p-2 mb-3">
      <div className="w-8 h-8 border-4 border-primary border-solid border-t-transparent rounded-full animate-spin"></div>
      <span className="text-[10px] text-primary mt-4 md:text-sm ">{text}</span>
    </div>
  );
};

export default Spinner;
