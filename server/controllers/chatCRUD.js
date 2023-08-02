const Message = require('../models/messageModel');

exports.findUserMessages = async function findUserConnections(_id, _id2) {
  try {
    const messages = await Message.find({
      $or: [
        { userOne: _id, userTwo: _id2 },
        { userOne: _id2, userTwo: _id },
      ],
    }).exec();
    return messages;
  } catch (error) {
    // Handle the error appropriately
    throw error;
  }
};
