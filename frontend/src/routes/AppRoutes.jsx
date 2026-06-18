import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Welcome from "../pages/Welcome/Welcome";
import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";

import Dashboard from "../pages/Dashboard/Dashboard";
import Schools from "../pages/Schools/Schools";
import Staff from "../pages/Staff/Staff";
import StaffType from "../pages/StaffType/StaffType";
import StaffDepartment from "../pages/StaffDepartment/StaffDepartment";
import Students from "../pages/Students/Students";
import Attendance from "../pages/Attendance/Attendance";
import Fees from "../pages/Fees/Fees";
import Profile from "../pages/Profile/Profile";
import AIAssistant from "../pages/AI/AIAssistant";
import FeeStructure from "../pages/FeeStructure/FeeStructure";
import StudentFeeCollection from "../pages/StudentFeeCollection/StudentFeeCollection";
import Exams from "../pages/Exams/Exams";
import StudentMarks from "../pages/StudentMarks/StudentMarks";
import Timetable from "../pages/Timetable/Timetable";
import ReportCard from "../pages/ReportCard/ReportCard";
import Classes from "../pages/Classes/Classes";
import SchoolBranches from "../pages/SchoolBranches/SchoolBranches";
import SchoolClasses from "../pages/SchoolClasses/SchoolClasses";

import PrivateRoute from "./PrivateRoute";

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Welcome />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/schools"
          element={
            <PrivateRoute>
              <Schools />
            </PrivateRoute>
          }
        />

        <Route
          path="/staff"
          element={
            <PrivateRoute>
              <Staff />
            </PrivateRoute>
          }
        />

        <Route
          path="/staff-types"
          element={
            <PrivateRoute>
              <StaffType />
            </PrivateRoute>
          }
        />

        <Route
          path="/departments"
          element={
            <PrivateRoute>
              <StaffDepartment />
            </PrivateRoute>
          }
        />

        <Route
          path="/students"
          element={
            <PrivateRoute>
              <Students />
            </PrivateRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <PrivateRoute>
              <Attendance />
            </PrivateRoute>
          }
        />

        <Route
          path="/fees"
          element={
            <PrivateRoute>
              <Fees />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
  path="/fee-structure"
  element={
    <PrivateRoute>
      <FeeStructure />
    </PrivateRoute>
  }
/>

<Route
  path="/student-fees"
  element={
    <PrivateRoute>
      <StudentFeeCollection />
    </PrivateRoute>
  }
/>

<Route
  path="/exams"
  element={
    <PrivateRoute>
      <Exams />
    </PrivateRoute>
  }
/>

<Route
  path="/student-marks"
  element={
    <PrivateRoute>
      <StudentMarks />
    </PrivateRoute>
  }
/>

<Route
  path="/timetable"
  element={
    <PrivateRoute>
      <Timetable />
    </PrivateRoute>
  }
/>

<Route
  path="/report-card"
  element={
    <PrivateRoute>
      <ReportCard />
    </PrivateRoute>
  }
/>

        <Route
          path="/ai"
          element={
            <PrivateRoute>
              <AIAssistant />
            </PrivateRoute>
          }
        />
        <Route
  path="/classes"
  element={<Classes />}
/>

<Route
  path="/school-branches"
  element={<SchoolBranches />}
/>

<Route
  path="/school-classes"
  element={<SchoolClasses />}
/>

      </Routes>

    </BrowserRouter>
  );

}

export default AppRoutes;