const {
  createSchoolBranchService,
  getAllSchoolBranchesService,
  getSchoolBranchByIdService,
  getBranchesBySchoolService,
  updateSchoolBranchService,
  deleteSchoolBranchService
} = require(
  "../services/schoolBranchService"
);

// Create Branch
const createSchoolBranch =
async (req, res) => {

  try {

    const result =
await createSchoolBranchService({
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

// Get All Branches
const getAllSchoolBranches =
async (req, res) => {

  try {

   const data =
await getAllSchoolBranchesService(
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

// Get Branch By Id
const getSchoolBranchById =
async (req, res) => {

  try {

    const data =
      await getSchoolBranchByIdService(
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

// Get Branches By School
const getBranchesBySchool =
async (req, res) => {

  try {

    const data =
      await getBranchesBySchoolService(
        req.params.schoolId
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

// Update Branch
const updateSchoolBranch =
async (req, res) => {

  try {

    await updateSchoolBranchService(
  req.params.id,
  {
    ...req.body,
    updated_by: req.user.id
  },
  req.user
);

    return res.status(200).json({
      success: true,
      message:
        "Branch Updated Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Delete Branch
const deleteSchoolBranch =
async (req, res) => {

  try {

  await deleteSchoolBranchService(
  req.params.id,
  req.user
);

    return res.status(200).json({
      success: true,
      message:
        "Branch Deleted Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createSchoolBranch,
  getAllSchoolBranches,
  getSchoolBranchById,
  getBranchesBySchool,
  updateSchoolBranch,
  deleteSchoolBranch
};