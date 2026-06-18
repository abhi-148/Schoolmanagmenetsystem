const {
  createFeeStructureService,
  getAllFeeStructuresService,
  getFeeStructuresByClassService,
  updateFeeStructureService,
  deleteFeeStructureService
} = require("../services/feeStructureService");

// Create
const createFeeStructure = async (req, res) => {

  console.log("BODY => ", req.body);

  try {

    const result =
      await createFeeStructureService({
        ...req.body,
        created_by: req.user.id
      });

    return res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {

    console.error(
      "Fee Structure Error =>",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
      sqlMessage: error.sqlMessage
    });

  }

};

// Get All
const getAllFeeStructures = async (req, res) => {

  try {

    const data =
      await getAllFeeStructuresService();

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    console.error(
      "Fee Structure Error =>",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
      sqlMessage: error.sqlMessage
    });

  }

};

// Get By Class
const getFeeStructuresByClass = async (req, res) => {

  try {

    const data =
      await getFeeStructuresByClassService(
        req.params.schoolClassId
      );

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    console.error(
      "Fee Structure Error =>",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
      sqlMessage: error.sqlMessage
    });

  }

};

// Update
const updateFeeStructure = async (req, res) => {

  try {

    await updateFeeStructureService(
      req.params.id,
      {
        ...req.body,
        updated_by: req.user.id
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Fee Structure Updated Successfully"
    });

  } catch (error) {

    console.error(
      "Fee Structure Error =>",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
      sqlMessage: error.sqlMessage
    });

  }

};

// Delete
const deleteFeeStructure = async (req, res) => {

  try {

    await deleteFeeStructureService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Fee Structure Deleted Successfully"
    });

  } catch (error) {

    console.error(
      "Fee Structure Error =>",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
      sqlMessage: error.sqlMessage
    });

  }

};

module.exports = {
  createFeeStructure,
  getAllFeeStructures,
  getFeeStructuresByClass,
  updateFeeStructure,
  deleteFeeStructure
};