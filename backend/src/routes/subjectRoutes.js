const express =
  require("express");

const router =
  express.Router();

const {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject
} = require(
  "../controllers/subjectController"
);

const authMiddleware =
  require("../middlewares/authMiddleware");

const authorizeRoles =
  require("../middlewares/roleMiddleware");

// Create Subject
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  createSubject
);

// Get All Subjects
router.get(
  "/",
  authMiddleware,
  getAllSubjects
);

// Get Subject By Id
router.get(
  "/:id",
  authMiddleware,
  getSubjectById
);

// Update Subject
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  updateSubject
);

// Delete Subject
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  deleteSubject
);

module.exports = router;