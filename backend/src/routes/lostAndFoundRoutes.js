const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middlewares/authMiddleware");

const validate =
require("../middlewares/validationMiddleware");

const {
  createLostAndFoundValidation
} = require("../validators/lostAndFoundValidator");

const {
  createLostAndFound,
  getAllLostAndFound,
  getLostAndFoundById,
  updateLostAndFound,
  updateLostAndFoundStatus,
  getLostAndFoundWithPagination,
  searchLostAndFound
} = require("../controllers/lostAndFoundController");

/* ===========================
   LOST AND FOUND ROUTES
=========================== */

// Create Lost And Found
router.post(
  "/",
  authMiddleware,
  createLostAndFoundValidation,
  validate,
  createLostAndFound
);

// Get All Lost And Found
router.get(
  "/",
  authMiddleware,
  getAllLostAndFound
);

// Pagination
router.get(
  "/pagination",
  authMiddleware,
  getLostAndFoundWithPagination
);

// Search
router.get(
  "/search",
  authMiddleware,
  searchLostAndFound
);

// Get By Id
router.get(
  "/:id",
  authMiddleware,
  getLostAndFoundById
);

// Update
router.put(
  "/:id",
  authMiddleware,
  createLostAndFoundValidation,
  validate,
  updateLostAndFound
);

// Update Status
router.patch(
  "/:id/status",
  authMiddleware,
  updateLostAndFoundStatus
);

module.exports = router;