import api from "./axios";

// ==========================
// GET PROFILE
// ==========================
export const getProfile = async () => {
  const response =
    await api.get("/profile");

  return response.data;
};

// ==========================
// UPDATE PROFILE
// ==========================
export const updateProfile = async (
  data
) => {
  const response =
    await api.put(
      "/profile",
      data
    );

  return response.data;
};

// ==========================
// GET CAREER PREFERENCES
// ==========================
export const getCareerPreferences =
  async () => {
    const response =
      await api.get(
        "/profile/preferences"
      );

    return response.data;
  };

// ==========================
// UPDATE CAREER PREFERENCES
// ==========================
export const updateCareerPreferences =
  async (data) => {
    const response =
      await api.put(
        "/profile/preferences",
        data
      );

    return response.data;
  };

  export const getNotificationPreference = async () => {
  const response = await api.get(
    "/profile/notifications"
  );

  return response.data;
};

export const updateNotificationPreference = async (
  notificationsEnabled
) => {
  const response = await api.put(
    "/profile/notifications",
    {
      notificationsEnabled,
    }
  );

  return response.data;
};