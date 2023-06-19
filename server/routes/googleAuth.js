const passport = require('passport');
const express = require('express');
const GoogleStrategy = require('passport-google-oidc');
const UserGoogle = require('../models/userGoogleModel');

const googleRouter = express.Router();

passport.use(new GoogleStrategy({
    clientID: "441670067708-535huo2c4b5l3u05ntqf59dlsqteipm9.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: '/oauth2/redirect/google',
    scope: ['profile']
}, async function verify(issuer, profile, cb, done) {
    const user = await UserGoogle.find({});
    const newUser = await UserGoogle.create({
        googleId: profile.id,
        displayName: profile.displayName
    })
    newUser.save();
    const tesuto = await UserGoogle.find({});
    console.log(user);
    console.log(tesuto);
}));

googleRouter.get('/login/federated/google', passport.authenticate('google'));

googleRouter.get('/oauth2/redirect/google', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

module.exports = googleRouter;
