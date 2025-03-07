import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("MongoDB connected Successfully"))
      .catch((e) => console.log("mongodb connection error", e));
  } catch (error) {
    console.log("Error while connecting to DB");
  }
};
