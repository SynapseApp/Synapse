const express = require('express');
const passport = require('passport');
const User = require('../models/userModel');

// Create a new Router instance
const authRouter = express.Router();

// Endpoint to handle user login
authRouter.post('/login', passport.authenticate('local'), (req, res) => {
  // Log the request body
  console.log(req.body);
  res.send('logged in');
});

// Endpoint to handle user registration
authRouter.post('/register', (req, res) => {
  const { email, username, password } = req.body;

  const newUser = new User({ username, email });
  console.log(newUser);

  // Register the new user and authenticate
  User.register(newUser, password, (err) => {
    if (err) {
      console.log(err);
    } else {
      // Authenticate the user after successful registration
      passport.authenticate('local')(req, res, () => {
        res.send('registered and logged in');
      });
    }
  });
});

// Endpoint to check if the user is authenticated
authRouter.get('/check', (req, res) => {
  // Check if the user is authenticated and respond with JSON
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.json({ authenticated: true });
  } else {
    res.json({ authenticated: false });
  }
});

// Endpoint to handle user logout
authRouter.get('/logout', (req, res) => {
  console.log(req.isAuthenticated());

  // Logout the user and clear the session
  req.logout(req.user, (err) => {
    if (err) return next(err);
    console.log(req.isAuthenticated());
    res.redirect('/');
  });
});

// Export the authRouter for use in other parts of the application
module.exports = authRouter;
