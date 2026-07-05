import api from "./api";

// Register
export const registerUser = async (userData) => {
  const { data } = await api.post("/auth/register", userData);

  return data;
};

// Login
export const loginUser = async (userData) => {
  const { data } = await api.post("/auth/login", userData);

  // Save token & user
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
};

// Current User
export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const { data } = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.user;
};

// Get Token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
