import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../utils/axios";
import { AuthContext } from "../../context/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );

        toast.success("Login Successful");
        setUser(response.data);
        
        window.location.reload();
        // Use response.data.role instead of user?.role
        response.data.role === "employee" ? navigate("/employee") : navigate("/admin");
      
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      setUser(null);
    }
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin();
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="border-2 rounded-xl border-sky-600 px-20 py-10">
        <h1 className="text-4xl font-semibold mb-5 text-center">Login</h1>
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-3 items-center justify-center"
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-sm outline-none bg-transparent border-2 border-sky-600 py-3 px-6 w-80 rounded-full placeholder:text-gray-400"
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="text-sm outline-none bg-transparent border-2 border-sky-600 py-3 px-6 w-80 rounded-full placeholder:text-gray-400"
            type="password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="mt-4 w-80 text-white border-none outline-none hover:bg-sky-700 font-medium bg-sky-600 py-3 px-6 rounded-full"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-sky-500 hover:underline">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
