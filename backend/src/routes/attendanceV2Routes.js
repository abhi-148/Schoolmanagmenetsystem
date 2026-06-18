const express =
  require("express");

const router =
  express.Router();

const {
  createAttendance,
  getAllAttendance,
  getAttendanceByStudent,
  getAttendanceByDate
} = require(
  "../controllers/attendanceV2Controller"
);

const authMiddleware =
  require("../middlewares/authMiddleware");

const authorizeRoles =
  require("../middlewares/roleMiddleware");

// Mark Attendance
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN",
    "STAFF"
  ),
  createAttendance
);

// Get All Attendance
router.get(
  "/",
  authMiddleware,
  getAllAttendance
);

// Get By Student
router.get(
  "/student/:studentId",
  authMiddleware,
  getAttendanceByStudent
);

// Get By Date
router.get(
  "/date/:date",
  authMiddleware,
  getAttendanceByDate
);

module.exports = router;