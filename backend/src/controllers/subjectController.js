const {
  createSubjectService,
  getAllSubjectsService,
  getSubjectByIdService,
  updateSubjectService,
  deleteSubjectService
} = require("../services/subjectService");

// Create Subject
const createSubject = async (req, res) => {

  try {

    const result =
      await createSubjectService({
        ...req.body,
        created_by: req.user.id
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

// Get All Subjects
const getAllSubjects = async (req, res) => {

  try {

    const data =
      await getAllSubjectsService();

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

// Get Subject By Id
const getSubjectById = async (req, res) => {

  try {

    const data =
      await getSubjectByIdService(
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

// Update Subject
const updateSubject = async (req, res) => {

  try {

    await updateSubjectService(
      req.params.id,
      {
        ...req.body,
        updated_by: req.user.id
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Subject Updated Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Delete Subject
const deleteSubject = async (req, res) => {

  try {

    await deleteSubjectService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Subject Deleted Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject
};