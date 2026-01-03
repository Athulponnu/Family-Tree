import axios from "./axios";

export const loginApi = (data) => {
  const formData = new URLSearchParams();
  formData.append("username", data.username);
  formData.append("password", data.password);

  return axios.post("/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const registerApi = (data) => {
  return axios.post("/auth/register", data);
};
