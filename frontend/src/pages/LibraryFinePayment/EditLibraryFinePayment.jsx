import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getLibraryFinePaymentById,
  updateLibraryFinePayment
} from "../../services/libraryFinePaymentService";

function EditLibraryFinePayment() {

  const navigate = useNavigate();

  const { id } = useParams();

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

      remarks: "",

      updated_by: 1

    });

  useEffect(() => {

    fetchPayment();

  }, []);

  const [receipt, setReceipt] =
  useState(null);

  const fetchPayment =
    async () => {

      try {

        const response =
          await getLibraryFinePaymentById(
            id
          );

        setFormData(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
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

await updateLibraryFinePayment(
  id,
  data
);

        alert(
          "Library Fine Payment Updated Successfully"
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
          Edit Library Fine Payment
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
              value={
                formData.payment_date
                  ? formData.payment_date.slice(0, 10)
                  : ""
              }
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
  onChange={handleFileChange}
  className="border p-3 rounded-lg"
/>

{formData.receipt_path && (
  <div className="mt-2">
    <img
      src={`http://localhost:5000${formData.receipt_path}`}
      alt="Receipt"
      className="w-40 h-40 object-cover border rounded-lg"
    />
  </div>
)} 

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

            <textarea
              name="remarks"
              placeholder="Remarks"
              rows="4"
              className="border p-3 rounded-lg md:col-span-2"
              value={formData.remarks}
              onChange={handleChange}
            />

          </div>

          <div className="flex gap-4 mt-6">

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              Update Payment
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/library-fine-payments")
              }
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </AdminLayout>

  );

}

export default EditLibraryFinePayment;