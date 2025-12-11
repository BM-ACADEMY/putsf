// src/Routes/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAccessToken, getRefreshToken } from "../utils/auth";

const PrivateRoute = () => {
  const location = useLocation();

  const access = getAccessToken();
  const refresh = getRefreshToken();

  // 🚨 No tokens at all → definitely not logged in
  if (!access && !refresh) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // 🔥 If refresh exists, user is considered authenticated
  // even if access token has expired, API will refresh it automatically
  return <Outlet />;
};

export default PrivateRoute;
