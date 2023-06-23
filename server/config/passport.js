const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');

// Configure Passport

/**
 * Set up Passport authentication using the LocalStrategy.
 * The LocalStrategy is a strategy for authenticating with a username and password.
 * It utilizes the User.authenticate() method for validating the user's credentials.
 */
passport.use(new LocalStrategy(User.authenticate()));

/**
 * Serialize the user's session data to be stored in the session.
 * This method is called during authentication and determines which data of the user object should be stored in the session.
 * In this case, User.serializeUser() is used to serialize the user's information.
 */
passport.serializeUser(User.serializeUser());

/**
 * Deserialize the user's session data from the session.
 * This method is called on subsequent requests to retrieve the user's information from the stored session data.
 * User.deserializeUser() is used to deserialize the user's information.
 */
passport.deserializeUser(User.deserializeUser());

// Export the configured Passport object
module.exports = passport;
