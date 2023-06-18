const express = require('express');
const passport = require(`passport`);
const User = require('../models/userModel');
const authRouter = express.Router();

authRouter.post('/login', passport.authenticate(`local`, { keepSessionInfo: true })); // Authentication successful, handle the response

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logout successful' });
});

authRouter.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Create a new user object
    const user = new User({ username, email });

    const registeredUser = await User.register(user, password);

    // Set the password using the desired method (e.g., hashing)
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      console.log(req.isAuthenticated());
      console.log(req.session);
      // Redirect or send a response indicating successful registration and login
      res.json({ message: 'Registration and login successful' });
    });
  } catch (error) {
    // Handle registration error
    console.log(error);
    res.status(450).json({ message: 'Registration failed' });
  }
});

authRouter.get('/api/check-auth', (req, res) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    // User is authenticated
    res.json({ authenticated: true });
  } else {
    // User is not authenticated
    res.json({ authenticated: false });
  }
});

module.exports = authRouter;
