import api from "./api";

export const getTimetables = async () => {
  const response = await api.get("/timetables");
  return response.data;
};

export const createTimetable = async (data) => {
  const response = await api.post("/timetables", data);
  return response.data;
};

export const updateTimetable = async (id, data) => {
  const response = await api.put(
    `/timetables/${id}`,
    data
  );

  return response.data;
};

export const deleteTimetable = async (id) => {
  const response = await api.delete(
    `/timetables/${id}`
  );

  return response.data;
};