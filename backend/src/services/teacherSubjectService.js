const {
  createTeacherSubject,
  getAllTeacherSubjects,
  getSubjectsByTeacher,
  deleteTeacherSubject
} = require(
  "../repositories/teacherSubjectRepository"
);

const createTeacherSubjectService =
async (data) => {

  data.status = "active";

  return await createTeacherSubject(
    data
  );

};

const getAllTeacherSubjectsService =
async () => {

  return await getAllTeacherSubjects();

};

const getSubjectsByTeacherService =
async (staffId) => {

  return await getSubjectsByTeacher(
    staffId
  );

};

const deleteTeacherSubjectService =
async (id) => {

  return await deleteTeacherSubject(
    id
  );

};

module.exports = {
  createTeacherSubjectService,
  getAllTeacherSubjectsService,
  getSubjectsByTeacherService,
  deleteTeacherSubjectService
};