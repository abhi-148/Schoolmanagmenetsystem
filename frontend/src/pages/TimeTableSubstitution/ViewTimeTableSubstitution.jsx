import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getTimeTableSubstitutionById
} from "../../services/timeTableSubstitutionService";

function ViewTimeTableSubstitution() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    substitution,
    setSubstitution
  ] = useState(null);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const response =
        await getTimeTableSubstitutionById(id);

      setSubstitution(
        response.data
      );

    }

    catch (error) {

      console.log(error);

      alert(
        "Unable to fetch substitution."
      );

    }

    finally {

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

  if (!substitution) {

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

              <h1 className="text-3xl font-bold">

                View Timetable Substitution

              </h1>

              <p className="text-slate-500 mt-2">

                Substitution Details

              </p>

            </div>

            <button

              onClick={() =>
                navigate(
                  "/timetable-substitutions"
                )
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
              title="Timetable ID"
              value={substitution.time_table_id}
            />

            <InfoCard
              title="Original Teacher"
              value={substitution.original_teacher}
            />

            <InfoCard
              title="Substitute Teacher"
              value={substitution.substitute_teacher}
            />

            <InfoCard
              title="Substitution Date"
              value={substitution.substitution_date}
            />

            <InfoCard
              title="Reason"
              value={substitution.reason}
            />

            <InfoCard
              title="Remark"
              value={substitution.remark}
            />

            <InfoCard
              title="Status"
              value={substitution.status}
            />

            <InfoCard
              title="Created At"
              value={substitution.created_at}
            />

          </div>

        </div>

      </div>

    </AdminLayout>

  );

}

function InfoCard({

  title,

  value

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

export default ViewTimeTableSubstitution;