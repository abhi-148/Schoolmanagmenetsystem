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

  if (
    data.created_by_role ===
    "SCHOOL_ADMIN"
  ) {

    const schoolClass =
      await getFeeStructuresByClass(
        data.school_class_id
      );

    // sirf marker hai, actual school validation
    // next phase me karenge
  }

  return await createFeeStructure(
    data
  );

};

const getAllFeeStructuresService =
async (user) => {

  return await getAllFeeStructures(
    user
  );

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