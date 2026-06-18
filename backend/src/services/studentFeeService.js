const {
  createStudentFeePayment,
  getAllStudentFeePayments,
  getPaymentsByStudent,
  updateStudentFeePayment,
  deleteStudentFeePayment
} = require(
  "../repositories/studentFeeRepository"
);

const createStudentFeePaymentService =
async (data) => {

  return await createStudentFeePayment(
    data
  );

};

const getAllStudentFeePaymentsService =
async () => {

  return await getAllStudentFeePayments();

};

const getPaymentsByStudentService =
async (studentId) => {

  return await getPaymentsByStudent(
    studentId
  );

};

const updateStudentFeePaymentService =
async (
  id,
  data
) => {

  return await updateStudentFeePayment(
    id,
    data
  );

};

const deleteStudentFeePaymentService =
async (id) => {

  return await deleteStudentFeePayment(
    id
  );

};

module.exports = {
  createStudentFeePaymentService,
  getAllStudentFeePaymentsService,
  getPaymentsByStudentService,
  updateStudentFeePaymentService,
  deleteStudentFeePaymentService
};