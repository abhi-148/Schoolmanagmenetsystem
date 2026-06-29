import api from "./api";

// Get All School Periods
export const getSchoolPeriods = async () => {

  const response =
    await api.get("/school-periods");

  return response.data;

};

// Get By Id
export const getSchoolPeriodById =
async (id) => {

  const response =
    await api.get(
      `/school-periods/${id}`
    );

  return response.data;

};

// Create
export const createSchoolPeriod =
async (data) => {

  const response =
    await api.post(
      "/school-periods",
      data
    );

  return response.data;

};

// Update
export const updateSchoolPeriod =
async (
  id,
  data
) => {

  const response =
    await api.put(
      `/school-periods/${id}`,
      data
    );

  return response.data;

};

// Delete
export const deleteSchoolPeriod =
async (id) => {

  const response =
    await api.delete(
      `/school-periods/${id}`
    );

  return response.data;

};