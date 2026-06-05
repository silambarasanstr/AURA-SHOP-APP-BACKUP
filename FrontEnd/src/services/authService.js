import api from "./api";

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || "Registration failed";
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);

    // Save token & user data
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
    }

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || "Login failed";
  }
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.user;
};

// Get Token
export const getToken = () => {
  return localStorage.getItem("token");
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
