import React, { useEffect, useState } from "react";
import Header from "../others/Header";
import TaskListNumbers from "../others/TaskListNumbers";
import TaskList from "../TaskList/TaskList";
import { axiosInstance } from "../../utils/axios";

const EmployeeDashboard = ({ data, changeUser }) => {
  const [userData, setUserData] = useState(null);

  const fetchUser = async () => {
    try {
      console.log(data._id);
      const res = await axiosInstance.get(`/user/${data._id}`);
      setUserData(res?.data.data);
    } catch (error) {
      console.log(
        "error fetching a user:",
        error.res.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen p-2 md:p-10 bg-[#1C1C1C]">
      <Header changeUser={changeUser} data={data} />
      <TaskListNumbers data={userData} />
      <TaskList data={userData} refreshTasks={fetchUser} />
    </div>
  );
};

export default EmployeeDashboard;
