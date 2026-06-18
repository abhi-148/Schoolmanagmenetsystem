const {
  createTimetableService,
  getAllTimetablesService,
  getTimetableByClassService,
  updateTimetableService,
  deleteTimetableService
} = require(
  "../services/timetableService"
);

// Create
const createTimetable =
async (req, res) => {

  try {

    const result =
      await createTimetableService({
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

// Get All
const getAllTimetables =
async (req, res) => {

  try {

    const data =
      await getAllTimetablesService();

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

// Get By Class
const getTimetableByClass =
async (req, res) => {

  try {

    const data =
      await getTimetableByClassService(
        req.params.schoolClassId
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

// Update
const updateTimetable =
async (req, res) => {

  try {

    await updateTimetableService(
      req.params.id,
      {
        ...req.body,
        updated_by: req.user.id
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Timetable Updated Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Delete
const deleteTimetable =
async (req, res) => {

  try {

    await deleteTimetableService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Timetable Deleted Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  createTimetable,
  getAllTimetables,
  getTimetableByClass,
  updateTimetable,
  deleteTimetable
};