import axiosInstance from "./axios";

export const getMyProfile = () => {
  return axiosInstance.get("/users/me");
};

export const updateBio = (bio) => {
  return axiosInstance.put("/users/me", { bio });
};
