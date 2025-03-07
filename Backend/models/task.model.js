import mongoose from "mongoose";

export const taskSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    date: Date,
    category: {
      type: String,
      enum: [
        "Development",
        "Bug Fixing",
        "Code Review",
        "Testing & QA",
        "Deployment",
        "Security Audit",
        "Database Management",
        "Documentation",
        "UI/UX Design",
        "System Administration",
        "Cloud Management",
        "Networking",
        "Software Maintenance",
        "Customer Support",
        "Performance Optimization",
        "Research & Development",
        "Team Meeting",
        "Training & Learning",
        "Compliance & Regulation",
        "Project Planning",
      ],
    },
    active: {
      type: Boolean,
      default: false,
    },
    newTask: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    failed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = new mongoose.model("Task", taskSchema);
export default Task;
