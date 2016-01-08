var User            = require('./models/usuarios');
var login = require('../controllers/logon');

exports.MostrarLogin = function(req, res){
   res.render('index');
}

exports.MostrarInicio = function(req, res){
   if(typeof req.session.VariableSession!='undefined'){
      if(req.session.VariableSession.rol == 'Administrador'){

         res.redirect('/backend');
      }else if(req.session.VariableSession.rol == 'Estudiante'){
         res.render('inicio',{titulo: "Inicio", Nombre: req.session.VariableSession.Nombres});
      }else if(req.session.VariableSession.rol == 'Profesor'){
         res.redirect('/InicioProfesores');
      }
      }else{
         res.redirect('/login');
      }
}


exports.post_login = function(req, res){
   var usuario = req.body.usuario;
   var pass = req.body.pass;

   req.session.VariableSession = req.body.usuario;
//   login.logon(usuario,pass, function(err,result){

   if (login.logon(usuario, pass) == 1) {
      res.redirect('/inicio');
   }else{
      console.log(login.logon(usuario, pass));
      var error = 1;
      res.render('index',{
         error: error
      });
  // }

           
   }

   
   /*
   if(usuario=='franklyn' && pass==1234){
   	 res.redirect('/inicio');
   	 //MostrarInicio(req, res);
       
   }else{
   	var error = 1;
   	res.render('index',{
   		error: error
   	});
   }
   */
}

exports.academico = function(req,res){
   if(typeof req.session.VariableSession!='undefined'){
      if(req.session.VariableSession.rol == 'Estudiante'){
         res.render('Estudiantes/Academico',{titulo: "Academico", Nombre: req.session.VariableSession.Nombres});
      }  
      }else{
        res.redirect('/login');
      }  
}

exports.biblioteca = function(req,res){
   if(typeof req.session.VariableSession!='undefined'){
      if(req.session.VariableSession.rol == 'Estudiante'){
         res.render('Biblioteca/Biblioteca',{titulo: "e-Biblioteca",Nombre: req.session.VariableSession.Nombres});
      }
      }else{
         res.redirect('/login');
      }  
}

exports.aulavirtual = function(req,res){
   if(typeof req.session.VariableSession!='undefined'){
      if(req.session.VariableSession.rol == 'Estudiante'){
         res.render('Aula/AulaVirtual',{titulo: "Aula Virtual",Nombre: req.session.VariableSession.Nombres});
      }
      }else{
         res.redirect('/login');
      }  
}

exports.pedido = function(req,res){
   if(typeof req.session.VariableSession!='undefined'){
      if(req.session.VariableSession.rol == 'Estudiante'){
         res.render('Pedido/Pedido',{titulo: "Pedido",Nombre: req.session.VariableSession.Nombres});
      }
      }else{
         res.redirect('/login');
      }  
}

exports.GuardarUsuario = function(req, res){
    var datos = req.body;

    User.findOne({Usuario: datos.Usuario},function (err, Usuario) {
      if (err){
         console.log("Error general");
      }else if(!Usuario){
         User.count(function(err,cont){
             user = new User();
             var datosAux = datos;
             datosAux.Identi = cont+1;
             datosAux.Contraseña =  user.generateHash(datos.Contraseña);
             newUser =  new User(datosAux);
             console.log(newUser);
             
             //console.log(newUser);

             newUser.save(function (err, obj) {
               if (!err) 
                  console.log(obj.Nombres + ' ha sido guardado');
                  res.json({status : true});
                  //res.render('Administracion/Usuarios',{Nombre: req.session.VariableSession.Nombres});
               });

         });
  
      }else{
         console.log("El Usuario ya existe");
         res.json({status : false});
      }
   });



    
    
  }


exports.cerrar = function(req,res){
    var error = 1
    delete req.session.VariableSession;
    res.redirect('/login');
}