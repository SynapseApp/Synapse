const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongo')(session);
require('dotenv').config();

const { mongoDB_url, port } = require('./store.js');
const connectDatabase = require('./database/mongodb.js');
const passport = require('./config/passport.js');

const userRoutes = require('./routes/userRoutes.js');
const connectionRoutes = require('./routes/connectionRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');
const googleRoutes = require('./routes/googleAuth.js');

// Connect to the MongoDB database
connectDatabase();

// Create an instance of the Express application
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:8000',
  },
});

// Configure Cross-Origin Resource Sharing (CORS) options
const corsOptions = {
  origin: 'http://localhost:8000', // Allow requests from this origin
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
app.get('http://localhost:8000/home', passport.authenticate('local'), (req, res) => {});

// Route handlers for user-related functionality
app.use('/user', userRoutes);

// Route handlers for authentication-related functionality
app.use('/auth', authRoutes);

// Route handlers for connection-related functionality
app.use('/connection', connectionRoutes);
// Route handlers for message-related functionality
app.use('/message', messageRoutes);

// Route handlers for google authentication related functionality
app.use('/', googleRoutes);

// Socket.IO middleware function for authentication and authorization.
io.use((socket, next) => {
  // Extract authentication data from the handshake object sent by the client.
  const { connection, clickedOnUser } = socket.handshake.auth;

  // Check if the 'clickedOnUser' flag exists in the authentication data.
  if (!clickedOnUser) {
    // If the flag is missing, send an error to the client and abort the connection.
    return next(new Error('User Does Not Exist'));
  }

  // If the user is authenticated, attach the 'connection' data to the socket for later use.
  socket.connection = connection;
  next();
});

// Event listener for a new socket connection.
io.on('connection', (socket) => {
  // Log the ID of the connected socket.
  console.log(socket.id);

  // Join a specific room based on the 'connection._id'.
  socket.join(socket.connection._id);

  // Event listener for 'private_message' events from the client.
  socket.on('private_message', async (data) => {
    // Emit the 'new_message' event to all sockets in the same room.
    io.to(socket.connection._id).emit('new_message', data);
  });

  // Event listener for 'disconnect' events from the client.
  socket.on('disconnect', () => {
    // Log a message when a user disconnects.
    console.log('User has disconnected');
  });
});
// Start the server and listen for incoming requests
httpServer.listen(port, () => {
  console.log(`Server is up and running at ${port}`);
});
