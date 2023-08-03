const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongo")(session);
require("dotenv").config();

const { mongoDB_url, port } = require("./store.js");
const connectDatabase = require("./database/mongodb.js");
const passport = require("./config/passport.js");

const userRoutes = require("./routes/userRoutes.js");
const connectionRoutes = require("./routes/connectionRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const googleRoutes = require("./routes/googleAuth.js");

// Connect to the MongoDB database
connectDatabase();

// Create an instance of the Express application
const app = express();

// Configure Cross-Origin Resource Sharing (CORS) options
const corsOptions = {
  origin: "http://localhost:8000", // Allow requests from this origin
  credentials: true, // Enable sending cookies in cross-origin requests
};

// Configure session options
const secret = process.env.SESSION_SECRET || `randomSecret`;

// Create a new MongoDBStore instance to store session data
const store = new MongoDBStore({
  url: mongoDB_url, // MongoDB connection URL
  secret, // Secret used to sign the session ID cookie
  touchAfter: 24 * 60 * 60, // Time period in seconds after which session data is updated
});

// Handle errors from the session store
store.on(`error`, function (error) {});

// Configure session middleware
const sessionConfig = {
  secret, // Secret used to sign the session ID cookie
  resave: false, // Disable saving session data on every request
  saveUninitialized: false, // Prevent saving uninitialized sessions
  store, // Use the MongoDBStore to store session data
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // Set the maximum age of the session cookie to 1 day
  },
};

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors(corsOptions));

// Parse request bodies as JSON
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Use the session middleware with the configured options
app.use(session(sessionConfig));

// Initialize Passport.js for authentication
app.use(passport.initialize());

// Enable persistent login sessions using session middleware
app.use(passport.session());

// Endpoint to handle HTTP GET request to '/home'
app.get(
  "http://localhost:8000/home",
  passport.authenticate("local"),
  (req, res) => {},
);

// Route handlers for user-related functionality
app.use("/user", userRoutes);

// Route handlers for authentication-related functionality
app.use("/auth", authRoutes);

// Route handlers for connection-related functionality
app.use("/connection", connectionRoutes);

// Route handlers for google authentication related functionality
app.use("/", googleRoutes);

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server is up and running at ${port}`);
});
