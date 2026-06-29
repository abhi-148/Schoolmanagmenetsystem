function DeleteSchoolPeriodModal({

  isOpen,

  onClose,

  onConfirm,

  loading,

}) {

  if (!isOpen) return null;

  return (

    <div
      className="
        fixed
        inset-0
        bg-black/40
        flex
        items-center
        justify-center
        z-50
      "
    >

      <div
        className="
          bg-white
          rounded-2xl
          shadow-xl
          w-full
          max-w-md
          p-6
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            text-slate-800
            mb-4
          "
        >
          Delete School Period
        </h2>

        <p
          className="
            text-slate-600
            mb-8
          "
        >
          Are you sure you want to delete this
          School Period?

          <br />

          This action cannot be undone.
        </p>

        <div
          className="
            flex
            justify-end
            gap-3
          "
        >

          <button

            onClick={onClose}

            disabled={loading}

            className="
              px-5
              py-2.5
              rounded-xl
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
              rounded-xl
              bg-red-600
              hover:bg-red-700
              text-white
              transition
            "

          >

            {

              loading

                ? "Deleting..."

                : "Delete"

            }

          </button>

        </div>

      </div>

    </div>

  );

}

export default DeleteSchoolPeriodModal;