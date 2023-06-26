const express = require('express');
const passport = require('passport');
const User = require('../models/userModel');

// Create a new Router instance
const authRouter = express.Router();

// Endpoint to handle user login
authRouter.post('/login', passport.authenticate('local'), (req, res) => {
  // Log the request body
  res.send('logged in');
});

// Endpoint to handle user registration
authRouter.post('/register', (req, res) => {
  const { email, username, password } = req.body;

  const newUser = new User({ username, email });

  // Register the new user and authenticate
  User.register(newUser, password, (err) => {
    if (err) {
    } else {
      // Authenticate the user after successful registration
      passport.authenticate('local')(req, res, () => {
        // console.log(req.user);
        res.send('registered and logged in');
      });
    }
  });
});

/**
 * Endpoint to check if the user is authenticated.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
authRouter.get('/check', (req, res) => {
  let user;
  // Check if the user is authenticated
  if (req.user) {
    user = req.user;
    // Remove sensitive information from the user object
    delete user.hash;
    delete user.salt;
  }

  // Send JSON response indicating if the user is authenticated
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user });
  } else {
    res.json({ authenticated: false });
  }
});

// Endpoint to handle user logout
authRouter.get('/logout', (req, res) => {
  // Logout the user and clear the session
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Export the authRouter for use in other parts of the application
module.exports = authRouter;
