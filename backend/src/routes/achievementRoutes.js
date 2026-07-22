const express = require("express");

const router = express.Router();

const {
  createAchievement,
  getAllAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
  searchAchievement,
  getAchievementByCategory,
  getAchievementByLevel,
  getAchievementByStudent,
  getAchievementByStatus
} = require("../controllers/achievementController");

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
  createAchievement
);

// Search
router.get(
  "/search",
  authMiddleware,
  searchAchievement
);

// Filter By Category
router.get(
  "/category/:category",
  authMiddleware,
  getAchievementByCategory
);

// Filter By Level
router.get(
  "/level/:level",
  authMiddleware,
  getAchievementByLevel
);

// Filter By Student
router.get(
  "/student/:studentId",
  authMiddleware,
  getAchievementByStudent
);

// Filter By Status
router.get(
  "/status/:status",
  authMiddleware,
  getAchievementByStatus
);

// Get All
router.get(
  "/",
  authMiddleware,
  getAllAchievements
);

// Get By Id
router.get(
  "/:id",
  authMiddleware,
  getAchievementById
);

// Update
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  updateAchievement
);

// Delete
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  deleteAchievement
);

module.exports = router;