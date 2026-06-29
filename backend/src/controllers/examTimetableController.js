const {
  createExamTimetableService,
  getAllExamTimetablesService,
  getExamTimetableByIdService,
  updateExamTimetableService,
  deleteExamTimetableService
} = require("../services/examTimetableService");

// Create Exam Timetable
const createExamTimetable = async (req, res) => {

  try {

    const result =
      await createExamTimetableService({
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

// Get All Exam Timetables
const getAllExamTimetables = async (req, res) => {

  try {

    const data =
      await getAllExamTimetablesService();

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

// Get Exam Timetable By Id
const getExamTimetableById = async (req, res) => {

  try {

    const data =
      await getExamTimetableByIdService(
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

// Update Exam Timetable
const updateExamTimetable = async (req, res) => {

  try {

    await updateExamTimetableService(
      req.params.id,
      {
        ...req.body,
        updated_by: req.user.id
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Exam Timetable Updated Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Delete Exam Timetable
const deleteExamTimetable = async (req, res) => {

  try {

    await deleteExamTimetableService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Exam Timetable Deleted Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createExamTimetable,
  getAllExamTimetables,
  getExamTimetableById,
  updateExamTimetable,
  deleteExamTimetable
};