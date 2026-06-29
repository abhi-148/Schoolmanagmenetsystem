import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import TimeTableSubstitutionForm
from "../../components/TimeTableSubstitution/TimeTableSubstitutionForm";

import {

  createTimeTableSubstitution

} from "../../services/timeTableSubstitutionService";

function AddTimeTableSubstitution() {

  const navigate =
    useNavigate();

  const [

    loading,

    setLoading

  ] = useState(false);

  // ===========================
  // Submit
  // ===========================

  const handleSubmit =
  async (data) => {

    try {

      setLoading(true);

      await createTimeTableSubstitution(
        data
      );

      alert(
        "Substitution Created Successfully"
      );

      navigate(
        "/timetable-substitutions"
      );

    }

    catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        "Failed to create substitution."

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <AdminLayout>

      <div className="bg-slate-100 min-h-screen p-6">

        {/* Header */}

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

          <h1 className="text-3xl font-bold">

            Add Timetable Substitution

          </h1>

          <p className="text-slate-500 mt-2">

            Create a new timetable substitution.

          </p>

        </div>

        {/* Form */}

        <TimeTableSubstitutionForm

          onSubmit={handleSubmit}

          loading={loading}

        />

      </div>

    </AdminLayout>

  );

}

export default AddTimeTableSubstitution;