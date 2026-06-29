import { useEffect, useState } from "react";

import AdminLayout
from "../../layouts/AdminLayout";

import AddSchoolMediumModal
from "../../components/mediums/AddSchoolMediumModal";

import {
  getSchoolMediums,
  createSchoolMedium,
  approveSchoolMedium,
  rejectSchoolMedium,
  deleteSchoolMedium,
  updateSchoolMedium
} from "../../services/schoolMediumApi";

function SchoolMediumPage() {

  const [mediums,
    setMediums] =
    useState([]);

  const [editingMedium,
    setEditingMedium] =
    useState(null);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData =
    async () => {

      try {

        const response =
          await getSchoolMediums();

        setMediums(
          response.data || []
        );

      } catch (error) {

        console.log(error);

      }

    };

 const handleAdd =
async (data) => {

  try {

    if (editingMedium) {

      await updateSchoolMedium(
        editingMedium.id,
        data
      );

      alert(
        "School Medium Updated Successfully"
      );

      setEditingMedium(
        null
      );

    } else {

      await createSchoolMedium(
        data
      );

      alert(
        "School Medium Added Successfully"
      );

    }

    fetchData();

  } catch (error) {

    console.log(error);

  }

};

  const handleApprove =
    async (id) => {

      await approveSchoolMedium(
        id
      );

      fetchData();

    };

  const handleReject =
    async (id) => {

      await rejectSchoolMedium(
        id
      );

      fetchData();

    };

    const role =
localStorage.getItem(
  "role"
);

const handleEdit =
(item) => {

  setEditingMedium(item);

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

    await deleteSchoolMedium(
      id
    );

    alert(
      "School Medium Deleted Successfully"
    );

    fetchData();

  } catch (error) {

    console.log(error);

  }

};

const [search,
setSearch] =
useState("");

  return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-2">
          School Mediums
        </h1>

        <p className="text-gray-500 mb-6">
          Manage School Mediums
        </p>

        {
role === "SUPER_ADMIN" && (

<AddSchoolMediumModal
  onAdd={handleAdd}
  editingMedium={editingMedium}
  cancelEdit={() =>
    setEditingMedium(null)
  }
/>

)
}

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

      <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-800 text-white">

              <tr>

                <th className="p-4">
                  ID
                </th>

                <th className="p-4">
                  School
                </th>

                <th className="p-4">
                  Medium
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

             {mediums
.filter(
(item) =>
(
item.medium_name ||
item.custom_medium_name
)
?.toLowerCase()
.includes(
search.toLowerCase()
)
)
.map(
                (item) => (

                  <tr
                    key={item.id}
                    className="border-t"
                  >

                    <td className="p-4">
                      {item.id}
                    </td>

                    <td className="p-4">
                   {item.school_name}
                    </td>

                    <td className="p-4">
                      {
                        item.medium_name ||
                        item.custom_medium_name
                      }
                    </td>

                    <td className="p-4">

                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">

                        {
                          item.approval_status
                        }

                      </span>

                    </td>

                   <td className="p-4">

{
role === "SUPER_ADMIN" ? (

<div className="flex gap-2">

    <button
  onClick={() =>
    handleEdit(item)
  }
  className="bg-blue-600 text-white px-3 py-1 rounded"
>
  Edit
</button>

  <button
    onClick={() =>
      handleApprove(
        item.id
      )
    }
    className="bg-green-600 text-white px-3 py-1 rounded"
  >
    Approve
  </button>

  <button
    onClick={() =>
      handleReject(
        item.id
      )
    }
    className="bg-yellow-600 text-white px-3 py-1 rounded"
  >
    Reject
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

) : (

<span className="text-gray-500">
  View Only
</span>

)
}

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

export default SchoolMediumPage;