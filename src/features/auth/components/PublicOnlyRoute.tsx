import { Navigate, Outlet } from "react-router-dom";
import { getSession } from "../services/authService";

export function PublicOnlyRoute() {
  if (getSession()) {
    return <Navigate to="/panel" replace />;
  }

  return <Outlet />;
}
