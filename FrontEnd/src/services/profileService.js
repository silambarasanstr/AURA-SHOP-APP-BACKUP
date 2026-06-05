import api from "./api";

const getToken = () => localStorage.getItem("token");

// 🔥 GET PROFILE
export const getProfile = async () => {
  const token = getToken();

  const res = await api.get(`/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// 🔥 UPDATE PROFILE
export const updateProfile = async (data) => {
  const token = getToken();

  const res = await api.put(`/users/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
