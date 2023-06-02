import mongoose from 'mongoose';
import { userSchema } from '../schemas';

//creation of user model
const User = mongoose.model(`User`, userSchema);

export default User;
