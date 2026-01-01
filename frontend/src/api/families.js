import api from "./axios";

// ----------------------
// Create Family
// ----------------------
export const createFamily = (family_name) => {
  return api.post("/families/", {
    family_name: family_name,
  });
};

// ----------------------
// Invite Member
// ----------------------
export const inviteMember = (family_id, role) => {
  return api.post(`/families/${family_id}/invite`, {
    role: role,
  });
};

// ----------------------
// Join Family (if implemented later)
// ----------------------
export const joinFamily = (token, data) => {
  return api.post(`/families/join/${token}`, data);
};

export const getMyFamilies = () => {
  return api.get("/families/my");
};
