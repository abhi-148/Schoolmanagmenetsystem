const express = require("express");

const router = express.Router();

const {
  createStaffType,
  getAllStaffTypes,
  updateStaffType,
  deleteStaffType
} = require(
  "../controllers/staffTypeController"
);

router.post(
  "/",
  createStaffType
);

router.get(
  "/",
  getAllStaffTypes
);

router.put(
  "/:id",
  updateStaffType
);

router.delete(
  "/:id",
  deleteStaffType
);

module.exports = router;