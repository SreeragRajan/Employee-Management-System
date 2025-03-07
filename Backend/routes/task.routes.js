import express from "express";
import { acceptTask, addTask, getCategories, updateCompletedTask, updateFailedTask } from "../controllers/task.controller.js";

const router = express.Router();

router.post("/add", addTask);
router.put("/accept", acceptTask);
router.put("/completed", updateCompletedTask);
router.put("/failed", updateFailedTask);
router.get("/categories", getCategories);

export default router;