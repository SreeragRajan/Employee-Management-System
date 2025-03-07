import mongoose from "mongoose";
import User from "../models/user.model.js";

export const addTask = async (req, res) => {
  try {
    const { userId, title, description, date, category } = req.body;

    if (!userId || !title || !description || !date || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Find the user to whom the task is assigned
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create a new task object
    const newTask = {
      title,
      description,
      date,
      category,
      active: false,
      newTask: true,
      failed: false,
      completed: false,
    };

    // Push new task to the user's tasks array
    user.tasks.push(newTask);
    await user.save();

    res
      .status(201)
      .json({ message: "Task added successfully!", task: newTask });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getCategories = async (req, res) => {
  try {
    // Get the enum values directly from the schema
    const categories = Object.values(
      mongoose.model("User").schema.path("tasks.category").enumValues
    );
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCompletedTask = async (req, res) => {
  try {
    const { userId, taskId } = req.body;

    // Ensure userId and taskId are provided
    if (!userId || !taskId) {
      return res
        .status(400)
        .json({ message: "User ID and Task ID are required" });
    }

    // Find and update the task
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "tasks._id": taskId },
      { $set: { "tasks.$.completed": true, "tasks.$.active": false } },
      { new: true }
    );

    // If user or task not found
    if (!updatedUser) {
      return res.status(404).json({ message: "User or Task not found" });
    }

    // Find the updated task
    const updatedTask = updatedUser.tasks.find(
      (task) => task._id.toString() === taskId
    );

    res.status(200).json({
      message: "Task marked as completed successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error in updating completed task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateFailedTask = async (req, res) => {
  try {
    const { userId, taskId } = req.body;

    // Ensure userId and taskId are provided
    if (!userId || !taskId) {
      return res
        .status(400)
        .json({ message: "User ID and Task ID are required" });
    }

    // Find and update the task
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "tasks._id": taskId },
      { $set: { "tasks.$.failed": true, "tasks.$.active": false } },
      { new: true }
    );

    // If user or task not found
    if (!updatedUser) {
      return res.status(404).json({ message: "User or Task not found" });
    }

    // Find the updated task
    const updatedTask = updatedUser.tasks.find(
      (task) => task._id.toString() === taskId
    );

    res.status(200).json({
      message: "Task marked as failed successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error in updating failed task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const acceptTask = async (req, res) => {
  try {
    const { userId, taskId } = req.body;

    // Ensure both userId and taskId are provided
    if (!userId || !taskId) {
      return res
        .status(400)
        .json({ message: "User ID and Task ID are required" });
    }

    // Find and update the specific task
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "tasks._id": taskId },
      {
        $set: {
          "tasks.$.active": true,
          "tasks.$.newTask": false,
        },
      },
      { new: true }
    );

    // If no user found, return an error
    if (!updatedUser) {
      return res.status(404).json({ message: "User or Task not found" });
    }

    // Find the updated task
    const updatedTask = updatedUser.tasks.find(
      (task) => task._id.toString() === taskId
    );

    res.status(200).json({
      message: "Task marked as active successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error in accepting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
