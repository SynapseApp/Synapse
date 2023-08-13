const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Create a new Mongoose schema
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  username: { type: String, sparse: true, unique: true },
  email: { type: String, required: true, unique: true }, // User's email field
  displayName: { type: String, sparse: true },
  googleId: { type: String, required: false, unique: true },
  provider: { type: String, required: false },
  isOnline: { type: Boolean, required: true },
  lastOnlineTimestamp: { type: Date },
  // imageUrl: String, // Uncomment this line to include an imageUrl field
});

// Plugin passport-local-mongoose to the user schema
userSchema.plugin(passportLocalMongoose, { usernameQueryFields: ['email'] });

// Create and export the User model based on the user schema
module.exports = mongoose.model('User', userSchema);
