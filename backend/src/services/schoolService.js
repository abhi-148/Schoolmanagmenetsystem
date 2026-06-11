const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const transporter =
require("../config/mailConfig");

const generatePassword =
require("../utils/passwordGenerator");

const {
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  findSchoolAdminByEmail,
  deleteSchool
} = require("../repositories/schoolRepository");

const createSchoolService = async (
  schoolData
) => {

  // Auto Generate Password
  const password =
    generatePassword();

  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );

  schoolData.admin_password =
    hashedPassword;

  schoolData.status =
    "ACTIVE";

  schoolData.created_by =
    1;

  await createSchool(
    schoolData
  );

  // Send Login Credentials
  await transporter.sendMail({
    from:
      process.env.EMAIL_USER,

    to:
      schoolData.admin_email,

    subject:
      "School Admin Login Credentials",

    html: `
      <h2>
        Welcome To School Management System
      </h2>

      <p>
        Dear ${schoolData.admin_name},
      </p>

      <p>
        Your School Admin Account
        has been created successfully.
      </p>

      <p>
        <b>Email:</b>
        ${schoolData.admin_email}
      </p>

      <p>
        <b>Password:</b>
        ${password}
      </p>

      <p>
        Please login and change
        your password after first login.
      </p>
    `
  });

  return {
    message:
      "School Created Successfully",

    adminPassword:
      password
  };

};

const getAllSchoolsService =
async () => {

  return await getAllSchools();

};

const getSchoolByIdService =
async (id) => {

  return await getSchoolById(
    id
  );

};

const updateSchoolService =
async (
  id,
  data
) => {

  return await updateSchool(
    id,
    data
  );

};

const loginSchoolAdminService =
async (
  email,
  password
) => {

  const admin =
    await findSchoolAdminByEmail(
      email
    );

  if (!admin) {

    throw new Error(
      "Invalid Email"
    );

  }

  const isMatch =
    await bcrypt.compare(
      password,
      admin.admin_password
    );

  if (!isMatch) {

    throw new Error(
      "Invalid Password"
    );

  }

  const token = jwt.sign(
    {
      id: admin.id,
      role:
        "SCHOOL_ADMIN",
      schoolId:
        admin.id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );

  return token;

};
const deleteSchoolService =
async (id) => {

  return await deleteSchool(
    id
  );

};

module.exports = {
  createSchoolService,
  getAllSchoolsService,
  getSchoolByIdService,
  updateSchoolService,
  loginSchoolAdminService,
  deleteSchoolService
};