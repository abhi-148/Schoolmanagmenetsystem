const { body } = require("express-validator");

const createLibraryFinePaymentValidation = [

  body("school_id")
    .notEmpty()
    .withMessage("School Id is required")
    .isInt({ min: 1 })
    .withMessage("Invalid School Id"),

  body("fine_id")
    .notEmpty()
    .withMessage("Fine Id is required")
    .isInt({ min: 1 })
    .withMessage("Invalid Fine Id"),

  body("student_id")
    .notEmpty()
    .withMessage("Student Id is required")
    .isInt({ min: 1 })
    .withMessage("Invalid Student Id"),

  body("amount_paid")
    .notEmpty()
    .withMessage("Amount Paid is required")
    .isFloat({ min: 0 })
    .withMessage("Amount must be a valid number"),

  body("payment_date")
    .notEmpty()
    .withMessage("Payment Date is required")
    .isISO8601()
    .withMessage("Invalid Payment Date"),

  body("payment_mode")
    .notEmpty()
    .withMessage("Payment Mode is required")
    .isIn([
      "Cash",
      "UPI",
      "Card",
      "Net Banking",
      "Cheque",
      "Other"
    ])
    .withMessage("Invalid Payment Mode"),

  body("payment_status")
    .optional()
    .isIn([
      "SUCCESS",
      "FAILED",
      "PENDING"
    ])
    .withMessage("Invalid Payment Status"),

  body("status")
    .optional()
    .isIn([
      "ACTIVE",
      "INACTIVE"
    ])
    .withMessage("Invalid Status"),

  body("transaction_id")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Transaction Id must not exceed 100 characters"),

  body("receipt_path")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Receipt Path must not exceed 255 characters"),

  body("remarks")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Remarks must not exceed 500 characters")

];

module.exports = {
  createLibraryFinePaymentValidation
};