function retrieve(id){
        
    $.ajax({        
        type: "GET", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/mascota/retrive/" + id, //Dirección para realizar la petición HTTP        
        contentType : "application/json",
        dataType : "json",
        success : function(response){
            console.log(response);    
            //La response contiene el objeto de tipo cliente
            let mascota = response;            
            $("#lblRaza").html(mascota.raza);
            $("#spTipo").html(mascota.tipo);
            $("#spColor").html(mascota.color);
            $("#spEdad").html(mascota.edad);
            $("#spGenero").html(mascota.genero);
            $("#spPrecio").html(mascota.precio);
            $("#txtIdMascota").val(mascota.idMascota); //Setter
            //let valor = $("#txtIdVariedad").val(); //Getter
		},
		error : function(err){
			console.error(err);
		}
    });
}

function show(list){ 
    $("#tblMascotas").empty(); //Eliminar el contenido del tbody de la tabla
    list.forEach(mascota => {        
        $("#tblMascotas").append('<tr>'            
            + '<td>' + mascota.raza +'</td>'
            + '<td>' + mascota.tipo +'</td>'
            + '<td>' + mascota.color +'</td>'
            + '<td>' + mascota.edad +'</td>' 
            + '<td>' + mascota.genero +'</td>'
            + '<td>' + mascota.precio +'</td>'
            
            //Boton de consultar
            + '<td>'
            + '<button onclick="retrieve('+ mascota.idMascota +')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdMascota">Consultar</button>'
            + '</td>'                        
        +'</tr>');
    });
}

function list(){
    //Utilizar jQuery AJAX para enviar al Backend
    $.ajax({        
        type: "GET", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/mascota/list",//Dirección para realizar la petición HTTP        
        contentType : "application/json",
        dataType : "json",
        success : function(response){
            console.log(response);
            //response trae la lista de clientees como un Arreglo JSON
            show(response);
		},
		error : function(err){
			console.error(err);
		},
        complete: function(xhr, textStatus) {            
            if(xhr.status == 404){
                alert(xhr.responseText);
            }
            if(xhr.status == 500){
                alert(xhr.responseText);
            }
        }      
    });
}

function del(){
    let id = $("#txtIdMascota").val();
    $.ajax({        
        type: "DELETE", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/mascota/delete/" + id, //Dirección para realizar la petición HTTP        
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
                list();         
            }            
        }
    });
}

$( document ).ready(function() {    
    list();
    $("#btnEliminar").click(function(){        
        del();
    });
});