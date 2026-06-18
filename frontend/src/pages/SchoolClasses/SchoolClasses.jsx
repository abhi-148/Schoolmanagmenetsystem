import {
  useState,
  useEffect
} from "react";

import AdminLayout
from "../../layouts/AdminLayout";

import AddSchoolClass
from "./AddSchoolClass";

import {
  getSchoolClasses,
  createSchoolClass,
  updateSchoolClass,
  deleteSchoolClass
}
from "../../Services/schoolClassService";
import {
  getSchools
} from "../../Services/schoolService";

import {
  getSchoolBranches
} from "../../Services/schoolBranchService";

import {
  getClasses
} from "../../Services/classService";

function SchoolClasses() {

  const [
    schoolClasses,
    setSchoolClasses
  ] = useState([]);

  const [
    editData,
    setEditData
  ] = useState(null);

  const [
    isEditing,
    setIsEditing
  ] = useState(false);

  const [schools, setSchools] =
useState([]);

const [branches, setBranches] =
useState([]);

const [classes, setClasses] =
useState([]);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData =
  async () => {

    try {

      const response =
        await getSchoolClasses();

      setSchoolClasses(
        response.data || []
      );

      const schoolsRes =
  await getSchools();

setSchools(
  schoolsRes.data || []
);

const branchesRes =
  await getSchoolBranches();

setBranches(
  branchesRes.data || []
);

const classesRes =
  await getClasses();

setClasses(
  classesRes.data || []
);

    } catch (error) {

      console.log(error);

    }

  };

  const handleAdd =
  async (data) => {

    try {

      await createSchoolClass(
        data
      );

      alert(
        "School Class Added Successfully"
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

      await updateSchoolClass(
        id,
        data
      );

      alert(
        "Updated Successfully"
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
        "Delete School Class?"
      )
    )
      return;

    try {

      await deleteSchoolClass(id);

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
          School Classes
        </h1>

        <AddSchoolClass
  onAdd={handleAdd}
  onUpdate={handleUpdate}
  editData={editData}
  isEditing={isEditing}
  schools={schools}
  branches={branches}
  classes={classes}
/>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

               <th className="p-4">ID</th>
<th className="p-4">School</th>
<th className="p-4">Class</th>
<th className="p-4">Branch</th>
                <th className="p-4">Location</th>
                <th className="p-4">Capacity</th>
                <th className="p-4">Actions</th>

              </tr>

            </thead>

            <tbody>

              {schoolClasses.map(
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
                      {item.class_name}
                    </td>

                    <td className="p-4">
                      {item.branch_name}
                    </td>

                    <td className="p-4">
                      {item.location}
                    </td>

                    <td className="p-4">
                      {
                        item.student_capacity
                      }
                    </td>

                    <td className="p-4">

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            handleEdit(
                              item
                            )
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

export default SchoolClasses;