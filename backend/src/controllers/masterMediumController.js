const {
  createMasterMediumService,
  getAllMasterMediumsService,
  getMasterMediumByIdService,
  updateMasterMediumService,
  deleteMasterMediumService
} = require("../services/masterMediumService");

const createMasterMedium = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const result = await createMasterMediumService({
      medium_name: req.body.medium_name,
      description: req.body.description,
      created_by: 1
    });

    return res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error("CREATE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAllMasterMediums = async (req, res) => {
  try {
    const data = await getAllMasterMediumsService();

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

const getMasterMediumById = async (req, res) => {
  try {
    const data = await getMasterMediumByIdService(req.params.id);

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

const updateMasterMedium = async (req, res) => {
  try {
    await updateMasterMediumService(req.params.id, {
      medium_name: req.body.medium_name,
      description: req.body.description,
      updated_by: 1
    });

    return res.status(200).json({
      success: true,
      message: "Master Medium Updated Successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteMasterMedium = async (req, res) => {
  try {
    await deleteMasterMediumService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Master Medium Deleted Successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createMasterMedium,
  getAllMasterMediums,
  getMasterMediumById,
  updateMasterMedium,
  deleteMasterMedium
};