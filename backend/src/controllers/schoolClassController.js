const {
  createSchoolClassService,
  getAllSchoolClassesService,
  getSchoolClassByIdService,
  getSchoolClassesByBranchService,
  updateSchoolClassService,
  deleteSchoolClassService
} = require("../services/schoolClassService");

// Create
const createSchoolClass =
async (req, res) => {

  try {

   const result =
await createSchoolClassService({
  ...req.body,
  created_by: req.user.id,
  created_by_role: req.user.role,
  schoolId: req.user.schoolId
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
const updateSchoolClass =
async (req, res) => {

  try {

  await updateSchoolClassService(
  req.params.id,
  {
    ...req.body,
    updated_by: req.user.id,
    updated_by_role: req.user.role,
    schoolId: req.user.schoolId
  }
);

    return res.status(200).json({
      success: true,
      message:
        "School Class Updated Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Get All
const getAllSchoolClasses =
async (req, res) => {

  try {

   const data =
await getAllSchoolClassesService(
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
const getSchoolClassById =
async (req, res) => {

  try {

    const data =
      await getSchoolClassByIdService(
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

// Get By Branch
const getSchoolClassesByBranch =
async (req, res) => {

  try {

    const data =
      await getSchoolClassesByBranchService(
        req.params.branchId
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

// Delete
const deleteSchoolClass =
async (req, res) => {

  try {

    await deleteSchoolClassService(
  req.params.id,
  req.user
);

    return res.status(200).json({
      success: true,
      message:
        "School Class Deleted Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createSchoolClass,
  getAllSchoolClasses,
  getSchoolClassById,
  getSchoolClassesByBranch,
  updateSchoolClass,
  deleteSchoolClass
};