import api from "./axios";

// Register User
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Login User
export const login = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

// Google Login
export const googleLogin = async (credential) => {
  const response = await api.post("/auth/google", {
    credential,
  });

  return response.data;
};