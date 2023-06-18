const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// User schema defined
const userSchema = new Schema({
  username: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  imageUrl: String,
});

exports.userSchema = userSchema;
