const express = require("express");

const router = express.Router();

const {
  createStudentMark,
  getAllStudentMarks,
  getMarksByStudent,
  getMarksByExam,
  updateStudentMark,
  deleteStudentMark
} = require("../controllers/studentMarkController");

const authMiddleware =
  require("../middlewares/authMiddleware");

// Add Marks
router.post(
  "/",
  authMiddleware,
  createStudentMark
);

// Get All Marks
router.get(
  "/",
  authMiddleware,
  getAllStudentMarks
);

// Get By Student
router.get(
  "/student/:studentId",
  authMiddleware,
  getMarksByStudent
);

// Get By Exam
router.get(
  "/exam/:examId",
  authMiddleware,
  getMarksByExam
);

// Update Marks
router.put(
  "/:id",
  authMiddleware,
  updateStudentMark
);

// Delete Marks
router.delete(
  "/:id",
  authMiddleware,
  deleteStudentMark
);

module.exports = router;