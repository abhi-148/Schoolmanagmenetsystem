import { useState } from "react";

function AddFee({ onAdd }) {

const [formData, setFormData] =
  useState({
    school_id: 1,
    student_id: "",
    amount: "",
    payment_date: "",
    status: "PENDING"
  });
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

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm mb-8"
    >

      <h2 className="text-xl font-semibold mb-4">
        Add Fee
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="number"
          name="student_id"
          placeholder="Student ID"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="date"
          name="payment_date"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <select
          name="status"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        >

          <option value="PENDING">
            Pending
          </option>

          <option value="PAID">
            Paid
          </option>

        </select>

      </div>

      <button
        type="submit"
        className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        Save Fee
      </button>

    </form>

  );

}

export default AddFee;