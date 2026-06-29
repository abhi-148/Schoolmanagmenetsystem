import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import AdminLayout
from "../../layouts/AdminLayout";

import TimeTableSubstitutionHeader
from "../../components/TimeTableSubstitution/TimeTableSubstitutionHeader";

import TimeTableSubstitutionFilters
from "../../components/TimeTableSubstitution/TimeTableSubstitutionFilters";

import TimeTableSubstitutionTable
from "../../components/TimeTableSubstitution/TimeTableSubstitutionTable";

import DeleteTimeTableSubstitutionModal
from "../../components/TimeTableSubstitution/DeleteTimeTableSubstitutionModal";

import {

  getTimeTableSubstitutions,

  deleteTimeTableSubstitution

}
from "../../services/timeTableSubstitutionService";

function TimeTableSubstitution() {

  const navigate =
    useNavigate();

  // ===========================
  // States
  // ===========================

  const [

    substitutions,

    setSubstitutions

  ] = useState([]);

  const [

    filteredSubstitutions,

    setFilteredSubstitutions

  ] = useState([]);

  const [

    loading,

    setLoading

  ] = useState(true);

  const [

    deleteLoading,

    setDeleteLoading

  ] = useState(false);

  const [

    search,

    setSearch

  ] = useState("");

  const [

    status,

    setStatus

  ] = useState("");

  const [

    deleteModal,

    setDeleteModal

  ] = useState(false);

  const [

    selectedId,

    setSelectedId

  ] = useState(null);

  const [

    error,

    setError

  ] = useState("");

  // ===========================
  // Fetch Data
  // ===========================

  const fetchSubstitutions =
  async () => {

    try {

      setLoading(true);

      const response =
        await getTimeTableSubstitutions();

      const data =
        response.data || [];

      setSubstitutions(data);

      setFilteredSubstitutions(data);

      setError("");

    }

    catch (error) {

      console.log(error);

      setError(
        "Unable to fetch substitutions."
      );

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchSubstitutions();

  }, []);

  // ===========================
  // Filters
  // ===========================

  const filteredData =
  useMemo(() => {

    let data = [

      ...substitutions

    ];

    if (search.trim()) {

      const keyword =
        search.toLowerCase();

      data = data.filter(

        (item) =>

          item.original_teacher
            ?.toLowerCase()
            .includes(keyword)

          ||

          item.substitute_teacher
            ?.toLowerCase()
            .includes(keyword)

          ||

          item.reason
            ?.toLowerCase()
            .includes(keyword)

      );

    }

    if (status !== "") {

      data = data.filter(

        (item) =>

          item.status === status

      );

    }

    return data;

  }, [

    substitutions,

    search,

    status

  ]);

  useEffect(() => {

    setFilteredSubstitutions(

      filteredData

    );

  }, [

    filteredData

  ]);

  // ===========================
  // Reset
  // ===========================

  const handleReset = () => {

    setSearch("");

    setStatus("");

  };

  // ===========================
  // View
  // ===========================

  const handleView = (id) => {

    navigate(

      `/timetable-substitutions/view/${id}`

    );

  };

  // ===========================
  // Edit
  // ===========================

  const handleEdit = (id) => {

    navigate(

      `/timetable-substitutions/edit/${id}`

    );

  };

  // ===========================
  // Delete Modal
  // ===========================

  const handleDeleteClick =
  (id) => {

    setSelectedId(id);

    setDeleteModal(true);

  };

  const closeDeleteModal =
  () => {

    setDeleteModal(false);

    setSelectedId(null);

  };
    // ===========================
  // Delete API
  // ===========================

  const handleDelete = async () => {

    if (!selectedId) return;

    try {

      setDeleteLoading(true);

      await deleteTimeTableSubstitution(
        selectedId
      );

      closeDeleteModal();

      await fetchSubstitutions();

    } catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        "Failed to delete substitution."

      );

    } finally {

      setDeleteLoading(false);

    }

  };

  // ===========================
  // Return
  // ===========================

  return (

    <AdminLayout>

      <div className="bg-slate-100 min-h-screen">

        {/* Header */}

        <TimeTableSubstitutionHeader />

        {/* Filters */}

        <TimeTableSubstitutionFilters

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

        <TimeTableSubstitutionTable

          substitutions={filteredSubstitutions}

          loading={loading}

          onView={handleView}

          onEdit={handleEdit}

          onDelete={handleDeleteClick}

        />

        {/* Delete Modal */}

        <DeleteTimeTableSubstitutionModal

          isOpen={deleteModal}

          onClose={closeDeleteModal}

          onConfirm={handleDelete}

          loading={deleteLoading}

        />

      </div>

    </AdminLayout>

  );

}

export default TimeTableSubstitution;