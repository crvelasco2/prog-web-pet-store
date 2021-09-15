function show(lista){ 
    $("#tblAlimento").empty(); //Eliminar el contenido del tbody de la tabla
    lista.forEach(alimento => {        
        $("#tblAlimento").append('<tr>'  
            + '<td>' + alimento.descripcion +'</td>'          
            + '<td>' + alimento.nombre +'</td>'
            + '<td>' + alimento.precio +'</td>'
            + '<td>' + alimento.cantidad +'</td>'
            + '<td>' + alimento.tipo +'</td>'
        +'</tr>');
    });
}


function list(){
    //Utilizar jQuery AJAX para enviar al Backend
    $.ajax({        
        type: "GET", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/alimento/list", //Dirección para realizar la petición HTTP        
        contentType : "application/json",
        dataType : "json",
        success : function(response){
            console.log(response);
            //response trae la lista de variedades como un Arreglo JSON
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


$(function() {    
    list();
});