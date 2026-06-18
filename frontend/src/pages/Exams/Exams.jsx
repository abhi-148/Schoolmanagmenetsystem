import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import AddExam from "./AddExam";

import {
  getExams,
  createExam,
  updateExam,
  deleteExam
} from "../../Services/examService";

function Exams() {

  const [exams, setExams] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await getExams();
      setExams(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async (data) => {
    try {
      await createExam(data);

      alert("Exam Added Successfully");

      fetchExams();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (exam) => {
    setEditData(exam);
    setIsEditing(true);
  };

  const handleUpdate = async (id, data) => {
    try {

      await updateExam(id, data);

      alert("Exam Updated Successfully");

      setEditData(null);
      setIsEditing(false);

      fetchExams();

    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this exam?"
      );

    if (!confirmDelete) return;

    try {

      await deleteExam(id);

      alert("Exam Deleted Successfully");

      fetchExams();

    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Exams
        </h1>

        <AddExam
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
                <th className="p-4">Exam Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Start Date</th>
                <th className="p-4">End Date</th>
                <th className="p-4">Actions</th>
              </tr>

            </thead>

            <tbody>

              {exams.map((exam) => (

                <tr
                  key={exam.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {exam.id}
                  </td>

                  <td className="p-4">
                    {exam.exam_name}
                  </td>

                  <td className="p-4">
                    {exam.exam_type}
                  </td>

                  <td className="p-4">
                    {exam.start_date?.split("T")[0]}
                  </td>

                  <td className="p-4">
                    {exam.end_date?.split("T")[0]}
                  </td>

                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() =>
                        handleEdit(exam)
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(exam.id)
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

export default Exams;