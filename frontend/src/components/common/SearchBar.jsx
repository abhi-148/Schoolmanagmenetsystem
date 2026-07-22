import React from "react";

const SearchBar = ({
  value = "",
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div className={`relative w-full ${className}`}>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M16 10.5A5.5 5.5 0 1 1 5 10.5a5.5 5.5 0 0 1 11 0Z"
        />
      </svg>

    </div>
  );
};

export default SearchBar;