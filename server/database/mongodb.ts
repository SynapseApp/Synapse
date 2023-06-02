import mongoose from "mongoose";
import { mongoDB_url } from "../store";

const url = mongoDB_url;

const connectDatabase = () => {
  console.log(`Connecting to MongoDB...`);
  try {
    mongoose.connect(url);

    console.log("MongoDB connected");
  } catch (error) {
    console.log(`MongoDB connection error:`, error);
  }
};

export default connectDatabase;
