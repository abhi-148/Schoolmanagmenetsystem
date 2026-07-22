const {
  createAcademicYear,
  getAllAcademicYears,
  getAcademicYearsBySchool,
  getAcademicYearById,
  updateAcademicYear,
  deleteAcademicYear,
  checkDuplicateAcademicYear,
  getCurrentAcademicYear
} = require("../repositories/academicYearRepository");
const createAcademicYearService = async (data) => {

  data.status = data.status || "active";

  if (data.start_date >= data.end_date) {
    throw new Error(
      "Start Date must be before End Date"
    );
  }

  const duplicate =
    await checkDuplicateAcademicYear(
      data.school_id,
      data.branch_id,
      data.academic_year_name
    );

  if (duplicate.length > 0) {
    throw new Error(
      "Academic Year already exists"
    );
  }

  return await createAcademicYear(data);

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

  if (data.start_date >= data.end_date) {
    throw new Error(
      "Start Date must be before End Date"
    );
  }

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