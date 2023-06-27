const mongoose = require('mongoose');

// Create a new Mongoose schema
const Schema = mongoose.Schema;

// Define the connections schema
const connectionSchema = new Schema({
  userOne: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userTwo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Create and export the Connection model based on the connection schema
module.exports = mongoose.model('Connection', connectionSchema);
