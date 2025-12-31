import api from "./axios";

export const registerUser = (data) =>
  api.post("/auth/register", null, { params: data });

export const loginUser = (data) =>
  api.post("/auth/login", null, { params: data });
