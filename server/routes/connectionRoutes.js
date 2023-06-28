const { Router } = require('express');
const { createConnection, findConnection, findUserConnections, updateConnection, deleteConnection } = require('../controllers/connectionCRUD.js');
const { searchUsers } = require('../controllers/userCRUD.js');
const { defaultResponse } = require('../store.js');

// Create a new Router instance
const connectionRoutes = Router();

// RESTful API routes for connection operations

// Creating a New Connection

connectionRoutes.post('/', async (req, res) => {
  // Endpoint to create new connection
  // Params: userOne id
  // Body: userTwo id
  // Response: Newly created connection

  const _id = req.body.id;
  const _id2 = req.body.id2;
  const connections = await findUserConnections(_id);
  const response = defaultResponse();

  let connectionAlreadyExists = false;
  connections.forEach((connection) => {
    if ((connection.userOne._id === _id && connection.userTwo.id === _id2) || (connection.userOne._id === _id2 && connection.userTwo._id === _id)) connectionAlreadyExists = true;
  });

  if (connectionAlreadyExists) {
    response.log = 'connection already exists';
  } else {
    const newConnection = await createConnection(_id, _id2);

    if (!newConnection) {
      response.log = 'failed to create new connection';
    } else {
      response.success = true;
      response.log = 'new connection created';
      response.data = { newConnection };
    }
  }

  res.json(response);
});

// Searching for Connections and Strangers

connectionRoutes.post('/search', async (req, res) => {
  // Endpoint to search for connections and strangers
  // Params: id, searchTerm
  // Response: Connections and strangers based on the search term

  const id = req.body.id;
  const searchTerm = req.body.searchTerm;

  const strangerAndConnectionsArr = await searchUsers(id, searchTerm);

  const data = {
    connections: strangerAndConnectionsArr[0],
    strangers: strangerAndConnectionsArr[1],
  };

  res.json(data);
});

// connectionRoutes.patch('/:id', async (req, res) => {
//   // Endpoint to patch a connection
//   // Params: id // Id of the connection
//   // Body: updateKeys // Updated connection data
//   // Response: Updated connection

//   const id = req.params.id;
//   const updateKeys = req.body.updateKeys;
//   const response = defaultResponse();

//   const connection = await findConnection({ id });

//   if (!connection) {
//     response.log = 'no connection found';
//   } else {
//     const updatedConnection = await updateConnection(id, updateKeys);

//     if (!updatedConnection) {
//       response.log = 'failed to update connection';
//     } else {
//       response.success = true;
//       response.log = 'connection patched';
//       response.data = updatedConnection;
//     }
//   }

//   res.json(response);
// });

connectionRoutes.delete('/:id', async (req, res) => {
  // Endpoint to delete connection
  // Params: id // Id of the connection
  // Response: Deleted connection
  const id = req.params.id;
  const response = defaultResponse();

  const connection = await findUserConnections({ id });

  if (!connection) {
    response.log = 'connection not found';
  } else {
    const deletedConnection = await deleteConnection(id);

    if (!deletedConnection) {
      response.log = 'failed to delete connection';
    } else {
      response.success = true;
      response.log = 'connection deleted';
      response.data = deletedConnection;
    }
  }

  res.json(response);
});

// Export the connectionRoutes for use in other parts of the application
module.exports = connectionRoutes;
