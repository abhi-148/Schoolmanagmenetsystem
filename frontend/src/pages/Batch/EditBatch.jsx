import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import BatchForm from "../../components/Batch/BatchForm";

import {
  getBatchById,
  updateBatch,
} from "../../services/batchService";

function EditBatch() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  const [batchData, setBatchData] =
    useState(null);

  useEffect(() => {

    fetchBatch();

  }, []);

  const fetchBatch = async () => {

    try {

      setPageLoading(true);

      const response =
        await getBatchById(id);

      setBatchData(response.data);

    } catch (error) {

      console.error(error);

      alert(
        "Unable to load batch details."
      );

    } finally {

      setPageLoading(false);

    }

  };

  const handleSubmit = async (
    formData
  ) => {

    try {

      setLoading(true);

      await updateBatch(
        id,
        formData
      );

      alert(
        "Batch Updated Successfully."
      );

      navigate("/batches");

    } catch (error) {

      console.error(error);

      alert(
        error?.response?.data?.message ||
        "Unable to update batch."
      );

    } finally {

      setLoading(false);

    }

  };

  const handleCancel = () => {

    navigate("/batches");

  };

  if (pageLoading) {

    return (

      <AdminLayout>

        <div className="flex justify-center items-center h-[70vh]">

          <div className="text-lg font-semibold">

            Loading Batch...

          </div>

        </div>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="bg-slate-100 min-h-screen p-6">

        {/* Header */}

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

          <h1 className="text-3xl font-bold text-slate-800">

            Edit Batch

          </h1>

          <p className="text-slate-500 mt-2">

            Update batch information.

          </p>

        </div>

        {/* Form */}

        <BatchForm

          mode="edit"

          initialData={batchData}

          loading={loading}

          onSubmit={handleSubmit}

          onCancel={handleCancel}

        />

      </div>

    </AdminLayout>

  );

}

export default EditBatch;