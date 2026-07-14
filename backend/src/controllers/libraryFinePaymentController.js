const {
  createLibraryFinePaymentService,
  getAllLibraryFinePaymentsService,
  getLibraryFinePaymentByIdService,
  updateLibraryFinePaymentService,
  updateLibraryFinePaymentStatusService,
  getLibraryFinePaymentsWithPaginationService,
  searchLibraryFinePaymentsService
} = require("../services/libraryFinePaymentService");

// Create Library Fine Payment
const createLibraryFinePayment = async (
  req,
  res
) => {

  try {

    const result =
      await createLibraryFinePaymentService(
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

// Get All Library Fine Payments
const getAllLibraryFinePayments = async (
  req,
  res
) => {

  try {

    const payments =
      await getAllLibraryFinePaymentsService();

    return res.status(200).json({
      success: true,
      data: payments
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Get Library Fine Payment By Id
const getLibraryFinePaymentById = async (
  req,
  res
) => {

  try {

    const payment =
      await getLibraryFinePaymentByIdService(
        req.params.id
      );

    if (!payment) {

      return res.status(404).json({
        success: false,
        message: "Library Fine Payment Not Found"
      });

    }

    return res.status(200).json({
      success: true,
      data: payment
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Update Library Fine Payment
const updateLibraryFinePayment = async (
  req,
  res
) => {

  try {

    await updateLibraryFinePaymentService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message:
        "Library Fine Payment Updated Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Update Library Fine Payment Status
const updateLibraryFinePaymentStatus = async (
  req,
  res
) => {

  try {

    await updateLibraryFinePaymentStatusService(
      req.params.id,
      req.body.status
    );

    return res.status(200).json({
      success: true,
      message:
        "Library Fine Payment Status Updated Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Pagination
const getLibraryFinePaymentsWithPagination =
async (
  req,
  res
) => {

  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const offset =
      (page - 1) * limit;

    const payments =
      await getLibraryFinePaymentsWithPaginationService(
        limit,
        offset
      );

    return res.status(200).json({
      success: true,
      data: payments
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Search
const searchLibraryFinePayments = async (
  req,
  res
) => {

  try {

    const payments =
      await searchLibraryFinePaymentsService(
        req.query.search
      );

    return res.status(200).json({
      success: true,
      data: payments
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createLibraryFinePayment,
  getAllLibraryFinePayments,
  getLibraryFinePaymentById,
  updateLibraryFinePayment,
  updateLibraryFinePaymentStatus,
  getLibraryFinePaymentsWithPagination,
  searchLibraryFinePayments
};