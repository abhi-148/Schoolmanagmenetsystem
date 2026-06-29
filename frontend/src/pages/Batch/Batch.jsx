import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import BatchHeader from "../../components/Batch/BatchHeader";
import BatchFilters from "../../components/Batch/BatchFilters";
import BatchTable from "../../components/Batch/BatchTable";
import DeleteBatchModal from "../../components/Batch/DeleteBatchModal";

import {
  getBatches,
  deleteBatch,
} from "../../services/batchService";

function Batch() {

  const navigate = useNavigate();

  // ==============================
  // STATES
  // ==============================

  const [batches, setBatches] = useState([]);

  const [filteredBatches, setFilteredBatches] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [selectedBatchId, setSelectedBatchId] =
    useState(null);

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [error, setError] =
    useState("");

  // ==============================
  // FETCH BATCHES
  // ==============================

  const fetchBatches = async () => {

    try {

      setLoading(true);

      const response =
        await getBatches();

      const batchData =
        response.data || [];

      setBatches(batchData);

      setFilteredBatches(batchData);

      setError("");

    } catch (err) {

      console.error(err);

      setError(
        "Unable to fetch batches."
      );

    } finally {

      setLoading(false);

    }

  };

  // ==============================
  // INITIAL LOAD
  // ==============================

  useEffect(() => {

    fetchBatches();

  }, []);

  // ==============================
  // FILTER DATA
  // ==============================

  const filteredData =
    useMemo(() => {

      let data = [...batches];

      if (search.trim() !== "") {

        const keyword =
          search.toLowerCase();

        data = data.filter((batch) => {

          return (

            batch.batch_code
              ?.toLowerCase()
              .includes(keyword)

            ||

            batch.teacher_name
              ?.toLowerCase()
              .includes(keyword)

            ||

            batch.class_name
              ?.toLowerCase()
              .includes(keyword)

            ||

            batch.section_name
              ?.toLowerCase()
              .includes(keyword)

            ||

            batch.custom_medium_name
              ?.toLowerCase()
              .includes(keyword)

          );

        });

      }

      if (status !== "") {

        data = data.filter(
          (batch) =>
            batch.status === status
        );

      }

      return data;

    }, [

      batches,

      search,

      status

    ]);

  useEffect(() => {

    setFilteredBatches(filteredData);

  }, [filteredData]);

  // ==============================
  // RESET FILTER
  // ==============================

  const handleReset = () => {

    setSearch("");

    setStatus("");

  };
    // ==============================
  // VIEW
  // ==============================

  const handleView = (id) => {

    navigate(`/batches/view/${id}`);

  };

  // ==============================
  // EDIT
  // ==============================

  const handleEdit = (id) => {

    navigate(`/batches/edit/${id}`);

  };

  // ==============================
  // DELETE MODAL
  // ==============================

  const handleDeleteClick = (id) => {

    setSelectedBatchId(id);

    setDeleteModal(true);

  };

  const closeDeleteModal = () => {

    setDeleteModal(false);

    setSelectedBatchId(null);

  };

  // ==============================
  // DELETE API
  // ==============================

  const handleDelete = async () => {

    if (!selectedBatchId) return;

    try {

      setDeleteLoading(true);

      await deleteBatch(selectedBatchId);

      closeDeleteModal();

      await fetchBatches();

    } catch (err) {

      console.error(err);

      alert("Failed to delete batch.");

    } finally {

      setDeleteLoading(false);

    }

  };

  // ==============================
  // RETURN
  // ==============================

  return (

    <AdminLayout>

      <div className="bg-slate-100 min-h-screen">

        {/* Header */}

        <BatchHeader />

        {/* Filters */}

        <BatchFilters

          search={search}

          setSearch={setSearch}

          status={status}

          setStatus={setStatus}

          onReset={handleReset}

        />

        {/* Error */}

        {

          error && (

            <div
              className="
                bg-red-100
                border
                border-red-300
                text-red-700
                rounded-xl
                px-5
                py-4
                mb-6
              "
            >

              {error}

            </div>

          )

        }

        {/* Table */}

        <BatchTable

          batches={filteredBatches}

          loading={loading}

          onView={handleView}

          onEdit={handleEdit}

          onDelete={handleDeleteClick}

        />

        {/* Delete Modal */}

        <DeleteBatchModal

          isOpen={deleteModal}

          onClose={closeDeleteModal}

          onConfirm={handleDelete}

          loading={deleteLoading}

        />
              </div>

    </AdminLayout>

  );

}

export default Batch;