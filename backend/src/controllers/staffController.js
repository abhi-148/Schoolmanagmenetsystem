const {
  createStaffService,
  getAllStaffService,
  loginStaffService,
  updateStaffService,
  deleteStaffService
} = require("../services/staffService");

// Create Staff
const createStaff = async (req, res) => {

  try {

    const result =
      await createStaffService({
        ...req.body,
        created_by: req.user.id
      });

    return res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {

    console.log(
      "CREATE STAFF ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Get All Staff
const getAllStaff = async (req, res) => {

  try {

    const staff =
      await getAllStaffService();

    return res.status(200).json({
      success: true,
      data: staff
    });

  } catch (error) {

    console.log(
      "GET STAFF ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Login Staff
const loginStaff = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const token =
      await loginStaffService(
        email,
        password
      );

    return res.status(200).json({
      success: true,
      token
    });

  } catch (error) {

    console.log(
      "LOGIN STAFF ERROR:",
      error
    );

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

// Update Staff
const updateStaff = async (req, res) => {

  try {

    await updateStaffService(
      req.params.id,
      {
        ...req.body,
        updated_by: req.user.id
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Staff Updated Successfully"
    });

  } catch (error) {

    console.log(
      "UPDATE STAFF ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Delete Staff
const deleteStaff = async (req, res) => {

  try {

    await deleteStaffService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Staff Deleted Successfully"
    });

  } catch (error) {

    console.log(
      "DELETE STAFF ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createStaff,
  getAllStaff,
  loginStaff,
  updateStaff,
  deleteStaff
};