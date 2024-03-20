function retrieve(id){
        
    $.ajax({        
        type: "GET", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/alimento/retrive/" + id, //Dirección para realizar la petición HTTP        
        contentType : "application/json",
        dataType : "json",
        success : function(response){
            console.log(response);    
            //La response contiene el objeto de tipo cliente
            let alimento = response;            
            $("#lblNombre").html(alimento.nombreA);
            $("#spTipo").html(alimento.tipoA);
            $("#spCantidad").html(alimento.cantidadA);
            $("#spPrecio").html(alimento.precioA);
            $("#txtIdCliente").val(alimento.idAlimento); //Setter
            //let valor = $("#txtIdVariedad").val(); //Getter
		},
		error : function(err){
			console.error(err);
		}
    });
}

function show(list){ 
    $("#tblAlimentos").empty(); //Eliminar el contenido del tbody de la tabla
    list.forEach(alimento => {        
        $("#tblAlimentos").append('<tr>'            
            + '<td>' + alimento.nombreA +'</td>'
            + '<td>' + alimento.tipoA +'</td>'
            + '<td>' + alimento.cantidadA +'</td>'
            + '<td>' + alimento.precioA +'</td>' 
          
            //Boton de consultar
            + '<td>'
            + '<button onclick="retrieve('+ alimento.idAlimento +')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdAlimento">Consultar</button>'
            + '</td>'                        
        +'</tr>');
    });
}

function list(){
    //Utilizar jQuery AJAX para enviar al Backend
    $.ajax({        
        type: "GET", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/alimento/list",//Dirección para realizar la petición HTTP        
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
    let id = $("#txtIdAlimento").val();
    $.ajax({        
        type: "DELETE", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/alimento/delete/" + id, //Dirección para realizar la petición HTTP        
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