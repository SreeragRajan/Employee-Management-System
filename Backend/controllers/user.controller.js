import User from "../models/user.model.js";

export const getAllUsers = async(_, res) => {
    try {
        const users = await User.find({ role: "employee" }).select("-password");

        res.status(200).json({
            data: users,
        })
    } catch (error) {
        console.log("Error in getAllUsers controller");
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const createUser = async(req, res) => {
    
}

