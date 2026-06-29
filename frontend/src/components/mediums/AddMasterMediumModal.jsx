import { useState, useEffect } from "react";

function AddMasterMediumModal({
  onAdd,
  editingMedium,
  cancelEdit
}) {

  const [formData, setFormData] =
    useState({
      medium_name: "",
      description: ""
    });

  useEffect(() => {

    if (editingMedium) {

      setFormData({
        medium_name:
          editingMedium.medium_name || "",
        description:
          editingMedium.description || ""
      });

    }

  }, [editingMedium]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      await onAdd(formData);

      setFormData({
        medium_name: "",
        description: ""
      });

    };

  return (

    <div className="bg-white p-6 rounded-xl shadow mb-6">

      <h2 className="text-xl font-semibold mb-4">

        {editingMedium
          ? "Edit Master Medium"
          : "Add Master Medium"}

      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-4"
      >

        <input
          type="text"
          name="medium_name"
          placeholder="Medium Name"
          value={formData.medium_name}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >

          {editingMedium
            ? "Update Medium"
            : "Add Medium"}

        </button>

        {editingMedium && (

          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-500 text-white px-5 py-3 rounded-lg"
          >
            Cancel
          </button>

        )}

      </form>

    </div>

  );

}

export default AddMasterMediumModal;