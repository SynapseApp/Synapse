const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const User = require('../models/userModel');
const Message = require('../models/messageModel');

// Function to generate random messages for a combination of two users
async function generateRandomMessages(userOne, userTwo, numMessages) {
  const messages = [];

  for (let i = 0; i < numMessages; i++) {
    const randomMessage = faker.lorem.sentence();

    // Determine the sender and receiver
    const sender = Math.random() < 0.5 ? userOne._id : userTwo._id;
    const receiver = sender === userOne._id ? userTwo._id : userOne._id;

    messages.push({
      sender,
      receiver,
      messageContent: randomMessage,
    });
  }

  return Message.insertMany(messages);
}

async function seedDatabase() {
  await Message.deleteMany({});
  const users = await User.find().select('_id');

  const numCombinations = 3; // Number of combinations to generate random messages for

  for (let i = 0; i < users.length - 1; i++) {
    for (let j = i + 1; j < users.length; j++) {
      await generateRandomMessages(users[i], users[j], numCombinations);
    }
  }

  console.log('Seed completed successfully!');
  process.exit(0);
}

// Connect to your MongoDB database
mongoose
  .connect('mongodb://127.0.0.1/Synapse', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    seedDatabase();
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));
