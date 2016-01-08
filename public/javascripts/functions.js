$(function()
{
var nomServicios = [
              {
                servicio  :   "Guarda Usuarios", 
                urlServicio : "/GuardarUsuario", 
                metodo    :   "POST"
              },
              {
                servicio  :   "Usuarios", 
                urlServicio : "/Usuarios", 
                metodo    :   "GET"
              }];


listadoDatos = [];
like = [];
var elementos = ["PrimerNombre", "Apellidos","Direccion","Usuario","SegundoNombre","email","Telefono","password","PerfilList"];
var Validaelementos = ["PrimerNombre", "Apellidos","Direccion","Usuario","email","Telefono","password","PerfilList"];
var consumeServicios = function(tipo, val)
{
        console.log("Consumo "+tipo);
        var servicio = {
            url   : nomServicios[tipo - 1].urlServicio, 
            metodo  : nomServicios[tipo - 1].metodo, 
            datos   : ""
          };
    if(tipo==1)
    {
        servicio.datos = val !== "" ? JSON.stringify(val) : "";
        
    }else {
         //servicio.url += "/" + val;
         console.log(servicio.url);
        
    }

    $.ajax(
    {
      url     : servicio.url,
      type    : servicio.metodo, 
      data    : servicio.datos, 
      dataType  : "json",
      contentType: "application/json; charset=utf-8"
    }).done(function(data)
    {         
     switch(tipo)
     {
        case 1:
          console.log(data.status);
          if(data.status){
              limpiarCampos();
              alert("Guardado Correctamente");
              console.log("Guardado Correctamente");
            }else{
            alert("El Usuario ya existe");  
            console.log("Error");
          }
        /*
          listadoDatos = [];
          for(var i = 0; i < data.length; i++)
          {
          //console.log(data[i]);
          listadoDatos.push(new datoData(data[i]));
          }
          imprimeDatos();
          */
        break;
        case 2:
        console.log("Si consumo el 2");
        $("#CrearUsuario").addClass("active");
        $("#Informacion").fadeOut(100);
        $("#crear").fadeIn(600);
   
        break;
        case 3:
          like = [];
          for(var i = 0; i < data.length; i++)
          {
          //console.log(data[i]);
          like.push(new datoData(data[i]));
          }
          imprimeDatos();
        break;


     } 
});

};
  
  var limpiarCampos = function()
  {
    console.log("Limpia campos...");
    for(var i = 0; i < elementos.length; i++)
    {
      $("#" + elementos[i]).val("");
    }
    
  }

//Acciones sobre el botón guardar...
  $("#btn_Guardar").click(function(event)
  {
    guardarDatos();
  });


  var guardarDatos = function()
  {
    console.log("Entre");
    var valores = [];
    var correcto = true;
    for(var i = 0; i < elementos.length; i++)
    {
      if($("#" + Validaelementos[i]).val() === "")
      {
        alert("Digite todos los campos");
        $("#" + Validaelementos[i]).focus();
        correcto = false;
        break;
      }
      else
      {
        valores[i] = $("#" + elementos[i]).val();
      }
    }
    console.log(correcto);
     if(correcto)
    {
      var Fecha = new Date();
      var FechaOrdenada = Fecha.getDate()+"/"+(Fecha.getMonth()+1)+"/"+Fecha.getFullYear()+" "+Fecha.getHours()+":"+Fecha.getMinutes();
      var nuevoDato = {
                Identi : 0,
                Usuario : valores[3],
                email : valores[5],
                Nombres : valores[0]+valores[4],
                Apellidos : valores[1],
                Contraseña : valores[7],
                Direccion : valores[2],
                Telefono : valores[6],
                rol : valores[8],
                fecha: FechaOrdenada

              };     
       correcto = false;       
     // console.log(nuevoDato);   
      console.log("Entre 2");      
      consumeServicios(1, nuevoDato);
    }
  }

$("#btn_MostrarV").click(function(){
 
 MostrarDatos();   
});

$("#btn_Mostrar").click(function(){
 
 MostrarDatos();   
});

function MostrarDatos(){
    $.ajax({
           url     : "/MostrarUsuarios",
           type    : "GET", 
           data    : "", 
           dataType  : "json",
           contentType: "application/json; charset=utf-8"
            }).done(function(data) {
           if(data.status){
              var html = '<h1>Usuarios</h1>';
              html += '<h2>No se encontraron Datos</h2>';
              $("#Muestradatos").append(html);
           }else{

            for (num in data){
               
                var tds = '<tr>';
                tds += '<td data-field="id">' + data[num]['Identi'] + '</td>';
                tds += '<td data-field="user">' + data[num]['Usuario'] + '</td>';
                tds += '<td data-field="nombres">' + data[num]['Nombres'] + '</td>';
                tds += '<td data-field="apellidos">' + data[num]['Apellidos'] + '</td>';
                tds += '<td data-field="email">' + data[num]['email'] + '</td>';
                tds += '<td data-field="direccion">' + data[num]['Direccion'] + '</td>';
                tds += '<td data-field="telefono">' + data[num]['Telefono'] + '</td>';
                tds += '<td data-field="rol">' + data[num]['rol'] + '</td>';
                tds += '<td data-field="fecha">' + data[num]['fecha'] + '</td>';
                tds += '</tr>';

              $("#Muestradatos").append(tds);

            }
             $('#TablaUsuarios').DataTable();
             
          }
      });
}
/*            var info;
            for (num in data){
              info.id = data[num]['Identi']
              info.user = data[num]['Usuario']
              info.nombres = data[num]['Nombres']
              info.apellidos = data[num]['Apellidos']
              info.email = data[num]['email']
              info.direccion = data[num]['Direccion']
              info.telefono = data[num]['Telefono']
              info.rol = data[num]['rol']
              info.fecha = data[num]['fecha']
              
            }
            */
/*
             $('#TablaUsuarios').bootstrapTable({
    columns: [{
        field: 'id',
        title: 'ID'
    }, {
        field: 'user',
        title: 'Usuario'
    }, {
        field: 'nombres',
        title: 'Nombres'
    },
    {
        field: 'apellidos',
        title: 'Apellidos'
    },
    {
        field: 'email',
        title: 'Email'
    },
    {
        field: 'direccion',
        title: 'Direccion'
    },
    {
        field: 'telefono',
        title: 'Telefono'
    },
    {
        field: 'rol',
        title: 'Rol'
    },
    {
        field: 'fecha',
        title: 'Fecha'
    }
    ],
    data: [info]
});

            */ 
            
            
 





});
