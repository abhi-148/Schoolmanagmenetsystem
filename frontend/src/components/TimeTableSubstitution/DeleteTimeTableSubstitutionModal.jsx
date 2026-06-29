function DeleteTimeTableSubstitutionModal({

  isOpen,

  onClose,

  onConfirm,

  loading

}) {

  if (!isOpen) return null;

  return (

    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
      "
    >

      <div
        className="
          bg-white
          rounded-xl
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
          "
        >

          Delete Substitution

        </h2>

        <p
          className="
            mt-4
            text-slate-600
          "
        >

          Are you sure you want to delete this timetable substitution?

        </p>

        <div
          className="
            flex
            justify-end
            gap-3
            mt-8
          "
        >

          <button

            onClick={onClose}

            disabled={loading}

            className="
              px-5
              py-2
              rounded-lg
              border
              border-slate-300
              hover:bg-slate-100
            "

          >

            Cancel

          </button>

          <button

            onClick={onConfirm}

            disabled={loading}

            className="
              px-5
              py-2
              rounded-lg
              bg-red-600
              hover:bg-red-700
              text-white
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

export default DeleteTimeTableSubstitutionModal;