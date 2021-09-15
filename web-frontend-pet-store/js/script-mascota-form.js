var ventas = [];

function list(){
    $("#tblMascota").empty(); //Eliminar el contenido del tbody de la tabla
    ventas.forEach(mascota => {        
        $("#tblMascota").append('<tr>'            
            + '<td>' + mascota.raza +'</td>'    
            + '<td>' + mascota.tipo +'</td>'   
            + '<td>' + mascota.color +'</td>'    
            + '<td>' + mascota.edad +'</td>' 
            + '<td>' + mascota.caracteristica +'</td>'    
            + '<td>' + mascota.descripcion +'</td>'     
             
            //Boton de consultar
            + '<td>'
            + '<button onclick="remove('+ ventas.indexOf(mascota) +')" type="button" class="btn btn-danger">Eliminar</button>'
            + '</td>'                        
        +'</tr>');
    });
}

function remove(index){
    ventas.splice(index, 1);
    list();
}

function add(){
    let venta = {
        "descripcion" : $("#txtProducto").val(),
        "nombre" : $("#txtTipoServicio").val(),
        "precio" : $("#txtPrecio").val(),   
        }
        ventas.push(venta);
    list();

}


function serializeForm(){
    let mascota = {
        "raza" : $("#txtRaza").val(),
        "tipo" : $("#txtTipo").val(),
        "color" : $("#txtColor").val(), 
        "edad" : $("#txtEdad").find(":selected").val(),       
        "caracteristica" : $("#txtCaracteristica").val(),
        "descripcion" : $("#txtDescripcion").val(),
        "nombre" : $("#txtNombre").val(),
        "precio" : $("#txtPrecio").val(), 
        "venta" : ventas
    };
    return mascota;
}

function guardar(){    
    //Creando el objeto
    var habitacion = serializeForm();   
    console.log(habitacion);
    
    var requestBody = JSON.stringify(habitacion);
    console.log(requestBody);    
    //Utilizar jQuery AJAX para enviar al Backend
    $.ajax({        
        type: "POST", 
        url: "http://localhost:8080/mascota/create", 
        data: requestBody, 
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


$(function() {       
       

    $("#btnAgregar").click(function(){
        add();
    });

    $("#btnGuardar").click(function(){
        guardar();
    });

   /* $('#frmCosecha').on('submit', function() {
        var form = document.getElementById('frmCosecha');                
        if(form.checkValidity()){
            save();                       
        }
    });*/


});
