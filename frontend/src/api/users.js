import axiosInstance from "./axios";

export const getMyProfile = () => {
  return axiosInstance.get("/api/v1/users/me");
};

export const updateBio = (bio) => {
  return axiosInstance.put("/api/v1/users/me", { bio });
};
