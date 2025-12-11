// src/api.js
import axios from "axios";
import { getAccessToken, getRefreshToken, setTokens, clearAuth } from "./utils/auth";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const REFRESH_ENDPOINT = "/admin/refresh/"; // relative to baseURL

const API = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// Refresh control
let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const refreshAuth = async () => {
  if (isRefreshing) {
    // return a promise that resolves when refresh finishes
    return new Promise((resolve, reject) => {
      subscribeTokenRefresh((token) => {
        if (token) resolve(token);
        else reject(new Error("Refresh failed"));
      });
    });
  }

  isRefreshing = true;
  const refresh = getRefreshToken();

  if (!refresh) {
    isRefreshing = false;
    onRefreshed(null);
    throw new Error("No refresh token");
  }

  try {
    const res = await axios.post(`${baseURL}${REFRESH_ENDPOINT}`, { refresh }, {
      headers: { "Content-Type": "application/json" },
    });

    const newAccess = res.data.access;
    const newRefresh = res.data.refresh;

    setTokens({ access: newAccess, refresh: newRefresh }); // update storage

    isRefreshing = false;
    onRefreshed(newAccess);
    return newAccess;
  } catch (err) {
    isRefreshing = false;
    onRefreshed(null);
    clearAuth();
    throw err;
  }
};

// Request interceptor: attach token
API.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

// Response interceptor: try refresh on 401
API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // If there's no response (network) or not 401 → bubble up
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    // Avoid infinite loop
    if (originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    try {
      const newAccess = await refreshAuth();

      // attach new token and retry original
      originalRequest.headers.Authorization = `Bearer ${newAccess}`;
      return API(originalRequest);
    } catch (err) {
      // refresh failed → force logout & redirect
      clearAuth();
      // if you're in SPA, prefer router navigation instead of location.href
      window.location.href = "/admin/login";
      return Promise.reject(err);
    }
  }
);

export default API;
