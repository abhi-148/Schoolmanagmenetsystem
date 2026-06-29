function ExamTimetableTable({

  examTimetables,

  loading,

  onView,

  onEdit,

  onDelete

}) {

  if (loading) {

    return (

      <div className="bg-white rounded-xl shadow-md p-8 text-center">

        <h2 className="text-lg font-semibold">
          Loading Exam Timetable...
        </h2>

      </div>

    );

  }

  return (

    <div className="bg-white rounded-xl shadow-md overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-4 py-3 text-left">
                Exam
              </th>

              <th className="px-4 py-3 text-left">
                Subject
              </th>

              <th className="px-4 py-3 text-left">
                Batch
              </th>

              <th className="px-4 py-3 text-left">
                School
              </th>

              <th className="px-4 py-3 text-left">
                Date
              </th>

              <th className="px-4 py-3 text-left">
                Time
              </th>

              <th className="px-4 py-3 text-left">
                Room
              </th>

              <th className="px-4 py-3 text-left">
                Supervisor
              </th>

              <th className="px-4 py-3 text-center">
                Status
              </th>

              <th className="px-4 py-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {

              examTimetables.length === 0 ? (

                <tr>

                  <td
                    colSpan="10"
                    className="text-center py-8"
                  >

                    No Exam Timetable Found

                  </td>

                </tr>

              ) :

              examTimetables.map((item) => (

                <tr
                  key={item.exam_timetable_id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-4 py-3">
                    {item.exam_name}
                  </td>

                  <td className="px-4 py-3">
                    {item.subject_name}
                  </td>

                  <td className="px-4 py-3">
                    {item.batch_code}
                  </td>

                  <td className="px-4 py-3">
                    {item.school_name}
                  </td>

                  <td className="px-4 py-3">
                    {item.exam_date}
                  </td>

                  <td className="px-4 py-3">

                    {item.start_time}

                    {" - "}

                    {item.end_time}

                  </td>

                  <td className="px-4 py-3">
                    {item.room_number}
                  </td>

                  <td className="px-4 py-3">
                    {item.supervisor_name}
                  </td>

                  <td className="px-4 py-3 text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >

                      {item.status}

                    </span>

                  </td>

                  <td className="px-4 py-3">

                    <div className="flex justify-center gap-2">

                      <button

                        onClick={() =>
                          onView(item.exam_timetable_id)
                        }

                        className="
                          bg-green-500
                          hover:bg-green-600
                          text-white
                          px-3
                          py-1
                          rounded
                        "

                      >

                        View

                      </button>

                      <button

                        onClick={() =>
                          onEdit(item.exam_timetable_id)
                        }

                        className="
                          bg-blue-500
                          hover:bg-blue-600
                          text-white
                          px-3
                          py-1
                          rounded
                        "

                      >

                        Edit

                      </button>

                      <button

                        onClick={() =>
                          onDelete(item.exam_timetable_id)
                        }

                        className="
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          px-3
                          py-1
                          rounded
                        "

                      >

                        Delete

                      </button>

                    </div>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default ExamTimetableTable;