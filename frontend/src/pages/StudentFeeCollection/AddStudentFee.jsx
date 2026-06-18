import { useState, useEffect } from "react";

function AddStudentFee({
  onAdd,
  onUpdate,
  editData,
  isEditing
}) {
  const [formData, setFormData] = useState({
    student_id: "",
    fee_structure_id: "",
    amount_paid: "",
    payment_date: "",
    payment_mode: "",
    receipt_no: "",
    remarks: ""
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        student_id: editData.student_id || "",
        fee_structure_id: editData.fee_structure_id || "",
        amount_paid: editData.amount_paid || "",
        payment_date:
          editData.payment_date?.split("T")[0] || "",
        payment_mode: editData.payment_mode || "",
        receipt_no: editData.receipt_no || "",
        remarks: editData.remarks || ""
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

    console.log("FORM DATA =>", formData);

    if (isEditing) {
      onUpdate(editData.id, formData);
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
        {isEditing ? "Update Fee" : "Collect Fee"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="number"
          name="student_id"
          placeholder="Student ID"
          value={formData.student_id}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="number"
          name="fee_structure_id"
          placeholder="Fee Structure ID"
          value={formData.fee_structure_id}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="number"
          name="amount_paid"
          placeholder="Amount Paid"
          value={formData.amount_paid}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="date"
          name="payment_date"
          value={formData.payment_date}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <select
          name="payment_mode"
          value={formData.payment_mode}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        >
          <option value="">Select Payment Mode</option>
          <option value="cash">Cash</option>
          <option value="online">Online</option>
          <option value="upi">UPI</option>
          <option value="card">Card</option>
        </select>

        <input
          type="text"
          name="receipt_no"
          placeholder="Receipt Number"
          value={formData.receipt_no}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <textarea
          name="remarks"
          placeholder="Remarks"
          value={formData.remarks}
          onChange={handleChange}
          className="border p-3 rounded-lg md:col-span-2"
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
        {isEditing ? "Update Fee" : "Save Fee"}
      </button>
    </form>
  );
}

export default AddStudentFee;