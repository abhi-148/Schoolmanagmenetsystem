const {
  createAcademicYear,
  getAllAcademicYears,
  getAcademicYearsBySchool,
  getAcademicYearById,
  updateAcademicYear,
  deleteAcademicYear
} = require(
  "../repositories/academicYearRepository"
);

const createAcademicYearService =
async (data) => {

  data.status =
    data.status || "active";

  return await createAcademicYear(
    data
  );

};

const getAllAcademicYearsService =
async (user) => {

  if (
    user.role === "SUPER_ADMIN"
  ) {

    return await getAllAcademicYears();

  }

  if (
    user.role === "SCHOOL_ADMIN"
  ) {

    return await getAcademicYearsBySchool(
      user.schoolId
    );

  }

  throw new Error(
    "Unauthorized"
  );

};

const getAcademicYearByIdService =
async (id) => {

  return await getAcademicYearById(
    id
  );

};

const updateAcademicYearService =
async (
  id,
  data
) => {

  return await updateAcademicYear(
    id,
    data
  );

};

const deleteAcademicYearService =
async (id) => {

  return await deleteAcademicYear(
    id
  );

};

module.exports = {
  createAcademicYearService,
  getAllAcademicYearsService,
  getAcademicYearByIdService,
  updateAcademicYearService,
  deleteAcademicYearService
};