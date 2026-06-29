const express =
  require("express");

const router =
  express.Router();

const {
  createTimeTableSubstitution,
  getAllTimeTableSubstitutions,
  getTimeTableSubstitutionById,
  updateTimeTableSubstitution,
  deleteTimeTableSubstitution
} = require(
  "../controllers/timeTableSubstitutionController"
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
  createTimeTableSubstitution
);

// Get All
router.get(
  "/",
  authMiddleware,
  getAllTimeTableSubstitutions
);

// Get By Id
router.get(
  "/:id",
  authMiddleware,
  getTimeTableSubstitutionById
);

// Update
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  updateTimeTableSubstitution
);

// Delete
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  deleteTimeTableSubstitution
);

module.exports = router;