import axios from "axios";
import { getAccessToken, getRefreshToken, clearAuth, isTokenExpired } from "./auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Request: attach access token
api.interceptors.request.use(async (config) => {
  let access = getAccessToken();
  const refresh = getRefreshToken();

  // If access token expired and refresh exists → get new access token
  if (access && isTokenExpired(access) && refresh) {
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_BASE_URL + "/admin/refresh/",
        { refresh }
      );
      access = res.data.access;

      localStorage.setItem("admin_access_token", access);
    } catch (err) {
      clearAuth();
      window.location.href = "/admin/login";
    }
  }

  // Attach updated access token
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }

  return config;
});

// Failed response → logout
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      clearAuth();
      window.location.href = "/admin/login";
    }
    return Promise.reject(err);
  }
);

export default api;
