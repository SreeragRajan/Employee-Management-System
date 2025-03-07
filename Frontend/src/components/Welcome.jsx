import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-2">
        <h1 className="text-4xl text-center font-semibold mb-10">
          Welcome to Employee Management System
        </h1>
        <div className="flex space-x-2">
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
