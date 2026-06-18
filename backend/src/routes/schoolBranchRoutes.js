const express = require("express");

const router = express.Router();

const {
  createSchoolBranch,
  getAllSchoolBranches,
  getSchoolBranchById,
  getBranchesBySchool,
  updateSchoolBranch,
  deleteSchoolBranch
} = require("../controllers/schoolBranchController");

const authMiddleware =
  require("../middlewares/authMiddleware");

const authorizeRoles =
  require("../middlewares/roleMiddleware");

// Create Branch
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  createSchoolBranch
);

// Get All Branches
router.get(
  "/",
  authMiddleware,
  getAllSchoolBranches
);

// Get Branches By School
router.get(
  "/school/:schoolId",
  authMiddleware,
  getBranchesBySchool
);

// Get Branch By Id
router.get(
  "/:id",
  authMiddleware,
  getSchoolBranchById
);

// Update Branch
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  updateSchoolBranch
);

// Delete Branch
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  deleteSchoolBranch
);

module.exports = router;