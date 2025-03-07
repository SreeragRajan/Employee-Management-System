import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../utils/axios";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      toast.error("All fields are required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (fullName.length < 4) {
      toast.error("fullName must be at least 4 characters long");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      const response = await axiosInstance.post(
        "/auth/register",
        { fullName, email, password },
        { withCredentials: true }
      );

      toast.success("Registration Successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    handleSignUp();
    setFullName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="border-2 rounded-xl border-sky-600 px-20 py-10">
        <h1 className="text-4xl font-semibold mb-10 text-center">Register</h1>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex flex-col gap-3 items-center justify-center"
        >
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="text-sm outline-none bg-transparent border-2 border-sky-600 py-3 px-6 w-80 rounded-full placeholder:text-gray-400"
            required
          />
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className="text-sm outline-none bg-transparent border-2 border-sky-600 py-3 px-6 w-80 rounded-full placeholder:text-gray-400"
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            className="text-sm outline-none bg-transparent border-2 border-sky-600 py-3 px-6 w-80 rounded-full placeholder:text-gray-400"
            type="password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="mt-4 w-80 text-white border-none outline-none hover:bg-sky-700 font-medium bg-sky-600 py-3 px-6 rounded-full placeholder:text-white"
          >
            Register
          </button>
        </form>
        <div className="mt-4">
          <p className="text-sm  text-center">
            Already have an account ?{" "}
            <Link to={"/login"} className="text-sky-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
