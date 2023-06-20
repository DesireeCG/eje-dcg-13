const express = require('express');
const usuariosControllerApi = require('../controllers/usuarios-controller-api.js');
const router = express.Router();

router.post("/",usuariosControllerApi.agregarUsuario);




module.exports=router;