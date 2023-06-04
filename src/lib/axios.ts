import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXTAUTH_URL || "http://localhost:3000",
  withCredentials: true,
});

export default api;
