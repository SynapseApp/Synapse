import express from 'express';
import { url } from './store';
import connectDatabase from './database/mongodb';
import passport from 'passport';
import session from 'express-session';
import User from './models/userModel';
import { UserInterface } from './schemas';
import connectMongoDBSession from 'connect-mongodb-session';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/userAuthRoutes';

const cors = require('cors');
const app = express();

// Set up MongoDB session store options
const storeOptions = {
  uri: 'mongodb://127.0.0.1/Synapse', // Replace with your MongoDB connection string
  collection: 'sessions', // Name of the collection to store sessions
  expires: 1000 * 60 * 60 * 24 * 7, // Session expiration time (in milliseconds), adjust as needed
  autoRemove: 'interval',
  autoRemoveInterval: 60, // Interval to automatically remove expired sessions (in minutes)
};
const MongoDBStore = connectMongoDBSession(session);

const store = new MongoDBStore(storeOptions);

// Configure app middleware and settings
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false, // Set cookie expiration time (in milliseconds), adjust as needed
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use('/user', userRoutes); // User-related routes
app.use('/', authRoutes); // Authentication routes

// Serialize user object to store in the session
passport.serializeUser((user: any, cb) => {
  cb(null, user.id);
});
// Deserialize user object from the session
passport.deserializeUser(function (id, cb) {
  console.log(id);
  User.findById(id, (err: any, user: UserInterface) => {
    cb(err, user);
  });
});

// Start the server
app.listen(3000, () => {
  console.log(`Server is up and running at ${url}`);

  // Connect to the database
  connectDatabase();
});

export default app;
