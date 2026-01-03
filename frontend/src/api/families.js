import axios from "./axios";

export const fetchFamilies = () => axios.get("/families");
export const createFamilyApi = (family_name) =>
  axios.post("/families", null, { params: { family_name } });

export const inviteMemberApi = (familyId, role) =>
  axios.post(`/families/${familyId}/invite`, null, {
    params: { role },
  });

export const joinFamilyApi = (token) =>
  axios.post(`/families/join/${token}`);
