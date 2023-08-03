// Collection CRUD here
const Connection = require("../models/connectionModel.js");

exports.createConnection = async function createConnection(_id, _id2) {
  try {
    const connection = new Connection({
      userOne: _id,
      userTwo: _id2,
    });

    const newConnection = await connection.save();
    return newConnection;
  } catch (error) {
    // Handle the error appropriately
    throw error;
  }
};

exports.deleteConnection = async function deleteConnection(userOne, userTwo) {
  try {
    const deletedConnection = await Connection.findOneAndDelete({
      $or: [
        { userOne: userOne, userTwo: userTwo },
        { userOne: userTwo, userTwo: userOne },
      ],
    }).exec();

    if (!deletedConnection) {
      throw new Error("Connection not found");
    }

    return deletedConnection;
  } catch (error) {
    // Handle the error appropriately
    throw error;
  }
};

exports.findUserConnections = async function findUserConnections(_id) {
  try {
    const connections = await Connection.find({
      $or: [{ userOne: _id }, { userTwo: _id }],
    }).exec();

    return connections;
  } catch (error) {
    // Handle the error appropriately
    throw error;
  }
};

// exports.updateConnection = async function updateConnection() {
//   return 'updateConnection()';
// };
