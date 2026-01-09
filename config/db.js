import mongoose from "mongoose";

const connectDB = async () => {
  try {
const mongodb = "mongodb://localhost:27017/project1"

    const conn = await mongoose.connect(mongodb);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
