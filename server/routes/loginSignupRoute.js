const express = require("express");

const passport = require('passport');

const router = express.Router();
const loginSignupController = require('../controllers/loginAndSignupController');

//Handle signup page -  route
router.get("/signup", loginSignupController.displaySignup);
//Signup the User
router.post("/signupUser", loginSignupController.signupUser);

//login route
router.get("/login", loginSignupController.displayLogin);

//Login the user - passport will check the auth and if success it will forward to dashboard
router.post("/loginUser",passport.authenticate(
	'local',
	{failureRedirect: '/loginUser'}
) , loginSignupController.loginUser);

//handle the user profile
//if the user is authenticated then only view the profile
router.get('/profile', passport.checkAuthentication,  loginSignupController.profile);

//logout the user
router.get('/logout', loginSignupController.logout);

module.exports = router;