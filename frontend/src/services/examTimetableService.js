import api from "./api";

// Get All Exam Timetables
export const getExamTimetables = async () => {
  const response = await api.get("/exam-timetable");
  return response.data;
};

// Get Exam Timetable By Id
export const getExamTimetableById = async (id) => {
  const response = await api.get(`/exam-timetable/${id}`);
  return response.data;
};

// Create Exam Timetable
export const createExamTimetable = async (data) => {
  const response = await api.post("/exam-timetable", data);
  return response.data;
};

// Update Exam Timetable
export const updateExamTimetable = async (id, data) => {
  const response = await api.put(`/exam-timetable/${id}`, data);
  return response.data;
};

// Delete Exam Timetable
export const deleteExamTimetable = async (id) => {
  const response = await api.delete(`/exam-timetable/${id}`);
  return response.data;
};