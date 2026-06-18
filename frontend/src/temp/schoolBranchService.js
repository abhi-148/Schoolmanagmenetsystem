import api from "./api";

// Get All Branches
export const getSchoolBranches = async () => {

  const response =
    await api.get("/school-branches");

  return response.data;

};

// Create Branch
export const createSchoolBranch = async (
  data
) => {

  const response =
    await api.post(
      "/school-branches",
      data
    );

  return response.data;

};

// Update Branch
export const updateSchoolBranch = async (
  id,
  data
) => {

  const response =
    await api.put(
      `/school-branches/${id}`,
      data
    );

  return response.data;

};

// Delete Branch
export const deleteSchoolBranch = async (
  id
) => {

  const response =
    await api.delete(
      `/school-branches/${id}`
    );

  return response.data;

};