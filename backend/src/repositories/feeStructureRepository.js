const pool = require("../config/db");

// Create Fee Structure
const createFeeStructure = async (
  data
) => {

  const [result] = await pool.query(
    `INSERT INTO fee_structures
    (
      school_class_id,
      fee_type,
      amount,
      status,
      created_by
    )
    VALUES (?, ?, ?, ?, ?)`,
    [
      data.school_class_id,
      data.fee_type,
      data.amount,
      data.status,
      data.created_by
    ]
  );

  return result;
};

// Get All
const getAllFeeStructures = async () => {

  const [rows] = await pool.query(`
    SELECT
      fs.id,
      fs.school_class_id,
      fs.fee_type,
      fs.amount,
      fs.status,

      c.class_name

    FROM fee_structures fs

    JOIN school_classes sc
      ON sc.id = fs.school_class_id

    JOIN classes c
      ON c.id = sc.class_id

    ORDER BY fs.id DESC
  `);

  return rows;
};

// Get By Class
const getFeeStructuresByClass =
async (schoolClassId) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM fee_structures
    WHERE school_class_id = ?
    `,
    [schoolClassId]
  );

  return rows;
};

// Update
const updateFeeStructure =
async (id, data) => {

  const [result] = await pool.query(
    `
    UPDATE fee_structures
    SET
      fee_type = ?,
      amount = ?,
      updated_by = ?,
      updated_at = NOW()
    WHERE id = ?
    `,
    [
      data.fee_type,
      data.amount,
      data.updated_by,
      id
    ]
  );

  return result;
};

// Delete
const deleteFeeStructure =
async (id) => {

  const [result] = await pool.query(
    `
    DELETE FROM fee_structures
    WHERE id = ?
    `,
    [id]
  );

  return result;
};

module.exports = {
  createFeeStructure,
  getAllFeeStructures,
  getFeeStructuresByClass,
  updateFeeStructure,
  deleteFeeStructure
};