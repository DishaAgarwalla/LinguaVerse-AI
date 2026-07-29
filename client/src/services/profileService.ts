import api from "./api";

import type {
  UserProfile,
  UpdateProfileRequest,
} from "../types/profile";

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getProfile = async (): Promise<UserProfile> => {
  const response = await api.get("/auth/me", {
    headers: getAuthHeader(),
  });

  return response.data.user;
};

export const updateProfile = async (
  data: UpdateProfileRequest
): Promise<UserProfile> => {
  const response = await api.put(
    "/profile",
    data,
    {
      headers: getAuthHeader(),
    }
  );

  return response.data.user;
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await api.put(
    "/profile/password",
    data,
    {
      headers: getAuthHeader(),
    }
  );

  return response.data;
};