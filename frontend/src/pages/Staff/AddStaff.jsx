import { useState, useEffect } from "react";

function AddStaff({
  onAdd,
  editingStaff,
  cancelEdit
}) {

  const [formData, setFormData] = useState({
  school_id: 1,
  full_name: "",
  email: "",
  designation: "Teacher"
});

  useEffect(() => {

    if (editingStaff) {

      setFormData({
        school_id:
          editingStaff.school_id,

        full_name:
          editingStaff.full_name,

        email:
          editingStaff.email,

        designation:
          editingStaff.designation ||
          "Teacher"
      });

    }

  }, [editingStaff]);

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
      school_id: 1,
      full_name: "",
      email: "",
      designation: "Teacher"
    });

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm mb-8"
    >

      <h2 className="text-xl font-semibold mb-4">

        {editingStaff
          ? "Update Staff"
          : "Add Staff"}

      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          className="border p-3 rounded-lg"
          value={formData.full_name}
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

        <select
          name="designation"
          className="border p-3 rounded-lg"
          value={formData.designation}
          onChange={handleChange}
        >

          <option value="Teacher">
            Teacher
          </option>

          <option value="Accountant">
            Accountant
          </option>

          <option value="Principal">
            Principal
          </option>

        </select>

      </div>

      <div className="flex gap-3 mt-4">

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          {editingStaff
            ? "Update Staff"
            : "Save Staff"}
        </button>

        {editingStaff && (

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

export default AddStaff;