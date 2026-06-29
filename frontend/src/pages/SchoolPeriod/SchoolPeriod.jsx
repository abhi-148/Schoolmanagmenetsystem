import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import SchoolPeriodHeader from "../../components/SchoolPeriod/SchoolPeriodHeader";
import SchoolPeriodFilters from "../../components/SchoolPeriod/SchoolPeriodFilters";
import SchoolPeriodTable from "../../components/SchoolPeriod/SchoolPeriodTable";
import DeleteSchoolPeriodModal from "../../components/SchoolPeriod/DeleteSchoolPeriodModal";

import {
  getSchoolPeriods,
  deleteSchoolPeriod,
} from "../../services/schoolPeriodService";

function SchoolPeriod() {

  const navigate = useNavigate();

  const [periods, setPeriods] = useState([]);
  const [filteredPeriods, setFilteredPeriods] = useState([]);

  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [selectedPeriodId, setSelectedPeriodId] =
    useState(null);

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [error, setError] =
    useState("");

  // ==========================
  // Fetch
  // ==========================

  const fetchPeriods = async () => {

    try {

      setLoading(true);

      const response =
        await getSchoolPeriods();

      const data =
        response.data || [];

      setPeriods(data);

      setFilteredPeriods(data);

      setError("");

    } catch (error) {

      console.log(error);

      setError(
        "Unable to fetch School Periods."
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchPeriods();

  }, []);

  // ==========================
  // Filter
  // ==========================

  const filteredData =
    useMemo(() => {

      let data = [...periods];

      if (search.trim() !== "") {

        const keyword =
          search.toLowerCase();

        data = data.filter((period) =>

          period.school_name
            ?.toLowerCase()
            .includes(keyword)

          ||

          period.branch_name
            ?.toLowerCase()
            .includes(keyword)

          ||

          String(period.period_number)
            .includes(keyword)

        );

      }

      if (status !== "") {

        data = data.filter(

          (period) =>
            period.status === status

        );

      }

      return data;

    }, [

      periods,
      search,
      status

    ]);

  useEffect(() => {

    setFilteredPeriods(
      filteredData
    );

  }, [filteredData]);

  // ==========================
  // Reset
  // ==========================

  const handleReset = () => {

    setSearch("");

    setStatus("");

  };

  // ==========================
  // View
  // ==========================

  const handleView = (id) => {

    navigate(
      `/school-periods/view/${id}`
    );

  };

  // ==========================
  // Edit
  // ==========================

  const handleEdit = (id) => {

    navigate(
      `/school-periods/edit/${id}`
    );

  };

  // ==========================
  // Delete
  // ==========================

  const handleDeleteClick =
    (id) => {

      setSelectedPeriodId(id);

      setDeleteModal(true);

    };

  const closeDeleteModal = () => {

    setDeleteModal(false);

    setSelectedPeriodId(null);

  };

  const handleDelete =
    async () => {

      if (!selectedPeriodId)
        return;

      try {

        setDeleteLoading(true);

        await deleteSchoolPeriod(
          selectedPeriodId
        );

        closeDeleteModal();

        fetchPeriods();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to delete School Period."
        );

      } finally {

        setDeleteLoading(false);

      }

    };

  return (

    <AdminLayout>

      <div className="bg-slate-100 min-h-screen">

        <SchoolPeriodHeader />

        <SchoolPeriodFilters

          search={search}
          setSearch={setSearch}

          status={status}
          setStatus={setStatus}

          onReset={handleReset}

        />

        {

          error && (

            <div
              className="
              bg-red-100
              border
              border-red-300
              text-red-600
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

        <SchoolPeriodTable

          periods={filteredPeriods}

          loading={loading}

          onView={handleView}

          onEdit={handleEdit}

          onDelete={handleDeleteClick}

        />

        <DeleteSchoolPeriodModal

          isOpen={deleteModal}

          onClose={closeDeleteModal}

          onConfirm={handleDelete}

          loading={deleteLoading}

        />

      </div>

    </AdminLayout>

  );

}

export default SchoolPeriod;