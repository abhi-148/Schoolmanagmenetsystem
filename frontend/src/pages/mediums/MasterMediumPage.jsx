import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import AddMasterMediumModal from "../../components/mediums/AddMasterMediumModal";

import {
  getMasterMediums,
  createMasterMedium,
  updateMasterMedium,
  deleteMasterMedium
} from "../../services/masterMediumApi";

function MasterMediumPage() {

    const role =
  localStorage.getItem("role");

  const [mediums, setMediums] =
  useState([]);

const [search, setSearch] =
  useState("");

  const [statusFilter,
setStatusFilter] =
useState("all");

  const [editingMedium,
  setEditingMedium] =
  useState(null);

const activeMediums =
  mediums.filter(
    (item) =>
      item.status === "active"
  ).length;

const pendingMediums =
  mediums.filter(
    (item) =>
      item.approval_status === "pending"
  ).length;
  

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    fetchMediums();

  }, []);

  const fetchMediums =
    async () => {

      try {

        setLoading(true);

        const response =
          await getMasterMediums();

        setMediums(
          response.data || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  const handleAddMedium =
  async (data) => {

    try {

      if (editingMedium) {

        await updateMasterMedium(
          editingMedium.id,
          data
        );

        alert(
          "Medium Updated Successfully"
        );

        setEditingMedium(
          null
        );

      } else {

        await createMasterMedium(
          data
        );

        alert(
          "Medium Added Successfully"
        );

      }

      fetchMediums();

    } catch (error) {

      console.log(error);

    }

  };
  const handleEdit =
  (medium) => {

    setEditingMedium(
      medium
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
        "Delete this medium?"
      );

    if (!confirmDelete)
      return;

    try {

      await deleteMasterMedium(id);

      alert(
        "Medium Deleted Successfully"
      );

      fetchMediums();

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

        <div className="flex justify-between items-center mb-6">

          <div>

            <h1 className="text-3xl font-bold">
              Master Mediums
            </h1>

            <p className="text-gray-500">
              Manage Master Mediums
            </p>

          </div>

        </div>

       {
role === "SUPER_ADMIN" && (

<AddMasterMediumModal
  onAdd={handleAddMedium}
  editingMedium={editingMedium}
  cancelEdit={() => setEditingMedium(null)}
/>

)
}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

  <div className="bg-white p-5 rounded-xl shadow">

    <h3 className="text-gray-500">
      Total Mediums
    </h3>

    <h2 className="text-3xl font-bold mt-2">
      {mediums.length}
    </h2>

  </div>

  <div className="bg-white p-5 rounded-xl shadow">

    <h3 className="text-gray-500">
      Active Mediums
    </h3>

    <h2 className="text-3xl font-bold mt-2 text-green-600">
      {activeMediums}
    </h2>

  </div>

  <div className="bg-white p-5 rounded-xl shadow">

    <h3 className="text-gray-500">
      Pending Mediums
    </h3>

    <h2 className="text-3xl font-bold mt-2 text-yellow-600">
      {pendingMediums}
    </h2>

  </div>

</div>

<div className="bg-white p-4 rounded-xl shadow mb-4">

  <input
    type="text"
    placeholder="Search Medium..."
    value={search}
    onChange={(e) =>
      setSearch(
        e.target.value
      )
    }
    className="w-full border p-3 rounded-lg"
  />

</div>
<div className="bg-white p-4 rounded-xl shadow mb-4">

  <select
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(
        e.target.value
      )
    }
    className="
      border
      p-3
      rounded-lg
      w-full
    "
  >

    <option value="all">
      All Mediums
    </option>

    <option value="active">
      Active
    </option>

    <option value="inactive">
      Inactive
    </option>

  </select>

</div>

  <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-800 text-white">

              <tr>

                <th className="p-4">
                  ID
                </th>

                <th className="p-4">
                  Medium
                </th>

                <th className="p-4">
                  Description
                </th>

                <th className="p-4">
                  Status
                </th>

              {
role === "SUPER_ADMIN" && (

<th className="p-4">
  Actions
</th>

)
}

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center p-6"
                  >
                    Loading...
                  </td>

                </tr>

              ) : (

              mediums

.filter((item) =>
  statusFilter === "all"
    ? true
    : item.status === statusFilter
)

.filter((item) =>
    item.medium_name
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      ) ||
    item.description
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )
)
.map(
                  (medium) => (

                    <tr
                      key={medium.id}
                      className="border-t"
                    >

                      <td className="p-4">
                        {medium.id}
                      </td>

                      <td className="p-4">
                        {medium.medium_name}
                      </td>

                      <td className="p-4">
                        {medium.description}
                      </td>

                      <td className="p-4">

  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

    {medium.status}

  </span>

</td>

<td className="p-4">

{
  role === "SUPER_ADMIN" && (

    <div className="flex gap-2">

      <button
        onClick={() =>
          handleEdit(
            medium
          )
        }
        className="
          bg-yellow-500
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
          handleDelete(
            medium.id
          )
        }
        className="
          bg-red-500
          text-white
          px-3
          py-1
          rounded
        "
      >
        Delete
      </button>

    </div>

  )
}

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

export default MasterMediumPage;