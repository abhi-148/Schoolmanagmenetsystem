import { useState } from "react";

import {
  useNavigate
} from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import {
  createLostAndFound
} from "../../services/lostAndFoundService";

function AddLostAndFound() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      school_id: 1,

      branch_id: 1,

      item_name: "",

      category: "",

      description: "",

      location_found: "",

      found_datetime: "",

      found_by_staff_id: 1,

      found_by_student_id: "",

      status: "UNCLAIMED",

      claimed_datetime: "",

      claimed_by_staff_id: "",

      claimed_by_student_id: "",

      record_status: "ACTIVE",

      created_by: 1,

      updated_by: 1

    });

    const [image, setImage] =
  useState(null);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  const handleImageChange =
(
  e
) => {

  setImage(
    e.target.files[0]
  );

};

 const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (image) {
      data.append("image", image);
    }

    await createLostAndFound(data);

    alert("Lost And Found Item Created Successfully");

    navigate("/lost-and-found");

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      error.message ||
      "Something Went Wrong"
    );

  }

};
      return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Add Lost And Found Item
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-sm"
        >

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              name="item_name"
              placeholder="Item Name"
              className="border p-3 rounded-lg"
              value={formData.item_name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              className="border p-3 rounded-lg"
              value={formData.category}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="location_found"
              placeholder="Location Found"
              className="border p-3 rounded-lg"
              value={formData.location_found}
              onChange={handleChange}
              required
            />

            <input
              type="datetime-local"
              name="found_datetime"
              className="border p-3 rounded-lg"
              value={formData.found_datetime}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="branch_id"
              placeholder="Branch ID"
              className="border p-3 rounded-lg"
              value={formData.branch_id}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="found_by_staff_id"
              placeholder="Found By Staff ID"
              className="border p-3 rounded-lg"
              value={formData.found_by_staff_id}
              onChange={handleChange}
            />

            <input
              type="number"
              name="found_by_student_id"
              placeholder="Found By Student ID"
              className="border p-3 rounded-lg"
              value={formData.found_by_student_id}
              onChange={handleChange}
            />

            <select
              name="status"
              className="border p-3 rounded-lg"
              value={formData.status}
              onChange={handleChange}
            >

              <option value="UNCLAIMED">
                UNCLAIMED
              </option>

              <option value="CLAIMED">
                CLAIMED
              </option>

              <option value="DISCARDED">
                DISCARDED
              </option>

            </select>

            <select
              name="record_status"
              className="border p-3 rounded-lg"
              value={formData.record_status}
              onChange={handleChange}
            >

              <option value="ACTIVE">
                ACTIVE
              </option>

              <option value="INACTIVE">
                INACTIVE
              </option>

            </select>

            <input
  type="file"
  name="image"
  accept=".jpg,.jpeg,.png"
  className="border p-3 rounded-lg md:col-span-2"
  onChange={
    handleImageChange
  }
/>

            <textarea
              name="description"
              rows="4"
              placeholder="Description"
              className="border p-3 rounded-lg md:col-span-2"
              value={formData.description}
              onChange={handleChange}
            />

          </div>

          <div className="flex gap-4 mt-6">

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Save Item
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/lost-and-found")
              }
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </AdminLayout>

  );

}

export default AddLostAndFound;