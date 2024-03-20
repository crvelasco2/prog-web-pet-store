function set(alimento){
    $("#txtNombreA").val(alimento.nombreA);
    $("#txtTipoA").val(alimento.tipoA);
    $("#txtCantidadA").val(alimento.cantidadA);
    $("#txtPrecioA").val(alimento.precioA);
    $("#txtIdAlimento").val(alimento.idAlimento);
}

function retrieve(){       

    let txtBuscar = $("#txtBuscar").val();
    if(txtBuscar=="") return;
    let id = parseInt(txtBuscar); //Transforma el txtBuscar en un número entero
    console.log(id);

        $.ajax({        
            type: "GET", //Verbo de HTTP a utilizar
            url: "http://localhost:8080/alimento/retrive/" + id, //Dirección para realizar la petición HTTP        
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
    let alimento = {
        "nombre" : $("#txtNombreA").val(),
        "tipo" : $("#txtTipoA").val(),
        "cantidad" : $("#txtCantidadA").val(), 
        "precio" : $("#txtPrecioA").val(),
        "idAlimento" : $("#txtIdAlimento").val()
    };
    return alimento;
}

function save(){
    var alimento = serializeForm();
    console.log(alimento);
    var requestBody = JSON.stringify(alimento);
    console.log(requestBody);
    //Utilizar jQuery AJAX para enviar al Backend
  if(alimento.idAccesorio == 0){
        $.ajax({        
            type: "POST", //Verbo de HTTP a utilizar
            url: "http://localhost:8080/alimento/create", //Dirección para realizar la petición HTTP
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
    let id = alimento.idAlimento;
    $.ajax({        
        type: "PUT", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/alimento/update/" + id, //Dirección para realizar la petición HTTP
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
    
    $('#frmAlimento').on('submit', function() {
        var form = document.getElementById('frmAlimento');
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