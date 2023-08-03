const Message = require('../models/messageModel');

exports.findUserMessages = async function findUserConnections(_id, _id2) {
  try {
    const messages = await Message.find({
      $or: [
        { sender: _id, receiver: _id2 },
        { sender: _id2, receiver: _id },
      ],
    }).exec();
    return messages;
  } catch (error) {
    // Handle the error appropriately
    throw error;
  }
};
