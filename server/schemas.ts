import { Document, Schema, Types } from 'mongoose';

export interface UserDetailsInterface {
  // username: string;
  // age: number;
  email: string;
  // imageUrl?: string;
  salt: string;
  hashed_password: string;
}

export interface UserInterface extends Document, UserDetailsInterface {}
export const userSchema = new Schema<UserInterface>({
  // username: { type: String, required: true },
  // age: { type: Number, required: true },
  email: { type: String, required: true },
  // imageUrl: String,
  salt: { type: String, required: true },
  hashed_password: { type: String, required: true },
});
