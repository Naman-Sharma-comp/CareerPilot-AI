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

// GitHub Login
export const githubLogin = async (code) => {
  const response = await api.post("/auth/github", {
    code,
  });

  return response.data;
};

// LinkedIn Login
export const linkedinLogin = async (code) => {
  const response = await api.post("/auth/linkedin", {
    code,
  });

  return response.data;
};

// Unlink Google Account
export const unlinkGoogle = async () => {
  const response = await api.delete("/auth/google");

  return response.data;
};

// Unlink LinkedIn Account
export const unlinkLinkedin = async () => {
  const response =
    await api.delete(
      "/auth/linkedin"
    );

  return response.data;
};