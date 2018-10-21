var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
//temporary data store
//var users = {};
var mongoose=require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	passport.serializeUser(function(user, done) {
		console.log('serializing user:',user.username);
		return done(null, user.username);
	});

	passport.deserializeUser(function(username, done) {

		console.log('deserialize user: ', username);
		return done(null,users[username]);

	});

	passport.use('login', new LocalStrategy({
			passReqToCallback : true
		},
		function(req, username, password, done) { 

			//Check if user exists
			if (!users[username] || !isValidPassword(users[username],password)){
				return done('Invalid user/password', false);
			}
			console.log('successfully logged up');

			return done(null,users[username]);
		}
	));

	passport.use('signup', new LocalStrategy({
			passReqToCallback : true // allows us to pass back the entire request to the callback
		},
		function(req, username, password, done) {
			//Check if user exists
			if(users[username]){
				console.log('User is taken');
				return done('User name is already taken', false);
			}
			users[username]={
				username: username,
				password: createHash(password)
			}
			console.log('successfully signed up');
			return done(null,users[username]);

		})
	);
	
	var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
	};
	// Generates hash using bCrypt
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};

};