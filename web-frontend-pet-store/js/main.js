//Utiliza jQuery para tareas generales del frontend
var menu = '<nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Ninth navbar example"> <div class="container-xl"> <a class="navbar-brand" href="index.html"> FHORMA ATALIER</a> <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07XL" aria-controls="navbarsExample07XL" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button> <div class="collapse navbar-collapse" id="navbarsExample07XL"> <ul class="navbar-nav me-auto mb-2 mb-lg-0"> <li class="nav-item"> <a class="nav-link active" aria-current="page" href="index.html">Inicio</a> </li> <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" id="dropdown07XL" data-bs-toggle="dropdown" aria-expanded="false">Usuario</a> <ul class="dropdown-menu" aria-labelledby="dropdown07XL"> <li><a class="dropdown-item" href="usuario-form.html">Nuevo</a></li> <li><a class="dropdown-item" href="usuario-list.html">Listado</a></li> </ul> </li> <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="#" id="dropdown07XL" data-bs-toggle="dropdown" aria-expanded="false">Compra</a> <ul class="dropdown-menu" aria-labelledby="dropdown07XL"> <li><a class="dropdown-item" href="mascota-form.html">Nuevo</a></li> <li><a class="dropdown-item" href="mascota-list.html">Listado</a></li>  </nav>';
var footer = '<p class="text-center text-muted">&copy; 2021 ISOW, Carrera de Ingenieria de Software</p>';

function loadMenu(){
    $('header').html(menu);
    $('footer').html(footer);
}

$(function() {
    console.log("Pagina lista");
    loadMenu();
});