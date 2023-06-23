const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oidc');
const User = require('../models/userModel');
const { PromiseProvider } = require('mongoose');

// Configure Passport

/**
 * Set up Passport authentication using the LocalStrategy.
 * The LocalStrategy is a strategy for authenticating with a username and password.
 * It utilizes the User.authenticate() method for validating the user's credentials.
 */
passport.use(new LocalStrategy(User.authenticate()));


// GOOGLE STRATEGY
passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.googleId, email: user.email });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: "441670067708-535huo2c4b5l3u05ntqf59dlsqteipm9.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: '/oauth2/redirect/google',
    scope: ['profile', 'email'],
}, async function verify(issuer, profile, cb) {
    const param = await User.findOne({ googleId: profile.id });
    if (!param) {
        const userCreate = await User.create({
            email: profile.emails[0].value,
            displayName: profile.displayName,
            googleId: profile.id,
            provider: issuer
        })
        userCreate.save();

        return cb(null, userCreate);
    } else {
        return cb(null, param);
    }
}));

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
