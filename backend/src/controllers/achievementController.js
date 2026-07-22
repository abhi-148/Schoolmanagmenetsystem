const {
  createAchievementService,
  getAllAchievementsService,
  getAchievementByIdService,
  updateAchievementService,
  deleteAchievementService,
  searchAchievementService,
  getAchievementByCategoryService,
  getAchievementByLevelService,
  getAchievementByStudentService,
  getAchievementByStatusService
} = require("../services/achievementService");

// Create
const createAchievement = async (req, res) => {
  try {

    const result = await createAchievementService({
      ...req.body,
      created_by: req.user.id
    });

    return res.status(201).json({
      success: true,
      message: "Achievement Created Successfully",
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
const getAllAchievements = async (req, res) => {
  try {

    const data = await getAllAchievementsService(
      req.user
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

// Get By Id
const getAchievementById = async (req, res) => {
  try {

    const data = await getAchievementByIdService(
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

// Update
const updateAchievement = async (req, res) => {
  try {

    await updateAchievementService(
      req.params.id,
      {
        ...req.body,
        updated_by: req.user.id
      }
    );

    return res.status(200).json({
      success: true,
      message: "Achievement Updated Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Delete
const deleteAchievement = async (req, res) => {
  try {

    await deleteAchievementService(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message: "Achievement Deleted Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Search
const searchAchievement = async (req, res) => {
  try {

    const data = await searchAchievementService(
      req.query.keyword || ""
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

// Filter By Category
const getAchievementByCategory = async (req, res) => {
  try {

    const data =
      await getAchievementByCategoryService(
        req.params.category
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

// Filter By Level
const getAchievementByLevel = async (req, res) => {
  try {

    const data =
      await getAchievementByLevelService(
        req.params.level
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

// Filter By Student
const getAchievementByStudent = async (req, res) => {
  try {

    const data =
      await getAchievementByStudentService(
        req.params.studentId
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

// Filter By Status
const getAchievementByStatus = async (req, res) => {
  try {

    const data =
      await getAchievementByStatusService(
        req.params.status
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

module.exports = {
  createAchievement,
  getAllAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
  searchAchievement,
  getAchievementByCategory,
  getAchievementByLevel,
  getAchievementByStudent,
  getAchievementByStatus
};