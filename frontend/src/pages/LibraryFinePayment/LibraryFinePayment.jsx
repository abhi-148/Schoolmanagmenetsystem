import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getAllLibraryFinePayments,
  searchLibraryFinePayments,
  updateLibraryFinePaymentStatus
} from "../../services/libraryFinePaymentService";

function LibraryFinePayment() {

  const navigate = useNavigate();

  const [
    libraryFinePayments,
    setLibraryFinePayments
  ] = useState([]);

  const [
    search,
    setSearch
  ] = useState("");

  const [
    loading,
    setLoading
  ] = useState(false);

  useEffect(() => {

    fetchLibraryFinePayments();

  }, []);

  const fetchLibraryFinePayments =
    async () => {

      try {

        setLoading(true);

        const response =
          await getAllLibraryFinePayments();

        setLibraryFinePayments(
          response.data || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  const handleSearch =
    async () => {

      try {

        if (
          search.trim() === ""
        ) {

          fetchLibraryFinePayments();

          return;

        }

        const response =
          await searchLibraryFinePayments(
            search
          );

        setLibraryFinePayments(
          response.data || []
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleStatus =
    async (
      id,
      currentStatus
    ) => {

      try {

        const status =
          currentStatus ===
          "ACTIVE"
            ? "INACTIVE"
            : "ACTIVE";

        await updateLibraryFinePaymentStatus(
          id,
          status
        );

        alert(
          "Status Updated Successfully"
        );

        fetchLibraryFinePayments();

      } catch (error) {

        console.log(error);

      }

    };

  const handleView =
    (id) => {

      navigate(
        `/library-fine-payments/view/${id}`
      );

    };

  const handleEdit =
    (id) => {

      navigate(
        `/library-fine-payments/edit/${id}`
      );

    };

  const handleAdd =
    () => {

      navigate(
        "/library-fine-payments/add"
      );

    };

      return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Library Fine Payments
          </h1>

          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            Add Payment
          </button>

        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 mb-5">

          <div className="flex gap-3">

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border p-3 rounded-lg flex-1"
            />

            <button
              onClick={handleSearch}
              className="bg-green-600 text-white px-6 rounded-lg"
            >
              Search
            </button>

            <button
              onClick={fetchLibraryFinePayments}
              className="bg-gray-600 text-white px-6 rounded-lg"
            >
              Refresh
            </button>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="p-4 text-left">
                  ID
                </th>

                <th className="p-4 text-left">
                  Student
                </th>

                <th className="p-4 text-left">
                  School
                </th>

                <th className="p-4 text-left">
                  Amount
                </th>

                <th className="p-4 text-left">
                  Payment Mode
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {
                loading ?

                <tr>

                  <td
                    colSpan="7"
                    className="text-center p-6"
                  >
                    Loading...
                  </td>

                </tr>

                :

                libraryFinePayments.length === 0 ?

                <tr>

                  <td
                    colSpan="7"
                    className="text-center p-6"
                  >
                    No Data Found
                  </td>

                </tr>

                :

                libraryFinePayments.map(
                  (payment) => (

                    <tr
                      key={payment.fine_payment_id}
                      className="border-t hover:bg-slate-50"
                    >

                      <td className="p-4">
                        {payment.fine_payment_id}
                      </td>

                      <td className="p-4">
                        {payment.student_name}
                      </td>

                      <td className="p-4">
                        {payment.school_name}
                      </td>

                      <td className="p-4">
                        ₹ {payment.amount_paid}
                      </td>

                      <td className="p-4">
                        {payment.payment_mode}
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-white ${
                            payment.status === "ACTIVE"
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                        >
                          {payment.status}
                        </span>

                      </td>

                      <td className="p-4">

                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              handleView(
                                payment.fine_payment_id
                              )
                            }
                            className="bg-blue-600 text-white px-3 py-2 rounded"
                          >
                            View
                          </button>

                          <button
                            onClick={() =>
                              handleEdit(
                                payment.fine_payment_id
                              )
                            }
                            className="bg-yellow-500 text-white px-3 py-2 rounded"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleStatus(
                                payment.fine_payment_id,
                                payment.status
                              )
                            }
                            className="bg-red-600 text-white px-3 py-2 rounded"
                          >
                            Status
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              }

            </tbody>

          </table>

        </div>

              </div>

    </AdminLayout>

  );

}

export default LibraryFinePayment;