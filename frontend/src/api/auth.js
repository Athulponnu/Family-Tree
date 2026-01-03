import axios from "./axios";

export const loginApi = (data) =>
  axios.post("/auth/login", null, { params: data });

export const registerApi = (data) =>
  axios.post("/auth/register", null, { params: data });
