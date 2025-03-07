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

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["employee", "admin"],
      default: "employee",
    },
    tasks: [taskSchema],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual field for taskCounts
userSchema.virtual("taskCounts").get(function () {
  return {
    active: this.tasks.filter((task) => task.active === true).length,
    newTask: this.tasks.filter((task) => task.newTask === true).length,
    completed: this.tasks.filter((task) => task.completed === true).length,
    failed: this.tasks.filter((task) => task.failed === true).length,
  };
});

const User = mongoose.model("User", userSchema);
export default User;
