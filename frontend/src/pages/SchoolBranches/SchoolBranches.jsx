import {
  useState,
  useEffect
} from "react";

import AdminLayout
from "../../layouts/AdminLayout";

import AddSchoolBranch
from "./AddSchoolBranch";

import {
  getSchoolBranches,
  createSchoolBranch,
  updateSchoolBranch,
  deleteSchoolBranch
}
from "../../Services/schoolBranchService";

function SchoolBranches() {

  const [branches, setBranches] =
    useState([]);

  const [editData,
    setEditData] =
    useState(null);

  const [isEditing,
    setIsEditing] =
    useState(false);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const response =
        await getSchoolBranches();

      setBranches(
        response.data || []
      );

    } catch (error) {

      console.log(error);

    }

  };

  const handleAdd =
  async (data) => {

    try {

      await createSchoolBranch(
        data
      );

      alert(
        "Branch Added Successfully"
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

      await updateSchoolBranch(
        id,
        data
      );

      alert(
        "Branch Updated Successfully"
      );

      setEditData(null);

      setIsEditing(false);

      fetchData();

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete =
  async (id) => {

    if (
      !window.confirm(
        "Delete Branch?"
      )
    )
      return;

    try {

      await deleteSchoolBranch(id);

      alert(
        "Branch Deleted Successfully"
      );

      fetchData();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          School Branches
        </h1>

        <AddSchoolBranch
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
                <th className="p-4">Branch</th>
                <th className="p-4">Code</th>
                <th className="p-4">Principal</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Actions</th>

              </tr>

            </thead>

            <tbody>

              {branches.map(
                (item) => (

                  <tr
                    key={item.id}
                    className="border-t"
                  >

                    <td className="p-4">
                      {item.id}
                    </td>

                    <td className="p-4">
                      {item.branch_name}
                    </td>

                    <td className="p-4">
                      {item.branch_code}
                    </td>

                    <td className="p-4">
                      {item.principal_name}
                    </td>

                    <td className="p-4">
                      {item.contact_number}
                    </td>

                    <td className="p-4">

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            handleEdit(item)
                          }
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              item.id
                            )
                          }
                          className="bg-red-500 text-white px-4 py-2 rounded"
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

export default SchoolBranches;