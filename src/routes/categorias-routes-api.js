
const express = require('express');
const categoriasControllerAPI = require('../controllers/categorias-controller-api');
const router = express.Router();
//La ruta (End Point) GET de todas las categorias
router.get('/',categoriasControllerAPI.getTodasCategorias);
//La ruta (End Point) GET de una categoria
router.get('/:id',categoriasControllerAPI.getCategoriaByID);
router.post('/',categoriasControllerAPI.agregarCategorias);
router.delete('/:id',categoriasControllerAPI.deleteCategoriasById);
router.put('/:id',categoriasControllerAPI.updateCategoriasById);
//Para poder usar el router en otro archivo .js o modulo
module.exports=router;