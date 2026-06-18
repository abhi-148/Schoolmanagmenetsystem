const {
  createClassService,
  getAllClassesService,
  getClassByIdService,
  updateClassService,
  deleteClassService
} = require("../services/classService");

// Create Class
const createClass = async (
  req,
  res
) => {

  try {

    const result =
      await createClassService({
        ...req.body,
        created_by:
          req.user.id
      });

    return res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Get All Classes
const getAllClasses =
async (req, res) => {

  try {

    const data =
      await getAllClassesService();

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Get Class By Id
const getClassById =
async (req, res) => {

  try {

    const data =
      await getClassByIdService(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Update Class
const updateClass =
async (req, res) => {

  try {

    await updateClassService(
      req.params.id,
      {
        ...req.body,
        updated_by:
          req.user.id
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Class Updated Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Delete Class
const deleteClass =
async (req, res) => {

  try {

    await deleteClassService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Class Deleted Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass
};