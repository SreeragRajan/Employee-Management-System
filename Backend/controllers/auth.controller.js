import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({
      $or: [{ fullName }, { email }],
    });

    if (user) {
      return res.status(400).json({
        message: "User Already Exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Register Successfull",
      data: newUser,
    });
  } catch (error) {
    console.log("Error in register controller");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "None",
    });

    res.status(200).json({
      message: "Login Successful",
      data: user,
    });
  } catch (error) {
    console.log("Error in login controller");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", { httpOnly: true, maxAge: 0 });
    res.status(200).json({
      message: "Logout Successfull",
    });
  } catch (error) {
    console.log("Error in logout controller");
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.log("Error in checkAuth route");
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};
