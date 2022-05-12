
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombres: {
        type: String,
        required: [true, 'nombres es obligatorio'],
    },
    apellidos: {
        type: String,
        required: [true, 'apellidos es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    usuario: {
        type: String,
        required: [true, 'usuario es obligatorio'],
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    estado: {
        type: Boolean,
        default: true
    },

});

UsuarioSchema.methods.toJSON = function(){
    const {__v,contrasena, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );