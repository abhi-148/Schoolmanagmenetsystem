import api from "./api";

export const getSchoolClasses = async () => {
  const response = await api.get("/school-classes");
  return response.data;
};

export const createSchoolClass = async (data) => {
  const response = await api.post(
    "/school-classes",
    data
  );

  return response.data;
};

export const updateSchoolClass = async (
  id,
  data
) => {
  const response = await api.put(
    `/school-classes/${id}`,
    data
  );

  return response.data;
};

export const deleteSchoolClass = async (
  id
) => {
  const response = await api.delete(
    `/school-classes/${id}`
  );

  return response.data;
};