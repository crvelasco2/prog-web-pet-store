function show(lista){ 
    $("#tblMascotas").empty(); //Eliminar el contenido del tbody de la tabla
    lista.forEach(mascota => {        
        $("#tblMascotas").append('<tr>'         
        
            + '<td>' + mascota.raza +'</td>'          
            + '<td>' + mascota.tipo +'</td>'
            + '<td>' + mascota.color +'</td>'
            + '<td>' + mascota.edad +'</td>'
            + '<td>' + mascota.caracteristica +'</td>'
            + '<td>' + mascota.descripcion +'</td>'
            + '<td>' + mascota.nombre +'</td>'
            + '<td>' + mascota.precio +'</td>'
            +'</tr>');
        });
    }


function list(){
    //Utilizar jQuery AJAX para enviar al Backend
    $.ajax({        
        type: "GET", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/mascota/list", //Dirección para realizar la petición HTTP        
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


$(function() {    
    list();
});

//
