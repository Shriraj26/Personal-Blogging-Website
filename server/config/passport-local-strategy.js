const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

//Authenticate the User
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    }, //This is the field that is in the syntax and email should be exactly as the one defined in the schema

    function (email, password, done) {
      //first field of email is of schema and second is of the email variable passed to this function.
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding User from DB --> Passport");
          return done(err);
          //report the error to done
        }

        //If user is not found or the password doesnt match
        if (!user || user.password != password) {
          console.log("Invalid Username or Password");
          return done(null, false);
          //we put the first arg as null - so that no error and second arg as false that auth has failed.
        }

        //Finally if user is found, then give the user to the done function and return.
        console.log("User found");
        return done(null, user);
      });
    }
    //After getting the email and password, the done function executes and handles success or failure.
  )
);

//Serialize the user - decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//Deserialize the User from the key in the cookie
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in deserializing User from DB --> Passport");
      return done(err);
    }

    return done(null, user);
  });
});

//Check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //If the user is signed in, then pass on the request to the next function
  if (req.isAuthenticated()) {
    console.log("Req is authnticated yeah");
    return next();
  }
  console.log("Req is noottt authnticated yeah");
  //if user is not signed in
  return res.redirect("/login");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    console.log("This called heree");
  }
  next();
};

module.exports = passport;
