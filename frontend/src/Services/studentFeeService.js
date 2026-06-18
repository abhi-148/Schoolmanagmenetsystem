import api from "./api";

export const getStudentFees = async () => {
  const response = await api.get("/student-fees");
  return response.data;
};

export const createStudentFee = async (data) => {
  const response = await api.post(
    "/student-fees",
    data
  );

  return response.data;
};

export const updateStudentFee = async (
  id,
  data
) => {
  const response = await api.put(
    `/student-fees/${id}`,
    data
  );

  return response.data;
};

export const deleteStudentFee = async (
  id
) => {
  const response = await api.delete(
    `/student-fees/${id}`
  );

  return response.data;
};