import {
  useEffect,
  useMemo,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import TimetableHeader from "../../components/Timetable/TimetableHeader";
import TimetableFilters from "../../components/Timetable/TimetableFilters";
import TimetableTable from "../../components/Timetable/TimetableTable";
import DeleteTimeTableModal from "../../components/Timetable/DeleteTimeTableModal";

import {

  getTimeTables,

  deleteTimeTable

} from "../../services/timetableService";

function Timetable() {

  const navigate = useNavigate();

  // ==========================================
  // States
  // ==========================================

  const [

    timetables,

    setTimetables

  ] = useState([]);

  const [

    filteredTimetables,

    setFilteredTimetables

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

    day,

    setDay

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

  // ==========================================
  // Fetch Timetable
  // ==========================================

  const fetchTimetables = async () => {

    try {

      setLoading(true);

      const response =
        await getTimeTables();

      const data =
        response.data || [];

      setTimetables(data);

      setFilteredTimetables(data);

      setError("");

    }

    catch (error) {

      console.log(error);

      setError(
        "Unable to fetch timetable."
      );

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchTimetables();

  }, []);

  // ==========================================
  // Filters
  // ==========================================

  const filteredData =
    useMemo(() => {

      let data = [

        ...timetables

      ];

      if (search.trim()) {

        const keyword =
          search.toLowerCase();

        data = data.filter(

          (item) =>

            item.batch_code
              ?.toLowerCase()
              .includes(keyword)

            ||

            item.class_name
              ?.toLowerCase()
              .includes(keyword)

            ||

            item.section_name
              ?.toLowerCase()
              .includes(keyword)

            ||

            item.subject_name
              ?.toLowerCase()
              .includes(keyword)

            ||

            item.teacher_name
              ?.toLowerCase()
              .includes(keyword)

        );

      }

      if (day !== "") {

        data = data.filter(

          (item) =>

            item.day_of_week === day

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

      timetables,

      search,

      day,

      status

    ]);

  useEffect(() => {

    setFilteredTimetables(

      filteredData

    );

  }, [

    filteredData

  ]);

  // ==========================================
  // Reset Filters
  // ==========================================

  const handleReset = () => {

    setSearch("");

    setDay("");

    setStatus("");

  };

  // ==========================================
  // View
  // ==========================================

  const handleView = (id) => {

    navigate(

      `/timetable/view/${id}`

    );

  };

  // ==========================================
  // Edit
  // ==========================================

  const handleEdit = (id) => {

    navigate(

      `/timetable/edit/${id}`

    );

  };

  // ==========================================
  // Delete
  // ==========================================

  const handleDeleteClick = (id) => {

    setSelectedId(id);

    setDeleteModal(true);

  };

  const closeDeleteModal = () => {

    setDeleteModal(false);

    setSelectedId(null);

  };
    // ==========================================
  // Delete API
  // ==========================================

  const handleDelete = async () => {

    if (!selectedId) return;

    try {

      setDeleteLoading(true);

      await deleteTimeTable(selectedId);

      closeDeleteModal();

      await fetchTimetables();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete timetable."
      );

    } finally {

      setDeleteLoading(false);

    }

  };

  // ==========================================
  // Return
  // ==========================================

  return (

    <AdminLayout>

      <div className="bg-slate-100 min-h-screen">

        {/* Header */}

        <TimetableHeader />

        {/* Filters */}

        <TimetableFilters

          search={search}

          setSearch={setSearch}

          day={day}

          setDay={setDay}

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

        <TimetableTable

          timetables={filteredTimetables}

          loading={loading}

          onView={handleView}

          onEdit={handleEdit}

          onDelete={handleDeleteClick}

        />

        {/* Delete Modal */}

     <DeleteTimeTableModal

          isOpen={deleteModal}

          onClose={closeDeleteModal}

          onConfirm={handleDelete}

          loading={deleteLoading}

        />

      </div>

    </AdminLayout>

  );

}

export default Timetable;