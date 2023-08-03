// This file contains global variables and functions that will be used throughout the project

// The port on which the server will listen for incoming requests
// If the PORT environment variable is provided, use that value, otherwise use 3000 as the default port
const port = process.env.PORT || 3000;
exports.port = port;

// The base URL of the server
exports.url = `http://localhost:${port}`;

// MongoDB connection URL
// exports.mongoDB_url = 'mongodb://127.0.0.1/Synapse';
exports.mongoDB_url = process.env.CLUSTER0;

// Default response structure
exports.defaultResponse = function () {
  // Create a default response object
  const response = {
    success: false, // Indicates if the request was successful or not
    log: "default response", // Log message for debugging or informational purposes
    data: undefined, // Data to be sent as a response (if any)
  };

  return response;
};
