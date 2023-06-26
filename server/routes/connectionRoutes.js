const { Router } = require('express');
const { createConnection, findConnection, findUserConnections, updateConnection, deleteConnection } = require('../controllers/connectionCRUD.js');
const { defaultResponse } = require('../store.js');

// Create a new Router instance
const connectionRoutes = Router();

// RESTful API routes for connection operations

connectionRoutes.post("/:id", async (req, res) => {
  // Endpoint to create new connection
  // Params: userOne id
  // Body: userTwo id, relation
  // Response: Newly created connection
  
  const _id = req.params._id;
  const _id2 = req.body._id;
  const relation = req.body.relation;
  const connections = await findUserConnections({ _id });
  const response = defaultResponse();
  
  let connectionAlreadyExists = false
  connections.forEach(connection => {
    if (
      (connection.userOne._id === _id && connection.userTwo._id === _id2) || 
      (connection.userOne._id === _id2 && connection.userTwo._id === _id)
    ) 
    connectionAlreadyExists = true
  });

  if (connectionAlreadyExists) {
    response.log = 'connection already exists'
  } else {
    const newConnection = await createConnection(_id, _id2, relation)

    if (!newConnection) {
      response.log = 'failed to create new connection';
    } else {
      response.success = true;
      response.log = 'new connection created';
      response.data = { newConnection };
    }
  }
  
  res.json(response);

})

connectionRoutes.get("/:id", async (req, res) => {
  // Endpoint to get all the user's connections based on the provided ID
  // Params: _id - User ID
  // Response: All user's connections
  
  const _id = req.params._id;
  const connections = await findUserConnections({ _id });
  const response = defaultResponse();

  if (!connections) {
    response.log = 'connections not found';
  } else {
    response.success = true;
    response.log = 'connections found';
    response.data = { connections };
  }

  res.json(response);

})

connectionRoutes.get("/:connectionID", async (req, res) => {
  // Endpoint to get a connection via its id 
  // Params: connectionID // Id of the connection
  // Response: connection based on the provided connectionID
  

  const connectionID = req.params.connectionID;
  const connection = await findConnection({ connectionID })
  const response = defaultResponse()

  if (!connection) {
    response.log = "no connection found"
  } else {
    response.success = true
    response.log = "connection found"
    response.data = connection
  }
  
  res.json(response)
})
  
connectionRoutes.patch("/:connectionID", async (req, res) => {
  // Endpoint to patch a connection
  // Params: connectionID // Id of the connection
  // Body: updateKeys // Updated connection data
  // Response: Updated connection
  
  const connectionID = req.params.connectionID;
  const updateKeys = req.body.updateKeys;
  const response = defaultResponse();

  const connection = await findConnection({ connectionID })

  if (!connection) {
    response.log = "no connection found"
  } else {
    const updatedConnection = await updateConnection(connectionID, updateKeys)

    if (!updatedConnection) { 
      response.log = "failed to update connection"
    } else {
      response.success = true
      response.log = "connection patched"
      response.data = updatedConnection
    }
  }

  res.json(response)

})

connectionRoutes.delete("/:connectionID", async (req, res) => {
   // Endpoint to delete connection
  // Params: connectionID // Id of the connection
  // Response: Deleted connection
  const connectionID = req.params.connectionID
  const response = defaultResponse()

  const connection = await findUserConnections({ connectionID })

  if (!connection) {
    response.log = "connection not found"
  } else {
    const deletedConnection = await deleteConnection(connectionID)

    if (!deletedConnection) {
      response.log = "failed to delete connection"
    } else {
      response.success = true
      response.log = "connection deleted"
      response.data = deletedConnection
    }
  }

  res.json(response)
})

// Export the connectionRoutes for use in other parts of the application
module.exports = connectionRoutes;
