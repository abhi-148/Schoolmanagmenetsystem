import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

function SchoolPeriodHeader() {

  const navigate = useNavigate();

  return (

    <div
      className="
        bg-white
        rounded-xl
        shadow-md
        p-6
        mb-6
        flex
        flex-col
        md:flex-row
        justify-between
        items-start
        md:items-center
        gap-5
      "
    >

      <div>

        <h1
          className="
            text-3xl
            font-bold
            text-slate-800
          "
        >
          School Periods
        </h1>

        <p
          className="
            text-slate-500
            mt-2
          "
        >
          Manage daily school periods and timings.
        </p>

      </div>

      <button

        onClick={() =>
          navigate("/school-periods/add")
        }

        className="
          flex
          items-center
          gap-2
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-5
          py-3
          rounded-xl
          shadow
          transition
        "

      >

        <Plus size={18} />

        Add School Period

      </button>

    </div>

  );

}

export default SchoolPeriodHeader;