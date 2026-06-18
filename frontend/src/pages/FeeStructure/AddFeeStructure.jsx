import { useState, useEffect } from "react";

function AddFeeStructure({
  onAdd,
  onUpdate,
  editData,
  isEditing
}) {

  const [formData, setFormData] = useState({
    school_class_id: "",
    fee_type: "",
    amount: ""
  });

  useEffect(() => {

    if (editData) {

      setFormData({
        school_class_id:
          editData.school_class_id || "",
        fee_type:
          editData.fee_type || "",
        amount:
          editData.amount || ""
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

    setFormData({
      school_class_id: "",
      fee_type: "",
      amount: ""
    });

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm mb-8"
    >

      <h2 className="text-xl font-semibold mb-4">
        {
          isEditing
            ? "Update Fee Structure"
            : "Add Fee Structure"
        }
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <input
          type="number"
          name="school_class_id"
          placeholder="School Class ID"
          value={formData.school_class_id}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="fee_type"
          placeholder="Fee Type"
          value={formData.fee_type}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
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
        {
          isEditing
            ? "Update"
            : "Save"
        }
      </button>

    </form>

  );

}

export default AddFeeStructure;