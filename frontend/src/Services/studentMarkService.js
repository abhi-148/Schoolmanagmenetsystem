import api from "./api";

export const getStudentMarks = async () => {
  const response = await api.get("/student-marks");
  return response.data;
};

export const createStudentMark = async (data) => {
  const response = await api.post("/student-marks", data);
  return response.data;
};

export const updateStudentMark = async (id, data) => {
  const response = await api.put(
    `/student-marks/${id}`,
    data
  );

  return response.data;
};

export const deleteStudentMark = async (id) => {
  const response = await api.delete(
    `/student-marks/${id}`
  );

  return response.data;
};