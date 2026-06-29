import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import BatchForm from "../../components/Batch/BatchForm";

import { createBatch } from "../../services/batchService";

function AddBatch() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (formData) => {

    try {

      setLoading(true);

      await createBatch(formData);

      alert("Batch Created Successfully");

      navigate("/batches");

    } catch (error) {

      console.error(error);

      alert(
        error?.response?.data?.message ||
        "Unable to create batch."
      );

    } finally {

      setLoading(false);

    }

  };

  const handleCancel = () => {

    navigate("/batches");

  };

  return (

    <AdminLayout>

      <div className="bg-slate-100 min-h-screen p-6">

        {/* Page Header */}

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

          <h1 className="text-3xl font-bold text-slate-800">
            Add New Batch
          </h1>

          <p className="text-slate-500 mt-2">
            Create a new batch for your school.
          </p>

        </div>

        {/* Form */}

        <BatchForm

          mode="create"

          loading={loading}

          onSubmit={handleSubmit}

          onCancel={handleCancel}

        />

      </div>

    </AdminLayout>

  );

}

export default AddBatch;