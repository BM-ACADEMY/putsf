// src/utils/auth.js
export const ACCESS_KEY = "admin_access_token";
export const REFRESH_KEY = "admin_refresh_token";

export const getAccessToken = () => localStorage.getItem(ACCESS_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);

export const setTokens = ({ access, refresh }) => {
  if (access) localStorage.setItem(ACCESS_KEY, access);
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
};

export const clearAuth = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

export const decodeTokenPayload = (token) => {
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const payload = decodeTokenPayload(token);
  if (!payload || !payload.exp) return true;
  return payload.exp * 1000 < Date.now();
};

export const isAuthenticated = () => {
  const access = getAccessToken();
  const refresh = getRefreshToken();

  // No tokens at all → not authenticated
  if (!access && !refresh) {
    clearAuth();
    return false;
  }

  // If refresh exists we consider the user authenticated (access may be expired)
  if (refresh) return true;

  // fallback: if only access exists, check it
  if (access && !isTokenExpired(access)) return true;

  clearAuth();
  return false;
};
