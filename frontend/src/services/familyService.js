import API from "./api";

export const addFamilyMember = (data) =>
  API.post("/family", null, { params: data });

export const getFamilyTree = () =>
  API.get("/family/tree");
