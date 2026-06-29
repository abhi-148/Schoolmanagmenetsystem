import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TimetableHeader() {

  const navigate = useNavigate();

  return (

    <div className="bg-white rounded-xl shadow-md p-6 mb-6">

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">

            Timetable Management

          </h1>

          <p className="text-slate-500 mt-2">

            Manage all school timetable records.

          </p>

        </div>

        <button

          onClick={() =>
            navigate("/timetable/add")
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
            rounded-lg
            transition
          "

        >

          <Plus size={20} />

          Add Timetable

        </button>

      </div>

    </div>

  );

}

export default TimetableHeader;