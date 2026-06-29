const {
  createSchoolPeriod,
  getAllSchoolPeriods,
  getSchoolPeriodById,
  updateSchoolPeriod,
  deleteSchoolPeriod
} = require("../repositories/schoolPeriodRepository");

const pool = require("../config/db");

// Create
const createSchoolPeriodService = async (data) => {

  // Start Time < End Time
  if (data.start_time >= data.end_time) {
    throw new Error(
      "End Time must be greater than Start Time."
    );
  }

  // Auto Duration Calculate
  const start = new Date(`1970-01-01T${data.start_time}`);
  const end = new Date(`1970-01-01T${data.end_time}`);

  const duration =
    Math.floor((end - start) / 60000);

  data.slot_duration = duration;

  // Duplicate Period Number
  const [duplicate] = await pool.query(
    `
    SELECT period_id
    FROM tbl_school_period
    WHERE school_id = ?
      AND branch_id = ?
      AND period_number = ?
    `,
    [
      data.school_id,
      data.branch_id,
      data.period_number
    ]
  );

  if (duplicate.length > 0) {
    throw new Error(
      "Period Number already exists for this Branch."
    );
  }

  data.status = data.status || "active";

  return await createSchoolPeriod(data);

};

// Get All
const getAllSchoolPeriodsService =
async () => {

  return await getAllSchoolPeriods();

};

// Get By Id
const getSchoolPeriodByIdService =
async (id) => {

  return await getSchoolPeriodById(id);

};

// Update
const updateSchoolPeriodService =
async (id, data) => {

  if (data.start_time >= data.end_time) {
    throw new Error(
      "End Time must be greater than Start Time."
    );
  }

  const start = new Date(
    `1970-01-01T${data.start_time}`
  );

  const end = new Date(
    `1970-01-01T${data.end_time}`
  );

  data.slot_duration =
    Math.floor((end - start) / 60000);

  return await updateSchoolPeriod(
    id,
    data
  );

};

// Delete
const deleteSchoolPeriodService =
async (id) => {

  return await deleteSchoolPeriod(id);

};

module.exports = {
  createSchoolPeriodService,
  getAllSchoolPeriodsService,
  getSchoolPeriodByIdService,
  updateSchoolPeriodService,
  deleteSchoolPeriodService
};