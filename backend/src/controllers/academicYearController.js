const {
  createAcademicYearService,
  getAllAcademicYearsService,
  getAcademicYearByIdService,
  updateAcademicYearService,
  deleteAcademicYearService
} = require(
  "../services/academicYearService"
);

// Create
const createAcademicYear =
async (req, res) => {

  try {

    const result =
      await createAcademicYearService({
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
const getAllAcademicYears =
async (req, res) => {

  try {

    const data =
      await getAllAcademicYearsService();

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
const getAcademicYearById =
async (req, res) => {

  try {

    const data =
      await getAcademicYearByIdService(
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
const updateAcademicYear =
async (req, res) => {

  try {

    await updateAcademicYearService(
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
        "Academic Year Updated Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Delete
const deleteAcademicYear =
async (req, res) => {

  try {

    await deleteAcademicYearService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Academic Year Deleted Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createAcademicYear,
  getAllAcademicYears,
  getAcademicYearById,
  updateAcademicYear,
  deleteAcademicYear
};