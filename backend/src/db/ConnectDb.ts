import mongoose from "mongoose";

const connect = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Snap");
    console.log("Connected to db");
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to connect to db", error.message);
      console.error("Failed to connect to db", error.message);
    } else {
      console.error("Failed to connect to db", error);
    }
  }
};

export default connect;
