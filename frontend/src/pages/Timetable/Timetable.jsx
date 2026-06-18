import {
  useEffect,
  useState
} from "react";

import AdminLayout
from "../../layouts/AdminLayout";

import AddTimetable
from "./AddTimetable";

import {
  getTimetables,
  createTimetable,
  updateTimetable,
  deleteTimetable
}
from "../../Services/timetableService";

function Timetable() {

  const [
    timetables,
    setTimetables
  ] = useState([]);

  const [
    editData,
    setEditData
  ] = useState(null);

  const [
    isEditing,
    setIsEditing
  ] = useState(false);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData =
  async () => {

    try {

      const response =
        await getTimetables();

      setTimetables(
        response.data || []
      );

    } catch (error) {

      console.log(error);

    }

  };

  const handleAdd =
  async (data) => {

    try {

      await createTimetable(
        data
      );

      alert(
        "Timetable Added Successfully"
      );

      fetchData();

    } catch (error) {

      console.log(error);

    }

  };

  const handleEdit =
  (item) => {

    setEditData(item);

    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };

  const handleUpdate =
  async (id, data) => {

    try {

      await updateTimetable(
        id,
        data
      );

      alert(
        "Timetable Updated Successfully"
      );

      setEditData(null);

      setIsEditing(false);

      fetchData();

    } catch (error) {

      console.log(error);

      alert(
        "Update Failed"
      );

    }

  };

  const handleDelete =
  async (id) => {

    if (
      !window.confirm(
        "Delete Timetable?"
      )
    ) return;

    try {

      await deleteTimetable(
        id
      );

      alert(
        "Timetable Deleted Successfully"
      );

      fetchData();

    } catch (error) {

      console.log(error);

      alert(
        "Delete Failed"
      );

    }

  };

  return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Timetable
        </h1>

        <AddTimetable
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          editData={editData}
          isEditing={isEditing}
        />

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="p-4">
                  Class
                </th>

                <th className="p-4">
                  Section
                </th>

                <th className="p-4">
                  Subject
                </th>

                <th className="p-4">
                  Teacher
                </th>

                <th className="p-4">
                  Day
                </th>

                <th className="p-4">
                  Time
                </th>

                <th className="p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {timetables.map(
                (item) => (

                  <tr
                    key={item.id}
                    className="border-t"
                  >

                    <td className="p-4">
                      {item.class_name}
                    </td>

                    <td className="p-4">
                      {item.section_name}
                    </td>

                    <td className="p-4">
                      {item.subject_name}
                    </td>

                    <td className="p-4">
                      {item.teacher_name}
                    </td>

                    <td className="p-4">
                      {item.day_name}
                    </td>

                    <td className="p-4">
                      {item.start_time}
                      -
                      {item.end_time}
                    </td>

                    <td className="p-4 flex gap-2">

                      <button
                        onClick={() =>
                          handleEdit(item)
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item.id)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

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

export default Timetable;