import axios from "axios";

const API = "http://localhost:5000/api";

export const getMe = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.user;
};