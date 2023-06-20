//alert('Hola mundo front-categorias');

//vamos a crear funciones para comunicarnos con el back - API - END POINT 
//creamos la funcion
function getURL(){
    let URL = window.location.protocol+'//'+window.location.hostname;
    if(window.location.port)
        URL+=':'+window.location.port;
    return URL;
}
let idEliminarCategoria = 0;
let idActualizarCategoria = 0;

function agregarCategoria(){
    const URL = getURL() + '/categorias/api/'; //params
    const descripcion     = document.getElementById('descripcionCategoriasAgregar').value;
    const observaciones   = document.getElementById('observacionesCategoriasAgregar').value;
    
    $.ajax({
        method:'POST', //metodo
        url:URL, //END Point
        data: {
            "descripcion": descripcion,
			"observaciones": observaciones
        },
        success: function( result ) {
            if(result.estado==1){
                //agregamos la categoria a la tabla
                //mandamos a llamar a la categoria 
                const categoria = result.categoria;
                let tabla = $('#tabla-categorias').DataTable();
                let botones = generarBotones(categoria); 
                let nuevoRenglon = tabla.row.add([categoria.descripcion,botones]).node();
                $(nuevoRenglon).attr('id','renglon_' + categoria.id);
                $(nuevoRenglon).find('td').addClass('table-td');
                tabla.draw( false );
                //limpiar los campos
                document.getElementById('descripcionCategoriasAgregar').value='';
                document.getElementById('observacionesCategoriasAgregar').value='';
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Categoria Creada',
                    showConfirmButton: false,
                    timer: 1500
                });          
            }else{
                alert(result.mensaje);
            }
        }
      });
}
function actualizarCategoriaById(){
    const descripcion     = document.getElementById('descripcionCategoriasActualizar').value;
    const observaciones   = document.getElementById('observacionesCategoriasActualizar').value;
    
    $.ajax({
        method:'PUT', //metodo
        url:getURL() + '/categorias/api/'+idActualizarCategoria, //END Point
        data: {
            "descripcion": descripcion,
			"observaciones": observaciones
        },
        success: function( result ) {
            if(result.estado==1){
                //agregamos la categoria a la tabla
                //mandamos a llamar a la categoria 
                const categoria = result.categoria;
                let tabla = $('#tabla-categorias').DataTable();
                let renglonTemporal = tabla.row('#renglon_'+idActualizarCategoria).data();
                renglonTemporal[0] = descripcion;
                tabla.row('#renglon_'+idActualizarCategoria).data(renglonTemporal).draw();
                
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Categoria Actualizada',
                    showConfirmButton: false,
                    timer: 1500
                });  
            }else{
                alert(result.mensaje);
            }
        }
      });
}
function muestraUnaCategoriaFront(id){
    let URL = getURL() + '/categorias/api/'+id; //params
    $.ajax({
        method:'GET',
        url:URL,
        data: { //body
        },
        success: function( result ) {
            if(result.estado==1){
                const categoria = result.categorias;

                document.getElementById('descripcionCategoriasVisualizar').value=categoria.descripcion;
                document.getElementById('observacionesCategoriasVisualizar').value=categoria.observaciones;
            }else{
                alert(result.mensaje);
            }
        }
      });
}
function identificarIdActualizar(id){
    idActualizarCategoria = id;
    $.ajax({
        method:'GET',
        url:getURL() + '/categorias/api/'+id,
        data: {},
        success: function( result ) {
            if(result.estado==1){
                const categoria = result.categorias;

                document.getElementById('descripcionCategoriasActualizar').value=categoria.descripcion;
                document.getElementById('observacionesCategoriasActualizar').value=categoria.observaciones;
            }else{
                alert(result.mensaje);
            }
        }
      });
}
function identificarIdEliminar(id){
    idEliminarCategoria = id;
}
function eliminarCategoriaById(){

    $.ajax({
        method:'DELETE',
        url: getURL() + '/categorias/api/'+idEliminarCategoria,
        data: { //body
        },
        success: function( result ) {
            if(result.estado==1){
                let tabla = $('#tabla-categorias').DataTable();
                tabla.row('#renglon_'+idEliminarCategoria).node().remove().draw();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Categoria Eliminada',
                    showConfirmButton: false,
                    timer: 1500
                });
            }else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'Oops...',
                    title: 'Categoria No Eliminada',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
      });
}

function listascategoriasFront(){
    //vamos a usar la libreria de jquery para JavaScript
    let URL = getURL() + '/categorias/api/';
    $.ajax({
        //verbo (get, put, delete, post)
        //url:"http://localhost:3000/categorias/api/",
        method:'GET',
        url:URL,
        data: {
        },
        success: function( result ){
            let estado = result.estado;
            let mensaje = result.mensaje;
            if(estado==1){
                //vamos a mostrar las categorias
                let categorias = result.categorias;
                let tabla = $('#tabla-categorias').DataTable();
                     
                categorias.forEach(categoria  => {
                    let Botones = generarBotones(categoria);
                    //alert(categoria.descripcion);
                    //.id='registro_'+ categoria.id;
                    let nuevoRenglon = tabla.row.add([categoria.descripcion,Botones]).node();
                    $(nuevoRenglon).find('td').addClass('table-td');
                    tabla.draw( false );
                });
            }else{
                alert(mensaje);
            }
        }
    });
}
function generarBotones(categoria){
    let Botones ='<div class="flex space-x-3 rtl:space-x-reverse">';
    Botones  +='<button onclick="muestraUnaCategoriaFront('+categoria.id+')" data-bs-toggle="modal" data-bs-target="#viewModal" class="action-btn" type="button">';
    Botones  +='<iconify-icon icon="heroicons:eye"></iconify-icon>';
    Botones  +='</button>';
    Botones  +='<button onclick="identificarIdActualizar('+categoria.id+')" data-bs-toggle="modal" data-bs-target="#updateModal" class="action-btn" type="button">';
    Botones  +='<iconify-icon icon="heroicons:pencil-square"></iconify-icon>';
    Botones  +='</button>';
    Botones  +='<button onclick="identificarIdEliminar('+categoria.id+')" data-bs-toggle="modal" data-bs-target="#deleteModal" class="action-btn" type="button">';
    Botones  +='<iconify-icon icon="heroicons:trash"></iconify-icon>';
    Botones  +='</button>';
    Botones  +='</div>' ;

    return Botones;
}


listascategoriasFront();