const mongoose = require('mongoose');
const { mongoDB_url } = require('../store.js');

const url = mongoDB_url;

module.exports = async function connectDatabase() {
  console.log(`Connecting to MongoDB...`);
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log(`MongoDB connection error:`, error);
  }
};
