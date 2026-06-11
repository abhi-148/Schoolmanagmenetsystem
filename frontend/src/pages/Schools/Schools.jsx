import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import AddSchool from "./AddSchool";

import {
  getSchools,
  createSchool,
  updateSchool,
  deleteSchool
} from "../../services/schoolService";

function Schools() {

  const [schools, setSchools] =
    useState([]);

  const [editingSchool,
    setEditingSchool] =
    useState(null);

  useEffect(() => {

    fetchSchools();

  }, []);

  const fetchSchools =
    async () => {

      try {

        const response =
          await getSchools();

        setSchools(
          response.data || []
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleAddSchool =
    async (data) => {

      try {

        if (editingSchool) {

          await updateSchool(
            editingSchool.id,
            data
          );

          alert(
            "School Updated Successfully"
          );

          setEditingSchool(
            null
          );

        } else {

          await createSchool(
            data
          );

          alert(
            "School Added Successfully"
          );

        }

        fetchSchools();

      } catch (error) {

        console.log(error);

      }

    };

  const handleEdit =
    (school) => {

      setEditingSchool(
        school
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Are you sure?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteSchool(id);

        alert(
          "School Deleted Successfully"
        );

        fetchSchools();

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Delete Failed"
        );

      }

    };

  return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          School Management
        </h1>

        <AddSchool
          onAdd={handleAddSchool}
          editingSchool={
            editingSchool
          }
          cancelEdit={() =>
            setEditingSchool(null)
          }
        />

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="p-4 text-left">
                  ID
                </th>

                <th className="p-4 text-left">
                  School Name
                </th>

                <th className="p-4 text-left">
                  Code
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Phone
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {schools.map(
                (school) => (

                  <tr
                    key={school.id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="p-4">
                      {school.id}
                    </td>

                    <td className="p-4">
                      {school.school_name}
                    </td>

                    <td className="p-4">
                      {school.school_code}
                    </td>

                    <td className="p-4">
                      {school.email}
                    </td>

                    <td className="p-4">
                      {school.phone}
                    </td>

                    <td className="p-4">

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            handleEdit(
                              school
                            )
                          }
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              school.id
                            )
                          }
                          className="bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>

                      </div>

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

export default Schools;