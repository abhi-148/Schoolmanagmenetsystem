import api from "./api";

export const getExams = async () => {
  const response = await api.get("/exams");
  return response.data;
};

export const createExam = async (data) => {
  const response = await api.post("/exams", data);
  return response.data;
};

export const updateExam = async (id, data) => {
  const response = await api.put(`/exams/${id}`, data);
  return response.data;
};

export const deleteExam = async (id) => {
  const response = await api.delete(`/exams/${id}`);
  return response.data;
};