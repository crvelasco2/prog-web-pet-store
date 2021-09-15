function serializarForm(){
    let pago = {
        "nombre" : $("#txtNombre").val(),
        "monto" : $("#txtMonto").val(),
        "cedula" : $("#txtCedula").val(), 
        "total" : $("#txtTotal").val(),       
        
       
    };
    return pago;
}

function guardar(){
    var dataForm = serializarForm();
    console.log(dataForm);
    var requestBody = JSON.stringify(dataForm);
    console.log(requestBody);
    //Utilizar jQuery AJAX para enviar al Backend
    $.ajax({        
        type: "POST", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/pago/create", //Dirección para realizar la petición HTTP
        data: requestBody, //El contenido Body de la petición HTTP                
        contentType : "application/json",
        dataType : "json",
        success : function(response){
            console.log(response);            
            alert("El pago se creó correctamente");
		},
		error : function(err){
			console.error(err);
            alert(err);
		},
        complete : function(xhr, textStatus){
            console.log(xhr);
            if(xhr.status == 201){
                window.location.href = 'pago-list.html';
            }
        }
    });
}

$(function() {       

    $('#frmPago').on('submit', function() {
        var form = document.getElementById('frmPago');
        var a = form.checkValidity();
        console.log(a);
        if(a){
            save();
        }
    });   
});

$( document ).ready(function() {
    $("#btnGuardar").click(function(){
        guardar();
    });    
});
