import {
  useEffect,
  useState
} from "react";

import AdminLayout from "../../layouts/AdminLayout";
import AddStudentMark from "./AddStudentMark";

import {
  getStudentMarks,
  createStudentMark,
  updateStudentMark,
  deleteStudentMark
} from "../../Services/studentMarkService";

function StudentMarks() {

  const [marks, setMarks] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    try {

      const response =
        await getStudentMarks();

      setMarks(response.data || []);

    } catch (error) {

      console.log(error);

    }
  };

  const handleAdd = async (data) => {
    try {

      await createStudentMark(data);

      alert("Marks Added Successfully");

      fetchMarks();

    } catch (error) {

      console.log(error);

    }
  };

  const handleEdit = (item) => {

    setEditData(item);
    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };

  const handleUpdate = async (id, data) => {

    try {

      await updateStudentMark(id, data);

      alert("Marks Updated Successfully");

      setEditData(null);
      setIsEditing(false);

      fetchMarks();

    } catch (error) {

      console.log(error);
      alert("Update Failed");

    }

  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (!confirmDelete) return;

    try {

      await deleteStudentMark(id);

      alert("Marks Deleted Successfully");

      fetchMarks();

    } catch (error) {

      console.log(error);
      alert("Delete Failed");

    }

  };

  return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Student Marks
        </h1>

        <AddStudentMark
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          editData={editData}
          isEditing={isEditing}
        />

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Exam</th>
                <th className="p-4">Student</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Marks</th>
                <th className="p-4">Actions</th>
              </tr>

            </thead>

            <tbody>

              {marks.map((item) => (

                <tr
                  key={item.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {item.id}
                  </td>

                  <td className="p-4">
                    {item.exam_name}
                  </td>

                  <td className="p-4">
                    {item.full_name}
                  </td>

                  <td className="p-4">
                    {item.subject_name}
                  </td>

                  <td className="p-4">
                    {item.obtained_marks}
                    /
                    {item.max_marks}
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

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );

}

export default StudentMarks;