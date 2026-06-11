import { useState, useEffect } from "react";

function AddStaffType({
  onAdd,
  editingType,
  cancelEdit
}) {

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      status: "ACTIVE"
    });

  useEffect(() => {

    if (editingType) {

      setFormData({
        name:
          editingType.name || "",

        description:
          editingType.description || "",

        status:
          editingType.status || "ACTIVE"
      });

    }

  }, [editingType]);

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
      name: "",
      description: "",
      status: "ACTIVE"
    });

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm mb-6"
    >

      <h2 className="text-xl font-semibold mb-4">

        {editingType
          ? "Update Staff Type"
          : "Add Staff Type"}

      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          name="name"
          placeholder="Staff Type Name"
          className="border p-3 rounded-lg"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          className="border p-3 rounded-lg"
          value={formData.description}
          onChange={handleChange}
        />

        <select
          name="status"
          className="border p-3 rounded-lg"
          value={formData.status}
          onChange={handleChange}
        >

          <option value="ACTIVE">
            ACTIVE
          </option>

          <option value="INACTIVE">
            INACTIVE
          </option>

        </select>

      </div>

      <div className="flex gap-3 mt-4">

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >

          {editingType
            ? "Update Staff Type"
            : "Save Staff Type"}

        </button>

        {editingType && (

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

export default AddStaffType;