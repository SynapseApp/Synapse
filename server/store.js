// this file will contain global variables which will be imported and used through out the folder

// during deployment our service provider will provide their own port
// this is a flexible way to say that if port is provided then use it or use 3000
const port = process.env.PORT || 3000;
exports.port = port;

exports.url = `http://localhost:${port}`;

// comment this out if you are a frontend developer
// export const mongoDB_url = "atlas url"

// comment this out if you are a backend developer
exports.mongoDB_url = "mongodb://127.0.0.1/Synapse";

// create default response
exports.defaultResponse = function () {
  const response = {
    success: false,
    log: "default response",
    data: undefined,
  };

  return response;
};
