const mongoose = require('mongoose');

// Create a new Mongoose schema
const Schema = mongoose.Schema;

// Define the message schema
const messageSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  messageContent: {
    type: mongoose.Schema.Types.String,
    require: true,
  },
});

// Create and export the Message model based on the message schema
module.exports = mongoose.model('Message', messageSchema);
