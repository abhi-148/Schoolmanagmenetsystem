const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middlewares/authMiddleware");

const {
  createSchoolMedium,
  getAllSchoolMediums,
  getSchoolMediumById,
  updateSchoolMedium,
  approveSchoolMedium,
  rejectSchoolMedium,
  getSchoolMediumsBySchoolId,
  deleteSchoolMedium
} = require(
  "../controllers/schoolMediumController"
);

router.post(
  "/",
  authMiddleware,
  createSchoolMedium
);

router.get(
  "/",
  authMiddleware,
  getAllSchoolMediums
);

// IMPORTANT
router.get(
  "/school/:schoolId",
  authMiddleware,
  getSchoolMediumsBySchoolId
);

router.get(
  "/:id",
  authMiddleware,
  getSchoolMediumById
);

router.put(
  "/:id",
  authMiddleware,
  updateSchoolMedium
);

router.post(
  "/:id/approve",
  authMiddleware,
  approveSchoolMedium
);
router.delete(
  "/:id",
  authMiddleware,
  deleteSchoolMedium
);

router.post(
  "/:id/reject",
  authMiddleware,
  rejectSchoolMedium
);

module.exports = router;