const {

  createTimeTableService,

  getAllTimeTablesService,

  getTimeTableByIdService,

  getTimeTableByBatchService,

  updateTimeTableService,

  deleteTimeTableService

} = require("../services/timeTableV2Service");

// ==========================================
// Create
// ==========================================

const createTimeTable = async (
  req,
  res
) => {

  try {

    const result =
      await createTimeTableService({

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

// ==========================================
// Get All
// ==========================================

const getAllTimeTables = async (
  req,
  res
) => {

  try {

    const data =
      await getAllTimeTablesService();

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

// ==========================================
// Get By Id
// ==========================================

const getTimeTableById = async (
  req,
  res
) => {

  try {

    const data =
      await getTimeTableByIdService(
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

// ==========================================
// Get By Batch
// ==========================================

const getTimeTableByBatch = async (
  req,
  res
) => {

  try {

    const data =
      await getTimeTableByBatchService(
        req.params.batchId
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

// ==========================================
// Update
// ==========================================

const updateTimeTable = async (
  req,
  res
) => {

  try {

    await updateTimeTableService(

      req.params.id,

      {

        ...req.body,

        updated_by: req.user.id

      }

    );

    return res.status(200).json({

      success: true,

      message:
        "Time Table Updated Successfully"

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ==========================================
// Delete
// ==========================================

const deleteTimeTable = async (
  req,
  res
) => {

  try {

    await deleteTimeTableService(
      req.params.id
    );

    return res.status(200).json({

      success: true,

      message:
        "Time Table Deleted Successfully"

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

module.exports = {

  createTimeTable,

  getAllTimeTables,

  getTimeTableById,

  getTimeTableByBatch,

  updateTimeTable,

  deleteTimeTable

};