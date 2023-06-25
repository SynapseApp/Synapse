const User = require('../models/userModel.js');

/**
 * Creates a new user in the database.
 *
 * @param {Object} userDetails - Details of the user to be created.
 * @returns {Object} - The created user.
 * @throws {Error} - If failed to create user.
 */
exports.createUser = async function createUser(userDetails) {
  let user = undefined;

  try {
    const newUser = new User(userDetails);
    await newUser.save();
    user = newUser;
    return user;
  } catch (error) {
    throw new Error('Failed to create user');
  }
};

/**
 * Finds a user in the database based on the provided reference.
 *
 * @param {Object} reference - Reference to find the user.
 * @returns {Object} - The found user.
 * @throws {Error} - If failed to get user.
 */
exports.findUser = async function findUser(reference) {
  let user = undefined;

  try {
    const foundUser = await User.findOne(reference);
    if (foundUser) {
      user = foundUser;
      return user;
    }
  } catch (error) {
    throw new Error('Failed to get user');
  }
};

/**
 * Updates a user in the database based on the provided ID and update keys.
 *
 * @param {string} _id - ID of the user to update.
 * @param {Object} updateKeys - Keys and values to update.
 * @returns {Object} - The updated user.
 * @throws {Error} - If failed to update user.
 */
exports.updateUser = async function updateUser(_id, updateKeys) {
  let user = await findUser({ _id });

  try {
    const updatedUser = await User.findByIdAndUpdate(_id, updateKeys, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error('User not found');
    }
    user = updatedUser;
    return user;
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

/**
 * Deletes a user from the database based on the provided ID.
 *
 * @param {string} _id - ID of the user to delete.
 * @returns {Object} - The deleted user.
 * @throws {Error} - If failed to delete user.
 */
exports.deleteUser = async function deleteUser(_id) {
  const user = await findUser({ _id });

  let deleteSuccessful = false;

  try {
    await User.findByIdAndDelete(_id);
    if (!deleteUser) throw new Error('User not found');
    deleteSuccessful = true;
    return user;
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};


exports.searchUsers = async function searchUsers(_id, searchTerm) {
  const usersFriends = await Connection.find({ id: _id }).toArray();
  const connections = [];
  for (let i = 0; i > usersFriends.length; i++) {
    if (usersFriends[i].displayName === searchTerm) {
      connections.push(usersFriends[i]);
    }
  }
  const usersStrangers = await User.find({ displayName: { $regex: searchTerm, $options: "i" } }).toArray();

  const strangers = usersStrangers.filter(x => !connections.includes(x));

  return [connections, strangers];

}
