import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import AddStudent from "./AddStudent";

import EditStudentModal
from "./EditStudentModal";

import {
  getStudents,
  createStudent,
  updateStudentStatus,
  updateStudent
} from "../../services/studentService";
function Students() {

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [adding, setAdding] =
    useState(false);

  const [search, setSearch] =
    useState("");
    const [selectedStudent,
  setSelectedStudent] =
  useState(null);

const [showEditModal,
  setShowEditModal] =
  useState(false);

  useEffect(() => {

    fetchStudents();

  }, []);

  const fetchStudents = async () => {

    try {

      setLoading(true);

      const response =
        await getStudents();

      setStudents(
        response.data || []
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const handleAddStudent =
    async (studentData) => {

      try {

        setAdding(true);

        console.log(
          "Student Data Sent:",
          studentData
        );

        const response =
          await createStudent(
            studentData
          );

        console.log(
          "Create Response:",
          response
        );

        alert(
          "Student Added Successfully"
        );

        await fetchStudents();

      } catch (error) {

        console.log(
          "Full Error:",
          error
        );

        console.log(
          "Response Data:",
          error.response?.data
        );

        alert(
          JSON.stringify(
            error.response?.data ||
            error.message
          )
        );

      } finally {

        setAdding(false);

      }

    };

  const handleStatusChange =
    async (
      id,
      currentStatus
    ) => {

      try {

        const newStatus =
          currentStatus ===
          "ACTIVE"
            ? "INACTIVE"
            : "ACTIVE";

        await updateStudentStatus(
          id,
          newStatus
        );

        alert(
          "Status Updated"
        );

        await fetchStudents();

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Update Status"
        );

      }

    };

  const filteredStudents =
    students.filter(
      (student) =>
        student.full_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );
const handleEditClick =
  (student) => {

    setSelectedStudent(
      student
    );

    setShowEditModal(
      true
    );

};

const handleUpdateStudent =
  async (
    id,
    updatedData
  ) => {

    try {

      await updateStudent(
        id,
        updatedData
      );

      alert(
        "Student Updated Successfully"
      );

      setShowEditModal(
        false
      );

      await fetchStudents();

    } catch (error) {

      console.log(error);

      alert(
        "Failed To Update Student"
      );

    }

};
  return (

    <AdminLayout>

      <div className="min-h-screen bg-slate-100 p-8">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Students
            </h1>

            <p className="text-gray-500 mt-1">
              Manage Students Information
            </p>

          </div>

          <div className="bg-white px-6 py-3 rounded-xl shadow-sm">

            <h3 className="text-sm text-gray-500">
              Total Students
            </h3>

            <p className="text-2xl font-bold text-blue-600">
              {students.length}
            </p>

          </div>

        </div>

        {/* Search */}

        <div className="mb-6">

          <input
            type="text"
            placeholder="Search Student..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full md:w-96 border p-3 rounded-lg bg-white"
          />

        </div>

        {/* Add Student */}

        <div className="mb-8">

          <AddStudent
            onAdd={
              handleAddStudent
            }
          />

          {adding && (

            <p className="mt-3 text-blue-600 font-medium">
              Saving Student...
            </p>

          )}

        </div>

        {/* Table */}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          <div className="p-5 border-b">

            <h2 className="text-xl font-semibold">
              Students List
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50">

                <tr>

                  <th className="p-4 text-left">
                    ID
                  </th>

                  <th className="p-4 text-left">
                    Name
                  </th>

                  <th className="p-4 text-left">
                    Roll No
                  </th>

                  <th className="p-4 text-left">
                    Class
                  </th>

                  <th className="p-4 text-left">
                    Section
                  </th>

                  <th className="p-4 text-left">
                    Phone
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="p-6 text-center"
                    >
                      Loading...
                    </td>

                  </tr>

                ) : filteredStudents.length === 0 ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="p-6 text-center"
                    >
                      No Students Found
                    </td>

                  </tr>

                ) : (

                  filteredStudents.map(
                    (student) => (

                      <tr
                        key={student.id}
                        className="border-t hover:bg-slate-50"
                      >

                        <td className="p-4">
                          {student.id}
                        </td>

                        <td className="p-4 font-medium">
                          {student.full_name}
                        </td>

                        <td className="p-4">
                          {student.roll_number}
                        </td>

                        <td className="p-4">
                          {student.class_name}
                        </td>

                        <td className="p-4">
                          {student.section}
                        </td>

                        <td className="p-4">
                          {student.phone}
                        </td>

                        <td className="p-4">

                          <span
                            className={
                              student.status ===
                              "ACTIVE"
                                ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                                : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                            }
                          >
                            {
                              student.status
                            }
                          </span>

                        </td>

                        <td className="p-4">

                          <div className="flex gap-2">

  <button
    onClick={() =>
      handleEditClick(
        student
      )
    }
    className="bg-blue-600 text-white px-3 py-2 rounded-lg"
  >
    Edit
  </button>

  <button
    onClick={() =>
      handleStatusChange(
        student.id,
        student.status
      )
    }
    className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
  >
    Status
  </button>

</div><button
                            onClick={() =>
                              handleStatusChange(
                                student.id,
                                student.status
                              )
                            }
                            className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
                          >
                            Change Status
                          </button>

                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
      {

        
  showEditModal && (

    <EditStudentModal
      student={selectedStudent}
      onClose={() =>
        setShowEditModal(
          false
        )
      }
      onUpdate={
        handleUpdateStudent
      }
    />

  )
}

    </AdminLayout>

  );

}

export default Students;