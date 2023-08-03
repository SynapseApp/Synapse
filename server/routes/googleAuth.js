const passport = require("passport");
const express = require("express");
const googleRouter = express.Router();

googleRouter.get("/login/federated/google", passport.authenticate("google"));

googleRouter.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "http://localhost:8000/home",
    failureRedirect: "http://localhost:8000/",
  }),
);

module.exports = googleRouter;
