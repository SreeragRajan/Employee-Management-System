import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import User from "./models/user.model.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

// const seedUsers = async () => {
//   try {
//     await User.insertMany(
//       [
//         {
//           "fullName": "John Doe",
//           "email": "john.doe@example.com",
//           "password": "$2b$10$abcd1234abcd1234abcd1234abcd1234abcd1234abcd1234abcd12", 
//           "role": "employee",
//           "tasks": [
//             {
//               "title": "Fix API Endpoint",
//               "description": "Resolve issues with user authentication API.",
//               "date": "2025-03-08T00:00:00Z",
//               "category": "Bug Fixing",
//               "active": true,
//               "newTask": false,
//               "completed": false,
//               "failed": false
//             },
//             {
//               "title": "Database Optimization",
//               "description": "Optimize MongoDB queries for faster performance.",
//               "date": "2025-03-10T00:00:00Z",
//               "category": "Database Management",
//               "active": false,
//               "newTask": true,
//               "completed": false,
//               "failed": false
//             }
//           ]
//         },
//         {
//           "fullName": "Alice Smith",
//           "email": "alice.smith@example.com",
//           "password": "$2b$10$abcd1234abcd1234abcd1234abcd1234abcd1234abcd1234abcd12",
//           "role": "employee",
//           "tasks": [
//             {
//               "title": "UI Enhancement",
//               "description": "Improve user interface of the dashboard.",
//               "date": "2025-03-09T00:00:00Z",
//               "category": "UI/UX Design",
//               "active": false,
//               "newTask": true,
//               "completed": false,
//               "failed": false
//             },
//             {
//               "title": "Write Documentation",
//               "description": "Document all API endpoints and workflows.",
//               "date": "2025-03-11T00:00:00Z",
//               "category": "Documentation",
//               "active": false,
//               "newTask": false,
//               "completed": true,
//               "failed": false
//             }
//           ]
//         },
//         {
//           "fullName": "Bob Johnson",
//           "email": "bob.johnson@example.com",
//           "password": "$2b$10$abcd1234abcd1234abcd1234abcd1234abcd1234abcd1234abcd12",
//           "role": "employee",
//           "tasks": [
//             {
//               "title": "Cloud Server Setup",
//               "description": "Deploy backend services to AWS EC2 instance.",
//               "date": "2025-03-12T00:00:00Z",
//               "category": "Cloud Management",
//               "active": true,
//               "newTask": false,
//               "completed": false,
//               "failed": false
//             },
//             {
//               "title": "Team Meeting",
//               "description": "Discuss project roadmap and responsibilities.",
//               "date": "2025-03-13T00:00:00Z",
//               "category": "Team Meeting",
//               "active": false,
//               "newTask": false,
//               "completed": false,
//               "failed": true
//             }
//           ]
//         }
//       ]
      
//     );
//     console.log("Users inserted successfully!");
//     mongoose.connection.close();
//   } catch (error) {
//     console.error("Error inserting users:", error);
//   }
// };

// seedUsers();

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
