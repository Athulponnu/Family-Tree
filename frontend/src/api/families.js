import axios from "./axios";

export const fetchFamilies = () =>
  axios.get("/api/v1/families");

export const createFamilyApi = (family_name) =>
  axios.post("/api/v1/families", null, {
    params: { family_name },
  });

export const inviteMemberApi = (familyId, role) =>
  axios.post(`/api/v1/families/${familyId}/invite`, null, {
    params: { role },
  });

export const joinFamilyApi = (token) =>
  axios.post(`/api/v1/families/join/${token}`);
