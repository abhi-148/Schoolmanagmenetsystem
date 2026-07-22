import api from "./api";

// Get All Achievements
export const getAchievements = () => {
  return api.get("/achievement");
};

// Get Achievement By ID
export const getAchievementById = (id) => {
  return api.get(`/achievement/${id}`);
};

// Create Achievement
export const createAchievement = (data) => {
  return api.post("/achievement", data);
};

// Update Achievement
export const updateAchievement = (id, data) => {
  return api.put(`/achievement/${id}`, data);
};

// Delete Achievement
export const deleteAchievement = (id) => {
  return api.delete(`/achievement/${id}`);
};

// Search Achievement
export const searchAchievement = (keyword) => {
  return api.get(`/achievement/search/${keyword}`);
};

// Get Achievement By School
export const getAchievementsBySchool = (schoolId) => {
  return api.get(`/achievement/school/${schoolId}`);
};

// Get Achievement By Category
export const getAchievementByCategory = (category) => {
  return api.get(`/achievement/category/${category}`);
};

// Get Achievement By Level
export const getAchievementByLevel = (level) => {
  return api.get(`/achievement/level/${level}`);
};

// Get Achievement By Student
export const getAchievementByStudent = (studentId) => {
  return api.get(`/achievement/student/${studentId}`);
};

// Get Achievement By Status
export const getAchievementByStatus = (status) => {
  return api.get(`/achievement/status/${status}`);
};