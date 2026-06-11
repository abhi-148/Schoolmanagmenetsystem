import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import AddStaff from "./AddStaff";

import {
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff
} from "../../services/staffService";

function Staff() {

  const [staff, setStaff] =
    useState([]);
    const [editingStaff,
setEditingStaff] =
useState(null);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {

    try {

      setLoading(true);

      const response =
        await getStaff();

      setStaff(
        response.data || []
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const handleAddStaff =
  async (data) => {

    try {

      if (editingStaff) {

        await updateStaff(
          editingStaff.id,
          data
        );

        alert(
          "Staff Updated Successfully"
        );

        setEditingStaff(null);

      } else {

        await createStaff(data);

        alert(
          "Staff Added Successfully"
        );

      }

      fetchStaff();

    } catch (error) {

      console.log(error);

    }

  };
    const handleEdit =
(member) => {

  setEditingStaff(
    member
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
          "Delete this staff?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteStaff(id);

        alert(
          "Staff Deleted Successfully"
        );

        fetchStaff();

      } catch (error) {

        console.log(error);

      }

    };

  const filteredStaff =
    staff.filter((item) =>
      item.full_name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h1 className="text-3xl font-bold">
              Staff Management
            </h1>

            <p className="text-gray-500">
              Manage School Staff
            </p>

          </div>

          <button
            onClick={fetchStaff}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Refresh
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <div className="bg-white p-5 rounded-xl shadow">

            <h3 className="text-gray-500">
              Total Staff
            </h3>

            <h2 className="text-3xl font-bold mt-2">
              {staff.length}
            </h2>

          </div>

        </div>

        <AddStaff
  onAdd={handleAddStaff}
  editingStaff={
    editingStaff
  }
  cancelEdit={() =>
    setEditingStaff(null)
  }
/>

        <div className="bg-white p-4 rounded-xl shadow mb-4">

          <input
            type="text"
            placeholder="Search Staff..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg"
          />

        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-800 text-white">

              <tr>

                <th className="p-4">
                  ID
                </th>

                <th className="p-4">
                  Name
                </th>

                <th className="p-4">
                  Email
                </th>

                <th className="p-4">
                  Role
                </th>

                <th className="p-4">
                  Status
                </th>

                <th className="p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-6"
                  >
                    Loading...
                  </td>
                </tr>

              ) : filteredStaff.length === 0 ? (

                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-6"
                  >
                    No Staff Found
                  </td>
                </tr>

              ) : (

                filteredStaff.map(
                  (member) => (

                    <tr
                      key={member.id}
                      className="border-t hover:bg-slate-50"
                    >

                      <td className="p-4">
                        {member.id}
                      </td>

                      <td className="p-4 font-medium">
                        {member.full_name}
                      </td>

                      <td className="p-4">
                        {member.email}
                      </td>

                      <td className="p-4">
                        {member.role}
                      </td>

                      <td className="p-4">

                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                          {member.status}

                        </span>

                      </td>

                      <td className="p-4 flex gap-2">

                        <button
  onClick={() =>
    handleEdit(member)
  }
  className="bg-yellow-500 text-white px-3 py-1 rounded"
>
  Edit
</button>

                        <button
                          onClick={() =>
                            handleDelete(
                              member.id
                            )
                          }
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
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

    </AdminLayout>

  );

}

export default Staff;