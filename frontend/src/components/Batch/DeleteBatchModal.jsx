function DeleteBatchModal({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}

      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}

      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

          {/* Header */}

          <div className="bg-red-600 text-white p-6">

            <h2 className="text-2xl font-bold">
              Delete Batch
            </h2>

            <p className="text-red-100 mt-1">
              This action cannot be undone.
            </p>

          </div>

          {/* Body */}

          <div className="p-6">

            <div className="flex justify-center">

              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">

                <span className="text-5xl">
                  ⚠️
                </span>

              </div>

            </div>

            <h3 className="text-xl font-semibold text-center mt-6">

              Are you sure?

            </h3>

            <p className="text-center text-slate-500 mt-3 leading-7">

              You are about to permanently delete this batch.

              <br />

              Once deleted, the data cannot be recovered.

            </p>

          </div>

          {/* Footer */}

          <div className="bg-slate-50 px-6 py-5 flex justify-end gap-3">

            <button
              onClick={onClose}
              disabled={loading}
              className="
                px-5
                py-2.5
                rounded-lg
                border
                border-slate-300
                hover:bg-slate-100
                transition
              "
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              disabled={loading}
              className="
                px-5
                py-2.5
                rounded-lg
                bg-red-600
                hover:bg-red-700
                text-white
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Deleting..."
                : "Delete Batch"}
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default DeleteBatchModal;