const express = require("express");

const router = express.Router();

const {
  markAttendance,
  getAllAttendance
} = require("../controllers/attendanceController");

const authMiddleware =
require("../middlewares/authMiddleware");

const authorizeRoles =
require("../middlewares/roleMiddleware");

router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN",
    "STAFF"
  ),
  markAttendance
);

router.get(
  "/",
  authMiddleware,
  getAllAttendance
);

module.exports = router;