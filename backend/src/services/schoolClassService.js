const {
  createSchoolClass,
  getAllSchoolClasses,
  getSchoolClassesBySchool,
  getSchoolClassById,
  getSchoolClassesByBranch,
  updateSchoolClass,
  updateSchoolClassBySchool,
  deleteSchoolClass,
  deleteSchoolClassBySchool
} = require("../repositories/schoolClassRepository");

// Create
const createSchoolClassService =
async (classData) => {

  classData.status =
    classData.status || "active";
    if (
  classData.created_by_role ===
  "SCHOOL_ADMIN"
) {

  classData.school_id =
    classData.schoolId;

}

  return await createSchoolClass(
    classData
  );

};

// Get All
const getAllSchoolClassesService =
async (user) => {

  if (
    user.role === "SUPER_ADMIN"
  ) {

    return await getAllSchoolClasses();

  }

  if (
    user.role === "SCHOOL_ADMIN"
  ) {

    return await getSchoolClassesBySchool(
      user.schoolId
    );

  }

  throw new Error(
    "Unauthorized"
  );

};

// Get By Id
const getSchoolClassByIdService =
async (id) => {

  return await getSchoolClassById(
    id
  );

};
const updateSchoolClassService =
async (
  id,
  data
) => {

  if (
    data.updated_by_role ===
    "SUPER_ADMIN"
  ) {

    return await updateSchoolClass(
      id,
      data
    );

  }

  if (
    data.updated_by_role ===
    "SCHOOL_ADMIN"
  ) {

    return await updateSchoolClassBySchool(
      id,
      data,
      data.schoolId
    );

  }

  throw new Error(
    "Unauthorized"
  );

};

// Get By Branch
const getSchoolClassesByBranchService =
async (branchId) => {

  return await getSchoolClassesByBranch(
    branchId
  );

};

// Delete
const deleteSchoolClassService =
async (
  id,
  user
) => {

  if (
    user.role ===
    "SUPER_ADMIN"
  ) {

    return await deleteSchoolClass(
      id
    );

  }

  if (
    user.role ===
    "SCHOOL_ADMIN"
  ) {

    return await deleteSchoolClassBySchool(
      id,
      user.schoolId
    );

  }

  throw new Error(
    "Unauthorized"
  );

};

module.exports = {
  createSchoolClassService,
  getAllSchoolClassesService,
  getSchoolClassByIdService,
  getSchoolClassesByBranchService,
  updateSchoolClassService,
  deleteSchoolClassService
};