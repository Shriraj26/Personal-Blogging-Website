const User = require('../../../models/user');

//For creating the token
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){

	console.log('In the User API - req body - ', req.body);
	
	try{
		let user = await User.findOne({email: req.body.email});
		console.log('Email is - ',req.body.email);

		if(!user || user.password != req.body.password){
			console.log(user);
			console.log('Login Fail 1');
			return res.status(422).json({
				message: 'Invalid Username or password'
			});
		}	

		console.log('Login Success');

		
		res.status(200).json({
			message: 'Sign in successfull, please keep your token',
			data:{
				token: jwt.sign(user.toJSON(), 'blogSecretKeyJWT', {expiresIn: '2 days'})
				/*
					The token will be created by converting user to json and we used the secret key as codial and it will expire in 10 mins
					Expiry options - "2 days", "10h", "7d"
				*/
			}
		});

	
	}catch(err){
		console.log('Login Fail');
		console.log('******', err);
		return res.json(500, {
			message: 'Internal server error'

		})
	}
	
	
}

module.exports.signupUser = (req, res) => {

	//handle confirm password at server side...
	//after that send only email, pass



}

