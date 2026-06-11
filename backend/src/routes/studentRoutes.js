const express = require("express");

const router = express.Router();

const validate =
require("../middlewares/validationMiddleware");

const {
  createStudentValidation
} = require(
  "../validators/studentValidator"
);

const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  updateStudentStatus,
  getStudentsWithPagination,
  searchStudents
} = require(
  "../controllers/studentController"
);

router.post(
  "/",
  createStudentValidation,
  validate,
  createStudent
);

router.get(
  "/",
  getAllStudents
);

router.get(
  "/pagination",
  getStudentsWithPagination
);

router.get(
  "/search",
  searchStudents
);

router.get(
  "/:id",
  getStudentById
);

router.put(
  "/:id",
  createStudentValidation,
  validate,
  updateStudent
);

router.patch(
  "/:id/status",
  updateStudentStatus
);

module.exports = router;