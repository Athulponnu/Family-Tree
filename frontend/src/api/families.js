import api from "./axios";

/* ---------- LIST FAMILIES ---------- */
export const fetchFamilies = () =>
  api.get("/api/v1/families/");

/* ---------- CREATE FAMILY ---------- */
export const createFamilyApi = (family_name) =>
  api.post("/api/v1/families", null, {
    params: { family_name },
  });

/* ---------- INVITE MEMBER ---------- */
export const inviteMemberApi = (familyId, role) =>
  api.post(`/api/v1/families/${familyId}/invite`, null, {
    params: { role },
  });

/* ---------- JOIN FAMILY ---------- */
export const joinFamilyApi = (token) =>
  api.post(`/api/v1/families/join/${token}`);

/* ---------- DELETE FAMILY ---------- */
export const deleteFamily = (familyId) =>
  api.delete(`/api/v1/families/${familyId}`);

/* ---------- REMOVE MEMBER ---------- */
export const removeFamilyMember = (familyId, userId) =>
  api.delete(`/api/v1/families/${familyId}/members/${userId}`);
