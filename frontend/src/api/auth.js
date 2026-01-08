import axios from "./axios";

export const loginApi = (data) => {
  const formData = new URLSearchParams();
  formData.append("username", data.username);
  formData.append("password", data.password);

  return axios.post("/api/v1/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const registerApi = (data) => {
  return axios.post("/api/v1/auth/register", data);
};
