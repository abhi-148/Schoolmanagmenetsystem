const express = require("express");

const router = express.Router();

const {
  login,
  changePassword,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword
} = require("../controllers/authController");

const verifyToken =
require("../middlewares/authMiddleware");

router.post(
  "/login",
  login
);

router.post(
  "/change-password",
  verifyToken,
  changePassword
);

router.get(
  "/profile",
  verifyToken,
  getProfile
);

router.put(
  "/profile",
  verifyToken,
  updateProfile
);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/reset-password",
  resetPassword
);

module.exports = router;