import React from "react";

const CompleteTask = ({ task }) => {
  // Format the date properly
  const formattedDate = new Date(task.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative flex-shrink-0 h-72 w-full p-3 md:p-5 bg-green-400 rounded-xl">
      {/* Task Header */}
      <div className="flex justify-between items-center">
        <h3 className="bg-red-600 text-sm px-3 py-1 rounded">
          {task.category}
        </h3>
        <h4 className="text-sm">{formattedDate}</h4>
      </div>

      {/* Task Title */}
      <h2 className="mt-5 text-2xl font-semibold">{task.title}</h2>

      {/* Task Description - Wrapped and Scrollable if Overflowing */}
      <p className="text-sm mt-2 break-words whitespace-normal max-h-20 overflow-y-auto">
        {task.description}
      </p>

      {/* Complete Button */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
        <button
          className="w-64 bg-green-600 rounded font-medium p-1.5 text-sm"
          disabled={task.completed} // Disable if already completed
        >
          {task.completed ? "Completed" : "Complete"}
        </button>
      </div>
    </div>
  );
};

export default CompleteTask;
