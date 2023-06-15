import { Router } from 'express';
import passport from 'passport';
import User from '../models/userModel';
import { Strategy as LocalStrategy } from 'passport-local';
import crypto from 'crypto';
import { UserInterface } from '../schemas';

const authRoutes = Router();

// Configure passport to use the LocalStrategy for authentication
passport.use(
  new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
    try {
      // Find a user with the provided email in the database
      const user: UserInterface | null = await User.findOne({ email });

      if (!user) {
        // If no user is found, return an error indicating incorrect email or password
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      const saltBuffer = Buffer.from(user.salt, 'hex');

      crypto.pbkdf2(password, saltBuffer, 310000, 32, 'sha256', (err: Error | null, hashedPassword: Buffer) => {
        if (err) {
          return done(err);
        }

        const hashedPasswordString = hashedPassword.toString('hex');
        if (user.hashed_password !== hashedPasswordString) {
          // If the password doesn't match, return an error indicating incorrect email or password
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        // Authentication successful, return the user object
        return done(null, user);
      });
    } catch (err) {
      return done(err);
    }
  })
);

// Route for user registration
authRoutes.post('/register', async (req, res, next) => {
  try {
    const salt = crypto.randomBytes(16);

    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      // Create a new User object with the provided email, hashed password, and salt
      const user: UserInterface = new User({
        email: req.body.email,
        hashed_password: hashedPassword.toString('hex'),
        salt: salt.toString('hex'),
      });

      // Save the user in the database
      await user.save();

      // Log in the user by associating the user object with the current session
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }

        // Redirect the user to the home page
        res.status(200).json({ redirectUrl: 'http://localhost:8000/' });
      });
    });
  } catch (err) {
    return next(err);
  }
});

// Route for user logout
authRoutes.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    // Redirect the user to the auth page after logout
    res.redirect('/auth');
  });
});

// Route for user login using email and password
authRoutes.post('/login/password', (req, res, next) => {
  passport.authenticate('local', (err: any, user: Express.User, info: any) => {
    if (err) {
      // Handle authentication error
      console.log(err);
      return res.redirect('http://localhost:8000/auth');
    }

    if (!user) {
      // Handle authentication failure (incorrect email or password)
      return res.redirect('http://localhost:8000/auth');
    }

    // Manually log in the user by associating the user object with the current session
    req.login(user, (err) => {
      if (err) {
        console.log(err);
        return res.redirect('http://localhost:8000/auth');
      }

      // Redirect the user to the home page after successful login
      return res.redirect('http://localhost:8000/');
    });
  })(req, res, next);
});

// Serialize user object to store in the session
passport.serializeUser((User: any, cb) => {
  process.nextTick(function () {
    cb(null, User.id);
  });
});

// Deserialize user object from the session
passport.deserializeUser(function (User: any, cb) {
  process.nextTick(function () {
    User.findById(User.id, (err: any, User: UserInterface) => {
      cb(err, User);
    });
  });
});

export default authRoutes;
