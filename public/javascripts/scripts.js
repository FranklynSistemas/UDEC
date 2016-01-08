$(document).ready(function(){

	

	$("#btn_Crear").click(function(){
			QuitarClassActive();
 			$("#CrearUsuario").addClass("active");
 			$("#CrearUsuarioVertical").addClass("active");
 			$("#crear").fadeIn(600);
 			$("#MuestraUsuarios").fadeOut(100);
 			$("#Informacion").fadeOut(100);
	});

	$("#btn_Modificar").click(function(){
			QuitarClassActive();
 			$("#ModificarUsuario").addClass("active");
 			$("#ModificarUsuarioVertical").addClass("active");
 			$("#crear").fadeOut(100);
 			$("#MuestraUsuarios").fadeOut(100);
 			$("#Informacion").fadeOut(100);
 			
	});

	$("#btn_Mostrar").click(function(){
			QuitarClassActive();
 			$("#MostrarUsuarios").addClass("active");
 			$("#MostrarUsuariosVertical").addClass("active");
 			$("#MuestraUsuarios").fadeIn(600);
 			$("#crear").fadeOut(100);
 			$("#Informacion").fadeOut(100);
	});

	$("#btn_Export").click(function(){
			QuitarClassActive();
 			$("#ExportarUsuarios").addClass("active");
 			$("#ExportarUsuariosVertical").addClass("active");
 			$("#crear").fadeOut(100);
 			$("#MuestraUsuarios").fadeOut(100);
 			$("#Informacion").fadeOut(100);
	});


		$("#btn_CrearV").click(function(){
			QuitarClassActive();
 			$("#CrearUsuario").addClass("active");
 			$("#CrearUsuarioVertical").addClass("active");
 			$("#crear").fadeIn(600);
 			$("#MuestraUsuarios").fadeOut(100);
 			$("#Informacion").fadeOut(100);
	});

	$("#btn_ModificarV").click(function(){
			QuitarClassActive();
 			$("#ModificarUsuario").addClass("active");
 			$("#ModificarUsuarioVertical").addClass("active");
 			$("#crear").fadeOut(100);
 			$("#MuestraUsuarios").fadeOut(100);
 			$("#Informacion").fadeOut(100);
 			
	});

	$("#btn_MostrarV").click(function(){
			QuitarClassActive();
 			$("#MostrarUsuarios").addClass("active");
 			$("#MostrarUsuariosVertical").addClass("active");
 			$("#MuestraUsuarios").fadeIn(600);
 			$("#crear").fadeOut(100);
 			$("#Informacion").fadeOut(100);
	});

	$("#btn_ExportV").click(function(){
			QuitarClassActive();
 			$("#ExportarUsuarios").addClass("active");
 			$("#ExportarUsuariosVertical").addClass("active");
 			$("#crear").fadeOut(100);
 			$("#MuestraUsuarios").fadeOut(100);
 			$("#Informacion").fadeOut(100);
	});

	QuitarClassActive = function(){
		$("#CrearUsuario").removeClass("active");
		$("#ModificarUsuario").removeClass("active");
 		$("#MostrarUsuarios").removeClass("active");
 		$("#ExportarUsuarios").removeClass("active");
 		$("#CrearUsuarioVertical").removeClass("active");
		$("#ModificarUsuarioVertical").removeClass("active");
 		$("#MostrarUsuariosVertical").removeClass("active");
 		$("#ExportarUsuariosVertical").removeClass("active");
	}




});

/*
$("#btn_Crear").click(function()
  {
    $("#crear").fadeIn(600);
  });
*/

/*
$("#btn_Crear").click(function(){
 			$.ajax({
		 				url: '',
		 				data: '',
		 				method: '',
		 				dataType: '',
		  			}).done(function(e) {
		  				$("#crear").show();
		  			});
 	});
*/
/*
function Mostrar_div(){
      $("#crear").
    }

    function Ocultar_div(){
      $("#crear").fadeOut(200);
    }
*/
   



