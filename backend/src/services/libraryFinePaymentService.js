const {
  createLibraryFinePayment,
  getAllLibraryFinePayments,
  getLibraryFinePaymentById,
  updateLibraryFinePayment,
  updateLibraryFinePaymentStatus,
  getLibraryFinePaymentsWithPagination,
  findTransactionById,
  searchLibraryFinePayments
} = require("../repositories/libraryFinePaymentRepository");

// Create Library Fine Payment
const createLibraryFinePaymentService = async (
  paymentData
) => {

  const transaction =
    await findTransactionById(
      paymentData.transaction_id
    );

  if (transaction) {

    throw new Error(
      "Transaction Id Already Exists"
    );

  }

  paymentData.status = "ACTIVE";

  if (!paymentData.payment_status) {

    paymentData.payment_status =
      "PENDING";

  }

  await createLibraryFinePayment(
    paymentData
  );

  return {
    message:
      "Library Fine Payment Created Successfully"
  };

};

// Get All Library Fine Payments
const getAllLibraryFinePaymentsService =
async () => {

  return await getAllLibraryFinePayments();

};

// Get Library Fine Payment By Id
const getLibraryFinePaymentByIdService =
async (id) => {

  return await getLibraryFinePaymentById(
    id
  );

};

// Update Library Fine Payment
const updateLibraryFinePaymentService =
async (
  id,
  data
) => {

  return await updateLibraryFinePayment(
    id,
    data
  );

};

// Update Status
const updateLibraryFinePaymentStatusService =
async (
  id,
  status
) => {

  return await updateLibraryFinePaymentStatus(
    id,
    status
  );

};

// Pagination
const getLibraryFinePaymentsWithPaginationService =
async (
  limit,
  offset
) => {

  return await getLibraryFinePaymentsWithPagination(
    limit,
    offset
  );

};

// Search
const searchLibraryFinePaymentsService =
async (
  search
) => {

  return await searchLibraryFinePayments(
    search
  );

};

module.exports = {
  createLibraryFinePaymentService,
  getAllLibraryFinePaymentsService,
  getLibraryFinePaymentByIdService,
  updateLibraryFinePaymentService,
  updateLibraryFinePaymentStatusService,
  getLibraryFinePaymentsWithPaginationService,
  searchLibraryFinePaymentsService
};