const express =
  require("express");

const router =
  express.Router();

const {
  createExamTimetable,
  getAllExamTimetables,
  getExamTimetableById,
  updateExamTimetable,
  deleteExamTimetable
} = require(
  "../controllers/examTimetableController"
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
  createExamTimetable
);

// Get All
router.get(
  "/",
  authMiddleware,
  getAllExamTimetables
);

// Get By Id
router.get(
  "/:id",
  authMiddleware,
  getExamTimetableById
);

// Update
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  updateExamTimetable
);

// Delete
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  deleteExamTimetable
);

module.exports = router;