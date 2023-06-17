import { Schema } from "mongoose";

// User schema defined
export const userSchema = new Schema({
  username: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  imageUrl: String,
});
