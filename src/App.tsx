import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
import { PublicOnlyRoute } from "./features/auth/components/PublicOnlyRoute";
import { DashboardPage } from "./features/dashboard/pages/DashboardPage";
import { DeveloperTopicPage } from "./features/developers/pages/DeveloperTopicPage";
import { LandingPage } from "./features/landing/pages/LandingPage";
import { SignUpPage } from "./features/signup/pages/SignUpPage";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        closeButton
        richColors
        toastOptions={{
          duration: 4500,
          classNames: {
            toast: "facturabit-toast",
            title: "facturabit-toast-title",
            description: "facturabit-toast-description",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/registro" element={<SignUpPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/panel/*" element={<DashboardPage />} />
        </Route>
        <Route
          path="/desarrolladores"
          element={<Navigate to="/desarrolladores/autenticacion" replace />}
        />
        <Route path="/desarrolladores/:topic" element={<DeveloperTopicPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
