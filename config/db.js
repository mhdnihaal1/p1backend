import mongoose from "mongoose";

const connectDB = async () => {
  try {
const mongodb = "mongodb+srv://nihalmuhaednihal_db_user:YeTwCamsbLMme76N@cluster0.qtzav8f.mongodb.net/p1backend?retryWrites=true&w=majority"

    const conn = await mongoose.connect(mongodb);
    // console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
