const {miConexion} = require('../database/db')
const bcrypt = require('bcrypt');
const authAPI = {};

authAPI.logout = async(req,res,next)=>{
    try {
        
    } catch (error) {
        
    }
}

authAPI.login = async (req,res,next)=>{
    try {
        const {usuario, clave} = req.body;
        if(usuario == undefined || clave){
            res.status(400).json({
                estado:0,
                mensaje: "Faltan Parametros: usuario y/o clave"
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query("SELECT*FROM usuario WHERE usuario = ?", [usuario])
            if(resultado.length>0){
                //si lo encontro, vamos a comprar la clave -la clave esta encriptada
               if(await bcrypt.compare(clave,resultado[0].clave)){
                    // Crear las variables de sesion
                    req.session.usuario=usuario;
                    req.session.id=resultado[0].id;
                    req.status(201).json({
                        estado : 1,
                        mensaje : "Acceso Correcto"
                    })
                }else{
                    res.status(404).json({
                        estado:0,
                        mensaje: "Usuario y/o clave incorrecta"
                    })
                }
            }
            res.json(resultado);
            
        }
    } catch (error) {
        
    }
}
module.exports=authAPI;