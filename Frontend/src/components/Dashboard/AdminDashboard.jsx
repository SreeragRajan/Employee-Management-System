import React, { useState } from "react";
import Header from "../others/Header";
import CreateTask from "../others/CreateTask";
import AllTask from "../others/AllTask";
import { axiosInstance } from "../../utils/axios";
import { useEffect } from "react";

const AdminDashboard = (props) => {
  const [userData, setUserData] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const res = await axiosInstance.get("/user/all");
      setUserData(res.data.data);
    } catch (error) {
      console.log(
        "error fetching all users:",
        error.res.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="h-screen w-full p-2 md:p-10">
      <Header changeUser={props.changeUser} />
      <CreateTask userData={userData} refreshTasks={fetchAllUsers} />
      <AllTask userData={userData} refreshTasks={fetchAllUsers} />
    </div>
  );
};

export default AdminDashboard;
