var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoose = require("mongoose");
var User = require("../models/User");

passport.use(
  new LocalStrategy(function(username, password, done) {
    console.log("inside passport.use username:", username);
    console.log("inside passport.use password:", password);

    User.findOne({ user_name: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: "User not found"
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: "Password is wrong"
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  })
);
