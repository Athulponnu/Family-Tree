import API from "./api";

export const registerUser = (data) =>
  API.post("/auth/register", null, { params: data });

export const loginUser = (data) => {
  const form = new URLSearchParams();
  form.append("username", data.username);
  form.append("password", data.password);

  return API.post("/auth/login", form);
};