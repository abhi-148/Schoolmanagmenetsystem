const {
  createFee,
  getAllFees,
  getFeesByStudentId
} = require("../repositories/feeRepository");

const createFeeService = async (
  feeData
) => {

  await createFee(feeData);

  return {
    message:
      "Fee Added Successfully"
  };

};

const getAllFeesService =
  async () => {

    return await getAllFees();

  };

const getFeesByStudentIdService =
  async (studentId) => {

    return await getFeesByStudentId(
      studentId
    );

  };

module.exports = {
  createFeeService,
  getAllFeesService,
  getFeesByStudentIdService
};