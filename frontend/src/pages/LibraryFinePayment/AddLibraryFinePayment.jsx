import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import {
  createLibraryFinePayment
} from "../../services/libraryFinePaymentService";

function AddLibraryFinePayment() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      school_id: 1,

      fine_id: "",

      student_id: "",

      amount_paid: "",

      payment_date: "",

      payment_mode: "Cash",

      transaction_id: "",

      receipt_path: "",

      payment_status: "SUCCESS",

      status: "ACTIVE",

      remarks: "",

      created_by: 1,

      updated_by: 1

    });

    const [receipt, setReceipt] =
  useState(null);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };const handleFileChange = (
  e
) => {

  setReceipt(
    e.target.files[0]
  );

};


  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const data =
  new FormData();

Object.keys(formData)
.forEach((key) => {

  data.append(
    key,
    formData[key]
  );

});

if (receipt) {

  data.append(
    "receipt",
    receipt
  );

}

await createLibraryFinePayment(
  data
);

        alert(
          "Library Fine Payment Added Successfully"
        );

        navigate(
          "/library-fine-payments"
        );

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Something Went Wrong"
        );

      }

    };

      return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Add Library Fine Payment
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-sm"
        >

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="number"
              name="fine_id"
              placeholder="Fine ID"
              className="border p-3 rounded-lg"
              value={formData.fine_id}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="student_id"
              placeholder="Student ID"
              className="border p-3 rounded-lg"
              value={formData.student_id}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="amount_paid"
              placeholder="Amount Paid"
              className="border p-3 rounded-lg"
              value={formData.amount_paid}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="payment_date"
              className="border p-3 rounded-lg"
              value={formData.payment_date}
              onChange={handleChange}
              required
            />

            <select
              name="payment_mode"
              className="border p-3 rounded-lg"
              value={formData.payment_mode}
              onChange={handleChange}
            >

              <option value="Cash">
                Cash
              </option>

              <option value="UPI">
                UPI
              </option>

              <option value="Card">
                Card
              </option>

              <option value="Net Banking">
                Net Banking
              </option>

              <option value="Cheque">
                Cheque
              </option>

              <option value="Other">
                Other
              </option>

            </select>

            <input
              type="text"
              name="transaction_id"
              placeholder="Transaction ID"
              className="border p-3 rounded-lg"
              value={formData.transaction_id}
              onChange={handleChange}
            />

            <input
  type="file"
  name="receipt"
  accept=".pdf,.jpg,.jpeg,.png"
  className="border p-3 rounded-lg"
  onChange={handleFileChange}
/><input
              type="text"
              name="receipt_path"
              placeholder="Receipt Path"
              className="border p-3 rounded-lg"
              value={formData.receipt_path}
              onChange={handleChange}
            />

            <select
              name="payment_status"
              className="border p-3 rounded-lg"
              value={formData.payment_status}
              onChange={handleChange}
            >

              <option value="SUCCESS">
                SUCCESS
              </option>

              <option value="FAILED">
                FAILED
              </option>

              <option value="PENDING">
                PENDING
              </option>

            </select>

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

            <textarea
              name="remarks"
              placeholder="Remarks"
              className="border p-3 rounded-lg md:col-span-2"
              rows="4"
              value={formData.remarks}
              onChange={handleChange}
            />

          </div>

          <div className="flex gap-4 mt-6">

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Save Payment
            </button>

            <button
              type="button"
              onClick={() => navigate("/library-fine-payments")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </AdminLayout>

  );

}

export default AddLibraryFinePayment;