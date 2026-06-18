const {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass
} = require("../repositories/classRepository");

const createClassService = async (
  classData
) => {

  classData.status =
    classData.status || "active";

  return await createClass(
    classData
  );

};

const getAllClassesService =
async () => {

  return await getAllClasses();

};

const getClassByIdService =
async (id) => {

  return await getClassById(id);

};

const updateClassService =
async (
  id,
  data
) => {

  return await updateClass(
    id,
    data
  );

};

const deleteClassService =
async (id) => {

  return await deleteClass(id);

};

module.exports = {
  createClassService,
  getAllClassesService,
  getClassByIdService,
  updateClassService,
  deleteClassService
};