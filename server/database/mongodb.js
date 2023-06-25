const mongoose = require("mongoose");
const { mongoDB_url } = require("../store.js");

const url = mongoDB_url;

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 *
 * @description The `useNewUrlParser` option allows Mongoose to use the new URL parser when connecting to the MongoDB database.
 * This is necessary because the previous URL parser used by Mongoose has been deprecated.
 *
 * The `useUnifiedTopology` option enables the use of the new server discovery and monitoring engine.
 * This option replaces the previous engine, which is also deprecated.
 * Using this option ensures that the latest and recommended engine is utilized for better performance and stability.
 */
module.exports = async function connectDatabase() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb is connected");
  } catch (err) {
    console.log("failed to connect to mongodb: ");
    console.log(err);
  }
};
