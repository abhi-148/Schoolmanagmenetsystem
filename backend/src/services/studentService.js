const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  updateStudentStatus,
  getStudentsWithPagination,
  searchStudents
} = require("../repositories/studentRepository");

const createStudentService = async (
  studentData
) => {

  studentData.status = "ACTIVE";

  await createStudent(studentData);

  return {
    message:
      "Student Created Successfully"
  };
};

const getAllStudentsService = async () => {
  return await getAllStudents();
};

const getStudentByIdService = async (
  id
) => {

  return await getStudentById(id);

};

const updateStudentService = async (
  id,
  data
) => {

  return await updateStudent(
    id,
    data
  );

};

const updateStudentStatusService = async (
  id,
  status
) => {

  return await updateStudentStatus(
    id,
    status
  );

};

const getStudentsWithPaginationService =
async (
  limit,
  offset
) => {

  return await getStudentsWithPagination(
    limit,
    offset
  );

};

const searchStudentsService = async (
  search
) => {

  return await searchStudents(
    search
  );

};

module.exports = {
  createStudentService,
  getAllStudentsService,
  getStudentByIdService,
  updateStudentService,
  updateStudentStatusService,
  getStudentsWithPaginationService,
  searchStudentsService
};