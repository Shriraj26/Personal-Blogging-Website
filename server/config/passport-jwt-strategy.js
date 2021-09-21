const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;

//This extracts headers
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	//header has some auth keys and from that we extract jwt

	secretOrKey: 'blogSecretKeyJWT',
	//this will be our key for encryption and decryption
	

}

passport.use(new JWTStrategy(opts, function(jwtPayload, done){

	/*
		jwtPayload will have the user data and from that we take out 
		user ID 
	*/
	User.findById(jwtPayload._id, function(err, user){
		if(err){
			console.log('Error in finding user from DB -> passport-JWT - ',err);
			return;
		}
		
		//If user is found
		if(user){
			return done(null, user);
		}else{
			return done(null, false);
		}
	})
}));

module.exports = passport;
