import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import {
  getAttendance,
  markAttendance
} from "../../services/attendanceService";

function Attendance() {

  const [attendance,
    setAttendance] =
    useState([]);

 const [formData, setFormData] =
  useState({
    school_id: 1,
    student_id: "",
    attendance_date: "",
    status: "PRESENT"
  });

  useEffect(() => {

    fetchAttendance();

  }, []);

  const fetchAttendance =
    async () => {

      try {

        const response =
          await getAttendance();

        setAttendance(
          response.data || []
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
      e.target.value
    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await markAttendance(
          formData
        );

        alert(
          "Attendance Marked"
        );

        fetchAttendance();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Attendance
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-sm mb-8"
        >

          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="number"
              name="student_id"
              placeholder="Student ID"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            />

            <input
              type="date"
              name="attendance_date"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            />

            <select
              name="status"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            >

              <option value="PRESENT">
                Present
              </option>

              <option value="ABSENT">
                Absent
              </option>

            </select>

          </div>

          <button
            type="submit"
            className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Mark Attendance
          </button>

        </form>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="p-4">
                  ID
                </th>

                <th className="p-4">
                  Student ID
                </th>

                <th className="p-4">
                  Date
                </th>

                <th className="p-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {attendance.map(
                (item) => (

                  <tr
                    key={item.id}
                    className="border-t"
                  >

                    <td className="p-4">
                      {item.id}
                    </td>

                    <td className="p-4">
                      {item.student_id}
                    </td>

                    <td className="p-4">
                      {item.attendance_date}
                    </td>

                    <td className="p-4">

                      <span
                        className={
                          item.status ===
                          "PRESENT"
                            ? "text-green-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }
                      >
                        {item.status}
                      </span>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );

}

export default Attendance;