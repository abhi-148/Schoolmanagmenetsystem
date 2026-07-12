const express = require("express");

const router = express.Router();

const {
  createBranchTransfer,
  getAllBranchTransfers,
  getBranchTransferById,
  approveBranchTransfer,
  rejectBranchTransfer,
  completeBranchTransfer
} = require("../controllers/branchTransferController");

const authMiddleware =
  require("../middlewares/authMiddleware");

const authorizeRoles =
  require("../middlewares/roleMiddleware");

// Create Transfer
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "SCHOOL_ADMIN",
    "STAFF",
    "STUDENT"
  ),
  createBranchTransfer
);

// Get All Transfers
router.get(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  getAllBranchTransfers
);

// Get By Id
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN",
    "STAFF",
    "STUDENT"
  ),
  getBranchTransferById
);

// Approve
router.put(
  "/approve/:id",
  authMiddleware,
  authorizeRoles(
    "SCHOOL_ADMIN"
  ),
  approveBranchTransfer
);

// Reject
router.put(
  "/reject/:id",
  authMiddleware,
  authorizeRoles(
    "SCHOOL_ADMIN"
  ),
  rejectBranchTransfer
);

// Complete
router.put(
  "/complete/:id",
  authMiddleware,
  authorizeRoles(
    "SCHOOL_ADMIN"
  ),
  completeBranchTransfer
);

module.exports = router;