const User = require('../models/user');

//User Signup Page
module.exports.displaySignup = (req, res) => {
	
	//If the user is already signed in, then render the profile page instead!!!
	if(req.isAuthenticated()){
		res.redirect('/profile');
	}else{
		return res.render('signup');
	}

}

//User Login Page
module.exports.displayLogin = (req, res) => {

	//If the user is already signed in, then render the profile page instead!!!
	console.log(req.cookies);
	if(req.isAuthenticated()){
		res.redirect('/profile');
	}
	else{
		return res.render('login');
	}

}

//Handle login
module.exports.loginUser = (req, res) => {
	console.log('Came in Login');

	//direct the user to the profile route that will check if the request is authenticated
	return res.redirect('/profile');

} 
//Handle Signup
module.exports.signupUser = (req, res) => {
	console.log('Came in Signup');

	//Check if User is giving an email that is genuine or not, if present in DB then give error.
	User.findOne({email: req.body.email}, function(err, user){
		//Handling The internal DB error
		if(err){
			console.log('error in finding user in signing up');
			return
		}
		//If user is giving genuine email then check further
		if(!user){
			User.create(req.body, function(err, user){
				//Handling The internal DB error
				if(err){
					console.log('error -  user in signing up - ', err);
					return
				}

				//If all goes well then User Created successfully with email and password.
				console.log('User Created successfully');
				return res.redirect('/profile');		
			});
		
		//In case of a duplicate email, tell him to give another one.	
		}else{
			console.log('User exists in DB, create another one');
			return res.redirect('/signup');
		}

	});

} 


//handle profile page of user
module.exports.profile = function(req, res){
	console.log('In User profile')
	return res.render('userDashboard', {
		title: "User Profile"
	});
}


//logout the user
module.exports.logout = function(req, res){


	req.logout();
	//take the user back to the login page
	return res.redirect('/');
}