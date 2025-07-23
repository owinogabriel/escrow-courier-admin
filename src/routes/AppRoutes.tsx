import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/auth/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import AdminLayout from "../layout/AdminLayout";
import Signup from "../components/auth/SignUp";
import Dashboard from "../components/dashboard/Dashboard";
import Agents from "../components/agents/Agents";
import Parcels from "../components/parcels/Parcels";
import Reports from "../components/reports/Reports";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Admin Routes */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/parcels" element={<Parcels/>} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;