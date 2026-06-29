const {
  createTimeTableSubstitution,
  getAllTimeTableSubstitutions,
  getTimeTableSubstitutionById,
  updateTimeTableSubstitution,
  deleteTimeTableSubstitution
} = require(
  "../repositories/timeTableSubstitutionRepository"
);

const createTimeTableSubstitutionService =
async (data) => {

  data.status = "active";

  return await createTimeTableSubstitution(
    data
  );

};

const getAllTimeTableSubstitutionsService =
async () => {

  return await getAllTimeTableSubstitutions();

};

const getTimeTableSubstitutionByIdService =
async (id) => {

  return await getTimeTableSubstitutionById(
    id
  );

};

const updateTimeTableSubstitutionService =
async (
  id,
  data
) => {

  return await updateTimeTableSubstitution(
    id,
    data
  );

};

const deleteTimeTableSubstitutionService =
async (id) => {

  return await deleteTimeTableSubstitution(
    id
  );

};

module.exports = {
  createTimeTableSubstitutionService,
  getAllTimeTableSubstitutionsService,
  getTimeTableSubstitutionByIdService,
  updateTimeTableSubstitutionService,
  deleteTimeTableSubstitutionService
};