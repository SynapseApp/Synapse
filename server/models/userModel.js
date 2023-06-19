const mongoose = require(`mongoose`);
const passportLocalMongoose = require(`passport-local-mongoose`);

const Schema = mongoose.Schema;
// User schema defined
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  // imageUrl: String,
});

userSchema.plugin(passportLocalMongoose, { usernameQueryFields: ['email'] });

module.exports = mongoose.model(`User`, userSchema);
