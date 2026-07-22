const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middlewares/authMiddleware");

const authorizeRoles =
require("../middlewares/roleMiddleware");

const validate =
require("../middlewares/validationMiddleware");

const {
  createLostAndFoundValidation
} = require("../validators/lostAndFoundValidator");

const upload =
require("../middlewares/uploadMiddleware");

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
  upload.single("image"),   // <-- validation se pehle
  createLostAndFoundValidation,
  validate,
  createLostAndFound
);

// Get All Lost And Found
router.get(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN",
    "STAFF"
  ),
  getAllLostAndFound
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
  getLostAndFoundWithPagination
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
  searchLostAndFound
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
  getLostAndFoundById
);

// Update
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  upload.single("image"),
  createLostAndFoundValidation,
  validate,
  updateLostAndFound
);

// Update Status
router.patch(
  "/:id/status",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  updateLostAndFoundStatus
);

module.exports = router;