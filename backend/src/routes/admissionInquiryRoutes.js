const express = require("express");

const router = express.Router();

const {
  createAdmissionInquiry,
  getAllAdmissionInquiries,
  getAdmissionInquiryById,
  updateAdmissionInquiry,
  deleteAdmissionInquiry,
  searchAdmissionInquiry,
  getAdmissionInquiryByStatus,
  getAdmissionInquiryByAssignedStaff
} = require("../controllers/admissionInquiryController");

const authMiddleware = require("../middlewares/authMiddleware");

const authorizeRoles = require("../middlewares/roleMiddleware");

// Create
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  createAdmissionInquiry
);

// Search (IMPORTANT: :id se pehle hona chahiye)
router.get(
  "/search",
  authMiddleware,
  searchAdmissionInquiry
);

// Filter By Status
router.get(
  "/status/:status",
  authMiddleware,
  getAdmissionInquiryByStatus
);

// Filter By Assigned Staff
router.get(
  "/assigned/:staffId",
  authMiddleware,
  getAdmissionInquiryByAssignedStaff
);

// Get All
router.get(
  "/",
  authMiddleware,
  getAllAdmissionInquiries
);

// Get By Id (Always routes with :id should be below search/status)
router.get(
  "/:id",
  authMiddleware,
  getAdmissionInquiryById
);

// Update
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  updateAdmissionInquiry
);

// Delete
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("SUPER_ADMIN"),
  deleteAdmissionInquiry
);

module.exports = router;