import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./view/LoginPage";
import SystemsPage from "./view/SystemsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./view/LandingPage";
import NavBar from "./components/NavBar";
import { useSelector } from "react-redux";
import AssetsDetailPage from "./view/AssetsDetailPage";

function App() {
  const location = useLocation()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const assets = useSelector(state => state.assets.assets)
  return (
    <div className="flex flex-col min-h-screen overflow-y-hidden">
      {location.pathname !== "/" && <NavBar />}
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/systems"
            element={
              <ProtectedRoute>
                <SystemsPage />
              </ProtectedRoute>
            }
          />
            <Route path="/systems/:system_id" element={<AssetsDetailPage assets={assets} />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/systems" : "/login"} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
