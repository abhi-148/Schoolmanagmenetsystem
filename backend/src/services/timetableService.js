const {
  createTimetable,
  getAllTimetables,
  getTimetableByClass,
  updateTimetable,
  deleteTimetable
} = require(
  "../repositories/timetableRepository"
);

const createTimetableService =
async (data) => {

  data.status = "active";

  return await createTimetable(
    data
  );

};

const getAllTimetablesService =
async () => {

  return await getAllTimetables();

};

const getTimetableByClassService =
async (schoolClassId) => {

  return await getTimetableByClass(
    schoolClassId
  );

};

const updateTimetableService =
async (
  id,
  data
) => {

  return await updateTimetable(
    id,
    data
  );

};

const deleteTimetableService =
async (id) => {

  return await deleteTimetable(
    id
  );

};

module.exports = {
  createTimetableService,
  getAllTimetablesService,
  getTimetableByClassService,
  updateTimetableService,
  deleteTimetableService
};