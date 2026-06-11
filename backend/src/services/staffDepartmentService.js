const {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment
} = require(
  "../repositories/staffDepartmentRepository"
);

const createDepartmentService =
async (data) => {

  data.status = "ACTIVE";

  return await createDepartment(
    data
  );

};

const getAllDepartmentsService =
async () => {

  return await getAllDepartments();

};

const updateDepartmentService =
async (
  id,
  data
) => {

  return await updateDepartment(
    id,
    data
  );

};

const deleteDepartmentService =
async (id) => {

  return await deleteDepartment(
    id
  );

};

module.exports = {
  createDepartmentService,
  getAllDepartmentsService,
  updateDepartmentService,
  deleteDepartmentService
};