const {
  createSchoolTransferService,
  getAllSchoolTransfersService,
  getSchoolTransferByIdService,
  approveSchoolTransferService,
  rejectSchoolTransferService,
  completeSchoolTransferService
} = require("../services/schoolTransferService");

// Create
const createSchoolTransfer = async (req, res) => {

  try {

    const result =
      await createSchoolTransferService({
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
const getAllSchoolTransfers = async (req, res) => {

  try {

    const data =
  await getAllSchoolTransfersService(
    req.user
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

// Get By Id
const getSchoolTransferById = async (req, res) => {

  try {

    const data =
      await getSchoolTransferByIdService(
        req.params.id,
        req.user
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

// Approve
const approveSchoolTransfer = async (req, res) => {

  try {

    await approveSchoolTransferService(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "School Transfer Approved Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Reject
const rejectSchoolTransfer = async (req, res) => {

  try {

    await rejectSchoolTransferService(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "School Transfer Rejected Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Complete
const completeSchoolTransfer = async (req, res) => {

  try {

    await completeSchoolTransferService(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "School Transfer Completed Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createSchoolTransfer,
  getAllSchoolTransfers,
  getSchoolTransferById,
  approveSchoolTransfer,
  rejectSchoolTransfer,
  completeSchoolTransfer
};