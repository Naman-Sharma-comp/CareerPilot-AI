import api from "./axios";

// ==========================
// CREATE JOB
// ==========================
export const createJob = async (
  jobData
) => {
  const response =
    await api.post(
      "/jobs",
      jobData
    );

  return response.data;
};

// ==========================
// GET ALL JOBS
// ==========================
export const getJobs = async () => {
  const response =
    await api.get(
      "/jobs"
    );

  return response.data;
};

// ==========================
// GET SINGLE JOB
// ==========================
export const getJob = async (
  jobId
) => {
  const response =
    await api.get(
      `/jobs/${jobId}`
    );

  return response.data;
};

// ==========================
// UPDATE JOB
// ==========================
export const updateJob = async (
  jobId,
  jobData
) => {
  const response =
    await api.put(
      `/jobs/${jobId}`,
      jobData
    );

  return response.data;
};

// ==========================
// DELETE JOB
// ==========================
export const deleteJob = async (
  jobId
) => {
  const response =
    await api.delete(
      `/jobs/${jobId}`
    );

  return response.data;
};