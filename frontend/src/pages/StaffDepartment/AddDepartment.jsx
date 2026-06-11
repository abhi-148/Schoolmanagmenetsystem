import {
  useState,
  useEffect
} from "react";

function AddDepartment({
  onAdd,
  editingDepartment,
  cancelEdit
}) {

  const [formData,
    setFormData] =
    useState({
      name: "",
      description: "",
      logo: ""
    });

  useEffect(() => {

    if (editingDepartment) {

      setFormData({
        name:
          editingDepartment.name,
        description:
          editingDepartment.description,
        logo:
          editingDepartment.logo
      });

    }

  }, [editingDepartment]);

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value
      });

    };

  const handleSubmit =
    (e) => {

      e.preventDefault();

      onAdd(formData);

      setFormData({
        name: "",
        description: "",
        logo: ""
      });

    };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow mb-6"
    >

      <h2 className="text-xl font-bold mb-4">

        {editingDepartment
          ? "Update Department"
          : "Add Department"}

      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          name="name"
          placeholder="Department Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="logo"
          placeholder="Logo URL"
          value={formData.logo}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-3 rounded-lg md:col-span-2"
        />

      </div>

      <div className="flex gap-3 mt-4">

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          {editingDepartment
            ? "Update"
            : "Save"}
        </button>

        {editingDepartment && (

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

export default AddDepartment;