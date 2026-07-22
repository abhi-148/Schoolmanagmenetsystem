import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams
} from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getLibraryFinePaymentById
} from "../../services/libraryFinePaymentService";

function ViewLibraryFinePayment() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [payment, setPayment] =
    useState(null);

  useEffect(() => {

    fetchPayment();

  }, [id]);

  const fetchPayment = async () => {

    try {

      const response =
        await getLibraryFinePaymentById(id);

      console.log(response);

      setPayment(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  if (!payment) {

    return (

      <AdminLayout>

        <div className="p-8">
          Loading...
        </div>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            View Library Fine Payment
          </h1>

          <button
            onClick={() =>
              navigate("/library-fine-payments")
            }
            className="bg-gray-600 text-white px-5 py-3 rounded-lg"
          >
            Back
          </button>

        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <p className="text-gray-500">
                Fine Payment ID
              </p>

              <h3 className="font-semibold">
                {payment.fine_payment_id}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">
                School
              </p>

              <h3 className="font-semibold">
                {payment.school_name}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">
                Student
              </p>

              <h3 className="font-semibold">
                {payment.student_name}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">
                Fine ID
              </p>

              <h3 className="font-semibold">
                {payment.fine_id}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">
                Amount Paid
              </p>

              <h3 className="font-semibold">
                ₹ {payment.amount_paid}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">
                Payment Date
              </p>

              <h3 className="font-semibold">
                {payment.payment_date?.slice(0, 10)}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">
                Payment Mode
              </p>

              <h3 className="font-semibold">
                {payment.payment_mode}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">
                Transaction ID
              </p>

              <h3 className="font-semibold">
                {payment.transaction_id}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">
                Payment Status
              </p>

              <h3 className="font-semibold">
                {payment.payment_status}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">
                Record Status
              </p>

              <h3 className="font-semibold">
                {payment.status}
              </h3>
            </div>

            <div className="md:col-span-2">
              <p className="text-gray-500">
                Remarks
              </p>

              <h3 className="font-semibold">
                {payment.remarks}
              </h3>
            </div>

            {payment.receipt_path && (

  <div className="md:col-span-2">

    <p className="text-gray-500 mb-2">
      Receipt
    </p>

    <a
      href={`http://localhost:5000${payment.receipt_path}`}
      target="_blank"
      rel="noreferrer"
      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
    >
      View Receipt
    </a>

  </div>

)}

          </div>

        </div>

      </div>

    </AdminLayout>

  );

}

export default ViewLibraryFinePayment;