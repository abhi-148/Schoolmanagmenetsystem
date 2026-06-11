const {
  createFeeService,
  getAllFeesService,
  getFeesByStudentIdService
} = require("../services/feeService");

const createFee = async (
  req,
  res
) => {

  try {

    const result =
      await createFeeService(
        req.body
      );

    return res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const getAllFees = async (
  req,
  res
) => {

  try {

    const fees =
      await getAllFeesService();

    return res.status(200).json({
      success: true,
      data: fees
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const getFeesByStudentId = async (
  req,
  res
) => {

  try {

    const fees =
      await getFeesByStudentIdService(
        req.params.studentId
      );

    return res.status(200).json({
      success: true,
      data: fees
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createFee,
  getAllFees,
  getFeesByStudentId
};