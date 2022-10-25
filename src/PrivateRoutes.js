import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const PrivateRoutes = () => {
  return "authenticated" in localStorage ? (
    <Outlet />
  ) : (
    <Navigate to="/admin" />
  );
};

export default PrivateRoutes;
