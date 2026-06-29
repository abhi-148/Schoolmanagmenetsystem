import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import ExamTimetableForm from "../../components/ExamTimetable/ExamTimetableForm";

import {
  createExamTimetable,
} from "../../services/examTimetableService";

function AddExamTimetable() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    formData
  ) => {

    try {

      setLoading(true);

      await createExamTimetable(
        formData
      );

      alert(
        "Exam Timetable Created Successfully."
      );

      navigate("/exam-timetable");

    } catch (error) {

      console.error(error);

      alert(

        error?.response?.data?.message ||

        "Unable to create Exam Timetable."

      );

    } finally {

      setLoading(false);

    }

  };

  const handleCancel = () => {

    navigate("/exam-timetable");

  };

  return (

    <AdminLayout>

      <div className="bg-slate-100 min-h-screen p-6">

        {/* Header */}

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

          <h1 className="text-3xl font-bold text-slate-800">

            Add Exam Timetable

          </h1>

          <p className="text-slate-500 mt-2">

            Create a new Exam Timetable.

          </p>

        </div>

        {/* Form */}

        <ExamTimetableForm

          mode="create"

          loading={loading}

          onSubmit={handleSubmit}

          onCancel={handleCancel}

        />

      </div>

    </AdminLayout>

  );

}

export default AddExamTimetable;