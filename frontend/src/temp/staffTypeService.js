import api from "./api";

export const getStaffTypes =
async () => {

  const response =
    await api.get(
      "/staff-types"
    );

  return response.data;

};

export const createStaffType =
async (data) => {

  const response =
    await api.post(
      "/staff-types",
      data
    );

  return response.data;

};

export const updateStaffType =
async (
  id,
  data
) => {

  const response =
    await api.put(
      `/staff-types/${id}`,
      data
    );

  return response.data;

};

export const deleteStaffType =
async (id) => {

  const response =
    await api.delete(
      `/staff-types/${id}`
    );

  return response.data;

};