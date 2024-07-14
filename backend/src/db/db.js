import mongoose from "mongoose";

const dbURI = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("connected to DB");
  } catch (error) {
    console.log("Error while connecting",error);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("disconnected from DB");
  } catch (error) {
    console.log("diconnected from db due to ::", error);
  }
};

export { connectDB, disconnectDB };
