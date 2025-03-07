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

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params; 

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ data: user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


