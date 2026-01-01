import api from "./axios";

// --------------------
// LOGIN (OAuth2)
// --------------------
export const loginUser = (form) => {
  const data = new URLSearchParams();
  data.append("username", form.username);
  data.append("password", form.password);

  return api.post("/auth/login", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

// --------------------
// REGISTER
// --------------------
export const registerUser = (form) => {
  return api.post("/auth/register", null, {
    params: {
      username: form.username,
      email: form.email,
      password: form.password,
    },
  });
};
