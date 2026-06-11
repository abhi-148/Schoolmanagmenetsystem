import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import AddFee from "./AddFee";

import {
  getFees,
  createFee
} from "../../services/feeService";

function Fees() {

  const [fees, setFees] =
    useState([]);

  useEffect(() => {

    fetchFees();

  }, []);

  const fetchFees = async () => {

    try {

      const response =
        await getFees();

      setFees(
        response.data || []
      );

    } catch (error) {

      console.log(error);

    }

  };

  const handleAddFee =
    async (data) => {

      try {

        await createFee(
          data
        );

        alert(
          "Fee Added Successfully"
        );

        fetchFees();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <AdminLayout>

      <div className="p-8 bg-slate-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Fee Management
        </h1>

        <AddFee
          onAdd={handleAddFee}
        />

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="p-4">
                  ID
                </th>

                <th className="p-4">
                  Student ID
                </th>

                <th className="p-4">
                  Amount
                </th>

                <th className="p-4">
                  Payment Date
                </th>

                <th className="p-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {fees.map(
                (fee) => (

                  <tr
                    key={fee.id}
                    className="border-t"
                  >

                    <td className="p-4">
                      {fee.id}
                    </td>

                    <td className="p-4">
                      {fee.student_id}
                    </td>

                    <td className="p-4">
                      ₹{fee.amount}
                    </td>

                    <td className="p-4">
                      {fee.payment_date?.split("T")[0]}
                    </td>

                    <td className="p-4">

                      <span
                        className={
                          fee.status === "PAID"
                            ? "text-green-600 font-semibold"
                            : "text-red-600 font-semibold"
                        }
                      >
                        {fee.status}
                      </span>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );

}

export default Fees;