import api from "./api";

export const getAttendance =
  async () => {

    const response =
      await api.get(
        "/attendance"
      );

    return response.data;

};

export const markAttendance =
  async (data) => {

    const response =
      await api.post(
        "/attendance",
        data
      );

    return response.data;

};