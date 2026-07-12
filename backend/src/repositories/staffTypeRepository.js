const pool =
require("../config/db");

const createStaffType =
async (data) => {

const [result] =
await pool.query(

`CALL sp_create_staff_type(
?, ?, ?, ?, ?
)`,

[
data.school_id,
data.name,
data.description,
data.status,
data.created_by
]

);

return result;

};

const getAllStaffTypes =
async () => {

const [rows] =
await pool.query(

`SELECT *
FROM staff_type
ORDER BY id DESC`

);

return rows;

};
const updateStaffType = async (id, data) => {

  const [result] = await pool.query(
    `UPDATE staff_type
     SET
     name = ?,
     description = ?,
     updated_by = ?,
     updated_at = NOW()
     WHERE id = ?`,
    [
      data.name,
      data.description,
      data.updated_by,
      id
    ]
  );

  return result;
};
const updateStaffTypeBySchool = async (
  id,
  data,
  schoolId
) => {

  const [result] = await pool.query(
    `
    UPDATE staff_type
    SET
      name = ?,
      description = ?,
      updated_by = ?,
      updated_at = NOW()
    WHERE
      id = ?
      AND school_id = ?
    `,
    [
      data.name,
      data.description,
      data.updated_by,
      id,
      schoolId
    ]
  );

  return result;

};

const deleteStaffType = async (id) => {

  const [result] = await pool.query(
    `DELETE FROM staff_type
     WHERE id = ?`,
    [id]
  );

  return result;
};

const deleteStaffTypeBySchool = async (
  id,
  schoolId
) => {

  const [result] = await pool.query(
    `
    DELETE FROM staff_type
    WHERE
      id = ?
      AND school_id = ?
    `,
    [
      id,
      schoolId
    ]
  );

  return result;

};
const getStaffTypesBySchool = async (
  schoolId
) => {

  const [rows] = await pool.query(
    `
    SELECT *
    FROM staff_type
    WHERE school_id = ?
    ORDER BY id DESC
    `,
    [schoolId]
  );

  return rows;

};
module.exports = {
createStaffType,
getAllStaffTypes,
updateStaffType,
getStaffTypesBySchool,
updateStaffTypeBySchool,
deleteStaffTypeBySchool,
deleteStaffType
};