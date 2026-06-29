import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

function BatchTable({
  batches = [],
  loading = false,
  onView,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>

        <p className="mt-5 text-slate-500">
          Loading batches...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                Batch Code
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                Class
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                Section
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                Academic Year
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                Teacher
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                Medium
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                Timing
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold text-slate-700">
                Status
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold text-slate-700">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {batches.length === 0 ? (

              <tr>

                <td
                  colSpan="9"
                  className="py-16 text-center text-slate-500"
                >
                  No Batch Found
                </td>

              </tr>

            ) : (

              batches.map((batch) => (

                <tr
                  key={batch.batch_id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="px-5 py-4 font-semibold text-slate-800">
                    {batch.batch_code}
                  </td>

                  <td className="px-5 py-4">
                    {batch.class_name}
                  </td>

                  <td className="px-5 py-4">
                    {batch.section_name}
                  </td>

                  <td className="px-5 py-4">
                    {batch.academic_year_name}
                  </td>

                  <td className="px-5 py-4">
                    {batch.teacher_name}
                  </td>

                  <td className="px-5 py-4">
                    {batch.custom_medium_name}
                  </td>

                  <td className="px-5 py-4">
                    {batch.start_time}
                    {" "}
                    -
                    {" "}
                    {batch.end_time}
                  </td>

                  <td className="px-5 py-4 text-center">

  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
      batch.status === "active"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >

    {batch.status === "active"
      ? "Active"
      : "Inactive"}

  </span>

</td>

                  <td className="px-5 py-4">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          onView(batch.batch_id)
                        }
                        className="p-2 rounded-lg bg-blue-100 hover:bg-blue-600 hover:text-white transition"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() =>
                          onEdit(batch.batch_id)
                        }
                        className="p-2 rounded-lg bg-amber-100 hover:bg-amber-500 hover:text-white transition"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() =>
                          onDelete(batch.batch_id)
                        }
                        className="p-2 rounded-lg bg-red-100 hover:bg-red-600 hover:text-white transition"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default BatchTable;