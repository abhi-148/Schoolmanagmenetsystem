const {
  createStudentFeePaymentService,
  getAllStudentFeePaymentsService,
  getPaymentsByStudentService,
  updateStudentFeePaymentService,
  deleteStudentFeePaymentService
} = require("../services/studentFeeService");

// Create Payment
const createStudentFeePayment = async (req, res) => {

  console.log("BODY => ", req.body);

  try {

    const result =
      await createStudentFeePaymentService({
        ...req.body,
        created_by: req.user.id
      });

    return res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {

    console.error(
      "Student Fee Error =>",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
      sqlMessage: error.sqlMessage
    });

  }

};

// Get All Payments
const getAllStudentFeePayments = async (req, res) => {

  try {

    const data =
      await getAllStudentFeePaymentsService();

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Get Payments By Student
const getPaymentsByStudent = async (req, res) => {

  try {

    const data =
      await getPaymentsByStudentService(
        req.params.studentId
      );

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Update Payment
const updateStudentFeePayment = async (req, res) => {

  try {

    await updateStudentFeePaymentService(
      req.params.id,
      {
        ...req.body,
        updated_by: req.user.id
      }
    );

    return res.status(200).json({
      success: true,
      message: "Payment Updated Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Delete Payment
const deleteStudentFeePayment = async (req, res) => {

  try {

    await deleteStudentFeePaymentService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Payment Deleted Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createStudentFeePayment,
  getAllStudentFeePayments,
  getPaymentsByStudent,
  updateStudentFeePayment,
  deleteStudentFeePayment
};