const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./src/routes/authRoutes");

const schoolRoutes = require("./src/routes/schoolRoutes");

const classRoutes = require("./src/routes/classRoutes");

const schoolBranchRoutes = require(
  "./src/routes/schoolBranchRoutes"
);

const schoolClassRoutes = require(
  "./src/routes/schoolClassRoutes"
);

const sectionRoutes = require(
  "./src/routes/sectionRoutes"
);

const subjectRoutes = require(
  "./src/routes/subjectRoutes"
);

const classSubjectRoutes = require(
  "./src/routes/classSubjectRoutes"
);

const teacherSubjectRoutes = require(
  "./src/routes/teacherSubjectRoutes"
);

const staffRoutes = require(
  "./src/routes/staffRoutes"
);

const staffTypeRoutes = require(
  "./src/routes/staffTypeRoutes"
);

const staffDepartmentRoutes = require(
  "./src/routes/staffDepartmentRoutes"
);

const studentRoutes = require(
  "./src/routes/studentRoutes"
);

const timetableRoutes = require(
  "./src/routes/timetableRoutes"
);

const attendanceRoutes = require(
  "./src/routes/attendanceRoutes"
);

const attendanceV2Routes = require(
  "./src/routes/attendanceV2Routes"
);

const feeRoutes = require(
  "./src/routes/feeRoutes"
);

const feeStructureRoutes = require(
  "./src/routes/feeStructureRoutes"
);

const studentFeeRoutes = require(
  "./src/routes/studentFeeRoutes"
);

const examRoutes = require(
  "./src/routes/examRoutes"
);

const studentMarkRoutes = require(
  "./src/routes/studentMarkRoutes"
);

const dashboardRoutes = require(
  "./src/routes/dashboardRoutes"
);

const profileRoutes = require(
  "./src/routes/profileRoutes"
);

const aiRoutes = require(
  "./src/routes/aiRoutes"
);

const reportCardRoutes = require(
  "./src/routes/reportCardRoutes"
);

// Middleware
const errorHandler = require(
  "./src/middlewares/errorHandler"
);

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Running Successfully",
  });
});

// Authentication
app.use("/api/auth", authRoutes);

// School Management
app.use("/api/schools", schoolRoutes);

app.use(
  "/api/school-branches",
  schoolBranchRoutes
);

// Academic Structure
app.use("/api/classes", classRoutes);

app.use(
  "/api/school-classes",
  schoolClassRoutes
);

app.use("/api/sections", sectionRoutes);

app.use("/api/subjects", subjectRoutes);

app.use(
  "/api/class-subjects",
  classSubjectRoutes
);

app.use(
  "/api/teacher-subjects",
  teacherSubjectRoutes
);

// Staff
app.use("/api/staff", staffRoutes);

app.use(
  "/api/staff-types",
  staffTypeRoutes
);

app.use(
  "/api/staff-departments",
  staffDepartmentRoutes
);

// Students
app.use("/api/students", studentRoutes);

// Attendance
app.use(
  "/api/attendance",
  attendanceRoutes
);

app.use(
  "/api/attendance-v2",
  attendanceV2Routes
);

// Fees
app.use("/api/fees", feeRoutes);

app.use(
  "/api/fee-structures",
  feeStructureRoutes
);

app.use(
  "/api/student-fees",
  studentFeeRoutes
);

// Exams
app.use("/api/exams", examRoutes);

app.use(
  "/api/student-marks",
  studentMarkRoutes
);

app.use(
  "/api/report-cards",
  reportCardRoutes
);

// Timetable
app.use(
  "/api/timetables",
  timetableRoutes
);

// Dashboard
app.use(
  "/api/dashboard",
  dashboardRoutes
);

// Profile
app.use(
  "/api/profile",
  profileRoutes
);

// AI
app.use("/api/ai", aiRoutes);

// Error Handler (Always Last)
app.use(errorHandler);

module.exports = app;