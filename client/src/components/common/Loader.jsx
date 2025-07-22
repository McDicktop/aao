import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin">
        <svg
          className="w-12 h-12 text-gray-600 transform -rotate-90"
          viewBox="0 0 36 36"
        >
          <path
            d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="60, 100"
            className="opacity-20"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loader;
