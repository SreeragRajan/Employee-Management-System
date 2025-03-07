import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; 

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized - No Token Provided",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        const userId = decoded.id;

        const user = await User.findById({ _id: userId }).select("-password"); 

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized - No User Found",
            });
        }

        req.user = user; 
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
