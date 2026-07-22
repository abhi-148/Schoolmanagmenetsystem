import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import AddAdmissionFollowUp from "./AddAdmissionFollowUp";

import {

  getFollowUps,

  createFollowUp,

  updateFollowUp,

  deleteFollowUp,

  searchFollowUps

} from "../../services/admissionFollowUpService";

function AdmissionFollowUp() {

  const [

    followUps,

    setFollowUps

  ] = useState([]);

  const [

    editingFollowUp,

    setEditingFollowUp

  ] = useState(null);

  const [

    search,

    setSearch

  ] = useState("");

  useEffect(() => {

    fetchFollowUps();

  }, []);

  const fetchFollowUps = async () => {

    try {

      const response =
        await getFollowUps();

      setFollowUps(
        response.data || []
      );

    } catch (error) {

      console.log(error);

    }

  };

  const handleSearch = async (keyword) => {

    setSearch(keyword);

    try {

      if (!keyword) {

        fetchFollowUps();

        return;

      }

      const response =
        await searchFollowUps(
          keyword
        );

      setFollowUps(
        response.data || []
      );

    } catch (error) {

      console.log(error);

    }

  };

  const handleAddFollowUp = async (data) => {

    try {

      if (editingFollowUp) {

        await updateFollowUp(

          editingFollowUp.id,

          data

        );

        alert(
          "Follow Up Updated Successfully"
        );

        setEditingFollowUp(null);

      } else {

        await createFollowUp(data);

        alert(
          "Follow Up Added Successfully"
        );

      }

      fetchFollowUps();

    } catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        "Something went wrong"

      );

    }

  };

  const handleEdit = (item) => {

    setEditingFollowUp(item);

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(

      "Are you sure you want to delete this Follow Up?"

    );

    if (!confirmDelete)
      return;

    try {

      await deleteFollowUp(id);

      alert(
        "Follow Up Deleted Successfully"
      );

      fetchFollowUps();

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

          <h1 className="text-3xl font-bold">

            Admission Follow Up Management

          </h1>

          <input

            type="text"

            placeholder="Search..."

            value={search}

            onChange={(e)=>

              handleSearch(
                e.target.value
              )

            }

            className="border rounded-lg p-3 w-72"

          />

        </div>

        <AddAdmissionFollowUp

          onAdd={handleAddFollowUp}

          editingFollowUp={editingFollowUp}

          cancelEdit={()=>

            setEditingFollowUp(null)

          }

        />

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="p-4 text-left">

                  ID

                </th>

                <th className="p-4 text-left">

                  Inquiry ID

                </th>

                <th className="p-4 text-left">

                  Follow Up Date

                </th>

                <th className="p-4 text-left">

                  Next Follow Up

                </th>

                <th className="p-4 text-left">

                  Response

                </th>

                <th className="p-4 text-left">

                  Actions

                </th>

              </tr>

            </thead>

            <tbody>
                              {followUps.length > 0 ? (

                followUps.map((item) => (

                  <tr
                    key={item.id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="p-4">
                      {item.id}
                    </td>

                    <td className="p-4">
                      {item.inquiry_id}
                    </td>

                    <td className="p-4">
                      {item.follow_up_date}
                    </td>

                    <td className="p-4">
                      {item.next_follow_up_date}
                    </td>

                    <td className="p-4">

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                        {item.response_status}

                      </span>

                    </td>

                    <td className="p-4">

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            handleEdit(item)
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center p-6 text-gray-500"
                  >

                    No Follow Ups Found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );

}

export default AdmissionFollowUp;
            