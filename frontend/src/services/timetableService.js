import api from "./api";

// ==========================================
// Get All Time Tables
// ==========================================

export const getTimeTables =
async () => {

  const response =
    await api.get(
      "/timetable-v2"
    );

  return response.data;

};

// ==========================================
// Get By Id
// ==========================================

export const getTimeTableById =
async (id) => {

  const response =
    await api.get(
      `/timetable-v2/${id}`
    );

  return response.data;

};

// ==========================================
// Get By Batch
// ==========================================

export const getTimeTableByBatch =
async (batchId) => {

  const response =
    await api.get(
      `/timetable-v2/batch/${batchId}`
    );

  return response.data;

};

// ==========================================
// Create
// ==========================================

export const createTimeTable =
async (data) => {

  const response =
    await api.post(
      "/timetable-v2",
      data
    );

  return response.data;

};

// ==========================================
// Update
// ==========================================

export const updateTimeTable =
async (
  id,
  data
) => {

  const response =
    await api.put(
      `/timetable-v2/${id}`,
      data
    );

  return response.data;

};

// ==========================================
// Delete
// ==========================================

export const deleteTimeTable =
async (id) => {

  const response =
    await api.delete(
      `/timetable-v2/${id}`
    );

  return response.data;

};