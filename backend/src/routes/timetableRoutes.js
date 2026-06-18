const express =
require("express");

const router =
express.Router();

const {
  createTimetable,
  getAllTimetables,
  getTimetableByClass,
  updateTimetable,
  deleteTimetable
} = require(
  "../controllers/timetableController"
);

const authMiddleware =
require("../middlewares/authMiddleware");

const authorizeRoles =
require("../middlewares/roleMiddleware");

// Create
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  createTimetable
);

// Get All
router.get(
  "/",
  authMiddleware,
  getAllTimetables
);

// Get By Class
router.get(
  "/class/:schoolClassId",
  authMiddleware,
  getTimetableByClass
);

// Update
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  updateTimetable
);

// Delete
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  deleteTimetable
);

module.exports = router;