import api from "./api";

export const getProfile = async () => {

  const role = localStorage.getItem("role");

  if (role === "SUPER_ADMIN" || role === "SCHOOL_ADMIN") {

    const response = await api.get("/auth/profile");
    return response.data;

  }

  if (role === "STAFF") {

    const response = await api.get("/staff/profile");
    return response.data;

  }

  if (role === "STUDENT") {

    const response = await api.get("/students/profile");
    return response.data;

  }

};

export const updateProfile = async (data) => {

  const role = localStorage.getItem("role");

  if (role === "SUPER_ADMIN" || role === "SCHOOL_ADMIN") {

    const response = await api.put("/auth/profile", data);
    return response.data;

  }

  if (role === "STAFF") {

    const response = await api.put("/staff/profile", data);
    return response.data;

  }

  if (role === "STUDENT") {

    const response = await api.put("/students/profile", data);
    return response.data;

  }

};