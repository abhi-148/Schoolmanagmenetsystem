const express = require("express");

const router = express.Router();

const {
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  loginSchoolAdmin,
  deleteSchool
} = require("../controllers/schoolController");

const authMiddleware =
  require("../middlewares/authMiddleware");

const authorizeRoles =
  require("../middlewares/roleMiddleware");

// Only Super Admin Can Create School
router.post(
  "/",
  authMiddleware,
  authorizeRoles("SUPER_ADMIN"),
  createSchool
);

// Get All Schools
router.get(
  "/",
  authMiddleware,
  getAllSchools
);

// Get School By Id
router.get(
  "/:id",
  authMiddleware,
  getSchoolById
);

// Update School
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("SUPER_ADMIN"),
  updateSchool
);

// School Admin Login
router.post(
  "/admin/login",
  loginSchoolAdmin
);

// Delete School
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("SUPER_ADMIN"),
  deleteSchool
);

module.exports = router;