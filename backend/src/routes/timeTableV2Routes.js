const express =
  require("express");

const router =
  express.Router();

const {
  createTimeTable,
  getAllTimeTables,
  getTimeTableByBatch,
  getTimeTableById,
  updateTimeTable,
  deleteTimeTable
} = require(
  "../controllers/timeTableV2Controller"
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
  createTimeTable
);

// Get All
router.get(
  "/",
  authMiddleware,
  getAllTimeTables
);

// Get By Batch
router.get(
  "/batch/:batchId",
  authMiddleware,
  getTimeTableByBatch
);
router.get(
  "/:id",
  authMiddleware,
  getTimeTableById
);

// Update
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  updateTimeTable
);

// Delete
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  deleteTimeTable
);

module.exports = router;