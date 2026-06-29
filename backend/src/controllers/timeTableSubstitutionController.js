const {
  createTimeTableSubstitutionService,
  getAllTimeTableSubstitutionsService,
  getTimeTableSubstitutionByIdService,
  updateTimeTableSubstitutionService,
  deleteTimeTableSubstitutionService
} = require(
  "../services/timeTableSubstitutionService"
);

const createTimeTableSubstitution =
async (req, res) => {

  try {

    const result =
      await createTimeTableSubstitutionService({
        ...req.body,
        created_by:
          req.user.id
      });

    res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const getAllTimeTableSubstitutions =
async (req, res) => {

  try {

    const data =
      await getAllTimeTableSubstitutionsService();

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const getTimeTableSubstitutionById =
async (req, res) => {

  try {

    const data =
      await getTimeTableSubstitutionByIdService(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const updateTimeTableSubstitution =
async (req, res) => {

  try {

    await updateTimeTableSubstitutionService(
      req.params.id,
      {
        ...req.body,
        updated_by:
          req.user.id
      }
    );

    res.status(200).json({
      success: true,
      message:
        "Substitution Updated Successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const deleteTimeTableSubstitution =
async (req, res) => {

  try {

    await deleteTimeTableSubstitutionService(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Substitution Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createTimeTableSubstitution,
  getAllTimeTableSubstitutions,
  getTimeTableSubstitutionById,
  updateTimeTableSubstitution,
  deleteTimeTableSubstitution
};