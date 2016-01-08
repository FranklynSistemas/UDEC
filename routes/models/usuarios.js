// ./models/userios.js

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
   Identi : String,
   Usuario : String,
   email : String,
   Nombres : String,
   Apellidos : String,
   Contraseña : String,
   Direccion : String,
   Telefono : String,
   rol : String,
   fecha: String
});

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}

userSchema.methods.comparePassword = function(candidatePassword, cb) {
	console.log(candidatePassword);
	console.log(this.Contraseña);
  bcrypt.compare(candidatePassword, this.Contraseña, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.comparePassword1 = function(candidatePassword,pass, cb) {
	console.log(candidatePassword);
	console.log(pass);
  bcrypt.compare(candidatePassword, pass, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Usuarios', userSchema);