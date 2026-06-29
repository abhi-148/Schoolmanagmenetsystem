import {
  Eye,
  Pencil,
  Trash2
} from "lucide-react";

function TimetableTable({

  timetables = [],

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

          Loading Timetable...

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

              <th className="px-4 py-4 text-left">
                Batch
              </th>

              <th className="px-4 py-4 text-left">
                Class
              </th>

              <th className="px-4 py-4 text-left">
                Section
              </th>

              <th className="px-4 py-4 text-left">
                Subject
              </th>

              <th className="px-4 py-4 text-left">
                Teacher
              </th>

              <th className="px-4 py-4 text-left">
                Day
              </th>

              <th className="px-4 py-4 text-left">
                Period
              </th>

              <th className="px-4 py-4 text-left">
                Timing
              </th>

              <th className="px-4 py-4 text-left">
                Room
              </th>

              <th className="px-4 py-4 text-center">
                Status
              </th>

              <th className="px-4 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {

              timetables.length === 0 ?

              (

                <tr>

                  <td

                    colSpan="11"

                    className="py-16 text-center text-slate-500"

                  >

                    No Timetable Found

                  </td>

                </tr>

              )

              :

              (

                timetables.map(

                  (item) => (

                    <tr

                      key={item.time_table_id}

                      className="border-t hover:bg-slate-50"

                    >

                      <td className="px-4 py-4">

                        {item.batch_code}

                      </td>

                      <td className="px-4 py-4">

                        {item.class_name}

                      </td>

                      <td className="px-4 py-4">

                        {item.section_name}

                      </td>

                      <td className="px-4 py-4">

                        {item.subject_name}

                      </td>

                      <td className="px-4 py-4">

                        {item.teacher_name}

                      </td>

                      <td className="px-4 py-4">

                        {item.day_of_week}

                      </td>

                      <td className="px-4 py-4">

                        {item.period_number}

                      </td>

                      <td className="px-4 py-4">

                        {item.start_time}

                        {" - "}

                        {item.end_time}

                      </td>

                      <td className="px-4 py-4">

                        {item.room_number}

                      </td>

                      <td className="px-4 py-4 text-center">

                        <span

                          className={`

                          px-3

                          py-1

                          rounded-full

                          text-xs

                          font-semibold

                          ${

                            item.status === "active"

                            ?

                            "bg-green-100 text-green-700"

                            :

                            "bg-red-100 text-red-700"

                          }

                          `}

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

                      <td className="px-4 py-4">

                        <div className="flex justify-center gap-3">

                          <button

                            onClick={() =>
                              onView(item.time_table_id)
                            }

                            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-600 hover:text-white"

                          >

                            <Eye size={18} />

                          </button>

                          <button

                            onClick={() =>
                              onEdit(item.time_table_id)
                            }

                            className="p-2 rounded-lg bg-amber-100 hover:bg-amber-500 hover:text-white"

                          >

                            <Pencil size={18} />

                          </button>

                          <button

                            onClick={() =>
                              onDelete(item.time_table_id)
                            }

                            className="p-2 rounded-lg bg-red-100 hover:bg-red-600 hover:text-white"

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

export default TimetableTable;