const express =
  require("express");

const router =
  express.Router();

const {
  createSection,
  getAllSections,
  getSectionById,
  getSectionsByClass,
  deleteSection
} = require(
  "../controllers/sectionController"
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
  createSection
);

// Get By Class
router.get(
  "/class/:schoolClassId",
  authMiddleware,
  getSectionsByClass
);

// Get All
router.get(
  "/",
  authMiddleware,
  getAllSections
);

// Get By Id
router.get(
  "/:id",
  authMiddleware,
  getSectionById
);

// Delete
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  deleteSection
);

module.exports = router;