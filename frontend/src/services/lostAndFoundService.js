import api from "./api";

const BASE_URL = "/lost-and-found";

// Get All
export const getAllLostAndFound = async () => {

  const response =
    await api.get(BASE_URL);

  return response.data;

};

// Get By Id
export const getLostAndFoundById =
async (id) => {

  const response =
    await api.get(
      `${BASE_URL}/${id}`
    );

  return response.data;

};

// Create
export const createLostAndFound =
async (data) => {

  const response =
    await api.post(
      BASE_URL,
      data,
      {
        headers: {
          "Content-Type":
            "multipart/form-data"
        }
      }
    );

  return response.data;

};

// Update
export const updateLostAndFound =
async (
  id,
  data
) => {

  const response =
    await api.put(
      `${BASE_URL}/${id}`,
      data,
      {
        headers: {
          "Content-Type":
            "multipart/form-data"
        }
      }
    );

  return response.data;

};

// Update Status
export const updateLostAndFoundStatus =
async (
  id,
  record_status
) => {

  const response =
    await api.patch(
      `${BASE_URL}/${id}/status`,
      {
        record_status
      }
    );

  return response.data;

};

// Search
export const searchLostAndFound =
async (search) => {

  const response =
    await api.get(
      `${BASE_URL}/search?search=${search}`
    );

  return response.data;

};

// Pagination
export const getLostAndFoundPagination =
async (
  page,
  limit
) => {

  const response =
    await api.get(
      `${BASE_URL}/pagination?page=${page}&limit=${limit}`
    );

  return response.data;

};