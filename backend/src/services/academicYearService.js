const {
  createAcademicYear,
  getAllAcademicYears,
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
async () => {

  return await getAllAcademicYears();

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