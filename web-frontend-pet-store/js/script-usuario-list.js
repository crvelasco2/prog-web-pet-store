function consultar(id){
        
    $.ajax({        
        type: "GET", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/usuario/retrive/" + id, //Dirección para realizar la petición HTTP        
        contentType : "application/json",
        dataType : "json",
        success : function(response){
            console.log(response);    
            let usuario = response;            
            $("#lblNombre").html(usuario.nombre);
            $("#spDireccion").html(usuario.direccion);
            $("#spCedula").html(usuario.cedula);
            $("#spTelefono").html(usuario.telefono);
           
		},
		error : function(err){
			console.error(err);
		}
    });
}

function tabular(lista){ 
    $("#tblUsuarios").empty(); //Eliminar el contenido del tbody de la tabla
    lista.forEach(usuario => {        
        $("#tblUsuarios").append('<tr>'            
            + '<td>' + usuario.nombre +'</td>'
            + '<td>' + usuario.direccion +'</td>'
            + '<td>' + usuario.cedula +'</td>'
            + '<td>' + usuario.telefono +'</td>'
            //Boton de consultar
            + '<td>'
            + '<button onclick="consultar('+ usuario.idUsuario +')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdVariedad">Consultar</button>'
            + '</td>'                        
        +'</tr>');
    });
}

function listar(){
    //Utilizar jQuery AJAX para enviar al Backend
    $.ajax({        
        type: "GET", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/usuario/list", //Dirección para realizar la petición HTTP        
        contentType : "application/json",
        dataType : "json",
        success : function(response){
            console.log(response);
            tabular(response);
		},
		error : function(err){
			console.error(err);
		}        
    });
}

function eliminar(){
    let id = $("#txtIdUsuario").val();
    $.ajax({        
        type: "DELETE", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/usuario/delete/" + id, //Dirección para realizar la petición HTTP        
        contentType : "application/json",        
        success : function(response){
            console.log(response);                            
		},
		error : function(err){
			console.error(err);
		},
        complete : function(xhr, textStatus){
            if(xhr.status == 200)
            {
                alert(xhr.responseText);
                listar();         
            }
            
        }
    });
}

$( document ).ready(function() {
    console.log('Página lista');    
    listar();
});