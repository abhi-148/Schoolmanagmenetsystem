const {
  createAchievement,
  getAllAchievements,
  getAchievementsBySchool,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
  checkDuplicateAchievement,
  searchAchievement,
  getAchievementByCategory,
  getAchievementByLevel,
  getAchievementByStudent,
  getAchievementByStatus
} = require("../repositories/achievementRepository");

// Create
const createAchievementService = async (data) => {

  if (!data.school_id) {
    throw new Error("School is required");
  }

  if (!data.student_id) {
    throw new Error("Student is required");
  }

  if (!data.title) {
    throw new Error("Achievement title is required");
  }

  if (!data.event_date) {
    throw new Error("Event date is required");
  }

  if (!data.achievement_category) {
    throw new Error("Achievement category is required");
  }

  if (!data.achievement_level) {
    throw new Error("Achievement level is required");
  }

  const duplicate = await checkDuplicateAchievement(
    data.student_id,
    data.title
  );

  if (duplicate.length > 0) {
    throw new Error("Achievement already exists for this student.");
  }

  data.position_achieved =
    data.position_achieved || "Participation";

  data.status =
    data.status || "ACTIVE";

  return await createAchievement(data);

};

// Get All
const getAllAchievementsService = async (user) => {

  if (user.role === "SUPER_ADMIN") {

    return await getAllAchievements();

  }

  if (user.role === "SCHOOL_ADMIN") {

    return await getAchievementsBySchool(
      user.schoolId
    );

  }

  throw new Error("Unauthorized");

};

// Get By Id
const getAchievementByIdService = async (id) => {

  return await getAchievementById(id);

};

// Update
const updateAchievementService = async (
  id,
  data
) => {

  return await updateAchievement(
    id,
    data
  );

};

// Delete
const deleteAchievementService = async (id) => {

  return await deleteAchievement(id);

};

// Search
const searchAchievementService = async (
  keyword
) => {

  return await searchAchievement(
    keyword
  );

};

// Filter By Category
const getAchievementByCategoryService =
async (category) => {

  return await getAchievementByCategory(
    category
  );

};

// Filter By Level
const getAchievementByLevelService =
async (level) => {

  return await getAchievementByLevel(
    level
  );

};

// Filter By Student
const getAchievementByStudentService =
async (studentId) => {

  return await getAchievementByStudent(
    studentId
  );

};

// Filter By Status
const getAchievementByStatusService =
async (status) => {

  return await getAchievementByStatus(
    status
  );

};

module.exports = {
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
};