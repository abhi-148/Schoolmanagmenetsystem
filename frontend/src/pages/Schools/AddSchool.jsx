import { useState, useEffect } from "react";

function AddSchool({
  onAdd,
  editingSchool,
  cancelEdit
}) {

  const [formData, setFormData] =
    useState({
      school_name: "",
      school_code: "",
      email: "",
      phone: "",
      address: ""
    });

  useEffect(() => {

    if (editingSchool) {

      setFormData({

        school_name:
          editingSchool.school_name || "",

        school_code:
          editingSchool.school_code || "",

        email:
          editingSchool.email || "",

        phone:
          editingSchool.phone || "",

        address:
          editingSchool.address || ""

      });

    }

  }, [editingSchool]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onAdd(formData);

    setFormData({
      school_name: "",
      school_code: "",
      email: "",
      phone: "",
      address: ""
    });

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm mb-8"
    >

      <h2 className="text-xl font-semibold mb-4">

        {editingSchool
          ? "Update School"
          : "Add School"}

      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          name="school_name"
          placeholder="School Name"
          className="border p-3 rounded-lg"
          value={formData.school_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="school_code"
          placeholder="School Code"
          className="border p-3 rounded-lg"
          value={formData.school_code}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="border p-3 rounded-lg"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          className="border p-3 rounded-lg md:col-span-2"
          value={formData.address}
          onChange={handleChange}
          required
        />

      </div>

      <div className="flex gap-3 mt-4">

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >

          {editingSchool
            ? "Update School"
            : "Save School"}

        </button>

        {editingSchool && (

          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg"
          >
            Cancel
          </button>

        )}

      </div>

    </form>

  );

}

export default AddSchool;