const express = require("express");
const indexController = require("../controllers/index");
const loginSignupController = require("../controllers/loginAndSignupController");
const passport = require('passport');

const router = express.Router();

// router.get("/", indexController.index);
router.get("/", loginSignupController.displayLogin);
//To use the /blogs route, use the statement - router.use!!!
router.use("/blogs", require("./blogRoute"));

//To use the login functionality for admin
// router.use("/user", require("./loginSignupRoute"));

//To use the API
router.use("/api", require("./api"));

///home things
//Handle signup page -  route
router.get("/signup", loginSignupController.displaySignup);
//Signup the User
router.post("/signupUser", loginSignupController.signupUser);

//login route
router.get("/login", loginSignupController.displayLogin);

//Login the user - passport will check the auth and if success it will forward to dashboard
router.post("/loginUser",passport.authenticate(
	'local',
	{failureRedirect: '/user/loginUser'}
) , loginSignupController.loginUser);

//handle the user profile
//if the user is authenticated then only view the profile
router.get('/profile', passport.checkAuthentication,  loginSignupController.profile);

//logout the user
router.get('/logout', loginSignupController.logout);

module.exports = router;
