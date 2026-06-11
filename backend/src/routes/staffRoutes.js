const express = require("express");

const router = express.Router();

const {
  createStaff,
  getAllStaff,
  loginStaff,
  updateStaff,
  deleteStaff
} = require("../controllers/staffController");

const authMiddleware =
  require("../middlewares/authMiddleware");

const authorizeRoles =
  require("../middlewares/roleMiddleware");

// Only School Admin & Super Admin Can Create Staff
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

// Staff Login
router.post(
  "/login",
  loginStaff
);

module.exports = router;