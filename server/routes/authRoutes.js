const express = require('express');
const passport = require(`passport`);
const User = require('../models/userModel');
const authRouter = express.Router();

authRouter.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('logged in');
});

authRouter.post('/register', (req, res) => {
  const { email, username, password } = req.body;

  const newUser = new User({ username, email });
  User.register(newUser, password, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate('local')(req, res, () => {
        res.send('registered and logged in');
      });
    }
  });
});

authRouter.get('/api/auth', (req, res) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.json({ authenticated: true });
  } else {
    res.json({ authenticated: false });
  }
});

authRouter.get('/logout', (req, res) => {
  console.log(req.isAuthenticated());
  req.logout(req.user, (err) => {
    if (err) return next(err);
    console.log(req.isAuthenticated());
    res.redirect('/');
  });
});

module.exports = authRouter;
