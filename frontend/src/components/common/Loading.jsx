import React from "react";

const Loading = ({
  message = "Loading...",
  size = "md",
}) => {
  const spinnerSize = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">

      <div
        className={`${spinnerSize[size]} border-4 border-blue-600 border-t-transparent rounded-full animate-spin`}
      />

      <p className="mt-4 text-gray-600 text-sm">
        {message}
      </p>

    </div>
  );
};

export default Loading;