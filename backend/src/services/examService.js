const {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam
} = require(
  "../repositories/examRepository"
);

const createExamService =
async (data) => {

  data.status = "active";

  return await createExam(
    data
  );

};

const getAllExamsService =
async () => {

  return await getAllExams();

};

const getExamByIdService =
async (id) => {

  return await getExamById(
    id
  );

};

const updateExamService =
async (
  id,
  data
) => {

  return await updateExam(
    id,
    data
  );

};

const deleteExamService =
async (id) => {

  return await deleteExam(
    id
  );

};

module.exports = {
  createExamService,
  getAllExamsService,
  getExamByIdService,
  updateExamService,
  deleteExamService
};