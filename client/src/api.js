import axios from "axios";

// Get base URL from .env file
const baseURL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
