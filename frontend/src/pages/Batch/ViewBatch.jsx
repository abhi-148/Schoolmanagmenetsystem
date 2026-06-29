import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import { getBatchById } from "../../services/batchService";

function ViewBatch() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [batch, setBatch] =
    useState(null);

  useEffect(() => {

    fetchBatch();

  }, []);

  const fetchBatch = async () => {

    try {

      const response =
        await getBatchById(id);

      setBatch(response.data);

    }

    catch (error) {

      console.log(error);

      alert(
        "Unable to load batch."
      );

    }

    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <AdminLayout>

        <div className="flex justify-center items-center h-[70vh]">

          <h2 className="text-xl font-semibold">

            Loading...

          </h2>

        </div>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="bg-slate-100 min-h-screen p-6">

        {/* Header */}

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-3xl font-bold">

                Batch Details

              </h1>

              <p className="text-gray-500 mt-2">

                View complete batch information.

              </p>

            </div>

            <button

              onClick={() =>
                navigate("/batches")
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

        {/* Details */}

        <div className="bg-white rounded-xl shadow-md p-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <InfoCard
              title="Batch Code"
              value={batch.batch_code}
            />
<InfoCard
  title="Class"
  value={batch.class_name}
/>

<InfoCard
  title="Academic Year"
  value={batch.academic_year_name}
/>

<InfoCard
  title="Section"
  value={batch.section_name}
/>

<InfoCard
  title="Class Teacher"
  value={batch.teacher_name}
/>

<InfoCard
  title="School Medium"
  value={batch.custom_medium_name}
/>

            <InfoCard
              title="Start Time"
              value={batch.start_time}
            />

            <InfoCard
              title="End Time"
              value={batch.end_time}
            />

            <InfoCard
              title="Duration"
              value={`${batch.duration_minutes} Minutes`}
            />

            <InfoCard
              title="Status"
              value={batch.status}
            />

            <InfoCard
              title="Created At"
              value={batch.created_at}
            />

            <InfoCard
              title="Updated At"
              value={batch.updated_at}
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

    <div className="border rounded-xl p-5 bg-slate-50">

      <h4 className="text-sm text-gray-500">

        {title}

      </h4>

      <h2 className="text-lg font-semibold mt-2">

        {value || "-"}

      </h2>

    </div>

  );

}

export default ViewBatch;