import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";
import { Calendar } from "lucide-react";

const CreateTask = ({ userData, refreshTasks }) => {
  const [categories, setCategories] = useState([]);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [category, setCategory] = useState("");

  const fetchUserCategories = async () => {
    try {
      const categoryRes = await axiosInstance.get("/task/categories");
      setCategories(categoryRes.data);
    } catch (error) {
      console.error(
        "Error fetching user categories:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchUserCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let assignedUser = userData.find((user) => user.fullName === assignTo);

      // if (!assignedUser) {
      //     // Create a new user if not found
      //     const newUserRes = await axiosInstance.post('/user/create', { fullName: assignTo });
      //     assignedUser = newUserRes.data;
      //     setUserData([...userData, assignedUser]); // Update state
      //     toast.success("New user created!");
      // }

      // Create the task
      const taskData = {
        userId: assignedUser._id,
        title: taskTitle,
        description: taskDescription,
        date: taskDate,
        category,
      };

      await axiosInstance.post("/task/add", taskData);
      toast.success("Task created successfully!");

      // Reset form
      setTaskTitle("");
      setTaskDescription("");
      setTaskDate("");
      setAssignTo("");
      setCategory("");

      //refresh tasks
      refreshTasks();
    } catch (error) {
      console.error(
        "Error creating task:",
        error.response?.data || error.message
      );
      toast.error("Failed to create task.");
    }
  };

  return (
    <div className="p-5 bg-[#1c1c1c] mt-5 rounded">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap w-full items-start justify-between"
      >
        <div className="w-1/2">
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Task Title</h3>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder="Enter task title"
              required
            />
          </div>
          <div className="w-4/5">
          <h3 className="text-sm text-gray-300 mb-0.5">Date</h3>
            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              onFocus={(e) => e.target.showPicker()}
              className="peer cursor-pointer text-sm py-1 px-2 w-full rounded outline-none bg-transparent border border-gray-400 mb-4"
            />
          </div>

          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Assign to</h3>
            <select
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
            >
              <option className="text-white bg-black" value="" disabled>
                Select a user
              </option>
              {userData.map((user) => (
                <option  className="text-white bg-black" key={user._id} value={user.fullName}>
                  {user.fullName}
                </option>
              ))}
            </select>
        
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Category</h3>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
            >
              <option className="text-white bg-black" value="" disabled>
                Select category
              </option>
              {categories.map((cat) => (
                <option className="text-white bg-black" key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-2/5 flex flex-col items-start">
          <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400"
            placeholder="Enter task description"
            required
          />
          <button className="bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
