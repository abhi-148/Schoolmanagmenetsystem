import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import AddStaffType from "./AddStaffType";

import {
  getStaffTypes,
  createStaffType,
  updateStaffType,
  deleteStaffType
} from "../../services/staffTypeService";

function StaffType() {

  const [staffTypes, setStaffTypes] =
    useState([]);

  const [editingType,
    setEditingType] =
    useState(null);

  useEffect(() => {

    fetchStaffTypes();

  }, []);

  const fetchStaffTypes =
    async () => {

      try {

        const response =
          await getStaffTypes();

        setStaffTypes(
          response.data || []
        );

      } catch (error) {

        console.error(error);

      }

    };

  const handleAdd =
    async (data) => {

      try {

        if (editingType) {

          await updateStaffType(
            editingType.id,
            data
          );

          alert(
            "Staff Type Updated Successfully"
          );

          setEditingType(
            null
          );

        } else {

          await createStaffType(
            data
          );

          alert(
            "Staff Type Added Successfully"
          );

        }

        fetchStaffTypes();

      } catch (error) {

        console.error(error);

      }

    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this Staff Type?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteStaffType(id);

        alert(
          "Staff Type Deleted Successfully"
        );

        fetchStaffTypes();

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h1 className="text-3xl font-bold">
              Staff Types
            </h1>

            <p className="text-gray-500">
              Manage Staff Categories
            </p>

          </div>

        </div>

        <AddStaffType
          onAdd={handleAdd}
          editingType={editingType}
          cancelEdit={() =>
            setEditingType(null)
          }
        />

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          <table className="w-full">

            <thead>

              <tr className="bg-slate-50">

                <th className="p-4 text-left">
                  ID
                </th>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Description
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {staffTypes.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="p-6 text-center"
                  >
                    No Staff Types Found
                  </td>

                </tr>

              ) : (

                staffTypes.map(
                  (item) => (

                    <tr
                      key={item.id}
                      className="border-t hover:bg-slate-50"
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

                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                          {item.status}

                        </span>

                      </td>

                      <td className="p-4">

                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              setEditingType(
                                item
                              )
                            }
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                item.id
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
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );

}

export default StaffType;