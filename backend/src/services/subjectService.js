const {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject
} = require("../repositories/subjectRepository");

const createSubjectService =
async (subjectData) => {

  subjectData.status = "active";

  return await createSubject(
    subjectData
  );

};

const getAllSubjectsService =
async () => {

  return await getAllSubjects();

};

const getSubjectByIdService =
async (id) => {

  return await getSubjectById(id);

};

const updateSubjectService =
async (
  id,
  data
) => {

  return await updateSubject(
    id,
    data
  );

};

const deleteSubjectService =
async (id) => {

  return await deleteSubject(id);

};

module.exports = {
  createSubjectService,
  getAllSubjectsService,
  getSubjectByIdService,
  updateSubjectService,
  deleteSubjectService
};