import { useState, useEffect } from "react";

function AddClass({
  onAdd,
  onUpdate,
  editData,
  isEditing
}) {

  const [formData, setFormData] = useState({
    class_name: "",
    status: "ACTIVE"
  });

  useEffect(() => {

    if (editData) {

      setFormData({
        class_name: editData.class_name || "",
        status: editData.status || "ACTIVE"
      });

    }

  }, [editData]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (isEditing) {

      onUpdate(
        editData.id,
        formData
      );

    } else {

      onAdd(formData);

    }

    setFormData({
      class_name: "",
      status: "ACTIVE"
    });

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm mb-8"
    >

      <h2 className="text-xl font-semibold mb-4">
        {isEditing
          ? "Update Class"
          : "Add Class"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          name="class_name"
          placeholder="Class Name"
          value={formData.class_name}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option value="ACTIVE">
            ACTIVE
          </option>

          <option value="INACTIVE">
            INACTIVE
          </option>
        </select>

      </div>

      <button
        type="submit"
        className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        {isEditing
          ? "Update"
          : "Save"}
      </button>

    </form>
  );
}

export default AddClass;