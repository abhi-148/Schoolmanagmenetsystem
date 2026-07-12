const {
  createSchoolBranch,
  getAllSchoolBranches,
  getSchoolBranchById,
  getBranchesBySchool,
  updateSchoolBranch,
  updateSchoolBranchBySchool,
  deleteSchoolBranch,
  deleteSchoolBranchBySchool
} = require(
  "../repositories/schoolBranchRepository"
);
// Create Branch
const createSchoolBranchService =
async (branchData) => {

  branchData.status =
    branchData.status || "active";

  if (
    branchData.created_by_role ===
    "SCHOOL_ADMIN"
  ) {

    branchData.school_id =
      branchData.schoolId;

  }

  return await createSchoolBranch(
    branchData
  );

};

// Get All Branches
const getAllSchoolBranchesService =
async (user) => {

  return await getAllSchoolBranches(
    user
  );

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
  data,
  user
) => {

  if (
    user.role === "SUPER_ADMIN"
  ) {

    return await updateSchoolBranch(
      id,
      data
    );

  }

  if (
    user.role === "SCHOOL_ADMIN"
  ) {

    return await updateSchoolBranchBySchool(
      id,
      data,
      user.schoolId
    );

  }

  throw new Error("Unauthorized");

};

// Delete Branch
const deleteSchoolBranchService =
async (
  id,
  user
) => {

  if (
    user.role === "SUPER_ADMIN"
  ) {

    return await deleteSchoolBranch(
      id
    );

  }

  if (
    user.role === "SCHOOL_ADMIN"
  ) {

    return await deleteSchoolBranchBySchool(
      id,
      user.schoolId
    );

  }

  throw new Error("Unauthorized");

};

module.exports = {
  createSchoolBranchService,
  getAllSchoolBranchesService,
  getSchoolBranchByIdService,
  getBranchesBySchoolService,
  updateSchoolBranchService,
  deleteSchoolBranchService
};