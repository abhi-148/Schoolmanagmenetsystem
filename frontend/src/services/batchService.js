import api from "./api";

// Get All Batches
export const getBatches = async () => {
  const response = await api.get("/batches");
  return response.data;
};

// Get Batch By Id
export const getBatchById = async (id) => {
  const response = await api.get(`/batches/${id}`);
  return response.data;
};

// Create Batch
export const createBatch = async (data) => {
  const response = await api.post("/batches", data);
  return response.data;
};

// Update Batch
export const updateBatch = async (id, data) => {
  const response = await api.put(`/batches/${id}`, data);
  return response.data;
};

// Delete Batch
export const deleteBatch = async (id) => {
  const response = await api.delete(`/batches/${id}`);
  return response.data;
};