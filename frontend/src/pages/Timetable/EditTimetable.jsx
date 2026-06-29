import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import TimetableForm from "../../components/Timetable/TimetableForm";

import {
  getTimeTableById,
  updateTimeTable
} from "../../services/timeTableService";

function EditTimetable() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [initialData, setInitialData] =
    useState(null);

  useEffect(() => {

    fetchTimetable();

  }, []);

  const fetchTimetable = async () => {

    try {

      const response =
        await getTimeTableById(id);

      setInitialData(
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

  const handleSubmit = async (
    data
  ) => {

    try {

      setSaving(true);

      await updateTimeTable(
        id,
        data
      );

      alert(
        "Timetable Updated Successfully"
      );

      navigate("/timetable");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Update Failed"
      );

    } finally {

      setSaving(false);

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

  return (

    <AdminLayout>

      <div className="bg-slate-100 min-h-screen p-6">

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

          <h1 className="text-3xl font-bold">

            Edit Timetable

          </h1>

          <p className="text-slate-500 mt-2">

            Update timetable details.

          </p>

        </div>

        <TimetableForm

          initialData={initialData}

          onSubmit={handleSubmit}

          loading={saving}

        />

      </div>

    </AdminLayout>

  );

}

export default EditTimetable;