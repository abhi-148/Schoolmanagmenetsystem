const express = require("express");

const router = express.Router();

const {
  createSchoolPeriod,
  getAllSchoolPeriods,
  getSchoolPeriodById,
  updateSchoolPeriod,
  deleteSchoolPeriod
} = require(
  "../controllers/schoolPeriodController"
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
  createSchoolPeriod
);

// Get All
router.get(
  "/",
  authMiddleware,
  getAllSchoolPeriods
);

// Get By Id
router.get(
  "/:id",
  authMiddleware,
  getSchoolPeriodById
);

// Update
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  updateSchoolPeriod
);

// Delete
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  deleteSchoolPeriod
);

module.exports = router;