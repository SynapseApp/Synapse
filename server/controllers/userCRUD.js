const User = require("../models/userModel.js");
const Connection = require("../models/connectionModel.js");
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
    throw new Error("Failed to create user");
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
    throw new Error("Failed to get user", error);
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
      throw new Error("User not found");
    }
    user = updatedUser;
    return user;
  } catch (error) {
    throw new Error("Failed to update user");
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
    if (!deleteUser) throw new Error("User not found");
    deleteSuccessful = true;
    return user;
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};

/**
 * Search for connections and strangers based on the provided user ID and search term.
 * @param {string} id - User ID
 * @param {string} searchTerm - Search term
 * @returns {Array} - Array containing connections and updated strangers
 */
exports.searchUsers = async function searchUsers(id, searchTerm) {
  // Find connections based on the provided user ID
  const connections = await Connection.find({
    $or: [{ userOne: id }, { userTwo: id }],
  });

  // Find strangers with display names matching the search term
  const strangers = await User.find({
    displayName: { $regex: `^${searchTerm}`, $options: "i" },
  });

  // Remove the objects from strangers that have matching IDs with connections
  const updatedStrangers = strangers.filter((stranger) => {
    return !connections.some((connection) => {
      return (
        connection.userOne.toString() === stranger._id.toString() ||
        connection.userTwo.toString() === stranger._id.toString()
      );
    });
  });

  // Fetch additional user data for connections
  const connectionDataPromises = connections.map(async (connection) => {
    const otherUserId = (
      connection.userOne.toString() === id
        ? connection.userTwo
        : connection.userOne
    ).toString();
    const userData = await User.findById(otherUserId);
    return {
      userData,
    };
  });

  const connectionUserData = await Promise.all(connectionDataPromises);

  const connectionsWithUserData = connectionUserData.map(({ userData }) => ({
    userData,
  }));
  // Filter connectionsWithUserData based on the search term
  const filteredConnectionUserData = connectionsWithUserData.filter(
    ({ userData }) =>
      userData.displayName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return [filteredConnectionUserData, updatedStrangers];
};
