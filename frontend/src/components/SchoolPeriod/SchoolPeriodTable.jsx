import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

function SchoolPeriodTable({

  periods = [],

  loading = false,

  onView,

  onEdit,

  onDelete,

}) {

  if (loading) {

    return (

      <div className="bg-white rounded-xl shadow-md p-12 text-center">

        <div
          className="
            animate-spin
            rounded-full
            h-12
            w-12
            border-b-2
            border-blue-600
            mx-auto
          "
        ></div>

        <p className="mt-5 text-slate-500">

          Loading School Periods...

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

              <th className="px-5 py-4 text-left text-sm font-semibold">
                School
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Branch
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold">
                Period
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold">
                Start Time
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold">
                End Time
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold">
                Duration
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold">
                Status
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {

              periods.length === 0 ?

              (

                <tr>

                  <td
                    colSpan="8"
                    className="
                      py-16
                      text-center
                      text-slate-500
                    "
                  >

                    No School Period Found

                  </td>

                </tr>

              )

              :

              (

                periods.map((period) => (

                  <tr

                    key={period.period_id}

                    className="
                      border-t
                      hover:bg-slate-50
                      transition
                    "

                  >

                    <td className="px-5 py-4">

                      {period.school_name}

                    </td>

                    <td className="px-5 py-4">

                      {period.branch_name}

                    </td>

                    <td className="px-5 py-4 text-center font-semibold">

                      {period.period_number}

                    </td>

                    <td className="px-5 py-4 text-center">

                      {period.start_time}

                    </td>

                    <td className="px-5 py-4 text-center">

                      {period.end_time}

                    </td>

                    <td className="px-5 py-4 text-center">

                      {period.slot_duration} Min

                    </td>

                    <td className="px-5 py-4 text-center">

                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          period.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >

                        {

                          period.status === "active"

                            ? "Active"

                            : "Inactive"

                        }

                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <div className="flex justify-center gap-3">

                        <button

                          onClick={() =>
                            onView(period.period_id)
                          }

                          className="
                            p-2
                            rounded-lg
                            bg-blue-100
                            hover:bg-blue-600
                            hover:text-white
                            transition
                          "

                        >

                          <Eye size={18} />

                        </button>

                        <button

                          onClick={() =>
                            onEdit(period.period_id)
                          }

                          className="
                            p-2
                            rounded-lg
                            bg-amber-100
                            hover:bg-amber-500
                            hover:text-white
                            transition
                          "

                        >

                          <Pencil size={18} />

                        </button>

                        <button

                          onClick={() =>
                            onDelete(period.period_id)
                          }

                          className="
                            p-2
                            rounded-lg
                            bg-red-100
                            hover:bg-red-600
                            hover:text-white
                            transition
                          "

                        >

                          <Trash2 size={18} />

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default SchoolPeriodTable;