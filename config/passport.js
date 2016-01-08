var LocalStrategy = require('passport-local').Strategy;


var User            = require('../routes/models/usuarios');

module.exports = function(passport) {


	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});


	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done){
		process.nextTick(function(){
			User.findOne({'local.username': email}, function(err, user){
				if(err)
					return done(err);
				if(user){
					return done(null, false, req.flash('signupMessage', 'That email already taken'));
				} else {
					var newUser = new User();
					newUser.local.username = email;
					newUser.local.password = newUser.generateHash(password);

					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser);
					})
				}
			})

		});
	}));

	passport.use('local-login', new LocalStrategy({
			usernameField: 'usuario',
			passwordField: 'pass',
			passReqToCallback: true
		},
		function(req, usuario, pass, done){
			
			process.nextTick(function(){

				User.findOne({Usuario : usuario}, function(err, user){
					
					if(err){
						return done(err);
					}
					if(!user){
						return done(null, false, req.flash('loginMessage', 'El usuario no existe'));
					}else{
					console.log(user);
					console.log(user.Usuario);	
					console.log(user.email);
					//console.log(user.passwordHash);	

					user.comparePassword(pass, function(err, isMatch) {
					if (isMatch) {
					req.session.VariableSession = user;	
					console.log("valide ok");	
        			return done(null, user);
      				} else {
      				console.log(user);	
      				console.log("valide no ok");		
        			return done(null, false, req.flash('loginMessage', 'Contraseña invalida'));
      				}
    				});
					}
				});
			});
		}
	));


};
/*
passport.use('local-login', new LocalStrategy({
			usernameField: 'usuario',
			passwordField: 'pass',
			passReqToCallback: true
		},
		function(req, usuario, pass, done){
			process.nextTick(function(){

				User.findOne({Usuario : usuario}, function(err, user){
					if(err)
						return done(err);
					if(!user)
						return done(null, false, req.flash('loginMessage', 'El usuario no existe'));
					if(!user.validPassword(pass)){
						return done(null, false, req.flash('loginMessage', 'Contraseña invalida'));
					}
					return done(null, user);

				});
			});
		}
	));


};
*/