const express =
  require("express");

const router =
  express.Router();

const {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass
} = require(
  "../controllers/classController"
);

const authMiddleware =
  require("../middlewares/authMiddleware");

const authorizeRoles =
  require("../middlewares/roleMiddleware");

// Create Class
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  createClass
);

// Get All Classes
router.get(
  "/",
  authMiddleware,
  getAllClasses
);

// Get Class By Id
router.get(
  "/:id",
  authMiddleware,
  getClassById
);

// Update Class
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  updateClass
);

// Delete Class
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "SUPER_ADMIN"
  ),
  deleteClass
);

module.exports = router;