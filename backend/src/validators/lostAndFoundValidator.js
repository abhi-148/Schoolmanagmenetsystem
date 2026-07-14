const { body } = require("express-validator");

const createLostAndFoundValidation = [

  body("school_id")
    .notEmpty()
    .withMessage("School Id is required")
    .isInt({ min: 1 })
    .withMessage("Invalid School Id"),

  body("branch_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid Branch Id"),

  body("item_name")
    .notEmpty()
    .withMessage("Item Name is required")
    .isLength({ max: 150 })
    .withMessage("Item Name must not exceed 150 characters"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isLength({ max: 100 })
    .withMessage("Category must not exceed 100 characters"),

  body("description")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),

  body("location_found")
    .notEmpty()
    .withMessage("Location Found is required")
    .isLength({ max: 255 })
    .withMessage("Location must not exceed 255 characters"),

  body("found_datetime")
    .notEmpty()
    .withMessage("Found Datetime is required")
    .isISO8601()
    .withMessage("Invalid Found Datetime"),

  body("status")
    .optional()
    .isIn([
      "UNCLAIMED",
      "CLAIMED",
      "DISCARDED"
    ])
    .withMessage("Invalid Item Status"),

  body("record_status")
    .optional()
    .isIn([
      "ACTIVE",
      "INACTIVE"
    ])
    .withMessage("Invalid Record Status")

];

module.exports = {
  createLostAndFoundValidation
};