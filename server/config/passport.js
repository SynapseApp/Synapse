// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/userModel');

// // Configure the local strategy
// passport.use(
//   new LocalStrategy(async (username, password, done) => {
//     try {
//       // Find the user by email or username
//       const user = await User.findOne({ $or: [{ email: username }, { username: username }] });

//       // If no user found or password is incorrect, return error
//       if (!user || !user.isValidPassword(password)) {
//         return done(null, false, { message: 'Invalid email or username or password' });
//       }

//       // If user is found and password is correct, return the user
//       return done(null, user);
//     } catch (error) {
//       return done(error);
//     }
//   })
// );

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// module.exports = passport;
