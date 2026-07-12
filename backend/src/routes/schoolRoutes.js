const express = require("express");

const router = express.Router();

const {
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  loginSchoolAdmin,
  resetSchoolAdminPassword,
  changeSchoolAdminPassword,
  getSchoolAdminProfile,
  updateSchoolAdminProfile,
  deleteSchool
} = require("../controllers/schoolController");

const authMiddleware =
  require("../middlewares/authMiddleware");

const authorizeRoles =
  require("../middlewares/roleMiddleware");

/* ===========================
   SCHOOL ADMIN LOGIN
=========================== */

router.post(
  "/admin/login",
  loginSchoolAdmin
);

/* ===========================
   SCHOOL ADMIN PROFILE
=========================== */

router.get(
  "/profile",
  authMiddleware,
  authorizeRoles("SCHOOL_ADMIN"),
  getSchoolAdminProfile
);

router.put(
  "/profile",
  authMiddleware,
  authorizeRoles("SCHOOL_ADMIN"),
  updateSchoolAdminProfile
);
router.put(
  "/change-password",
  authMiddleware,
  authorizeRoles("SCHOOL_ADMIN"),
  changeSchoolAdminPassword
);

router.put(
  "/admin/reset-password",
  authMiddleware,
  authorizeRoles("SUPER_ADMIN"),
  resetSchoolAdminPassword
);

/* ===========================
   SUPER ADMIN ROUTES
=========================== */

// Create School
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

// Delete School
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("SUPER_ADMIN"),
  deleteSchool
);

module.exports = router;