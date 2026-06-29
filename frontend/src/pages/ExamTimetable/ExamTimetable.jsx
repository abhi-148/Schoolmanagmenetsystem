import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import ExamTimetableHeader from "../../components/ExamTimetable/ExamTimetableHeader";
import ExamTimetableFilters from "../../components/ExamTimetable/ExamTimetableFilters";
import ExamTimetableTable from "../../components/ExamTimetable/ExamTimetableTable";
import DeleteExamTimetableModal from "../../components/ExamTimetable/DeleteExamTimetableModal";

import {
  getExamTimetables,
  deleteExamTimetable,
} from "../../services/examTimetableService";

function ExamTimetable() {

  const navigate = useNavigate();

  // ==============================
  // STATES
  // ==============================

  const [examTimetables, setExamTimetables] =
    useState([]);

  const [
    filteredExamTimetables,
    setFilteredExamTimetables,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [
    selectedExamTimetableId,
    setSelectedExamTimetableId,
  ] = useState(null);

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [error, setError] =
    useState("");

  // ==============================
  // FETCH DATA
  // ==============================

  const fetchExamTimetables =
    async () => {

      try {

        setLoading(true);

        const response =
          await getExamTimetables();

        const data =
          response.data || [];

        setExamTimetables(data);

        setFilteredExamTimetables(data);

        setError("");

      } catch (err) {

        console.error(err);

        setError(
          "Unable to fetch Exam Timetable."
        );

      } finally {

        setLoading(false);

      }

    };

  // ==============================
  // INITIAL LOAD
  // ==============================

  useEffect(() => {

    fetchExamTimetables();

  }, []);

  // ==============================
  // FILTER DATA
  // ==============================

  const filteredData =
    useMemo(() => {

      let data =
        [...examTimetables];

      if (search.trim() !== "") {

        const keyword =
          search.toLowerCase();

        data = data.filter((item) => {

          return (

            item.exam_name
              ?.toLowerCase()
              .includes(keyword)

            ||

            item.subject_name
              ?.toLowerCase()
              .includes(keyword)

            ||

            item.batch_code
              ?.toLowerCase()
              .includes(keyword)

            ||

            item.school_name
              ?.toLowerCase()
              .includes(keyword)

            ||

            item.room_number
              ?.toLowerCase()
              .includes(keyword)

            ||

            item.supervisor_name
              ?.toLowerCase()
              .includes(keyword)

          );

        });

      }

      if (status !== "") {

        data = data.filter(
          (item) =>
            item.status === status
        );

      }

      return data;

    }, [

      examTimetables,

      search,

      status

    ]);

  useEffect(() => {

    setFilteredExamTimetables(
      filteredData
    );

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

    navigate(
      `/exam-timetable/view/${id}`
    );

  };

  // ==============================
  // EDIT
  // ==============================

  const handleEdit = (id) => {

    navigate(
      `/exam-timetable/edit/${id}`
    );

  };

  // ==============================
  // DELETE MODAL
  // ==============================

  const handleDeleteClick =
    (id) => {

      setSelectedExamTimetableId(id);

      setDeleteModal(true);

    };

  const closeDeleteModal = () => {

    setDeleteModal(false);

    setSelectedExamTimetableId(null);

  };

  // ==============================
  // DELETE API
  // ==============================

  const handleDelete =
    async () => {

      if (
        !selectedExamTimetableId
      ) return;

      try {

        setDeleteLoading(true);

        await deleteExamTimetable(
          selectedExamTimetableId
        );

        closeDeleteModal();

        await fetchExamTimetables();

      } catch (err) {

        console.error(err);

        alert(
          "Failed to delete Exam Timetable."
        );

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

        <ExamTimetableHeader />

        {/* Filters */}

        <ExamTimetableFilters

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

        <ExamTimetableTable

          examTimetables={filteredExamTimetables}

          loading={loading}

          onView={handleView}

          onEdit={handleEdit}

          onDelete={handleDeleteClick}

        />

        {/* Delete Modal */}

        <DeleteExamTimetableModal

          isOpen={deleteModal}

          onClose={closeDeleteModal}

          onConfirm={handleDelete}

          loading={deleteLoading}

        />

      </div>

    </AdminLayout>

  );

}

export default ExamTimetable;