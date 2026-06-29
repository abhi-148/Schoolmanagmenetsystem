import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import SchoolPeriodForm from "../../components/SchoolPeriod/SchoolPeriodForm";

import {
  createSchoolPeriod,
} from "../../services/schoolPeriodService";

function AddSchoolPeriod() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  // ==========================
  // Submit
  // ==========================

  const handleSubmit =
    async (formData) => {

      try {

        setLoading(true);

        await createSchoolPeriod(
          formData
        );

        alert(
          "School Period Created Successfully."
        );

        navigate("/school-periods");

      } catch (error) {

        console.log(error);

        alert(

          error?.response?.data?.message ||

          "Unable to create School Period."

        );

      } finally {

        setLoading(false);

      }

    };

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

            Add School Period

          </h1>

          <p
            className="
              text-slate-500
              mt-2
            "
          >

            Create a new school period.

          </p>

        </div>

        <SchoolPeriodForm

          onSubmit={handleSubmit}

          loading={loading}

        />

      </div>

    </AdminLayout>

  );

}

export default AddSchoolPeriod;