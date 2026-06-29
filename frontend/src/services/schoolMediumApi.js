import axios from "axios";

const API_URL =
  "http://localhost:5000/api/school-mediums";

const getToken = () =>
  localStorage.getItem("token");

export const getSchoolMediums =
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

export const createSchoolMedium =
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

export const approveSchoolMedium =
  async (id) => {

    const response =
      await axios.post(
        `${API_URL}/${id}/approve`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;

  };
  export const deleteSchoolMedium =
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

export const rejectSchoolMedium =
  async (id) => {

    const response =
      await axios.post(
        `${API_URL}/${id}/reject`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${getToken()}`
          }
        }
      );

    return response.data;

  };
  export const updateSchoolMedium =
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