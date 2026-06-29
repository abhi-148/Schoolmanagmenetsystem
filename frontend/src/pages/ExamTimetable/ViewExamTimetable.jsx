import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getExamTimetableById,
} from "../../services/examTimetableService";

function ViewExamTimetable() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [examTimetable, setExamTimetable] =
    useState(null);

  useEffect(() => {

    fetchExamTimetable();

  }, []);

  const fetchExamTimetable = async () => {

    try {

      const response =
        await getExamTimetableById(id);

      setExamTimetable(
        response.data
      );

    } catch (error) {

      console.error(error);

      alert(
        "Unable to load Exam Timetable."
      );

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <AdminLayout>

        <div className="flex justify-center items-center h-[70vh]">

          <div className="text-lg font-semibold">

            Loading...

          </div>

        </div>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="bg-slate-100 min-h-screen p-6">

        {/* Header */}

        <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex justify-between">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">

              View Exam Timetable

            </h1>

            <p className="text-slate-500 mt-2">

              Exam Timetable Details

            </p>

          </div>

          <button

            onClick={() =>
              navigate("/exam-timetable")
            }

            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-lg
            "

          >

            Back

          </button>

        </div>

        {/* Card */}

        <div className="bg-white rounded-xl shadow-md p-8">

          <div className="grid grid-cols-2 gap-6">

            <Detail
              label="Exam"
              value={examTimetable.exam_name}
            />

            <Detail
              label="Subject"
              value={examTimetable.subject_name}
            />

            <Detail
              label="Batch"
              value={examTimetable.batch_code}
            />

            <Detail
              label="School"
              value={examTimetable.school_name}
            />

            <Detail
              label="Exam Date"
              value={examTimetable.exam_date}
            />

            <Detail
              label="Start Time"
              value={examTimetable.start_time}
            />

            <Detail
              label="End Time"
              value={examTimetable.end_time}
            />

            <Detail
              label="Room Number"
              value={examTimetable.room_number}
            />

            <Detail
              label="Supervisor"
              value={examTimetable.supervisor_name}
            />

            <Detail
              label="Status"
              value={examTimetable.status}
            />

          </div>

        </div>

      </div>

    </AdminLayout>

  );

}

function Detail({

  label,

  value

}) {

  return (

    <div>

      <p className="text-sm text-slate-500">

        {label}

      </p>

      <p className="text-lg font-semibold text-slate-800 mt-1">

        {value}

      </p>

    </div>

  );

}

export default ViewExamTimetable;