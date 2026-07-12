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

  if (
    data.created_by_role ===
    "SCHOOL_ADMIN"
  ) {

    data.school_id =
      data.schoolId;

  }

  return await createDepartment(
    data
  );

};

const getAllDepartmentsService =
async (
  user
) => {

  return await getAllDepartments(
    user
  );

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