function show(lista){ 
    $("#tblAccesorio").empty(); //Eliminar el contenido del tbody de la tabla
    lista.forEach(accesorio => {        
        $("#tblAccesorio").append('<tr>'  
            + '<td>' + accesorio.descripcion +'</td>'          
            + '<td>' + accesorio.nombre +'</td>'
            + '<td>' + accesorio.precio +'</td>'
            + '<td>' + accesorio.cantidad +'</td>'
            + '<td>' + accesorio.tipo +'</td>'
        +'</tr>');
    });
}


function list(){
    //Utilizar jQuery AJAX para enviar al Backend
    $.ajax({        
        type: "GET", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/accesorio/list", //Dirección para realizar la petición HTTP        
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


$(function() {    
    list();
});