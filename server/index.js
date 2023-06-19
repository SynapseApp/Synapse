const express = require('express');
const cors = require('cors');
// const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongo')(session);
require('dotenv').config();
// const cookieParser = require('cookie-parser');

const { mongoDB_url, port } = require('./store.js');
const connectDatabase = require('./database/mongodb.js');
const passport = require('./config/passport.js');

const userRoutes = require('./routes/userRoutes.js');
const authRoutes = require('./routes/authRoutes');

connectDatabase();

const app = express();
const corsOptions = {
  origin: 'http://localhost:8000',
  credentials: true,
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

// Set up session middleware
const sessionConfig = {
  secret,
  resave: false,
  saveUninitialized: false,
  store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
};
app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

app.get('http://localhost:8000/home', passport.authenticate('local'), (req, res) => {
  console.log(req.body, 'hey');
});

// using routes...
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

// starting server
app.listen(port, () => {
  console.log(`server is up and running at ${port}`);
});
