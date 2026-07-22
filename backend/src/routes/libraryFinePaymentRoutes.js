const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middlewares/authMiddleware");
const authorizeRoles =
require("../middlewares/roleMiddleware");

const validate =
require("../middlewares/validationMiddleware");

const {
  createLibraryFinePaymentValidation
} = require("../validators/libraryFinePaymentValidator");
const upload =
require("../middlewares/uploadMiddleware");

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
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  upload.single("receipt"),
  createLibraryFinePaymentValidation,
  validate,
  createLibraryFinePayment
);

// Get All Library Fine Payments
router.get(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN",
    "STAFF"
  ),
  getAllLibraryFinePayments
);

// Pagination
router.get(
  "/pagination",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN",
    "STAFF"
  ),
  getLibraryFinePaymentsWithPagination
);

// Search
router.get(
  "/search",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN",
    "STAFF"
  ),
  searchLibraryFinePayments
);

// Get By Id
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN",
    "STAFF"
  ),
  getLibraryFinePaymentById
);

// Update
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  upload.single("receipt"),
  createLibraryFinePaymentValidation,
  validate,
  updateLibraryFinePayment
);

// Update Status
router.patch(
  "/:id/status",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  updateLibraryFinePaymentStatus
);

module.exports = router;