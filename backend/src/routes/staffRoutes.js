const express = require("express");

const router = express.Router();

const {
  createStaff,
  getAllStaff,
  loginStaff,
  getStaffProfile,
  changeStaffPassword,
  updateOwnProfile,
  updateStaff,
  deleteStaff
} = require("../controllers/staffController");

const authMiddleware =
  require("../middlewares/authMiddleware");

const authorizeRoles =
  require("../middlewares/roleMiddleware");

/* ===========================
   PUBLIC ROUTES
=========================== */

// Staff Login
router.post(
  "/login",
  loginStaff
);

/* ===========================
   STAFF SELF ROUTES
=========================== */

// Staff Profile
router.put(
  "/profile",
  authMiddleware,
  updateOwnProfile
);

// Change Password
router.put(
  "/change-password",
  authMiddleware,
  changeStaffPassword
);


/* ===========================
   ADMIN ROUTES
=========================== */

// Create Staff
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  createStaff
);

// Get All Staff
router.get(
  "/",
  authMiddleware,
  getAllStaff
);

// Update Staff
router.put(
  "/:id",
  authMiddleware,
  updateStaff
);

// Delete Staff
router.delete(
  "/:id",
  authMiddleware,
  deleteStaff
);

module.exports = router;