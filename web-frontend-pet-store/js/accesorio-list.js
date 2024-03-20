function retrieve(id){
        
    $.ajax({        
        type: "GET", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/accesorio/retrive/" + id, //Dirección para realizar la petición HTTP        
        contentType : "application/json",
        dataType : "json",
        success : function(response){
            console.log(response);    
            //La response contiene el objeto de tipo cliente
            let accesorio = response;            
            $("#lblNombre").html(accesorio.nombre);
            $("#spTipo").html(accesorio.tipo);
            $("#spCantidad").html(accesorio.cantidad);
            $("#spPrecio").html(accesorio.precio);
            $("#txtIdCliente").val(accesorio.idAccesorio); //Setter
            //let valor = $("#txtIdVariedad").val(); //Getter
		},
		error : function(err){
			console.error(err);
		}
    });
}

function show(list){ 
    $("#tblAccesorios").empty(); //Eliminar el contenido del tbody de la tabla
    list.forEach(accesorio => {        
        $("#tblAccesorios").append('<tr>'            
            + '<td>' + accesorio.nombre +'</td>'
            + '<td>' + accesorio.tipo +'</td>'
            + '<td>' + accesorio.cantidad +'</td>'
            + '<td>' + accesorio.precio +'</td>'            
            //Boton de consultar
            + '<td>'
            + '<button onclick="retrieve('+ accesorio.idAccesorio +')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdAccesorio">Consultar</button>'
            + '</td>'                        
        +'</tr>');
    });
}

function list(){
    //Utilizar jQuery AJAX para enviar al Backend
    $.ajax({        
        type: "GET", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/accesorio/list",//Dirección para realizar la petición HTTP        
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
    let id = $("#txtIdAccesorio").val();
    $.ajax({        
        type: "DELETE", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/accesorio/delete/" + id, //Dirección para realizar la petición HTTP        
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