const {
  createSchoolService,
  getAllSchoolsService,
  getSchoolByIdService,
  updateSchoolService,
  loginSchoolAdminService,
  deleteSchoolService
} = require("../services/schoolService");

// Create School
const createSchool = async (req, res) => {
  try {

    const result =
      await createSchoolService(req.body);

    return res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {

    console.log("CREATE SCHOOL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Get All Schools
const getAllSchools = async (req, res) => {
  try {

    const schools =
      await getAllSchoolsService();

    return res.status(200).json({
      success: true,
      data: schools
    });

  } catch (error) {

    console.log("GET SCHOOLS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Get School By Id
const getSchoolById = async (req, res) => {
  try {

    const school =
      await getSchoolByIdService(
        req.params.id
      );

    if (!school) {

      return res.status(404).json({
        success: false,
        message: "School Not Found"
      });

    }

    return res.status(200).json({
      success: true,
      data: school
    });

  } catch (error) {

    console.log("GET SCHOOL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Update School
const updateSchool = async (req, res) => {
  try {

    await updateSchoolService(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "School Updated Successfully"
    });

  } catch (error) {

    console.log("UPDATE SCHOOL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// School Admin Login
const loginSchoolAdmin = async (req, res) => {
  try {

    const {
      email,
      password
    } = req.body;

    const token =
      await loginSchoolAdminService(
        email,
        password
      );

    return res.status(200).json({
      success: true,
      token,
      role: "SCHOOL_ADMIN"
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }
};

// Delete School
const deleteSchool = async (req, res) => {
  try {

    await deleteSchoolService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "School Deleted Successfully"
    });

  } catch (error) {

    console.log("DELETE SCHOOL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  loginSchoolAdmin,
  deleteSchool
};