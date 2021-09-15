function consultar(id){
        
    $.ajax({        
        type: "GET", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/pago/retrive/" + id, //Dirección para realizar la petición HTTP        
        contentType : "application/json",
        dataType : "json",
        success : function(response){
            console.log(response);    
            let pago = response;            
            $("#lblNombre").html(pago.nombre);
            $("#spMonto").html(pago.monto);
            $("#spCedula").html(pago.cedula);
            $("#spTotal").html(pago.total);
            
           
		},
		error : function(err){
			console.error(err);
		}
    });
}

function tabular(lista){ 
    $("#tblPagos").empty(); //Eliminar el contenido del tbody de la tabla
    lista.forEach(pago => {        
        $("#tblPagos").append('<tr>'            
            + '<td>' + pago.nombre +'</td>'
            + '<td>' + pago.monto +'</td>'
            + '<td>' + pago.cedula +'</td>'
            + '<td>' + pago.total +'</td>'
            //Boton de consultar
            + '<td>'
            + '<button onclick="consultar('+ pago.idPago +')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdVariedad">Consultar</button>'
            + '</td>'                        
        +'</tr>');
    });
}

function listar(){
    //Utilizar jQuery AJAX para enviar al Backend
    $.ajax({        
        type: "GET", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/pago/list", //Dirección para realizar la petición HTTP        
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
    let id = $("#txtIdPago").val();
    $.ajax({        
        type: "DELETE", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/pago/delete/" + id, //Dirección para realizar la petición HTTP        
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