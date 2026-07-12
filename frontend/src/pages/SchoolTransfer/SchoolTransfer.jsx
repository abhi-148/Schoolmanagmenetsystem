import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import {
  getSchoolTransfers,
  approveSchoolTransfer,
  rejectSchoolTransfer,
  completeSchoolTransfer
} from "../../services/schoolTransferService";

function SchoolTransfer() {

  const [transfers, setTransfers] = useState([]);
  const [search,setSearch]=useState("");
  const [status,setStatus]=useState("");

  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {

    try {

      const response =
        await getSchoolTransfers();

      setTransfers(response.data || []);

    } catch (error) {

      console.log(error);

    }

  };

  const handleApprove = async (id) => {

    try {

      await approveSchoolTransfer(id);

      alert("Approved Successfully");

      fetchTransfers();

    } catch (error) {

      alert(error.response?.data?.message);

    }

  };

  const handleReject = async (id) => {

    try {

      await rejectSchoolTransfer(id);

      alert("Rejected Successfully");

      fetchTransfers();

    } catch (error) {

      alert(error.response?.data?.message);

    }

  };

  const handleComplete = async (id) => {

    try {

      await completeSchoolTransfer(id);

      alert("Completed Successfully");

      fetchTransfers();

    } catch (error) {

      alert(error.response?.data?.message);

    }

  };

  return (

    <AdminLayout>

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          School Transfers
        </h1>

        <div className="flex gap-3 mb-6">

  <input
    type="text"
    placeholder="Search Student / Staff / Reason..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border rounded-lg px-4 py-2 w-80"
  />

  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    className="border rounded-lg px-4 py-2"
  >
    <option value="">All Status</option>
    <option value="PENDING">Pending</option>
    <option value="APPROVED">Approved</option>
    <option value="COMPLETED">Completed</option>
    <option value="REJECTED">Rejected</option>
  </select>

</div>

<div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="min-w-full border-collapse">

           <thead className="bg-slate-800 text-white">
<tr>

  <th className="p-3">ID</th>

  <th className="p-3">
    Student
  </th>

  <th className="p-3">
    Staff
  </th>

  <th className="p-3">
    From School
  </th>

  <th className="p-3">
    To School
  </th>

  <th className="p-3">
    Created By
  </th>

  <th className="p-3">
    Transfer Date
  </th>

  <th className="p-3">
    Reason
  </th>

  <th className="p-3">
    Status
  </th>

  <th className="p-3">
    Actions
  </th>

</tr>

            </thead>

          <tbody>

  {transfers

    .filter((item) =>

      status === "" ||

      item.transfer_status === status

    )

    .filter((item) =>

      (item.student_name || "")
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      (item.staff_name || "")
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      (item.reason || "")
        .toLowerCase()
        .includes(search.toLowerCase())

    )

    .map((item) => (

                <tr
  key={item.id}
  className="border-t text-center hover:bg-slate-50"
>

                 <td className="p-3 border-b">
                    {item.id}
                  </td>

                 <td className="p-3 border-b">
                   {item.student_name || "-"}
                  </td>

                 <td className="p-3 border-b">
                    {item.staff_name || "-"}
                  </td>

                  <td className="p-3 border-b">
                    {item.from_school_name || "-"}
                  </td>

                <td className="p-3 border-b">
                    {item.to_school_name || "-"}
                  </td>

                  <td className="p-3 border-b">
  {item.created_by_name || "-"}
</td>

<td className="p-3 border-b">
  {new Date(item.transfer_date).toLocaleDateString()}
</td>

<td className="p-3 border-b">
  {item.reason}
</td>

                <td className="p-3 border-b">

                    <span
  className={`inline-block px-4 py-1 rounded-full text-sm font-semibold text-white
                      ${
                        item.transfer_status === "PENDING"
                          ? "bg-yellow-500"
                          : item.transfer_status === "APPROVED"
                          ? "bg-blue-500"
                          : item.transfer_status === "COMPLETED"
                          ? "bg-green-600"
                          : "bg-red-500"
                      }`}
                    >

                      {item.transfer_status}

                    </span>

                  </td>

                  <td className="p-3 border-b">

                    <div className="flex gap-2">

                      {item.transfer_status === "PENDING" && (

                        <>
                          <button
                            onClick={() =>
                              handleApprove(item.id)
                            }
                            className="bg-green-600 text-white px-3 py-1 rounded"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              handleReject(item.id)
                            }
                            className="bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Reject
                          </button>
                        </>

                      )}

                      {item.transfer_status === "APPROVED" && (

                        <button
                          onClick={() =>
                            handleComplete(item.id)
                          }
                          className="bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Complete
                        </button>

                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );

}

export default SchoolTransfer;