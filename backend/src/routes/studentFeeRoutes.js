const express = require("express");

const router = express.Router();

const {
  createStudentFeePayment,
  getAllStudentFeePayments,
  getPaymentsByStudent,
  updateStudentFeePayment,
  deleteStudentFeePayment
} = require(
  "../controllers/studentFeeController"
);

const authMiddleware =
  require("../middlewares/authMiddleware");

const authorizeRoles =
  require("../middlewares/roleMiddleware");

// Create Payment
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  createStudentFeePayment
);

// Get All Payments
router.get(
  "/",
  authMiddleware,
  getAllStudentFeePayments
);

// Get Payments By Student
router.get(
  "/student/:studentId",
  authMiddleware,
  getPaymentsByStudent
);

// Update Payment
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  updateStudentFeePayment
);

// Delete Payment
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  deleteStudentFeePayment
);

module.exports = router;