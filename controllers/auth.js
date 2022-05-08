const { response, json } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generarJWT");


const login = async(req,res = response) => {

    const {correo,contrasena } = req.body;

    try {

        //verificar si el correo existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Contrasena no son correctos - correo'
            });
        }

        //verificar si el usuario esta activo en BD
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Contrasena no son correctos - estado:false'
            });
        }

        //verficar la contrasena
        const validContrasena = bcryptjs.compareSync(contrasena,usuario.contrasena);
        if(!validContrasena){
            return res.status(400).json({
                msg: 'Usuario / Contrasena no son correctos - contrasena'
            });
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    login,
}