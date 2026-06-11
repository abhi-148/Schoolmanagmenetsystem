import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold text-blue-600">
            SchoolMS
          </h1>

          <Link
            to="/login"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Side */}
          <div>

            <h1 className="text-5xl font-bold text-slate-800 leading-tight">

              Manage Your School

              <span className="text-blue-600 block">
                Smarter & Faster
              </span>

            </h1>

            <p className="mt-6 text-lg text-gray-600">

              Complete School Management
              System for Schools, Staff,
              Students, Attendance,
              Fees and Reports.

            </p>

            <div className="mt-8 flex gap-4">

              <Link
                to="/login"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Get Started
              </Link>

              <button
                className="border border-gray-300 px-6 py-3 rounded-lg"
              >
                Learn More
              </button>

            </div>

          </div>

          {/* Right Side */}
          <div>

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h3 className="text-xl font-semibold mb-6">
                Dashboard Overview
              </h3>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-blue-50 p-5 rounded-xl">
                  <h4 className="text-gray-500">
                    Students
                  </h4>

                  <p className="text-3xl font-bold text-blue-600">
                    2500
                  </p>
                </div>

                <div className="bg-green-50 p-5 rounded-xl">
                  <h4 className="text-gray-500">
                    Staff
                  </h4>

                  <p className="text-3xl font-bold text-green-600">
                    120
                  </p>
                </div>

                <div className="bg-orange-50 p-5 rounded-xl">
                  <h4 className="text-gray-500">
                    Attendance
                  </h4>

                  <p className="text-3xl font-bold text-orange-500">
                    96%
                  </p>
                </div>

                <div className="bg-purple-50 p-5 rounded-xl">
                  <h4 className="text-gray-500">
                    Fees
                  </h4>

                  <p className="text-3xl font-bold text-purple-600">
                    ₹2.5L
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="bg-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            Key Features
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="shadow-sm border p-6 rounded-xl">
              <h3 className="font-semibold mb-2">
                Student Management
              </h3>
              <p className="text-gray-500 text-sm">
                Manage all students easily.
              </p>
            </div>

            <div className="shadow-sm border p-6 rounded-xl">
              <h3 className="font-semibold mb-2">
                Staff Management
              </h3>
              <p className="text-gray-500 text-sm">
                Manage teachers and staff.
              </p>
            </div>

            <div className="shadow-sm border p-6 rounded-xl">
              <h3 className="font-semibold mb-2">
                Attendance
              </h3>
              <p className="text-gray-500 text-sm">
                Daily attendance tracking.
              </p>
            </div>

            <div className="shadow-sm border p-6 rounded-xl">
              <h3 className="font-semibold mb-2">
                Fees Management
              </h3>
              <p className="text-gray-500 text-sm">
                Complete fee monitoring.
              </p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Welcome;