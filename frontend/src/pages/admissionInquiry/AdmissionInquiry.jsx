import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import AddAdmissionInquiry from "./AddAdmissionInquiry";

import {
  getAdmissionInquiries,
  createAdmissionInquiry,
  updateAdmissionInquiry,
  deleteAdmissionInquiry,
  searchAdmissionInquiry
} from "../../services/admissionInquiryService";

function AdmissionInquiry() {

  const [admissionInquiries, setAdmissionInquiries] =
    useState([]);

  const [editingAdmissionInquiry,
    setEditingAdmissionInquiry] =
    useState(null);

  const [search,
    setSearch] =
    useState("");

  useEffect(() => {

    fetchAdmissionInquiries();

  }, []);

  const fetchAdmissionInquiries =
    async () => {

      try {

        const response =
          await getAdmissionInquiries();

        setAdmissionInquiries(
          response.data || []
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleSearch =
    async (keyword) => {

      setSearch(keyword);

      try {

        if (!keyword) {

          fetchAdmissionInquiries();

          return;

        }

        const response =
          await searchAdmissionInquiry(
            keyword
          );

        setAdmissionInquiries(
          response.data || []
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleAddAdmissionInquiry =
    async (data) => {

      try {

        if (editingAdmissionInquiry) {

          await updateAdmissionInquiry(

            editingAdmissionInquiry.id,

            data

          );

          alert(
            "Admission Inquiry Updated Successfully"
          );

          setEditingAdmissionInquiry(
            null
          );

        } else {

          await createAdmissionInquiry(
            data
          );

          alert(
            "Admission Inquiry Added Successfully"
          );

        }

        fetchAdmissionInquiries();

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Something went wrong"

        );

      }

    };

  const handleEdit =
    (item) => {

      setEditingAdmissionInquiry(
        item
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
          "Are you sure you want to delete this Admission Inquiry?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteAdmissionInquiry(
          id
        );

        alert(
          "Admission Inquiry Deleted Successfully"
        );

        fetchAdmissionInquiries();

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

            Admission Inquiry Management

          </h1>

          <input

            type="text"

            placeholder="Search Student / Mobile / Email"

            className="border rounded-lg p-3 w-80"

            value={search}

            onChange={(e)=>

              handleSearch(
                e.target.value
              )

            }

          />

        </div>

        <AddAdmissionInquiry

          onAdd={
            handleAddAdmissionInquiry
          }

          editingAdmissionInquiry={
            editingAdmissionInquiry
          }

          cancelEdit={()=>

            setEditingAdmissionInquiry(
              null
            )

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
                  Student
                </th>

                <th className="p-4 text-left">
                  Mobile
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Inquiry Status
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

                              {admissionInquiries.length > 0 ? (

                admissionInquiries.map((item) => (

                  <tr
                    key={item.id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="p-4">
                      {item.id}
                    </td>

                    <td className="p-4 font-medium">
                      {item.student_name}
                    </td>

                    <td className="p-4">
                      {item.mobile_no}
                    </td>

                    <td className="p-4">
                      {item.email}
                    </td>

                    <td className="p-4">

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                        {item.inquiry_status}

                      </span>

                    </td>

                    <td className="p-4">

                      {item.status === "ACTIVE" ? (

                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                          ACTIVE

                        </span>

                      ) : (

                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">

                          INACTIVE

                        </span>

                      )}

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
                    colSpan="7"
                    className="text-center p-6 text-gray-500"
                  >

                    No Admission Inquiries Found

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

export default AdmissionInquiry;
            