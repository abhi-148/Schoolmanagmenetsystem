import { useNavigate } from "react-router-dom";

function ExamTimetableHeader() {

  const navigate = useNavigate();

  return (

    <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex justify-between items-center">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Exam Timetable
        </h1>

        <p className="text-slate-500 mt-2">
          Manage exam timetable records.
        </p>

      </div>

      <button
        onClick={() =>
          navigate("/exam-timetable/add")
        }
        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-6
          py-3
          rounded-lg
          transition
        "
      >
        + Add Exam Timetable
      </button>

    </div>

  );

}

export default ExamTimetableHeader;