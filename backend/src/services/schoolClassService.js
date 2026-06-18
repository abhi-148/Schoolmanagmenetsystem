const {
  createSchoolClass,
  getAllSchoolClasses,
  getSchoolClassById,
  getSchoolClassesByBranch,
  updateSchoolClass,
  deleteSchoolClass
} = require("../repositories/schoolClassRepository");

// Create
const createSchoolClassService =
async (classData) => {

  classData.status =
    classData.status || "active";

  return await createSchoolClass(
    classData
  );

};

// Get All
const getAllSchoolClassesService =
async () => {

  return await getAllSchoolClasses();

};

// Get By Id
const getSchoolClassByIdService =
async (id) => {

  return await getSchoolClassById(
    id
  );

};
const updateSchoolClassService =
async (id, data) => {

  return await updateSchoolClass(
    id,
    data
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
async (id) => {

  return await deleteSchoolClass(
    id
  );

};

module.exports = {
  createSchoolClassService,
  getAllSchoolClassesService,
  getSchoolClassByIdService,
  getSchoolClassesByBranchService,
  deleteSchoolClassService
};