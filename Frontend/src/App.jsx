import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Welcome from "./components/Welcome";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { AuthContext } from "./context/AuthProvider";
import { axiosInstance } from "./utils/axios.js";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext); // Destructure correctly

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    const redirectPath = user?.role === "admin" ? "/admin" : "/employee";
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(AuthContext); 
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      const authenticatedUser = res.data.data;
      setUser(authenticatedUser);

      // Navigate only if not already on a valid route
      if (!window.location.pathname.includes('/admin') && !window.location.pathname.includes('/employee')) {
        navigate(authenticatedUser?.role === "admin" ? "/admin" : "/employee");
      }
    } catch (error) {
      console.error("Error checking auth:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard changeUser={setUser} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRoles={["employee"]}>
            <EmployeeDashboard changeUser={setUser} data={user} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} /> {/* Catch-all route */}
    </Routes>
  );
};

export default App;