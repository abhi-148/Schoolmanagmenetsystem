const {
  body
} = require("express-validator");

const createStudentValidation = [

  body("full_name")
    .notEmpty()
    .withMessage(
      "Full Name is required"
    ),

  body("roll_number")
    .notEmpty()
    .withMessage(
      "Roll Number is required"
    ),

  body("phone")
    .notEmpty()
    .withMessage(
      "Phone Number is required"
    )

];

module.exports = {
  createStudentValidation
};