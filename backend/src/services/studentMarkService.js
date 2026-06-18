const {
  createStudentMark,
  getAllStudentMarks,
  getMarksByStudent,
  getMarksByExam,
  updateStudentMark,
  deleteStudentMark
} = require("../repositories/studentMarkRepository");

// Create
const createStudentMarkService = async (data) => {
  return await createStudentMark(data);
};

// Get All
const getAllStudentMarksService = async () => {
  return await getAllStudentMarks();
};

// Get By Student
const getMarksByStudentService = async (studentId) => {
  return await getMarksByStudent(studentId);
};

// Get By Exam
const getMarksByExamService = async (examId) => {
  return await getMarksByExam(examId);
};

// Update
const updateStudentMarkService = async (id, data) => {
  return await updateStudentMark(id, data);
};

// Delete
const deleteStudentMarkService = async (id) => {
  return await deleteStudentMark(id);
};

module.exports = {
  createStudentMarkService,
  getAllStudentMarksService,
  getMarksByStudentService,
  getMarksByExamService,
  updateStudentMarkService,
  deleteStudentMarkService
};