import {
  Eye,
  Pencil,
  Trash2
} from "lucide-react";

function TimeTableSubstitutionTable({

  substitutions = [],

  loading = false,

  onView,

  onEdit,

  onDelete

}) {

  if (loading) {

    return (

      <div className="bg-white rounded-xl shadow-md p-12 text-center">

        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>

        <p className="mt-5 text-slate-500">

          Loading Substitutions...

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

              <th className="px-5 py-4 text-left">

                Date

              </th>

              <th className="px-5 py-4 text-left">

                Day

              </th>

              <th className="px-5 py-4 text-left">

                Original Teacher

              </th>

              <th className="px-5 py-4 text-left">

                Substitute Teacher

              </th>

              <th className="px-5 py-4 text-left">

                Reason

              </th>

              <th className="px-5 py-4 text-left">

                Remark

              </th>

              <th className="px-5 py-4 text-center">

                Status

              </th>

              <th className="px-5 py-4 text-center">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {

              substitutions.length === 0 ?

              (

                <tr>

                  <td

                    colSpan="8"

                    className="py-16 text-center text-slate-500"

                  >

                    No Substitution Found

                  </td>

                </tr>

              )

              :

              (

                substitutions.map(

                  (item) => (

                    <tr

                      key={item.substitution_id}

                      className="border-t hover:bg-slate-50 transition"

                    >

                      <td className="px-5 py-4">

                        {item.substitution_date}

                      </td>

                      <td className="px-5 py-4">

                        {item.day_of_week}

                      </td>

                      <td className="px-5 py-4">

                        {item.original_teacher}

                      </td>

                      <td className="px-5 py-4">

                        {item.substitute_teacher}

                      </td>

                      <td className="px-5 py-4">

                        {item.reason}

                      </td>

                      <td className="px-5 py-4">

                        {item.remark}

                      </td>

                      <td className="px-5 py-4 text-center">

                        <span

                          className={

                            `inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${

                              item.status === "active"

                              ?

                              "bg-green-100 text-green-700"

                              :

                              "bg-red-100 text-red-700"

                            }`

                          }

                        >

                          {

                            item.status === "active"

                            ?

                            "Active"

                            :

                            "Inactive"

                          }

                        </span>

                      </td>

                      <td className="px-5 py-4">

                        <div className="flex justify-center gap-3">

                          <button

                            onClick={() =>

                              onView(

                                item.substitution_id

                              )

                            }

                            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-600 hover:text-white transition"

                          >

                            <Eye size={18} />

                          </button>

                          <button

                            onClick={() =>

                              onEdit(

                                item.substitution_id

                              )

                            }

                            className="p-2 rounded-lg bg-amber-100 hover:bg-amber-500 hover:text-white transition"

                          >

                            <Pencil size={18} />

                          </button>

                          <button

                            onClick={() =>

                              onDelete(

                                item.substitution_id

                              )

                            }

                            className="p-2 rounded-lg bg-red-100 hover:bg-red-600 hover:text-white transition"

                          >

                            <Trash2 size={18} />

                          </button>

                        </div>

                      </td>

                    </tr>

                  )

                )

              )

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default TimeTableSubstitutionTable;