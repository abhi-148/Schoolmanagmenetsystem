const express =
  require("express");

const router =
  express.Router();

const {
  createFeeStructure,
  getAllFeeStructures,
  getFeeStructuresByClass,
  updateFeeStructure,
  deleteFeeStructure
} = require(
  "../controllers/feeStructureController"
);

const authMiddleware =
  require("../middlewares/authMiddleware");

const authorizeRoles =
  require("../middlewares/roleMiddleware");

// Create
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  createFeeStructure
);

// Get By Class
router.get(
  "/class/:schoolClassId",
  authMiddleware,
  getFeeStructuresByClass
);

// Get All
router.get(
  "/",
  authMiddleware,
  getAllFeeStructures
);

// Update
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  updateFeeStructure
);

// Delete
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  deleteFeeStructure
);

module.exports = router;