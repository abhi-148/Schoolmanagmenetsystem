const pool = require("../config/db");

const createDepartment = async (data) => {

  const [result] = await pool.query(
    `INSERT INTO staff_department
    (
      school_id,
      name,
      description,
      logo,
      status,
      created_by
    )
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
  data.school_id,
  data.name,
  data.description,
  data.logo,
  data.status,
  data.created_by
]
  );

  return result;
};

const getAllDepartments = async (
  user
) => {

  let query = `
    SELECT *
    FROM staff_department
  `;

  let params = [];

  if (
    user.role === "SCHOOL_ADMIN"
  ) {

    query += `
      WHERE school_id = ?
    `;

    params.push(
      user.schoolId
    );

  }

  query += `
    ORDER BY id DESC
  `;

  const [rows] =
    await pool.query(
      query,
      params
    );

  return rows;

};

const updateDepartment = async (
  id,
  data
) => {

  const [result] = await pool.query(
    `UPDATE staff_department
     SET
     name = ?,
     description = ?,
     logo = ?,
     updated_by = ?,
     updated_at = NOW()
     WHERE id = ?`,
    [
      data.name,
      data.description,
      data.logo,
      data.updated_by,
      id
    ]
  );

  return result;
};

const deleteDepartment = async (
  id
) => {

  const [result] = await pool.query(
    `DELETE FROM staff_department
     WHERE id = ?`,
    [id]
  );

  return result;
};

module.exports = {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment
};