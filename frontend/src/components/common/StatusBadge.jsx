import React from "react";

const statusStyles = {
  ACTIVE: "bg-green-100 text-green-700",
  INACTIVE: "bg-red-100 text-red-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-blue-100 text-blue-700",
  REJECTED: "bg-red-100 text-red-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-gray-200 text-gray-700",
};

const StatusBadge = ({ status }) => {
  const normalizedStatus = status?.toUpperCase() || "UNKNOWN";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
        statusStyles[normalizedStatus] ||
        "bg-gray-100 text-gray-700"
      }`}
    >
      {normalizedStatus}
    </span>
  );
};

export default StatusBadge;