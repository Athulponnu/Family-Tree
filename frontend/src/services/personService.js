import api from "../api/axios";

export const getMyPerson = async () => {
  const res = await api.get("/api/v1/users/me/person");
  return res.data;
};

export const createMyPerson = async (fullName) => {
  const res = await api.post("/api/v1/users/me/person", {
    full_name: fullName
  });
  return res.data;
};

export const updateMyParents = async (payload) => {
  const res = await api.put("/api/v1/users/me/person/parents", payload);
  return res.data;
};
