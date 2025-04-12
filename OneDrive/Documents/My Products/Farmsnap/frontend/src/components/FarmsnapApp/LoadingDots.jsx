const LoadingDots = () => {
    return (
      <div className="flex space-x-1 bg-gray-200 rounded-2xl w-10 h-2 px-2 items-center justify-center p-2 m-2">
        <span className="dot animate-bounce [animation-delay:0ms] -mt-3">.</span>
        <span className="dot animate-bounce [animation-delay:200ms] -mt-3">.</span>
        <span className="dot animate-bounce [animation-delay:400ms] -mt-3">.</span>
      </div>
    );
  };
  
  export default LoadingDots;
  