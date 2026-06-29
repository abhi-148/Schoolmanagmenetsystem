import api from "./api";

// ==========================
// Get All
// ==========================

export const getTimeTableSubstitutions =
async () => {

  const response =
    await api.get(
      "/timetable-substitutions"
    );

  return response.data;

};

// ==========================
// Get By Id
// ==========================

export const getTimeTableSubstitutionById =
async (id) => {

  const response =
    await api.get(
      `/timetable-substitutions/${id}`
    );

  return response.data;

};

// ==========================
// Create
// ==========================

export const createTimeTableSubstitution =
async (data) => {

  const response =
    await api.post(
      "/timetable-substitutions",
      data
    );

  return response.data;

};

// ==========================
// Update
// ==========================

export const updateTimeTableSubstitution =
async (
  id,
  data
) => {

  const response =
    await api.put(
      `/timetable-substitutions/${id}`,
      data
    );

  return response.data;

};

// ==========================
// Delete
// ==========================

export const deleteTimeTableSubstitution =
async (id) => {

  const response =
    await api.delete(
      `/timetable-substitutions/${id}`
    );

  return response.data;

};