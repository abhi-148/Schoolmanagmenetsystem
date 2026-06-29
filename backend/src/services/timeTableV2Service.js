const {

  createTimeTable,

  checkDuplicateTimeTable,

  checkTeacherConflict,

  checkRoomConflict,

  getAllTimeTables,

  getTimeTableById,

  getTimeTableByBatch,

  updateTimeTable,

  deleteTimeTable

} = require("../repositories/timeTableV2Repository");

// ==========================================
// Create
// ==========================================

const createTimeTableService = async (
  data
) => {

  data.status =
    data.status || "active";

  // Duplicate Batch + Period + Day

  const duplicate =
    await checkDuplicateTimeTable(
      data.batch_id,
      data.period_id,
      data.day_of_week
    );

  if (duplicate) {

    throw new Error(
      "Time Table already exists for this Batch, Period and Day."
    );

  }

  // Teacher Conflict

  const teacherConflict =
    await checkTeacherConflict(
      data.teacher_id,
      data.period_id,
      data.day_of_week
    );

  if (teacherConflict) {

    throw new Error(
      "Teacher is already assigned in another class for this period."
    );

  }

  // Room Conflict

  if (data.room_number) {

    const roomConflict =
      await checkRoomConflict(
        data.room_number,
        data.period_id,
        data.day_of_week
      );

    if (roomConflict) {

      throw new Error(
        "Room is already occupied for this period."
      );

    }

  }

  return await createTimeTable(
    data
  );

};

// ==========================================
// Get All
// ==========================================

const getAllTimeTablesService =
async () => {

  return await getAllTimeTables();

};

// ==========================================
// Get By Id
// ==========================================

const getTimeTableByIdService =
async (id) => {

  return await getTimeTableById(
    id
  );

};

// ==========================================
// Get By Batch
// ==========================================

const getTimeTableByBatchService =
async (batchId) => {

  return await getTimeTableByBatch(
    batchId
  );

};

// ==========================================
// Update
// ==========================================

const updateTimeTableService =
async (
  id,
  data
) => {

  return await updateTimeTable(
    id,
    data
  );

};

// ==========================================
// Delete
// ==========================================

const deleteTimeTableService =
async (id) => {

  return await deleteTimeTable(
    id
  );

};

module.exports = {

  createTimeTableService,

  getAllTimeTablesService,

  getTimeTableByIdService,

  getTimeTableByBatchService,

  updateTimeTableService,

  deleteTimeTableService

};