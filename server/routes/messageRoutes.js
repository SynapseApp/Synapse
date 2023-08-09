const express = require('express');
const { findUserMessages, addMessage } = require('../controllers/messageCRUD');

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
  res.json(messages);
});

module.exports = messageRouter;
