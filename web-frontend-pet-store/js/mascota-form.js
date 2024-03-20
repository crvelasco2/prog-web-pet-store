function set(mascota){
    $("#txtRaza").val(mascota.raza);
    $("#txtTipo").val(mascota.tipo);
    $("#txtColor").val(mascota.color);
    $("#txtEdad").val(mascota.edad);
    $("#txtGenero").val(mascota.genero);
    $("#txtPrecio").val(mascota.precio);
    $("#txtIdMascota").val(accesorio.idMascota);
}

function retrieve(){       

    let txtBuscar = $("#txtBuscar").val();
    if(txtBuscar=="") return;
    let id = parseInt(txtBuscar); //Transforma el txtBuscar en un número entero
    console.log(id);

        $.ajax({        
            type: "GET", //Verbo de HTTP a utilizar
            url: "http://localhost:8080/mascota/retrive/" + id, //Dirección para realizar la petición HTTP        
            contentType : "application/json",
            dataType : "json",
            success : function(response){
                console.log(response);    
                //El response contiene el objeto cliente consultado
                set(response);                            
		    },
		    error : function(err){
			    console.error(err);
		    },
            complete : function(xhr, textStatus){
                if(xhr.status == 404)
                {
                    alert(xhr.responseText);                    
                }
            }
        });
    
}

function serializeForm(){
    let accesorio = {
        "raza" : $("#txtRaza").val(),
        "tipo" : $("#txtTipo").val(),
        "color" : $("#txtColor").val(), 
        "edad" : $("#txtEdad").val(),
        "genero" : $("#txtGenero").val(),
        "precio" : $("#txtPrecio").val(),
        "idMascota" : $("#txtIdMascota").val()
    };
    return accesorio;
}

function save(){
    var mascota = serializeForm();
    console.log(mascota);
    var requestBody = JSON.stringify(mascota);
    console.log(requestBody);
    //Utilizar jQuery AJAX para enviar al Backend
  if(mascota.idMascota == 0){
        $.ajax({        
            type: "POST", //Verbo de HTTP a utilizar
            url: "http://localhost:8080/mascota/create", //Dirección para realizar la petición HTTP
            data: requestBody, //El contenido Body de la petición HTTP                
            contentType : "application/json",
            crossDomain: true,
            dataType: "json",
            success : function(response){
                console.log(response);
                
		    },
		    error : function(err){
			    console.error(err);
		    },
                 
        });
    }
   else{
    //Update
    let id = mascota.idMascota;
    $.ajax({        
        type: "PUT", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/mascota/update/" + id, //Dirección para realizar la petición HTTP
        data: requestBody, //El contenido Body de la petición HTTP                
        contentType : "application/json",
        crossDomain: true,
        dataType: "json",
        success : function(response){
            console.log(response);             
        },
        error : function(err){
            console.error(err);
        }            
    });
}
}

$(function() {    
    
    $('#frmMascota').on('submit', function() {
        var form = document.getElementById('frmMascota');
        var a = form.checkValidity();
        console.log(a);
        if(a){
            save();
        }
    });

    
    $("#btnGuardar").click(function(){        
        save();
    });

    $("#btnBuscar").click(function(){        
        retrieve();
    });    
});