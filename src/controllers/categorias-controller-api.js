//Requerimos la conexion a la base de datos
//desestructuracion
const { request } = require('express');
const { miConexion } = require('../database/db')

//objeto para manejar el CRUD de Categorias -
const categoriasAPI = {};

//el objeto categoraisAPI = C , R (Una o Todas), U, D
// C - post , R - get , U - put , D - delete
// C - post = Crear una categoria 
categoriasAPI.agregarCategorias = async (req=request,res,next)=>{
    try {
        const { descripcion, observaciones } = req.body;
        //Recuperar el id de la categoria
        if(descripcion==undefined || observaciones==undefined){
            res.status(400).json({
                estado: 0,
                menssaje:"Solicitud incorrecta: Faltan parametros"
            }
            );Categoria 
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT INTO categorias (descripcion,observaciones) VALUES(?,?)',[descripcion,observaciones]);
            if(resultado[0].affectedRows > 0){
                res.status(200).json({
                    estado: 1,
                    menssaje:"Categoria creada",
                    categoria:{
                        id: resultado[0].insertId,
                        descripcion:descripcion,
                        observaciones:observaciones
                    }
                }
                );                
            }else{
                res.status(404).json({
                    estado: 0,
                    menssaje:'Categoria no creada'
                }
                );
            }
        }
    } catch (error) {
        next(error);
    }
}
// R Una Categoria por ID
categoriasAPI.getCategoriaByID = async (req=request,res,next)=>{
    try {
        //Recuperar el id de la categoria
        const { id } = req.params;
        const conexion = await miConexion();
        const [ rows ] = await conexion.query('SELECT * FROM categorias WHERE id= ?',[id]);
        if(rows.length == 0){
            res.status(404).json({
                estado:0,
                menssaje:'Categoria no encontrada',
                categorias:rows[0]
            });
        }else{
            res.status(200).json({
                estado:1,
                menssaje:'Categoria encontrada',
                categorias:rows[0]
            });
        }
    } catch (error) {
        next(error);
    }
}
// R Todas las Categorias
categoriasAPI.getTodasCategorias = async (req,res,next)=>{
    try {
        const conexion = await miConexion();
        const [ rows ] = await conexion.query('SELECT * FROM categorias');
        if(rows.length == 0){
            res.status(404).json({
                estado:0,
                menssaje:'Registros no encontrados',
                categorias:rows
            });
        }else{
            res.status(200).json({
                estado:1,
                menssaje:'Registros encontrados',
                categorias:rows
            });
        }
    } catch (error) {
        next(error);
    }
}
//U - put = Actualizar una categoria
categoriasAPI.updateCategoriasById = async (req=request,res,next)=>{
    try {
        //Recuperar el id de la categoria
        const { descripcion, observaciones } = req.body;
        const { id } = req.params;
        if(id==undefined || descripcion==undefined || observaciones==undefined){
            res.status(400).json({
                estado: 0,
                menssaje:"Solicitud incorrecta: Faltan parametros"
            }
            );Categoria 
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE categorias SET descripcion=?, observaciones=? WHERE id= ?',[descripcion,observaciones,id]);
            if(resultado[0].affectedRows > 0){
                res.status(200).json({
                    estado: 1,
                    menssaje:"Categoria actualizada",
                    insertId: resultado[0].insertId,
                    descripcion:descripcion,
                    observaciones:observaciones
                }
                );
            }else{
                res.status(404).json({
                    estado: 0,
                    menssaje:'Categoria no actualizada'
                }
                );
            }
        }
    } catch (error) {
        next(error);
    }
}
//D - delete = Eliminar una categoria 
categoriasAPI.deleteCategoriasById = async (req=request,res,next)=>{
    try {
        //Recuperar el id de la categoria
        const { id } = req.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM categorias WHERE id= ?',[id]);
        if(resultado[0].affectedRows > 0){
            res.status(200).json({
                estado: 1,
                menssaje:'Categoria eliminada'
            }
            );
        }else{
            res.status(404).json({
                estado: 1,
                menssaje:'Categoria no eliminada'
            }
            );
        }
    } catch (error) {
        next(error);
    }
}
//exportar para poder usar en otro modulo
module.exports=categoriasAPI;