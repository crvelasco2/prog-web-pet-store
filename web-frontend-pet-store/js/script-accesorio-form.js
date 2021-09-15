var ventas = [];

function list(){
    $("#tblAccesorio").empty(); //Eliminar el contenido del tbody de la tabla
    ventas.forEach(accesorio => {        
        $("#tblHabitacion").append('<tr>'            
            + '<td>' + accesorio.tipo +'</td>'    
            + '<td>' + accesorio.cantidad +'</td>'     
             
            //Boton de consultar
            + '<td>'
            + '<button onclick="remove('+ ventas.indexOf(accesaorio) +')" type="button" class="btn btn-danger">Eliminar</button>'
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
    let accesorio = {
        "tipo" : $("#txtTipo").val(),
        "cantidad" : $("#txtCantidad").val(),
        "descripcion" : $("#txtDescripcion").val(),
        "nombre" : $("#txtNombre").val(),
        "precio" : $("#txtPrecio").val(),
        "venta" : ventas
    };
    return accesorio;
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
        url: "http://localhost:8080/accesorio/create", 
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