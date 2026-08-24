import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { DashboardPage } from "./features/dashboard/pages/DashboardPage";
import { DevelopersPage } from "./features/developers/pages/DevelopersPage";
import { LandingPage } from "./features/landing/pages/LandingPage";
import { SignUpPage } from "./features/signup/pages/SignUpPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<SignUpPage />} />
        <Route path="/panel" element={<DashboardPage />} />
        <Route path="/desarrolladores" element={<DevelopersPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
