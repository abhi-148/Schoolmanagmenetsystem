import api from "./api";

const BASE_URL = "/library-fine-payments";

// Get All
export const getAllLibraryFinePayments = async () => {
  const response = await api.get(BASE_URL);
  return response.data;
};

// Get By Id
export const getLibraryFinePaymentById = async (id) => {
  const response = await api.get(`${BASE_URL}/${id}`);
  return response.data;
};

// Create
export const createLibraryFinePayment = async (data) => {

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
export const updateLibraryFinePayment = async (
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
export const updateLibraryFinePaymentStatus = async (
  id,
  status
) => {
  const response = await api.patch(
    `${BASE_URL}/${id}/status`,
    { status }
  );

  return response.data;
};

// Search
export const searchLibraryFinePayments = async (
  search
) => {
  const response = await api.get(
    `${BASE_URL}/search?search=${search}`
  );

  return response.data;
};

// Pagination
export const getLibraryFinePaymentsPagination =
async (
  page,
  limit
) => {

  const response = await api.get(
    `${BASE_URL}/pagination?page=${page}&limit=${limit}`
  );

  return response.data;

};