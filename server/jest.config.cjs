// this file is a config file for jest (unit testing library we will be using)
// its something like what we got tsconfig.json for typescript

module.exports = {
  testEnvironment: "node",
  moduleNameMapper: {
    "^@exmpl/(.*)$": "<rootDir>/src/$1",
  },
};
