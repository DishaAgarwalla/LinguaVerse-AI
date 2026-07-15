import axios from "axios";

const API_URL = "http://localhost:5000/api/history";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getHistory = async () => {
  const response = await axios.get(API_URL, getToken());
  return response.data.translations;
};

export const deleteHistory = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`, getToken());
};

export const clearHistory = async () => {
  await axios.delete(API_URL, getToken());
};