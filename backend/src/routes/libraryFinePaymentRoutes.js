const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middlewares/authMiddleware");

const validate =
require("../middlewares/validationMiddleware");

const {
  createLibraryFinePaymentValidation
} = require("../validators/libraryFinePaymentValidator");

const {
  createLibraryFinePayment,
  getAllLibraryFinePayments,
  getLibraryFinePaymentById,
  updateLibraryFinePayment,
  updateLibraryFinePaymentStatus,
  getLibraryFinePaymentsWithPagination,
  searchLibraryFinePayments
} = require("../controllers/libraryFinePaymentController");

/* ===========================
   LIBRARY FINE PAYMENT ROUTES
=========================== */

// Create Library Fine Payment
router.post(
  "/",
  authMiddleware,
  createLibraryFinePaymentValidation,
  validate,
  createLibraryFinePayment
);

// Get All Library Fine Payments
router.get(
  "/",
  authMiddleware,
  getAllLibraryFinePayments
);

// Pagination
router.get(
  "/pagination",
  authMiddleware,
  getLibraryFinePaymentsWithPagination
);

// Search
router.get(
  "/search",
  authMiddleware,
  searchLibraryFinePayments
);

// Get By Id
router.get(
  "/:id",
  authMiddleware,
  getLibraryFinePaymentById
);

// Update
router.put(
  "/:id",
  authMiddleware,
  createLibraryFinePaymentValidation,
  validate,
  updateLibraryFinePayment
);

// Update Status
router.patch(
  "/:id/status",
  authMiddleware,
  updateLibraryFinePaymentStatus
);

module.exports = router;