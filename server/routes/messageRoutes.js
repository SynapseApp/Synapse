const express = require('express');
const { findUserMessages, addMessage, deleteMessage, updateMessage } = require('../controllers/messageCRUD');

// Create a new Router instance
const messageRouter = express.Router();

messageRouter.post('/getMessages', async (req, res) => {
  // Endpoint to search for messages

  const id = req.body.id;
  const id2 = req.body.id2;

  const messages = await findUserMessages(id, id2);
  res.json(messages);
});
messageRouter.post('/', async (req, res) => {
  // Endpoint to search for messages

  const messages = await addMessage(req.body);
  console.log(messages);
  res.json(messages);
});

messageRouter.post("/updateMessage", async (req, res) => {
  // The Body should specify a property named .Message that contains the ID of the message to be Updated
  const updatedMessage = await updateMessage(req.body);
  
  console.log("Updated: ", updatedMessage);
  res.json(updatedMessage)  
})

messageRouter.post("/deleteMessage", async (req, res) => {
  // The Body should specify a property named .Message that contains the ID of the message to be Deleted
  const messageToDelete = await deleteMessage(req.body)
  
  console.log("Deleted Message: ", messageToDelete);
  res.json(messageToDelete)  
})


module.exports = messageRouter;
