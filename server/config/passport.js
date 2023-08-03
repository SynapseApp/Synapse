const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oidc");
const User = require("../models/userModel");
// Configure Passport

/**
 * Set up Passport authentication using the LocalStrategy.
 * The LocalStrategy is a strategy for authenticating with a username and password.
 * It utilizes the User.authenticate() method for validating the user's credentials.
 */
passport.use(new LocalStrategy(User.authenticate()));

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "441670067708-535huo2c4b5l3u05ntqf59dlsqteipm9.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/oauth2/redirect/google",
      scope: ["profile", "email"],
    },
    async function verify(issuer, profile, cb) {
      const param = await User.findOne({ googleId: profile.id });
      if (!param) {
        const userCreate = await User.create({
          email: profile.emails[0].value,
          displayName: profile.displayName,
          googleId: profile.id,
          provider: issuer,
        });
        userCreate.save();

        return cb(null, userCreate);
      } else {
        return cb(null, param);
      }
    },
  ),
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});

// Export the configured Passport object
module.exports = passport;
