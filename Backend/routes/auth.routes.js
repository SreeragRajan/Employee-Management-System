import express from "express";
import { checkAuth, login, logout, register } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/checkAuth", protectRoute, checkAuth);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
