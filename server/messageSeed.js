const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const User = require('./models/userModel');
const Message = require('./models/messageModel');

Message.deleteMany({});

// Function to generate random messages for a combination of two users
async function generateRandomMessages(userOne, userTwo, numMessages) {
  const messages = [];

  const randomMessageOne = faker.lorem.sentence();
  const randomMessageTwo = faker.lorem.sentence();

  messages.push({
    userOne: userOne._id,
    userTwo: userTwo._id,
    sender: Math.random() < 0.5 ? userOne._id : userTwo._id,
    messageContent: randomMessageOne,
  });

  messages.push({
    userOne: userTwo._id,
    userTwo: userOne._id,
    sender: Math.random() < 0.5 ? userTwo._id : userOne._id,
    messageContent: randomMessageTwo,
  });
  return Message.insertMany(messages);
}

async function seedDatabase() {
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
