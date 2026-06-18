const express =
  require("express");

const router =
  express.Router();

const {
  createTeacherSubject,
  getAllTeacherSubjects,
  getSubjectsByTeacher,
  deleteTeacherSubject
} = require(
  "../controllers/teacherSubjectController"
);

const authMiddleware =
  require("../middlewares/authMiddleware");

const authorizeRoles =
  require("../middlewares/roleMiddleware");

// Assign Subject
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  createTeacherSubject
);

// Get By Teacher
router.get(
  "/staff/:staffId",
  authMiddleware,
  getSubjectsByTeacher
);

// Get All
router.get(
  "/",
  authMiddleware,
  getAllTeacherSubjects
);

// Delete
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  deleteTeacherSubject
);

module.exports = router;