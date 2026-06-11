import {
  useEffect,
  useState
} from "react";

import AdminLayout
from "../../layouts/AdminLayout";

import AddDepartment
from "./AddDepartment";

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
}
from "../../services/staffDepartmentService";

function StaffDepartment() {

  const [departments,
    setDepartments] =
    useState([]);

  const [editingDepartment,
    setEditingDepartment] =
    useState(null);

  useEffect(() => {

    fetchDepartments();

  }, []);

  const fetchDepartments =
    async () => {

      try {

        const response =
          await getDepartments();

        setDepartments(
          response.data || []
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleAdd =
    async (data) => {

      try {

        if (
          editingDepartment
        ) {

          await updateDepartment(
            editingDepartment.id,
            data
          );

          alert(
            "Department Updated Successfully"
          );

          setEditingDepartment(
            null
          );

        } else {

          await createDepartment(
            data
          );

          alert(
            "Department Added Successfully"
          );

        }

        fetchDepartments();

      } catch (error) {

        console.log(error);

      }

    };

  const handleDelete =
    async (id) => {

      if (
        !window.confirm(
          "Delete Department?"
        )
      )
        return;

      try {

        await deleteDepartment(
          id
        );

        alert(
          "Department Deleted Successfully"
        );

        fetchDepartments();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Department Management
        </h1>

        <AddDepartment
          onAdd={handleAdd}
          editingDepartment={
            editingDepartment
          }
          cancelEdit={() =>
            setEditingDepartment(
              null
            )
          }
        />

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-4">
                  ID
                </th>

                <th className="p-4">
                  Name
                </th>

                <th className="p-4">
                  Description
                </th>

                <th className="p-4">
                  Logo
                </th>

                <th className="p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {departments.map(
                (item) => (

                  <tr
                    key={item.id}
                    className="border-t"
                  >

                    <td className="p-4">
                      {item.id}
                    </td>

                    <td className="p-4">
                      {item.name}
                    </td>

                    <td className="p-4">
                      {item.description}
                    </td>

                    <td className="p-4">
                      {item.logo}
                    </td>

                    <td className="p-4">

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            setEditingDepartment(
                              item
                            )
                          }
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              item.id
                            )
                          }
                          className="bg-red-600 text-white px-3 py-1 rounded"
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

export default StaffDepartment;