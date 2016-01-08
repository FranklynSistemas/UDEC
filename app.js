var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var uuid = require('node-uuid');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var crypto = require('crypto');
var passport = require('passport');
var flash = require('connect-flash');
var cons  = require("consolidate"); 
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');

mongoose.connect("mongodb://localhost/MiMongoDB", function(err) {
  if(!err){
    console.log('Connected to Database');
  }else{
    throw err;
  } 
});

var app = express();

// view engine setup
//app.engine("html", cons.swig); //Template engine...
app.set('views', path.join(__dirname, '/views'));
app.set("view engine", "ejs");
//app.set('view engine', 'jade');

require('./config/passport')(passport);
app.use(session({secret: 'keyboard cat'}));
//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(express.session({secret: 'mi secreto'}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


//app.use('/', routes);
//app.use('/users', users);

require('./routes/routes.js')(app, passport);

//app.get('/login', login.MostrarLogin);
app.get('/inicio',login.MostrarInicio);
//app.post('/inicio', login.post_login);
app.get('/cerrar',login.cerrar);
app.get('/academico',login.academico);
app.get('/Biblioteca',login.biblioteca);
app.get('/AulaVirtual',login.aulavirtual);
app.get('/Pedido',login.pedido);
app.post('/GuardarUsuario',login.GuardarUsuario);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen('3000');
/*
app.set('port',process.env.PORT || 3000);
console.log("Servidor Express escuchando en modo %s", app.settings.env);
*/
module.exports = app;
