import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getTimeTableById
} from "../../services/timeTableService";

function ViewTimetable() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [timetable, setTimetable] =
    useState(null);

  useEffect(() => {

    fetchTimetable();

  }, []);

  const fetchTimetable = async () => {

    try {

      const response =
        await getTimeTableById(id);

      setTimetable(
        response.data
      );

    } catch (error) {

      console.log(error);

      alert(
        "Unable to fetch timetable."
      );

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <AdminLayout>

        <div className="p-10">

          Loading...

        </div>

      </AdminLayout>

    );

  }

  if (!timetable) {

    return (

      <AdminLayout>

        <div className="p-10">

          No Record Found

        </div>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="bg-slate-100 min-h-screen p-6">

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-3xl font-bold">

                View Timetable

              </h1>

              <p className="text-slate-500 mt-2">

                Timetable Details

              </p>

            </div>

            <button

              onClick={() =>
                navigate("/timetable")
              }

              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-2
                rounded-lg
              "

            >

              Back

            </button>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow-md p-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <InfoCard
              title="Batch"
              value={timetable.batch_code}
            />

            <InfoCard
              title="Class"
              value={timetable.class_name}
            />

            <InfoCard
              title="Section"
              value={timetable.section_name}
            />

            <InfoCard
              title="Subject"
              value={timetable.subject_name}
            />

            <InfoCard
              title="Teacher"
              value={timetable.teacher_name}
            />

            <InfoCard
              title="Period"
              value={timetable.period_number}
            />

            <InfoCard
              title="Start Time"
              value={timetable.start_time}
            />

            <InfoCard
              title="End Time"
              value={timetable.end_time}
            />

            <InfoCard
              title="Day"
              value={timetable.day_of_week}
            />

            <InfoCard
              title="Room"
              value={timetable.room_number}
            />

            <InfoCard
              title="Duration"
              value={`${timetable.duration_minutes} Minutes`}
            />

            <InfoCard
              title="Status"
              value={timetable.status}
            />

          </div>

        </div>

      </div>

    </AdminLayout>

  );

}

function InfoCard({

  title,

  value

}) {

  return (

    <div className="border rounded-xl p-5">

      <h4 className="text-sm text-slate-500">

        {title}

      </h4>

      <p className="mt-2 text-lg font-semibold text-slate-800">

        {value || "-"}

      </p>

    </div>

  );

}

export default ViewTimetable;