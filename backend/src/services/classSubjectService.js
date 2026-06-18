const {
  createClassSubject,
  getAllClassSubjects,
  getSubjectsByClass,
  deleteClassSubject
} = require(
  "../repositories/classSubjectRepository"
);

const createClassSubjectService =
async (data) => {

  data.status = "active";

  return await createClassSubject(
    data
  );

};

const getAllClassSubjectsService =
async () => {

  return await getAllClassSubjects();

};

const getSubjectsByClassService =
async (schoolClassId) => {

  return await getSubjectsByClass(
    schoolClassId
  );

};

const deleteClassSubjectService =
async (id) => {

  return await deleteClassSubject(
    id
  );

};

module.exports = {
  createClassSubjectService,
  getAllClassSubjectsService,
  getSubjectsByClassService,
  deleteClassSubjectService
};