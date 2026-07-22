import React from "react";

const EmptyState = ({
  title = "No Data Found",
  description = "There are no records available.",
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-10 text-center">

      <div className="flex justify-center mb-4">

        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-4xl">
          📂
        </div>

      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        {title}
      </h2>

      <p className="text-gray-500 mb-6">
        {description}
      </p>

      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          {buttonText}
        </button>
      )}

    </div>
  );
};

export default EmptyState;