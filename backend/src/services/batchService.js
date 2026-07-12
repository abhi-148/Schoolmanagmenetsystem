const {
  createBatch,
  findBatchDuplicate,
  getAllBatches,
  getBatchesBySchool,
  getBatchById,
  updateBatch,
  deleteBatch
} = require("../repositories/batchRepository");

const createBatchService = async (data) => {

  const duplicate =
    await findBatchDuplicate(
      data.school_class_id,
      data.section_id,
      data.academic_year_id
    );

  if (duplicate) {
    throw new Error(
      "Batch already exists for this class, section and academic year"
    );
  }

  data.status = "active";

  return await createBatch(data);
};

const getAllBatchesService = async (
  user
) => {

  if (
    user.role === "SUPER_ADMIN"
  ) {

    return await getAllBatches();

  }

  if (
    user.role === "SCHOOL_ADMIN"
  ) {

    return await getBatchesBySchool(
      user.schoolId
    );

  }

  throw new Error(
    "Unauthorized"
  );

};

const getBatchByIdService =
async (id) => {
  return await getBatchById(id);
};

const updateBatchService =
async (id, data) => {
  return await updateBatch(id, data);
};

const deleteBatchService =
async (id) => {
  return await deleteBatch(id);
};

module.exports = {
  createBatchService,
  getAllBatchesService,
  getBatchByIdService,
  updateBatchService,
  deleteBatchService
};