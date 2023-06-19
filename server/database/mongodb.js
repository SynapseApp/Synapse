const mongoose = require('mongoose');
const { mongoDB_url } = require('../store.js');

const url = mongoDB_url;

module.exports = async function connectDatabase() {
  mongoose
    .connect('mongodb://127.0.0.1/Synapse', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log(`MONGO CONNECTION OPEN!!`);
    })
    .catch((err) => {
      console.log(`ERROR MONGO CONNECTION`);
      console.log(err);
    });
};
