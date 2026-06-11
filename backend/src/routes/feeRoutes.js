const express = require("express");

const router = express.Router();

const {
  createFee,
  getAllFees,
  getFeesByStudentId
} = require("../controllers/feeController");

router.post("/", createFee);

router.get("/", getAllFees);

router.get(
  "/:studentId",
  getFeesByStudentId
);

module.exports = router;