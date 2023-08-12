const Message = require('../models/messageModel');

// Function to find messages between two users.
exports.findUserMessages = async function findUserConnections(_id, _id2) {
  try {
    // Query the Message model to find messages sent between the two users (_id and _id2).
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

// Function to add a new message to the database.
exports.addMessage = async function findUserConnections(data) {
  try {
    // Extract necessary fields from the 'data' object to create a new message.
    data = {
      sender: data.sender,
      receiver: data.receiver,
      messageContent: data.messageContent,
    };

    // Create a new Message instance using the extracted data.
    const newMessage = new Message(data);

    // Save the new message to the database.
    await newMessage.save();

    // Return the newly created message.
    return newMessage;
  } catch (error) {
    // Handle the error appropriately
    throw error;
  }
};

exports.updateMessage = async function updateMessage(data) {
  try {
    // Find and Update the messages by ID in the DB
    const updatedMessage = await Message.findByIdAndUpdate(data.Message._id, {updatedMessage: data.messageToUpdate});
    return updatedMessage;
  }

  catch (error) {
    // Handle the error appropriately
    console.log(error)
  }
}

exports.deleteMessage = async function deleteMessage(data) {
  try {
    const messageToDelete = await Message.findByIdAndDelete(data.Message._id)
    console.log("Deleted Message", messageToDelete)
  }
  catch (error) {
    // Handle the error appropriately
    console.log(error)
  }
}