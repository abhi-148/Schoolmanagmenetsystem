import api from "./api";

export const getReportCard =
async (
  studentId,
  examId
) => {

  const response =
    await api.get(
      `/report-cards/${studentId}/${examId}`
    );

  return response.data;

};