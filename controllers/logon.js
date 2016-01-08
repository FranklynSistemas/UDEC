

//var ApiResponse = require('../models/api-response.js');
//var ApiMessages = require('../models/api-messages.js');
//var UserProfileModel = require('../models/user-profile.js');
//var userModel = require('../models/usuarios.js');
var bcrypt   = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var crypto = require('crypto');


exports.logon = function(usuario, password) {
      
            Usuario.findOne({ Usuario : usuario }, function(err, user) {
                if (err){ 
                	return 1;
                }
                if (!user)
                    return 2;

                if (!user.verifyPassword(password))
                    return 3;
               else
                    return 4;
            });
       

    }

