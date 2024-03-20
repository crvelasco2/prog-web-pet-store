$( () => {
  
    //Creamos el listener del boton
    $(document).on('click', 'input[type="button"]', function(){
        
        //Traemos los radio que tengan el mismo name, únicamente los que estén seleccionados y sacamos el valor
        let radio = $('input[name="isActive"]:checked').val();
        
        if( radio ) {
          console.log( radio );
        }
      
    });
  
  });