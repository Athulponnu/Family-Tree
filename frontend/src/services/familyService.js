import API from "./api";               // legacy (kept)
import api from "../api/axios";
import {
  deleteFamily,
  removeFamilyMember,
} from "../api/families";

/* ---------- LEGACY ---------- */
export const addFamilyMember = (data) =>
  API.post("/family", null, { params: data });

/* ---------- FAMILY TREE ---------- */
export const getFamilyTree = async (familyId) => {
  const res = await api.get(
    `/api/v1/families/${familyId}/tree`
  );
  return res.data;
};

/* ---------- DELETE FAMILY ---------- */
export const removeFamily = async (familyId) => {
  return await deleteFamily(familyId);
};

/* ---------- KICK MEMBER ---------- */
export const kickMember = async (familyId, userId) => {
  return await removeFamilyMember(familyId, userId);
};
