import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center p-2 md:p-10">
      <div className="flex flex-col items-center justify-center space-x-2">
        <h1 className="text-4xl md:text-5xl text-center font-semibold mb-10">
          Welcome to Employee Management System
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Link to={"/login"}>
            <button className="px-5 py-2 bg-emerald-600 w-60 rounded-md">
              Login
            </button>
          </Link>
          <Link to={"/signup"}>
            <button className="px-5 py-2 bg-sky-600 w-60 rounded-md">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
