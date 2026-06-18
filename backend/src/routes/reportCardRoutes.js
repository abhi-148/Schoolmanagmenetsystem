const express =
require("express");

const router =
express.Router();

const {
  getStudentReportCard
} = require(
  "../controllers/reportCardController"
);

const authMiddleware =
require("../middlewares/authMiddleware");

router.get(
  "/:studentId/:examId",
  authMiddleware,
  getStudentReportCard
);

module.exports = router;