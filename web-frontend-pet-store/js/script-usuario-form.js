function serializarForm(){
    let usuario = {
        "nombre" : $("#txtNombre").val(),
        "direccion" : $("#txtDireccion").val(),
        "cedula" : $("#txtCedula").val(), 
        "telefono" : $("#txtTelefono").val(),       
       
    };
    return usuario;
}

function guardar(){
    var dataForm = serializarForm();
    console.log(dataForm);
    var requestBody = JSON.stringify(dataForm);
    console.log(requestBody);
    //Utilizar jQuery AJAX para enviar al Backend
    $.ajax({        
        type: "POST", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/usuario/create", //Dirección para realizar la petición HTTP
        data: requestBody, //El contenido Body de la petición HTTP                
        contentType : "application/json",
        dataType : "json",
        success : function(response){
            console.log(response);            
            alert("El usuraio se creado");
		},
		error : function(err){
			console.error(err);
            alert(err);
		},
        complete : function(xhr, textStatus){
            console.log(xhr);
            if(xhr.status == 201){
                window.location.href = 'usuario-list.html';
            }
        }
    });
}
$(function() {       

    $('#frmUsuario').on('submit', function() {
        var form = document.getElementById('frmUsuario');
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
