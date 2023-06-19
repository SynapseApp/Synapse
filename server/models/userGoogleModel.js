const mongoose = require('mongoose');

// Create a new Mongoose schema
const Schema = mongoose.Schema;

// Define the user schema
const userGoogleSchema = new Schema({
    displayName: { type: String, required: true, unique: true },
    googleId: { type: String, required: true, unique: true }
    // imageUrl: String, // Uncomment this line to include an imageUrl field
});

// Create and export the User model based on the user schema
module.exports = mongoose.model('UserGoogle', userGoogleSchema);