import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getSchoolPeriodById,
} from "../../services/schoolPeriodService";

function ViewSchoolPeriod() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [period, setPeriod] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchPeriod();

  }, []);

  const fetchPeriod = async () => {

    try {

      const response =
        await getSchoolPeriodById(id);

      setPeriod(
        response.data
      );

    } catch (error) {

      console.log(error);

      alert(
        "Unable to fetch School Period."
      );

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <AdminLayout>

        <div className="p-10">

          Loading...

        </div>

      </AdminLayout>

    );

  }

  if (!period) {

    return (

      <AdminLayout>

        <div className="p-10">

          No Record Found

        </div>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="bg-slate-100 min-h-screen p-6">

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-3xl font-bold text-slate-800">

                View School Period

              </h1>

              <p className="text-slate-500 mt-2">

                School Period Details

              </p>

            </div>

            <button

              onClick={() =>
                navigate("/school-periods")
              }

              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-2
                rounded-lg
              "

            >

              Back

            </button>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow-md p-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <InfoCard
              title="School"
              value={period.school_name}
            />

            <InfoCard
              title="Branch"
              value={period.branch_name}
            />

            <InfoCard
              title="Period Number"
              value={period.period_number}
            />

            <InfoCard
              title="Start Time"
              value={period.start_time}
            />

            <InfoCard
              title="End Time"
              value={period.end_time}
            />

            <InfoCard
              title="Duration"
              value={`${period.slot_duration} Minutes`}
            />

            <InfoCard
              title="Status"
              value={period.status}
            />

          </div>

        </div>

      </div>

    </AdminLayout>

  );

}

function InfoCard({

  title,

  value,

}) {

  return (

    <div className="border rounded-xl p-5">

      <h4 className="text-sm text-slate-500">

        {title}

      </h4>

      <p className="mt-2 text-lg font-semibold text-slate-800">

        {value || "-"}

      </p>

    </div>

  );

}

export default ViewSchoolPeriod;