const mongoose = require("mongoose");
const { mongoDB_url } = require("../store.js");

const url = mongoDB_url;

module.exports = connectDatabase = () => {
  console.log(`Connecting to MongoDB...`);
  try {
    mongoose.connect(url);

    console.log("MongoDB connected");
  } catch (error) {
    console.log(`MongoDB connection error:`, error);
  }
};
