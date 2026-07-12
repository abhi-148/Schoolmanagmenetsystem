const express =
  require("express");

const router =
  express.Router();

const {
  createSchoolClass,
  getAllSchoolClasses,
  getSchoolClassById,
  getSchoolClassesByBranch,
  updateSchoolClass,
  deleteSchoolClass
} = require(
  "../controllers/schoolClassController"
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
  createSchoolClass
);

// Get By Branch
router.get(
  "/branch/:branchId",
  authMiddleware,
  getSchoolClassesByBranch
);

// Get All
router.get(
  "/",
  authMiddleware,
  getAllSchoolClasses
);

// Get By Id
router.get(
  "/:id",
  authMiddleware,
  getSchoolClassById
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN"
  ),
  updateSchoolClass
);

// Delete
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
  "SUPER_ADMIN",
  "SCHOOL_ADMIN"
),
  deleteSchoolClass
);

module.exports = router;