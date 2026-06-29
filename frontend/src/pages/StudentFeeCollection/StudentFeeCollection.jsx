import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import AddStudentFee from "./AddStudentFee";

import {
  getStudentFees,
  createStudentFee,
  updateStudentFee,
  deleteStudentFee,
} from "../../services/studentFeeService";

function StudentFeeCollection() {
  const [fees, setFees] = useState([]);
  const [filteredFees, setFilteredFees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = fees.filter(
      (item) =>
        item.student_id
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.fee_structure_id
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

    setFilteredFees(filtered);
  }, [searchTerm, fees]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await getStudentFees();

      setFees(response.data || []);
      setFilteredFees(response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data) => {
    try {
      await createStudentFee(data);

      alert("Fee Collected Successfully");

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateStudentFee(id, data);

      alert("Fee Updated Successfully");

      setEditData(null);
      setIsEditing(false);

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Payment?")) return;

    try {
      await deleteStudentFee(id);

      alert("Payment Deleted Successfully");

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const totalCollection = fees.reduce(
    (total, item) => total + Number(item.amount_paid || 0),
    0
  );

  const totalStudents = new Set(
    fees.map((item) => item.student_id)
  ).size;

  return (
    <AdminLayout>
      <div className="p-8 bg-slate-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">
          Student Fee Collection
        </h1>

        <AddStudentFee
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          editData={editData}
          isEditing={isEditing}
        />

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-100 p-5 rounded-xl shadow">
            <h3 className="text-gray-600">
              Total Payments
            </h3>

            <p className="text-3xl font-bold text-blue-700">
              {fees.length}
            </p>
          </div>

          <div className="bg-green-100 p-5 rounded-xl shadow">
            <h3 className="text-gray-600">
              Total Collection
            </h3>

            <p className="text-3xl font-bold text-green-700">
              ₹{totalCollection}
            </p>
          </div>

          <div className="bg-yellow-100 p-5 rounded-xl shadow">
            <h3 className="text-gray-600">
              Students
            </h3>

            <p className="text-3xl font-bold text-yellow-700">
              {totalStudents}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search Student ID or Fee Structure ID..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center">
              Loading...
            </div>
          ) : (
            <table className="w-full min-w-[800px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 text-left">ID</th>

                  <th className="p-4 text-left">
                    Student ID
                  </th>

                  <th className="p-4 text-left">
                    Fee Structure
                  </th>

                  <th className="p-4 text-left">
                    Amount
                  </th>

                  <th className="p-4 text-left">
                    Payment Date
                  </th>

                  <th className="p-4 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredFees.length > 0 ? (
                  filteredFees.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t hover:bg-slate-50"
                    >
                      <td className="p-4">
                        {item.id}
                      </td>

                      <td className="p-4">
                        {item.student_id}
                      </td>

                      <td className="p-4">
                        {item.fee_structure_id}
                      </td>

                      <td className="p-4 font-semibold text-green-600">
                        ₹{item.amount_paid}
                      </td>

                      <td className="p-4">
                        {item.payment_date?.split(
                          "T"
                        )[0]}
                      </td>

                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              handleEdit(item)
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                item.id
                              )
                            }
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center p-6 text-gray-500"
                    >
                      No Fee Records Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default StudentFeeCollection;