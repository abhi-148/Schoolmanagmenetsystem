import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getDashboardData }
from "../../services/dashboardService";
function Dashboard() {

  const [dashboardData, setDashboardData] =
  useState({
    totalSchools: 0,
    totalStaff: 0,
    totalStudents: 0,
    totalStaffTypes: 0,
    totalDepartments: 0,
    presentToday: 0,
    absentToday: 0
  });

 useEffect(() => {

  fetchDashboardData();

}, []);
const fetchDashboardData =
async () => {

  try {

    const response =
      await getDashboardData();

    console.log(
      "Dashboard Data:",
      response
    );
    console.log(
  "Present:",
  response.data.presentToday
);

console.log(
  "Absent:",
  response.data.absentToday
);

   setDashboardData(
  response.data
);

  } catch (error) {

    console.log(
      error
    );

  }

};

  return (

    <AdminLayout>

     <div className="bg-slate-100 dark:bg-slate-950 min-h-full">

        {/* Header */}

        <div className="bg-white shadow-sm px-8 py-5">

          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome to School Management System
          </p>

        </div>

        {/* Main Content */}

       <div className="p-6 md:p-8">

          {/* Statistics Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">

              <h3 className="text-gray-500 text-sm">
                Total Schools
              </h3>

              <h2 className="text-3xl font-bold text-blue-600 mt-2">
                {dashboardData.totalSchools}
              </h2>

            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">

              <h3 className="text-gray-500 text-sm">
                Total Staff
              </h3>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {dashboardData.totalStaff}
              </h2>

            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">

              <h3 className="text-gray-500 text-sm">
                Total Students
              </h3>

              <h2 className="text-3xl font-bold text-orange-500 mt-2">
                {dashboardData.totalStudents}
              </h2>

            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-emerald-500">

              <h3 className="text-gray-500 text-sm">
                Present Today
              </h3>

              <h2 className="text-3xl font-bold text-emerald-600 mt-2">
                {dashboardData.presentToday}
              </h2>

            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">

  <h3 className="text-gray-500 text-sm">
    Staff Types
  </h3>

  <h2 className="text-3xl font-bold text-purple-600 mt-2">
    {dashboardData.totalStaffTypes}
  </h2>

</div>

<div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-indigo-500">

  <h3 className="text-gray-500 text-sm">
    Departments
  </h3>

  <h2 className="text-3xl font-bold text-indigo-600 mt-2">
    {dashboardData.totalDepartments}
  </h2>

</div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">

              <h3 className="text-gray-500 text-sm">
                Absent Today
              </h3>

              <h2 className="text-3xl font-bold text-red-500 mt-2">
                {dashboardData.absentToday}
              </h2>

            </div>

          </div>

          {/* Recent Activities */}

      <div className="mt-8 bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6">

            <h2 className="text-xl font-semibold mb-4">
              Recent Activity
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b">

                    <th className="text-left py-3">
                      Activity
                    </th>

                    <th className="text-left py-3">
                      Date
                    </th>

                  </tr>

                </thead>

                <tbody>

                  <tr className="border-b">

                    <td className="py-3">
                      Student Added
                    </td>

                    <td>
                      Today
                    </td>

                  </tr>

                  <tr className="border-b">

                    <td className="py-3">
                      Attendance Marked
                    </td>

                    <td>
                      Today
                    </td>

                  </tr>

                  <tr>

                    <td className="py-3">
                      Fee Updated
                    </td>

                    <td>
                      Today
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

          {/* Quick Actions */}

       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

            <div className="bg-white p-6 rounded-xl shadow-sm">

              <h3 className="font-semibold mb-2">
                Student Management
              </h3>

              <p className="text-gray-500 text-sm">
                Add, update and manage students.
              </p>

            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">

              <h3 className="font-semibold mb-2">
                Attendance
              </h3>

              <p className="text-gray-500 text-sm">
                Mark and monitor attendance.
              </p>

            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">

              <h3 className="font-semibold mb-2">
                Fees Management
              </h3>

              <p className="text-gray-500 text-sm">
                Track fee payments and dues.
              </p>

            </div>

          </div>

        </div>

      </div>

    </AdminLayout>

  );

}

export default Dashboard;