import React from "react";

const DeleteModal = ({
  isOpen,
  title = "Delete Confirmation",
  message = "Are you sure you want to delete this record?",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

        <h2 className="text-xl font-bold text-red-600 mb-4">
          {title}
        </h2>

        <p className="text-gray-600 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteModal;