const express =
  require("express");

const router =
  express.Router();

const {
  createClassSubject,
  getAllClassSubjects,
  getSubjectsByClass,
  deleteClassSubject
} = require(
  "../controllers/classSubjectController"
);

const authMiddleware =
  require("../middlewares/authMiddleware");

const authorizeRoles =
  require("../middlewares/roleMiddleware");

// Create Mapping
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  createClassSubject
);

// Get Subjects By Class
router.get(
  "/class/:schoolClassId",
  authMiddleware,
  getSubjectsByClass
);

// Get All Mappings
router.get(
  "/",
  authMiddleware,
  getAllClassSubjects
);

// Delete Mapping
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  deleteClassSubject
);

module.exports = router;