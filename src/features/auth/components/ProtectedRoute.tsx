import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getSession } from "../services/authService";

export function ProtectedRoute() {
  const location = useLocation();

  if (!getSession()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}${location.hash}` }}
      />
    );
  }

  return <Outlet />;
}
