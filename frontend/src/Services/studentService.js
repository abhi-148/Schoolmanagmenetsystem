import api from "./api";

export const getStudents = async () => {
  const response = await api.get("/students");
  return response.data;
};

export const createStudent = async (studentData) => {
  const response = await api.post(
    "/students",
    studentData
  );

  return response.data;
};

export const updateStudentStatus = async (
  id,
  status
) => {
  const response = await api.patch(
    `/students/${id}/status`,
    { status }
  );

  return response.data;
};

export const searchStudents = async (
  search
) => {
  const response = await api.get(
    `/students/search?search=${search}`
  );

  return response.data;
};

export const updateStudent = async (
  id,
  data
) => {
  const response = await api.put(
    `/students/${id}`,
    data
  );

  return response.data;
};

export const getStudentsWithPagination = async (
  page = 1,
  limit = 10
) => {
  const response = await api.get(
    `/students/pagination?page=${page}&limit=${limit}`
  );

  return response.data;
};

export const deleteStudent = async (
  id
) => {
  const response = await api.delete(
    `/students/${id}`
  );

  return response.data;
};