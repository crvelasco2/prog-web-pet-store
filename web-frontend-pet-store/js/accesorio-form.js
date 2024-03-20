function set(accesorio){
    $("#txtNombre").val(accesorio.nombre);
    $("#txtTipo").val(accesorio.tipo);
    $("#txtCantidad").val(accesorio.cantidad);
    $("#txtPrecio").val(accesorio.precio);
    $("#txtIdAccesorio").val(accesorio.idAccesorio);
}

function retrieve(){       

    let txtBuscar = $("#txtBuscar").val();
    if(txtBuscar=="") return;
    let id = parseInt(txtBuscar); //Transforma el txtBuscar en un número entero
    console.log(id);

        $.ajax({        
            type: "GET", //Verbo de HTTP a utilizar
            url: "http://localhost:8080/accesorio/retrive/" + id, //Dirección para realizar la petición HTTP        
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
        "nombre" : $("#txtNombre").val(),
        "tipo" : $("#txtTipo").val(),
        "cantidad" : $("#txtCantidad").val(), 
        "precio" : $("#txtPrecio").val(),
        "idAccesorio" : $("#txtIdAccesorio").val()
    };
    return accesorio;
}

function save(){
    var accesorio = serializeForm();
    console.log(accesorio);
    var requestBody = JSON.stringify(accesorio);
    console.log(requestBody);
    //Utilizar jQuery AJAX para enviar al Backend
  if(accesorio.idAccesorio == 0){
        $.ajax({        
            type: "POST", //Verbo de HTTP a utilizar
            url: "http://localhost:8080/accesorio/create", //Dirección para realizar la petición HTTP
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
    let id = accesorio.idAccesorio;
    $.ajax({        
        type: "PUT", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/accesorio/update/" + id, //Dirección para realizar la petición HTTP
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
    
    $('#frmAccesorio').on('submit', function() {
        var form = document.getElementById('frmAccesorio');
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