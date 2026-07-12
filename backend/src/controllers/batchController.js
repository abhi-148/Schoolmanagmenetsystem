const {
  createBatchService,
  getAllBatchesService,
  getBatchByIdService,
  updateBatchService,
  deleteBatchService
} = require("../services/batchService");

const createBatch = async (
  req,
  res
) => {

  try {

    const result =
      await createBatchService({
        ...req.body,
        created_by: req.user.id
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

const getAllBatches =
async (req, res) => {

  try {

    const data =
      await getAllBatchesService(
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

const getBatchById =
async (req, res) => {

  try {

    const data =
      await getBatchByIdService(
        req.params.id
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

const updateBatch =
async (req, res) => {

  try {

    await updateBatchService(
      req.params.id,
      {
        ...req.body,
        updated_by: req.user.id
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Batch Updated Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const deleteBatch =
async (req, res) => {

  try {

    await deleteBatchService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Batch Deleted Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createBatch,
  getAllBatches,
  getBatchById,
  updateBatch,
  deleteBatch
};