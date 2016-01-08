var User = require('./models/usuarios');
var login = require('./login');

module.exports = function(app, passport){
	app.get('/', function(req, res){
		res.render('index', { message: req.flash('loginMessage') });
	});

	app.get('/login', function(req, res){
		res.render('index', { message: req.flash('loginMessage') });
	});
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/inicio',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/backend', function(req, res){
	if(typeof req.session.VariableSession!='undefined'){
		if(req.session.VariableSession.rol == 'Administrador'){
		res.render('Administracion/inicio',{Nombre: req.session.VariableSession.Nombres});
	}
	}else{
		res.redirect('/login');
	}
	});

	app.get('/Usuarios', function(req, res){
	if(typeof req.session.VariableSession!='undefined'){
		if(req.session.VariableSession.rol == 'Administrador'){
		res.render('Administracion/Usuarios',{Nombre: req.session.VariableSession.Nombres});
	}
	}else{
		res.redirect('/login');
	}
	});

	app.get('/InicioProfesores', function(req, res){
		res.send('Profesores');
	});

	app.get('/MostrarUsuarios', function(req, res){
		User.find(function(err, Usuarios){
			if(Usuarios){
				res.json(Usuarios);
			}else{
				res.json({status: false });
			}

			
		});

	});
	

	app.get('/signup', function(req, res){
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});


	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs', { user: req.user });
	});




	app.get('/:username/:password', function(req, res){
		var newUser = new User();
		newUser.local.username = req.params.username;
		newUser.local.password = req.params.password;
		console.log(newUser.local.username + " " + newUser.local.password);
		newUser.save(function(err){
			if(err)
				throw err;
		});
		res.send("Success!");
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	})
};

//app.get('/inicio',login.MostrarInicio);
//app.post('/inicio', login.post_login);
/*app.get('/cerrar',login.cerrar);
app.get('/academico',login.academico);
app.get('/Biblioteca',login.biblioteca);
app.get('/AulaVirtual',login.aulavirtual);
app.get('/Pedido',login.pedido);
*/
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect('/login');
}