import api from "./api";

// Get All Subjects
export const getSubjects = async () => {

  const response =
    await api.get("/subjects");

  return response.data;

};

// Create Subject
export const createSubject =
async (data) => {

  const response =
    await api.post(
      "/subjects",
      data
    );

  return response.data;

};

// Update Subject
export const updateSubject =
async (
  id,
  data
) => {

  const response =
    await api.put(
      `/subjects/${id}`,
      data
    );

  return response.data;

};

// Delete Subject
export const deleteSubject =
async (id) => {

  const response =
    await api.delete(
      `/subjects/${id}`
    );

  return response.data;

};