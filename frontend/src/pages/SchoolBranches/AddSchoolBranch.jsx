import {
  useState,
  useEffect
} from "react";

function AddSchoolBranch({
  onAdd,
  onUpdate,
  editData,
  isEditing
}) {

  const [formData, setFormData] =
    useState({
      school_id: "",
      branch_name: "",
      branch_code: "",
      address: "",
      contact_person: "",
      contact_number: "",
      branch_email: "",
      principal_name: ""
    });

  useEffect(() => {

    if (editData) {

      setFormData({
        school_id:
          editData.school_id || "",
        branch_name:
          editData.branch_name || "",
        branch_code:
          editData.branch_code || "",
        address:
          editData.address || "",
        contact_person:
          editData.contact_person || "",
        contact_number:
          editData.contact_number || "",
        branch_email:
          editData.branch_email || "",
        principal_name:
          editData.principal_name || ""
      });

    }

  }, [editData]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
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

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm mb-8"
    >

      <h2 className="text-xl font-semibold mb-4">

        {isEditing
          ? "Update Branch"
          : "Add Branch"}

      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="number"
          name="school_id"
          placeholder="School ID"
          value={formData.school_id}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="branch_name"
          placeholder="Branch Name"
          value={formData.branch_name}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="branch_code"
          placeholder="Branch Code"
          value={formData.branch_code}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="contact_person"
          placeholder="Contact Person"
          value={formData.contact_person}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="contact_number"
          placeholder="Contact Number"
          value={formData.contact_number}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="email"
          name="branch_email"
          placeholder="Branch Email"
          value={formData.branch_email}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="principal_name"
          placeholder="Principal Name"
          value={formData.principal_name}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

      </div>

      <button
        type="submit"
        className={`mt-4 text-white px-6 py-3 rounded-lg ${
          isEditing
            ? "bg-blue-600"
            : "bg-green-600"
        }`}
      >
        {isEditing
          ? "Update Branch"
          : "Save Branch"}
      </button>

    </form>

  );

}

export default AddSchoolBranch;