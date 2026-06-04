import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const getToken = () => localStorage.getItem("token");

// 🔥 GET PROFILE
export const getProfile = async () => {
  const token = getToken();

  const res = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// 🔥 UPDATE PROFILE
export const updateProfile = async (data) => {
  const token = getToken();

  const res = await axios.put(`${API_URL}/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};