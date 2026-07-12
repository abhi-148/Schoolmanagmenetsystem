const express = require("express");

const router = express.Router();

const {
  createSchoolTransfer,
  getAllSchoolTransfers,
  getSchoolTransferById,
  approveSchoolTransfer,
  rejectSchoolTransfer,
  completeSchoolTransfer
} = require("../controllers/schoolTransferController");

const authMiddleware =
  require("../middlewares/authMiddleware");

const authorizeRoles =
  require("../middlewares/roleMiddleware");

// Create Transfer
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN",
    "STAFF",
    "STUDENT"
  ),
  createSchoolTransfer
);

// Get All Transfers
router.get(
  "/",
  authMiddleware,
  getAllSchoolTransfers
);

// Get Transfer By Id
router.get(
  "/:id",
  authMiddleware,
  getSchoolTransferById
);

// Approve Transfer
router.put(
  "/approve/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  approveSchoolTransfer
);

// Reject Transfer
router.put(
  "/reject/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  rejectSchoolTransfer
);

// Complete Transfer
router.put(
  "/complete/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  completeSchoolTransfer
);

module.exports = router;