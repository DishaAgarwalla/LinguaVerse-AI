import api from "./api";
import type { Settings } from "../types/settings";

export const getSettings = async (): Promise<Settings> => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    "/settings",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.settings;
};

export const updateSettings = async (
  data: Partial<Settings>
): Promise<Settings> => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    "/settings",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.settings;
};