const {
  createStaffType,
  getAllStaffTypes,
  updateStaffType,
  deleteStaffType
} = require(
  "../repositories/staffTypeRepository"
);
const createStaffTypeService =
async (data) => {

data.status =
"ACTIVE";

return await createStaffType(
data
);

};

const getAllStaffTypesService =
async () => {

return await getAllStaffTypes();

};
const updateStaffTypeService =
async (id, data) => {

  return await updateStaffType(
    id,
    data
  );

};

const deleteStaffTypeService =
async (id) => {

  return await deleteStaffType(
    id
  );

};
module.exports = {
createStaffTypeService,
getAllStaffTypesService,
updateStaffTypeService,
deleteStaffTypeService
};