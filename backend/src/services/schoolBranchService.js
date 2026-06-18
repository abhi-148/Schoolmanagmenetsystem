const {
  createSchoolBranch,
  getAllSchoolBranches,
  getSchoolBranchById,
  getBranchesBySchool,
  updateSchoolBranch,
  deleteSchoolBranch
} = require(
  "../repositories/schoolBranchRepository"
);

// Create Branch
const createSchoolBranchService =
async (branchData) => {

  branchData.status =
    branchData.status || "active";

  return await createSchoolBranch(
    branchData
  );

};

// Get All Branches
const getAllSchoolBranchesService =
async () => {

  return await getAllSchoolBranches();

};

// Get Branch By Id
const getSchoolBranchByIdService =
async (id) => {

  return await getSchoolBranchById(
    id
  );

};

// Get Branches By School
const getBranchesBySchoolService =
async (schoolId) => {

  return await getBranchesBySchool(
    schoolId
  );

};

// Update Branch
const updateSchoolBranchService =
async (
  id,
  data
) => {

  return await updateSchoolBranch(
    id,
    data
  );

};

// Delete Branch
const deleteSchoolBranchService =
async (id) => {

  return await deleteSchoolBranch(
    id
  );

};

module.exports = {
  createSchoolBranchService,
  getAllSchoolBranchesService,
  getSchoolBranchByIdService,
  getBranchesBySchoolService,
  updateSchoolBranchService,
  deleteSchoolBranchService
};