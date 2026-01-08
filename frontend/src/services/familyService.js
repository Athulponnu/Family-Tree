import API from "./api";
import api from "../api/axios";

export const addFamilyMember = (data) =>
  API.post("/family", null, { params: data });

export const getFamilyTree = async (familyId) => {
  const res = await api.get(`/api/v1/families/${familyId}/tree`);
  return res.data;
};