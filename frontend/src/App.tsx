import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import ScanFood from "./pages/ScanFood";
import FoodDiary from "./pages/FoodDiary";
import AIChat from "./pages/AIChat";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/scan"
            element={
              <ProtectedRoute>
                <ScanFood />
              </ProtectedRoute>
            }
          />

          <Route
            path="/diary"
            element={
              <ProtectedRoute>
                <FoodDiary />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <AIChat />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={<Login />}
          />
          <Route
  path="/register"
  element={<Register />}
/>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;