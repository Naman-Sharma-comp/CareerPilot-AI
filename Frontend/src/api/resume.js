import api from "./axios";

// ==========================
// UPLOAD RESUME
// ==========================
export const uploadResume = async (file) => {
  const formData = new FormData();

  formData.append(
    "resume",
    file
  );

  const response =
    await api.post(
      "/resumes",
      formData
    );

  return response.data;
};

// ==========================
// GET USER RESUMES
// ==========================
export const getResumes = async () => {
  const response =
    await api.get(
      "/resumes"
    );

  return response.data;
};

// ==========================
// REPLACE RESUME
// ==========================
export const replaceResume = async (
  resumeId,
  file
) => {
  const formData =
    new FormData();

  formData.append(
    "resume",
    file
  );

  const response =
    await api.put(
      `/resumes/${resumeId}`,
      formData
    );

  return response.data;
};

export const downloadResume = async (
  resumeId
) => {
  const response =
    await api.get(
      `/resumes/${resumeId}/download`,
      {
        responseType: "blob",
      }
    );

  return response;
};

// ==========================
// GET RESUME HISTORY
// ==========================
export const getResumeHistory = async (
  resumeId
) => {
  const response =
    await api.get(
      `/resumes/${resumeId}/history`
    );

  return response.data;
};

// ==========================
// DELETE RESUME
// ==========================
export const deleteResume = async (
  resumeId
) => {
  const response =
    await api.delete(
      `/resumes/${resumeId}`
    );

  return response.data;
};