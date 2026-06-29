import axios from "axios";

const API_URL =
  "http://localhost:5000/api/master-mediums";

const getToken = () => {

  return localStorage.getItem(
    "token"
  );

};

// Get All Mediums
export const getMasterMediums =
  async () => {

    const response =
      await axios.get(
        API_URL,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;

  };

// Get Medium By Id
export const getMasterMediumById =
  async (id) => {

    const response =
      await axios.get(
        `${API_URL}/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;

  };

// Create Medium
export const createMasterMedium =
  async (data) => {

    const response =
      await axios.post(
        API_URL,
        data,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;

  };

// Update Medium
export const updateMasterMedium =
  async (id, data) => {

    const response =
      await axios.put(
        `${API_URL}/${id}`,
        data,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;

  };

// Delete Medium
export const deleteMasterMedium =
  async (id) => {

    const response =
      await axios.delete(
        `${API_URL}/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;

  };