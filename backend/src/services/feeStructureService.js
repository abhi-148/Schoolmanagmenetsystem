const {
  createFeeStructure,
  getAllFeeStructures,
  getFeeStructuresByClass,
  updateFeeStructure,
  deleteFeeStructure
} = require(
  "../repositories/feeStructureRepository"
);

const createFeeStructureService =
async (data) => {

  data.status = "active";

  return await createFeeStructure(
    data
  );

};

const getAllFeeStructuresService =
async () => {

  return await getAllFeeStructures();

};

const getFeeStructuresByClassService =
async (schoolClassId) => {

  return await getFeeStructuresByClass(
    schoolClassId
  );

};

const updateFeeStructureService =
async (
  id,
  data
) => {

  return await updateFeeStructure(
    id,
    data
  );

};

const deleteFeeStructureService =
async (id) => {

  return await deleteFeeStructure(
    id
  );

};

module.exports = {
  createFeeStructureService,
  getAllFeeStructuresService,
  getFeeStructuresByClassService,
  updateFeeStructureService,
  deleteFeeStructureService
};