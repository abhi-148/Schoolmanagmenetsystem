import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import SchoolPeriodForm from "../../components/SchoolPeriod/SchoolPeriodForm";

import {
  getSchoolPeriodById,
  updateSchoolPeriod,
} from "../../services/schoolPeriodService";

function EditSchoolPeriod() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] =
    useState(false);

  const [initialData, setInitialData] =
    useState(null);

  // ==========================
  // Fetch Data
  // ==========================

  useEffect(() => {

    fetchPeriod();

  }, []);

  const fetchPeriod = async () => {

    try {

      const response =
        await getSchoolPeriodById(id);

      setInitialData(
        response.data
      );

    } catch (error) {

      console.log(error);

      alert(
        "Unable to fetch School Period."
      );

    }

  };

  // ==========================
  // Update
  // ==========================

  const handleSubmit =
    async (formData) => {

      try {

        setLoading(true);

        await updateSchoolPeriod(
          id,
          formData
        );

        alert(
          "School Period Updated Successfully."
        );

        navigate("/school-periods");

      } catch (error) {

        console.log(error);

        alert(

          error?.response?.data?.message ||

          "Unable to update School Period."

        );

      } finally {

        setLoading(false);

      }

    };

  if (!initialData) {

    return (

      <AdminLayout>

        <div className="p-8">

          Loading...

        </div>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="bg-slate-100 min-h-screen">

        <div
          className="
            bg-white
            rounded-xl
            shadow-md
            p-6
            mb-6
          "
        >

          <h1
            className="
              text-3xl
              font-bold
              text-slate-800
            "
          >

            Edit School Period

          </h1>

          <p
            className="
              text-slate-500
              mt-2
            "
          >

            Update School Period Details.

          </p>

        </div>

        <SchoolPeriodForm

          initialData={initialData}

          onSubmit={handleSubmit}

          loading={loading}

        />

      </div>

    </AdminLayout>

  );

}

export default EditSchoolPeriod;