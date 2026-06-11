const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/authRoutes");
const schoolRoutes = require("./src/routes/schoolRoutes");
const staffRoutes =
require("./src/routes/staffRoutes");
const app = express();
const studentRoutes =
require("./src/routes/studentRoutes");
const attendanceRoutes =
require("./src/routes/attendanceRoutes");
app.use(cors());
app.use(express.json());
const dashboardRoutes =
require("./src/routes/dashboardRoutes");
const feeRoutes =
require("./src/routes/feeRoutes");
const errorHandler =
require("./src/middlewares/errorHandler");
const profileRoutes =
require("./src/routes/profileRoutes");
const aiRoutes =
require("./src/routes/aiRoutes");
const staffTypeRoutes =
require(
"./src/routes/staffTypeRoutes"
);
const staffDepartmentRoutes =
require(
"./src/routes/staffDepartmentRoutes"
);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(
  "/api/fees",
  feeRoutes
);
app.use(errorHandler);
app.use("/api/profile", profileRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/staff-types", staffTypeRoutes);
app.use(
"/api/staff-departments",
staffDepartmentRoutes
);
module.exports = app;