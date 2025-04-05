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

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const [user] = useContext(AuthContext);

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!allowedRoles.includes(user?.role)) {
//     const redirectPath = user?.role === "admin" ? "/admin" : "/employee";
//     return <Navigate to={redirectPath} replace />;
//   }

//   return children;
// };

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(AuthContext);
  const [loading, setLoading] = useState(true); // Loader state

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      setUser(res.data.data);

      if (res.data.data?.role === "admin") {
        navigate("/admin");
      } else if (res.data.data?.role === "employee") {
        navigate("/employee");
      }
    } catch (error) {
      console.error(
        "Error checking auth:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false); // Hide loader after authentication check
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

      <Route path="/admin" element={<AdminDashboard changeUser={setUser} />} />

      <Route
        path="/employee"
        element={<EmployeeDashboard changeUser={setUser} data={user} />}
      />
    </Routes>
  );
};

export default App;
