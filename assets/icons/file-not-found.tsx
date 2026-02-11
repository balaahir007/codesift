import React from "react";

const FileNotFoundIcon = ({ className = "" } : {className : string}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <line x1="9" y1="15" x2="15" y2="9" />
      <line x1="15" y1="15" x2="9" y2="9" />
    </svg>
  );
};

export default FileNotFoundIcon;
