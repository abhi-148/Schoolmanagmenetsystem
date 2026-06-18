const express =
  require("express");

const router =
  express.Router();

const {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam
} = require(
  "../controllers/examController"
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
  createExam
);

// Get All
router.get(
  "/",
  authMiddleware,
  getAllExams
);

// Get By Id
router.get(
  "/:id",
  authMiddleware,
  getExamById
);

// Update
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  updateExam
);

// Delete
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  deleteExam
);

module.exports = router;