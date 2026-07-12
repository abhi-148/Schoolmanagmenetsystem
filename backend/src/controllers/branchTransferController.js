const {
  createBranchTransferService,
  getAllBranchTransfersService,
  getBranchTransferByIdService,
  approveBranchTransferService,
  rejectBranchTransferService,
  completeBranchTransferService
} = require("../services/branchTransferService");

// Create
const createBranchTransfer = async (
  req,
  res
) => {

  try {

    const result =
      await createBranchTransferService({
        ...req.body,
        created_by_role: req.user.role,
        created_by_staff_id:
          req.user.role === "SCHOOL_ADMIN" ||
          req.user.role === "STAFF"
            ? req.user.id
            : null,
        created_by_student_id:
          req.user.role === "STUDENT"
            ? req.user.id
            : null
      });

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

// Get All
const getAllBranchTransfers =
async (req, res) => {

  try {

   const result =
await getAllBranchTransfersService(
  req.user
);
    return res.status(200).json({
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

// Get By Id
const getBranchTransferById =
async (req, res) => {

  try {

    const result =
      await getBranchTransferByIdService(
        req.params.id,
        req.user
      );

    return res.status(200).json({
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

// Approve
const approveBranchTransfer =
async (req, res) => {

  try {

    await approveBranchTransferService(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Branch Transfer Approved Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Reject
const rejectBranchTransfer =
async (req, res) => {

  try {

    await rejectBranchTransferService(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Branch Transfer Rejected Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Complete
const completeBranchTransfer =
async (req, res) => {

  try {

    await completeBranchTransferService(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Branch Transfer Completed Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createBranchTransfer,
  getAllBranchTransfers,
  getBranchTransferById,
  approveBranchTransfer,
  rejectBranchTransfer,
  completeBranchTransfer
};