import axios from "./axios";

export const getDashboard = () => {
  return axios.get("/dashboard");
};