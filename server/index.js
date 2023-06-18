const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongo')(session);
require('dotenv').config();
const cookieParser = require('cookie-parser');

const { mongoDB_url, port } = require('./store.js');
const connectDatabase = require('./database/mongodb.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/userModel.js');

const userRoutes = require('./routes/userRoutes.js');
const authRoutes = require('./routes/authRoutes');

const app = express();
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const secret = process.env.SESSION_SECRET || `randomSecret`;

console.log(secret);

const store = new MongoDBStore({
  url: mongoDB_url,
  secret,
  touchAfter: 24 * 60 * 60,
});

store.on(`error`, function (e) {
  console.log(`Session Store Error!`);
});

const sessionConfig = {
  store,
  name: `session`,
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

connectDatabase().then(() => {
  try {
    app.use(cookieParser());
    app.use(session(sessionConfig));
  } catch (e) {
    // console.log(e);
  }
  app.use(cors(corsOptions)); // Use this after the variable declaration
  app.use(express.json());
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(User.createStrategy());

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  // app.use(bodyParser.urlencoded({ extended: true })); //might need this in the future

  // using routes...
  app.use('/user', userRoutes);
  app.use('/auth', authRoutes);

  // starting server
  app.listen(port, () => {
    console.log(`server is up and running at ${port}`);
  });
});
