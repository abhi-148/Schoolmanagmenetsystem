import api from "./api";

// ==============================
// Get All Sections
// ==============================

export const getSections = async () => {

  const response = await api.get(
    "/sections"
  );

  return response.data;

};

// ==============================
// Get Section By Id
// ==============================

export const getSectionById = async (
  id
) => {

  const response = await api.get(
    `/sections/${id}`
  );

  return response.data;

};

// ==============================
// Get Sections By School Class
// ==============================

export const getSectionsByClass = async (
  schoolClassId
) => {

  const response = await api.get(
    `/sections/class/${schoolClassId}`
  );

  return response.data;

};

// ==============================
// Create Section
// ==============================

export const createSection = async (
  data
) => {

  const response = await api.post(
    "/sections",
    data
  );

  return response.data;

};

// ==============================
// Delete Section
// ==============================

export const deleteSection = async (
  id
) => {

  const response = await api.delete(
    `/sections/${id}`
  );

  return response.data;

};