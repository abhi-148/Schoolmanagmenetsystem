import {
  useEffect,
  useState
} from "react";

import AdminLayout from "../../layouts/AdminLayout";

import AddClass from "./AddClass";

import {
  getClasses,
  createClass,
  updateClass,
  deleteClass
} from "../../Services/classService";

function Classes() {

  const [classes, setClasses] =
    useState([]);

  const [editData, setEditData] =
    useState(null);

  const [isEditing, setIsEditing] =
    useState(false);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const response =
        await getClasses();

      setClasses(
        response.data || []
      );

    } catch (error) {

      console.log(error);

    }

  };

  const handleAdd = async (
    data
  ) => {

    try {

      await createClass(data);

      alert(
        "Class Added Successfully"
      );

      fetchData();

    } catch (error) {

      console.log(error);

    }

  };

  const handleEdit = (
    item
  ) => {

    setEditData(item);

    setIsEditing(true);

  };

  const handleUpdate =
    async (id, data) => {

      try {

        await updateClass(
          id,
          data
        );

        alert(
          "Class Updated Successfully"
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
          "Delete Class?"
        )
      ) return;

      try {

        await deleteClass(id);

        alert(
          "Deleted Successfully"
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
          Class Master
        </h1>

        <AddClass
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          editData={editData}
          isEditing={isEditing}
        />

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="p-4">
                  ID
                </th>

                <th className="p-4">
                  Class Name
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

              {classes.map(
                (item) => (

                  <tr
                    key={item.id}
                    className="border-t"
                  >

                    <td className="p-4">
                      {item.id}
                    </td>

                    <td className="p-4">
                      {item.class_name}
                    </td>

                    <td className="p-4">
                      {item.status}
                    </td>

                    <td className="p-4 flex gap-2">

                      <button
                        onClick={() =>
                          handleEdit(item)
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
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

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

export default Classes;