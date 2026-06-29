import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import TimetableForm from "../../components/Timetable/TimetableForm";

import {
  createTimeTable
} from "../../services/timetableService";
function AddTimetable() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    data
  ) => {

    try {

      setLoading(true);

      await createTimeTable(data);

      alert(
        "Timetable Created Successfully"
      );

      navigate("/timetable");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to create timetable."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <AdminLayout>

      <div className="bg-slate-100 min-h-screen p-6">

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

          <h1 className="text-3xl font-bold text-slate-800">

            Add Timetable

          </h1>

          <p className="text-slate-500 mt-2">

            Create a new timetable entry.

          </p>

        </div>

        <TimetableForm

          onSubmit={handleSubmit}

          loading={loading}

        />

      </div>

    </AdminLayout>

  );

}

export default AddTimetable;