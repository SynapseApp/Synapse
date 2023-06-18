// CRUD on users
const User = require("../models/userModel.js");

exports.createUser = async function createUser(userDetails) {
  let user = undefined;

  try {
    // creates user
    const newUser = new User(userDetails);

    // stores it in database
    await newUser.save();

    // update user variable
    user = newUser;
    return user;
  } catch (error) {
    throw new Error("Failed to create user");
  }
}

exports.findUser = async function findUser(reference) {
  let user = undefined;

  try {
    // finds user using the reference
    const foundUser = await User.findOne(reference);
    if (foundUser) {
      user = foundUser;
      return user;
    }
    // if user found update user variable
  } catch (error) {
    throw new Error("Failed to get user");
  }
}

exports.authenticateUser = async function authenticateUser(user, password) {
  let userAuthenticated = false;

  if (user?.password === password) {
    userAuthenticated = true;
  }

  return userAuthenticated;
}

exports.updateUser = async function updateUser(_id, updateKeys) {
  let user = await findUser({ _id });

  try {
    // update user based on the update keys
    const updatedUser = await User.findByIdAndUpdate(_id, updateKeys, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("User not found");
    }
    user = updatedUser;
    return user;
  } catch (error) {
    throw new Error("Failed to update user");
  }
}

exports.deleteUser = async function deleteUser(_id) {
  const user = await findUser({ _id });

  let deleteSuccessful = false;

  try {
    // delete user
    await User.findByIdAndDelete(_id);
    if (!deleteUser) throw new Error("User not found");
    // if deleted set deleteSuccessful to true
    deleteSuccessful = true;
    return user;
  } catch (error) {
    throw new Error("Failed to delete user");
  }
}
