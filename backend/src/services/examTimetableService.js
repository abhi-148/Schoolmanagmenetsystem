const {
  createExamTimetable,
  getAllExamTimetables,
  getExamTimetableById,
  updateExamTimetable,
  deleteExamTimetable
} = require("../repositories/examTimetableRepository");

// Create Exam Timetable
const createExamTimetableService = async (data) => {

  data.status = "active";

  return await createExamTimetable(data);

};

// Get All Exam Timetables
const getAllExamTimetablesService = async () => {

  return await getAllExamTimetables();

};

// Get Exam Timetable By Id
const getExamTimetableByIdService = async (id) => {

  return await getExamTimetableById(id);

};

// Update Exam Timetable
const updateExamTimetableService = async (id, data) => {

  return await updateExamTimetable(id, data);

};

// Delete Exam Timetable
const deleteExamTimetableService = async (id) => {

  return await deleteExamTimetable(id);

};

module.exports = {
  createExamTimetableService,
  getAllExamTimetablesService,
  getExamTimetableByIdService,
  updateExamTimetableService,
  deleteExamTimetableService
};