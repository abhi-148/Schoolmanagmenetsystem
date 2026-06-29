const {
  createSchoolPeriodService,
  getAllSchoolPeriodsService,
  getSchoolPeriodByIdService,
  updateSchoolPeriodService,
  deleteSchoolPeriodService
} = require(
  "../services/schoolPeriodService"
);

// Create
const createSchoolPeriod =
async (req, res) => {

  try {

    const result =
      await createSchoolPeriodService({
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

// Get All
const getAllSchoolPeriods =
async (req, res) => {

  try {

    const data =
      await getAllSchoolPeriodsService();

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
const getSchoolPeriodById =
async (req, res) => {

  try {

    const data =
      await getSchoolPeriodByIdService(
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

// Update
const updateSchoolPeriod =
async (req, res) => {

  try {

    await updateSchoolPeriodService(
      req.params.id,
      {
        ...req.body,
        updated_by:
          req.user.id
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "School Period Updated Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Delete
const deleteSchoolPeriod =
async (req, res) => {

  try {

    await deleteSchoolPeriodService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "School Period Deleted Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createSchoolPeriod,
  getAllSchoolPeriods,
  getSchoolPeriodById,
  updateSchoolPeriod,
  deleteSchoolPeriod
};