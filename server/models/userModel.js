const mongoose = require("mongoose");
const { userSchema } = require("../schemas.js");

//creation of user model
const User = mongoose.model(`User`, userSchema);

module.exports = User;
