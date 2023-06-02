import { Document, Schema } from 'mongoose';

//interface used as type because ig ts needs it or something
export interface userInterface extends Document {
  username: string;
  age: number;
  email: string;
  password: string;
  imageUrl?: string;
}

// User schema defined

export const userSchema = new Schema<userInterface>({
  username: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  imageUrl: String,
});
