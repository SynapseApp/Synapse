const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const User = require("./models/userModel.js");

// Connect to your MongoDB database
mongoose.connect("mongodb://127.0.0.1/Synapse", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const generatedUsername = new Set();

//Clears existing data and inserts new records into the User collection.
async function seed() {
  try {
    console.log("Initializing data seeding...");
    const startTime = new Date().getTime();

    // Clear the User collection
    console.log("Clearing the users collection...");
    await User.deleteMany({});
    console.log("The users collection has been cleared.");

    const totalUsers = 10000; // Change this value to the desired number of total users
    const batchSize = Math.ceil((totalUsers / 100) * 1); // Batch size as 1% of total users
    let insertedUsers = 0; // Counter for inserted users
    let lastLoggedProgress = 0; // Variable to keep track of the last logged progress

    const userInsertStart = new Date().getTime(); // Start time for the user load

    const users = [];
    for (let i = 1; i <= totalUsers; i++) {
      const username = await generateUniqueUsername();
      const displayName = faker.person.fullName();
      const email = `${username}@gmail.com`;
      const newUser = {
        username,
        email,
        displayName,
      };

      users.push(newUser);
      generatedUsername.add(username);

      // Calculate progress percentage
      const progress = Math.floor((i / totalUsers) * 100);

      // Log progress percentage only if it has changed since the last logged progress
      if (progress > lastLoggedProgress) {
        console.log(`Data insertion ${progress}% completed`);
        lastLoggedProgress = progress;
      }

      // Insert batch when the batch size is reached or it's the last iteration
      if (users.length === batchSize || i === totalUsers) {
        await User.insertMany(users);
        insertedUsers += users.length;
        users.length = 0; // Clear the batch array
      }
    }

    const userInsertEnd = new Date().getTime(); // End time for the user load
    const endTime = new Date().getTime();

    const totalTime = (endTime - startTime) / 1000; // in seconds

    const insertTime = (userInsertEnd - userInsertStart) / 1000; // in seconds

    console.log("Seeding finished.");
    console.log(`Total Users: ${totalUsers}`);
    console.log(`Data insertion time: ${insertTime.toFixed(2)} seconds`);
    console.log(`Total Time Taken: ${totalTime.toFixed(2)} seconds`);
    console.log(`Inserted Users: ${insertedUsers}`);
    console.log(`Progress: 100%`);
  } catch (error) {
    console.error("Error seeding data:", error.message);
  } finally {
    mongoose.disconnect();
  }
}

//Generates a unique username using the faker library.

async function generateUniqueUsername() {
  let username;
  let isUnique = false;

  while (!isUnique) {
    username = faker.internet.userName();
    isUnique = !generatedUsername.has(username);
  }

  return username;
}

seed();
