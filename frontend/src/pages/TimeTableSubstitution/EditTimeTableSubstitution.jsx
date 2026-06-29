import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import TimeTableSubstitutionForm
from "../../components/TimeTableSubstitution/TimeTableSubstitutionForm";

import {

  getTimeTableSubstitutionById,

  updateTimeTableSubstitution

} from "../../services/timeTableSubstitutionService";

function EditTimeTableSubstitution() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [

    loading,

    setLoading

  ] = useState(true);

  const [

    saving,

    setSaving

  ] = useState(false);

  const [

    initialData,

    setInitialData

  ] = useState(null);

  // ==========================
  // Fetch Data
  // ==========================

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData =
  async () => {

    try {

      const response =
        await getTimeTableSubstitutionById(id);

      setInitialData(
        response.data
      );

    }

    catch (error) {

      console.log(error);

      alert(
        "Unable to fetch substitution."
      );

    }

    finally {

      setLoading(false);

    }

  };

  // ==========================
  // Submit
  // ==========================

  const handleSubmit =
  async (data) => {

    try {

      setSaving(true);

      await updateTimeTableSubstitution(
        id,
        data
      );

      alert(
        "Substitution Updated Successfully"
      );

      navigate(
        "/timetable-substitutions"
      );

    }

    catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        "Update Failed"

      );

    }

    finally {

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

            Edit Timetable Substitution

          </h1>

          <p className="text-slate-500 mt-2">

            Update substitution details.

          </p>

        </div>

        <TimeTableSubstitutionForm

          initialData={initialData}

          onSubmit={handleSubmit}

          loading={saving}

        />

      </div>

    </AdminLayout>

  );

}

export default EditTimeTableSubstitution;